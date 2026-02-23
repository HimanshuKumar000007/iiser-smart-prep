import re
import os

html_file = r"d:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\iat-planner-pro.html"

with open(html_file, "r", encoding="utf-8") as f:
    content = f.read()

new_script = """
    <script>
        const PLAN_90_DAYS = [
            // Day 1
            [
                { subject: 'physics', topicName: 'Units, dimensions, errors', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
                { subject: 'chemistry', topicName: 'Structure of atom (quantum nos, de Broglie)', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Trigonometric identities', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'The Living World', priority: 'low', class: 11, allocatedTime: 120, xp: 50 },
            ],
            // Day 2
            [
                { subject: 'physics', topicName: 'Kinematics (1D)', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Periodic trends', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Trig equations', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Biological Classification', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
            ],
            // Day 3
            [
                { subject: 'physics', topicName: 'Kinematics (2D, projectile)', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Chemical bonding (VSEPR, hybridization)', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Complex numbers (algebra)', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Plant Kingdom (algae, bryophytes)', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
            ],
            // Day 4
            [
                { subject: 'physics', topicName: 'Laws of Motion, friction', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Chemical bonding (MOT, H-bonding)', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Complex numbers (Argand, polar)', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Plant Kingdom (pterido, gymno, angio)', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
            ],
            // Day 5
            [
                { subject: 'physics', topicName: 'Work, energy, power', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Thermodynamics (1st law, enthalpy)', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Permutations & combinations', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Animal Kingdom (non-chordates)', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
            ],
            // Day 6
            [
                { subject: 'physics', topicName: 'COM & momentum', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Thermodynamics (Gibbs, spontaneity)', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Binomial theorem', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Animal Kingdom (chordates)', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
            ],
            // Day 7
            [
                { subject: 'physics', topicName: 'Weekly Test & Analysis', priority: 'critical', class: 11, allocatedTime: 180, xp: 300, isTest: true },
            ],
            // Day 8
            [
                { subject: 'physics', topicName: 'Rotational motion (torque)', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Chemical equilibrium', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Sequences & series', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Morphology of flowering plants', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
            ],
            // Day 9
            [
                { subject: 'physics', topicName: 'Gravitation', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Ionic equilibrium (pH, buffer)', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Straight lines (basics)', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Anatomy of flowering plants', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
            ],
            // Day 10
            [
                { subject: 'physics', topicName: 'Elasticity', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
                { subject: 'chemistry', topicName: 'Redox reactions', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
                { subject: 'mathematics', topicName: 'Straight lines (distance, angle)', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Structural organisation in animals', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
            ],
            // Day 11
            [
                { subject: 'physics', topicName: 'Thermodynamics (physics)', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'States of matter', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
                { subject: 'mathematics', topicName: 'Conic: Circle', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Cell – unit of life', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
            ],
            // Day 12
            [
                { subject: 'physics', topicName: 'Kinetic theory', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
                { subject: 'chemistry', topicName: 's-block', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
                { subject: 'mathematics', topicName: 'Parabola', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Cell cycle & division', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
            ],
            // Day 13
            [
                { subject: 'physics', topicName: 'Oscillations (SHM)', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
                { subject: 'chemistry', topicName: 'p-block (B, C, N families)', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Ellipse, hyperbola', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Transport in plants', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
            ],
            // Day 14
            [
                { subject: 'physics', topicName: 'Weekly Test & Analysis', priority: 'critical', class: 11, allocatedTime: 180, xp: 300, isTest: true },
            ],
            // Day 15
            [
                { subject: 'physics', topicName: 'Waves (basics)', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Organic basics (IUPAC, isomerism)', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Limits', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Mineral nutrition', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
            ],
            // Day 16
            [
                { subject: 'physics', topicName: 'Waves (Doppler, beats)', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Hydrocarbons', priority: 'medium', class: 11, allocatedTime: 120, xp: 100 },
                { subject: 'mathematics', topicName: 'Derivatives', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Photosynthesis', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
            ],
            // Day 17
            [
                { subject: 'physics', topicName: 'Revision mechanics', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Revision physical chem', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Trig + complex revision', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Respiration in plants', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
            ],
            // Day 18
            [
                { subject: 'physics', topicName: 'Electrostatics (Coulomb)', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Solutions', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Matrices', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Digestion & absorption', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
            ],
            // Day 19
            [
                { subject: 'physics', topicName: 'Gauss law, E-field', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Electrochemistry', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Determinants', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Breathing & exchange', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
            ],
            // Day 20
            [
                { subject: 'physics', topicName: 'Potential & capacitors', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Chemical kinetics', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Continuity & differentiability', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Body fluids & circulation', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
            ],
            // Day 21
            [
                { subject: 'physics', topicName: 'Weekly Test & Analysis', priority: 'critical', class: 11, allocatedTime: 180, xp: 300, isTest: true },
            ],
            // Day 22
            [
                { subject: 'physics', topicName: 'Current electricity', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Solid state', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                { subject: 'mathematics', topicName: 'AOD (tangent, maxima-minima)', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Excretory system', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
            ],
            // Day 23
            [
                { subject: 'physics', topicName: 'Magnetism (Biot–Savart, Ampere)', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Coordination compounds', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Integrals (basic methods)', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Locomotion & movement', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
            ],
            // Day 24
            [
                { subject: 'physics', topicName: 'Magnetic dipole, galvanometer', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Haloalkanes', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Definite integrals', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Neural control', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
            ],
            // Day 25
            [
                { subject: 'physics', topicName: 'EMI (Faraday, Lenz)', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Alcohols, phenols, ethers', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Differential equations', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Chemical coordination', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
            ],
            // Day 26
            [
                { subject: 'physics', topicName: 'AC circuits', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Aldehydes, ketones, acids', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Vectors', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Reproduction in organisms', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
            ],
            // Day 27
            [
                { subject: 'physics', topicName: 'EM waves', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                { subject: 'chemistry', topicName: 'Amines', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                { subject: 'mathematics', topicName: '3D geometry', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Sexual reproduction in plants', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
            ],
            // Day 28
            [
                { subject: 'physics', topicName: 'Weekly Test & Analysis', priority: 'critical', class: 12, allocatedTime: 180, xp: 300, isTest: true },
            ],
            // Day 29
            [
                { subject: 'physics', topicName: 'Ray optics', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Biomolecules', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Probability (basics)', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                { subject: 'biology', topicName: 'Human reproduction', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
            ],
            // Day 30
            [
                { subject: 'physics', topicName: 'Wave optics', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Polymers + Chem in everyday life', priority: 'low', class: 12, allocatedTime: 120, xp: 50 },
                { subject: 'mathematics', topicName: 'Probability (Bayes)', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Reproductive health', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
            ],
            // Day 31
            [
                { subject: 'physics', topicName: 'Photoelectric effect', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Metallurgy', priority: 'low', class: 12, allocatedTime: 120, xp: 50 },
                { subject: 'mathematics', topicName: 'LPP', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                { subject: 'biology', topicName: 'Principles of inheritance', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
            ],
            // Day 32
            [
                { subject: 'physics', topicName: 'Bohr model', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'd- & f-block', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                { subject: 'mathematics', topicName: 'Probability distributions', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Mendelian problems', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
            ],
            // Day 33
            [
                { subject: 'physics', topicName: 'Nuclear physics', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Surface chemistry', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                { subject: 'mathematics', topicName: 'Calculus revision', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Molecular basis of inheritance', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
            ],
            // Day 34
            [
                { subject: 'physics', topicName: 'Semiconductors', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                { subject: 'chemistry', topicName: 'Semiconductors (Solid State)', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                { subject: 'mathematics', topicName: 'Vectors + 3D mixed', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'DNA replication, transcription', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
            ],
            // Day 35
            [
                { subject: 'physics', topicName: 'Weekly Test & Analysis', priority: 'critical', class: 12, allocatedTime: 180, xp: 300, isTest: true },
            ],
            // Day 36
            [
                { subject: 'physics', topicName: 'Full mechanics revision', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Organic reaction mechanisms', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Conics revision', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Translation + genetic code', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
            ],
            // Day 37
            [
                { subject: 'physics', topicName: 'Electrostatics + current revision', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Named reactions', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Calculus mixed', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Evolution', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
            ],
            // Day 38
            [
                { subject: 'physics', topicName: 'Magnetism + EMI revision', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Coordination + electrochem revision', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Algebra mixed', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Human health & disease', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
            ],
            // Day 39
            [
                { subject: 'physics', topicName: 'Optics revision', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Physical chem numericals', priority: 'critical', class: 11, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Probability PYQs', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Food production', priority: 'low', class: 12, allocatedTime: 120, xp: 50 },
            ],
            // Day 40
            [
                { subject: 'physics', topicName: 'Modern physics revision', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Inorganic revision', priority: 'high', class: 11, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Full length maths test', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Microbes in human welfare', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
            ],
            // Day 41
            [
                { subject: 'physics', topicName: 'Weekly Test & Analysis', priority: 'critical', class: 12, allocatedTime: 180, xp: 300, isTest: true },
            ],
            // Day 42
            [
                { subject: 'physics', topicName: 'Weak physics topics', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Weak chem topics', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Weak maths topics', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Biotechnology principles', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
            ],
            // Day 43
            [
                { subject: 'physics', topicName: 'Mixed numericals', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Mixed numericals', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Mixed PYQs', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Biotechnology applications', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
            ],
            // Day 44
            [
                { subject: 'physics', topicName: 'Speed test (physics)', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Speed test (chem)', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Speed test (maths)', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Organisms & populations', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
            ],
            // Day 45
            [
                { subject: 'physics', topicName: 'Full syllabus physics test', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Full syllabus chem test', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Full syllabus maths test', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Ecosystem', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
            ],
            // Day 46
            [
                { subject: 'physics', topicName: 'Error correction', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'chemistry', topicName: 'Error correction', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'mathematics', topicName: 'Error correction', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
                { subject: 'biology', topicName: 'Biodiversity', priority: 'high', class: 12, allocatedTime: 120, xp: 150 },
            ],
            // Day 47
            [
                { subject: 'physics', topicName: 'Revision formulas', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'chemistry', topicName: 'Revision reactions', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'mathematics', topicName: 'Revision theorems', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                { subject: 'biology', topicName: 'Environmental issues', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
            ],
            // Day 48
            [
                { subject: 'physics', topicName: 'Full Mock Test & Analysis', priority: 'critical', class: 12, allocatedTime: 240, xp: 500, isTest: true },
            ]
        ];

        // Generate the rest of the 90 days algorithmically or fill with patterns
        for (let i = 49; i <= 90; i++) {
            if (i >= 61 && i <= 75) {
                // Day 61-75: Rapid 2nd Revision
                if (i % 2 === 0) {
                     PLAN_90_DAYS.push([
                        { subject: 'physics', topicName: 'Rotation, Electrostatics, Modern Physics Revision', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                        { subject: 'mathematics', topicName: 'Calculus, Conics, Vectors Revision', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                    ]);
                } else {
                     PLAN_90_DAYS.push([
                        { subject: 'chemistry', topicName: 'Thermodynamics, Electrochem, Organic reactions Revision', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                        { subject: 'biology', topicName: 'Genetics, Cell cycle, Physiology, Ecology Revision', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                    ]);
                }
            } else if (i >= 76 && i <= 85) {
                // Day 76-85: Full Test Mode (1 Full Mock every 2 days)
                if (i % 2 === 0) {
                    PLAN_90_DAYS.push([
                        { subject: 'physics', topicName: 'Full Mock Test', priority: 'critical', class: 12, allocatedTime: 180, xp: 400, isTest: true },
                    ]);
                } else {
                    PLAN_90_DAYS.push([
                         { subject: 'physics', topicName: 'Deep Analysis & Error Notebook', priority: 'critical', class: 12, allocatedTime: 180, xp: 400, isTest: true },
                    ]);
                }
            } else if (i >= 86 && i <= 90) {
                PLAN_90_DAYS.push([
                     { subject: 'physics', topicName: 'Final Polish: Formulas & Derivations', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                     { subject: 'chemistry', topicName: 'Final Polish: NCERT Reactions', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                     { subject: 'mathematics', topicName: 'Final Polish: Light Mock Selection', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                     { subject: 'biology', topicName: 'Final Polish: NCERT Diagrams', priority: 'critical', class: 12, allocatedTime: 120, xp: 200 },
                ]);
            } else {
                 PLAN_90_DAYS.push([
                    { subject: 'physics', topicName: 'Buffer / Backlog', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                    { subject: 'chemistry', topicName: 'Buffer / Backlog', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                    { subject: 'mathematics', topicName: 'Buffer / Backlog', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                    { subject: 'biology', topicName: 'Buffer / Backlog', priority: 'medium', class: 12, allocatedTime: 120, xp: 100 },
                 ]);
            }
        }

        const SYLLABUS_META = {
            physics: { name: 'Physics', color: '#ef4444', icon: 'atom' },
            chemistry: { name: 'Chemistry', color: '#06b6d4', icon: 'flask' },
            mathematics: { name: 'Math', color: '#f59e0b', icon: 'function' },
            biology: { name: 'Biology', color: '#22c55e', icon: 'dna' }
        };

        // GLOBAL APP STATE
        let appState = {
            user: { name: 'Aspirant', startDate: null },
            stats: {
                streak: 0,
                longestStreak: 0,
                totalXP: 0,
                totalFocusMinutes: 0,
                sessionsCompleted: 0,
                lastActiveDate: null
            },
            currentDay: 1,
            dailyStatus: {} // dailyStatus["Day 1"] = { task1: completed, task2: completed }
        };

        let currentFilter = 'all';
        let currentTaskId = null;
        let focusTimerInterval = null;
        let focusTimeRemaining = 0;
        let focusTotalTime = 0;

        // Initialization
        function init() {
            const saved = localStorage.getItem('IAT2026_90_DAY_PLANNER');
            if (saved) {
                appState = JSON.parse(saved);
                updateStreak();
                renderAll();
            } else {
                welcomeSetup();
            }
        }

        function welcomeSetup() {
            document.body.innerHTML += `
                <div class="focus-modal active" id="welcomeModal" style="z-index: 3000; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                    <div style="text-align: center; max-width: 400px; background: var(--bg-card); padding: 2rem; border-radius: 1rem; border: 1px solid var(--glass-border);">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                        <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Welcome to Dynamic IAT Planner</h2>
                        <p style="color: var(--text-muted); margin-bottom: 2rem;">Your strict 90-day blueprint. No excuses.</p>
                        <input type="text" id="setupName" placeholder="Your Name" style="width: 100%; padding: 1rem; background: var(--bg-secondary); border: 1px solid var(--glass-border); border-radius: 12px; color: white; margin-bottom: 1rem; font-size: 1rem;">
                        <button onclick="completeSetup()" style="width: 100%; padding: 1rem; background: var(--accent-purple); color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">Begin Day 1</button>
                    </div>
                </div>
            `;
        }

        function completeSetup() {
            appState.user.name = document.getElementById('setupName').value || 'Aspirant';
            appState.user.startDate = new Date().toISOString();
            appState.stats.lastActiveDate = new Date().toDateString();
            appState.currentDay = 1;
            
            saveData();
            document.getElementById('welcomeModal').remove();
            renderAll();
        }

        function saveData() {
            localStorage.setItem('IAT2026_90_DAY_PLANNER', JSON.stringify(appState));
        }

        function resetData() {
            if (confirm('Delete all progress and restart from Day 1?')) {
                localStorage.removeItem('IAT2026_90_DAY_PLANNER');
                location.reload();
            }
        }

        // Streak
        function updateStreak() {
            const today = new Date().toDateString();
            const lastActive = appState.stats.lastActiveDate;

            if (!lastActive) {
                appState.stats.streak = 0;
            } else {
                const lastDate = new Date(lastActive);
                const todayDate = new Date(today);
                const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

                if (diffDays > 1) {
                    appState.stats.streak = 0;
                }
            }
        }

        function incrementStreak() {
            const today = new Date().toDateString();
            if (appState.stats.lastActiveDate !== today) {
                appState.stats.streak++;
                appState.stats.lastActiveDate = today;
                if (appState.stats.streak > appState.stats.longestStreak) {
                    appState.stats.longestStreak = appState.stats.streak;
                }
            }
        }
        
        function previousDay() {
            if (appState.currentDay > 1) {
                appState.currentDay--;
                saveData();
                renderAll();
            }
        }
        
        function nextDay() {
            if (appState.currentDay < 90) {
                appState.currentDay++;
                saveData();
                renderAll();
            }
        }

        // Render functions
        function renderAll() {
            renderHeader();
            renderStats();
            renderDateStrip();
            renderTasks();
        }

        function renderHeader() {
            document.getElementById('headerStreak').textContent = appState.stats.streak;
            document.getElementById('headerXP').textContent = appState.stats.totalXP + " XP";
        }

        function renderStats() {
            const h = Math.floor(appState.stats.totalFocusMinutes / 60);
            const m = appState.stats.totalFocusMinutes % 60;
            document.getElementById('totalFocusTime').innerHTML = `${h}<span>h</span> ${m.toString().padStart(2, '0')}<span>m</span>`;

            // Calculate completed for today's tasks
            const dayKey = `Day ${appState.currentDay}`;
            if (!appState.dailyStatus[dayKey]) {
                appState.dailyStatus[dayKey] = {};
            }
            
            const todayTasks = PLAN_90_DAYS[appState.currentDay - 1];
            let compTasks = 0;
            todayTasks.forEach((t, index) => {
                 if (appState.dailyStatus[dayKey][index]) compTasks++;
            });

            document.getElementById('tasksCompletedCount').textContent = `${compTasks}/${todayTasks.length}`;
            const pct = todayTasks.length > 0 ? (compTasks / todayTasks.length) * 100 : 0;
            document.getElementById('tasksProgressBar').style.width = `${pct}%`;
        }

        function renderDateStrip() {
            const container = document.getElementById('dateStripContainer');
            if (!container) return;
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0 1rem; color: var(--text-primary);">
                    <button class="icon-btn" onclick="previousDay()" style="color: var(--accent-purple); border: 1px solid var(--glass-border); background: var(--bg-secondary); padding: 0.5rem; border-radius: 8px;"><i class="ph ph-caret-left"></i> Prev</button>
                    <div style="font-size: 1.5rem; font-weight: 700; font-family: 'Space Grotesk';">Day ${appState.currentDay} <span style="font-size: 0.9rem; color: var(--text-muted);">of 90</span></div>
                    <button class="icon-btn" onclick="nextDay()" style="color: var(--accent-purple); border: 1px solid var(--glass-border); background: var(--bg-secondary); padding: 0.5rem; border-radius: 8px;">Next <i class="ph ph-caret-right"></i></button>
                </div>
            `;
            
            // Re-label Smart Daily Plan section header
            const titleEl = document.querySelector('.section-title');
            if(titleEl) titleEl.innerText = `Day ${appState.currentDay} Plan`;
        }

        function filterTasks(filter, el) {
            currentFilter = filter;
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            el.classList.add('active');
            renderTasks();
        }

        function renderTasks() {
            const container = document.getElementById('taskList');
            container.innerHTML = '';

            let rawTasks = PLAN_90_DAYS[appState.currentDay - 1];
            let tasks = Object.assign([], rawTasks);
            
            const dayKey = `Day ${appState.currentDay}`;

            if (currentFilter !== 'all') {
                tasks = tasks.filter(t => t.subject === currentFilter);
            }

            let todayXP = 0;

            tasks.forEach((task) => {
                // Find original index to maintain status mapping correctly
                const originalIndex = rawTasks.indexOf(task);
                const isCompleted = appState.dailyStatus[dayKey][originalIndex] === true;
                
                if (isCompleted) todayXP += Math.floor(task.xp);

                let el = document.createElement('div');
                el.className = `task-item ${isCompleted ? 'completed' : ''}`;

                const subj = task.isTest ? { icon: 'exam', name: 'Test', color: '#6366f1' } : SYLLABUS_META[task.subject];

                // Content
                el.innerHTML = `
                    <div class="checkbox" onclick="toggleTask(${originalIndex})">${isCompleted ? '<i class="ph ph-check"></i>' : ''}</div>
                    <div class="task-content">
                        <div class="task-title" onclick="toggleTask(${originalIndex})" style="cursor: pointer;">${task.topicName}</div>
                        <div class="task-meta">
                            <span class="priority ${task.priority}">${task.priority}</span>
                            <span class="tag"><i class="ph ph-${subj.icon}"></i> ${subj.name}</span>
                            <span class="tag"><i class="ph ph-clock"></i> ${task.allocatedTime}m</span>
                        </div>
                    </div>
                `;

                if (!isCompleted) {
                    const actions = document.createElement('div');
                    actions.className = 'task-actions';
                    actions.innerHTML = `
                        <button class="task-play-btn" onclick="openFocusModeForTask(${originalIndex})" title="Start Session"><i class="ph ph-play-circle" style="font-size:1.5rem"></i></button>
                    `;
                    el.appendChild(actions);
                } else {
                    const xpEl = document.createElement('div');
                    xpEl.className = 'task-xp';
                    xpEl.textContent = `+${Math.floor(task.xp)} XP`;
                    el.appendChild(xpEl);
                }

                container.appendChild(el);
            });

            document.getElementById('xpDisplay').textContent = `+${todayXP} XP Earned`;
        }

        // Actions
        function toggleTask(originalIndex) {
            const dayKey = `Day ${appState.currentDay}`;
            const task = PLAN_90_DAYS[appState.currentDay - 1][originalIndex];
            
            const wasCompleted = appState.dailyStatus[dayKey][originalIndex] === true;
            appState.dailyStatus[dayKey][originalIndex] = !wasCompleted;

            if (!wasCompleted) {
                appState.stats.totalXP += Math.floor(task.xp);
                showToast('Task Done!', `+${Math.floor(task.xp)} XP`);
                createConfetti();
                incrementStreak();
            } else {
                appState.stats.totalXP -= Math.floor(task.xp);
            }

            saveData();
            renderAll();
        }

        // Focus Mode
        function openFocusModeForTask(originalIndex) {
            const dayKey = `Day ${appState.currentDay}`;
            const task = PLAN_90_DAYS[appState.currentDay - 1][originalIndex];
            if (!task || appState.dailyStatus[dayKey][originalIndex]) return;

            currentTaskId = originalIndex;
            focusTotalTime = task.allocatedTime * 60;
            focusTimeRemaining = focusTotalTime;

            const subj = task.isTest ? { icon: 'exam', name: 'Test', color: '#6366f1' } : SYLLABUS_META[task.subject];
            document.getElementById('focusIcon').innerHTML = `<i class="ph ph-${subj.icon}" style="color:${subj.color}"></i>`;
            document.getElementById('focusTopic').textContent = task.topicName;
            document.getElementById('focusDetails').textContent = `Class ${task.class} • ${task.allocatedTime} mins • ${task.priority.toUpperCase()} priority`;

            updateFocusTimerDisplay();

            document.getElementById('focusModal').classList.add('active');
            document.getElementById('startBtn').style.display = 'flex';
            document.getElementById('stopBtn').style.display = 'none';
        }

        function toggleFocusTimer() {
            if (focusTimerInterval) return; // already running
            document.getElementById('startBtn').style.display = 'none';
            document.getElementById('stopBtn').style.display = 'flex';

            focusTimerInterval = setInterval(() => {
                focusTimeRemaining--;
                updateFocusTimerDisplay();

                if (focusTimeRemaining <= 0) {
                    completeFocus();
                }
            }, 1000);
        }

        function updateFocusTimerDisplay() {
            const m = Math.floor(focusTimeRemaining / 60).toString().padStart(2, '0');
            const s = (focusTimeRemaining % 60).toString().padStart(2, '0');
            document.getElementById('focusTimer').textContent = `${m}:${s}`;
        }

        function completeFocus() {
            if (focusTimerInterval) {
                clearInterval(focusTimerInterval);
                focusTimerInterval = null;
            }

            if (currentTaskId !== null) {
                const dayKey = `Day ${appState.currentDay}`;
                if (!appState.dailyStatus[dayKey][currentTaskId]) {
                    const timeSpent = Math.ceil((focusTotalTime - focusTimeRemaining) / 60);
                    appState.stats.totalFocusMinutes += timeSpent;
                    appState.stats.sessionsCompleted++;
                    toggleTask(currentTaskId);
                }
            }

            closeFocus();
        }

        function closeFocus() {
            if (focusTimerInterval) {
                clearInterval(focusTimerInterval);
                focusTimerInterval = null;
            }
            currentTaskId = null;
            document.getElementById('focusModal').classList.remove('active');
            renderAll();
        }

        function showToast(title, msg) {
            document.querySelector('#toast div:first-child').textContent = title;
            document.getElementById('toastMsg').textContent = msg;
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        function createConfetti() {
            const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
            for (let i = 0; i < 50; i++) {
                const c = document.createElement('div');
                c.className = 'confetti';
                c.style.left = Math.random() * 100 + 'vw';
                c.style.background = colors[Math.floor(Math.random() * colors.length)];
                document.body.appendChild(c);

                const anim = c.animate([
                    { transform: `translate3d(0, 0, 0) rotate(0)`, opacity: 1 },
                    { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
                ], { duration: 1000 + Math.random() * 1000, easing: 'cubic-bezier(.37,0,.63,1)' });

                anim.onfinish = () => c.remove();
            }
        }

        // Boot
        document.addEventListener('DOMContentLoaded', init);

    </script>
"""

start_marker = "<script>"
end_marker = "</script>\n</body>"

start_idx = content.find("const SYLLABUS = {", 0)
if start_idx != -1:
    # Need to go backwards to find the actual <script> tag
    actual_start_idx = content.rfind("<script>", 0, start_idx)
    end_idx = content.find(end_marker, start_idx)
    if actual_start_idx != -1 and end_idx != -1:
        updated_content = content[:actual_start_idx] + new_script.strip() + "\n" + content[end_idx:]
        
        # Additional cleanup to remove skip functionality
        # Need to remove this from the HTML earlier if I can, but wait, the skip logic is inside the JS that I replaced.
        # Let's check if there is an old button in the JS. Yes, I replaced that in the renderTasks function in new_script.

        with open(html_file, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print("Successfully updated iat-planner-pro.html with 90 day plan.")
    else:
        print("Could not find exact script tags.")
else:
    print("Could not find SYLLABUS token.")
