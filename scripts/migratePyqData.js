const fs = require('fs');
const path = require('path');

const pyqDir = path.join(__dirname, './data/source-pyqs');
const migratedDir = path.join(__dirname, '../frontend/src/data/pyqs-migrated');
const catalogPath = path.join(__dirname, '../backend/data/learningCatalog.json');
const reportPath = path.join(__dirname, './output/pyq-mapping-report.json');
const auditPath = path.join(__dirname, './output/pyq-accepted-mapping-audit.json');
const overridesPath = path.join(__dirname, './data/pyqMappingOverrides.json');
const reviewedPath = path.join(__dirname, './data/pyqReviewedMappings.json');
const backendPyqPath = path.join(__dirname, '../backend/data/pyqQuestions.json');

const files = fs.readdirSync(pyqDir).filter(f => f.endsWith('.json'));
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

let overrides = {};
if (fs.existsSync(overridesPath)) {
  overrides = JSON.parse(fs.readFileSync(overridesPath, 'utf8'));
}

let reviewed = {};
if (fs.existsSync(reviewedPath)) {
  reviewed = JSON.parse(fs.readFileSync(reviewedPath, 'utf8'));
}

// 1. Chapter Signatures
const chapterSignatures = {
  // === PHYSICS ===
  phy_units: {
    strong: ['dimension', 'dimensional', 'screw gauge', 'vernier', 'calliper', 'significant figures', 'percentage error'],
    supporting: ['unit', 'error', 'measurement', 'homogeneity', 'conversion', 'least count']
  },
  phy_motion_straight: {
    strong: ['straight line', 'galileo', 'kinematic', 'free fall', 'motion under gravity'],
    supporting: ['velocity', 'acceleration', 'displacement', 'speed', 'position-time', 'velocity-time']
  },
  phy_motion_plane: {
    strong: ['projectile', 'river-boat', 'centripetal acceleration', 'range of projectile', 'drift velocity', 'cross product'],
    supporting: ['vector', 'motion in a plane', 'circular', 'angular velocity', 'resultant']
  },
  phy_mechanics: {
    strong: ['pulley', 'atwood machine', 'banking of road', 'centripetal force', 'pseudo-force', 'friction coefficient', 'laws of motion'],
    supporting: ['force', 'tension', 'spring', 'newton', 'mass', 'equilibrium']
  },
  phy_work_energy: {
    strong: ['coefficient of restitution', 'elastic collision', 'inelastic collision', 'spring potential energy', 'work-energy theorem'],
    supporting: ['work', 'power', 'kinetic energy', 'potential energy', 'conservative']
  },
  phy_rotation: {
    strong: ['moment of inertia', 'torque', 'angular momentum', 'centre of mass', 'rolling without slipping', 'rotational kinetic'],
    supporting: ['rotation', 'rolling', 'angular acceleration', 'axis', 'solid sphere', 'hollow sphere']
  },
  phy_gravitation: {
    strong: ['gravitation', 'kepler', 'escape velocity', 'orbital speed', 'acceleration due to gravity', 'universal gravitational'],
    supporting: ['orbit', 'satellite', 'earth', 'mass', 'gravity']
  },
  phy_mech_solid: {
    strong: ['young\'s modulus', 'bulk modulus', 'shear modulus', 'stress', 'strain', 'elastic behavior', 'hooke\'s law'],
    supporting: ['elasticity', 'wire', 'elongation', 'modulus']
  },
  phy_mech_fluid: {
    strong: ['bernoulli', 'surface tension', 'viscosity', 'terminal velocity', 'capillary rise', 'poiseuille', 'archimedes'],
    supporting: ['fluid', 'pressure', 'density', 'buoyancy', 'viscous']
  },
  phy_thermal: {
    strong: ['calorimetry', 'thermal expansion', 'thermal conductivity', 'specific heat capacity', 'black body', 'stefan', 'wien'],
    supporting: ['heat', 'temperature', 'radiation', 'conduction']
  },
  phy_thermo: {
    strong: ['carnot', 'isothermal', 'adiabatic', 'entropy', 'first law of thermodynamics', 'heat engine', 'refrigerator'],
    supporting: ['thermodynamic', 'work done', 'heat', 'expansion', 'efficiency']
  },
  phy_kinetic_theory: {
    strong: ['mean free path', 'boltzmann constant', 'rms speed', 'equipartition of energy', 'degrees of freedom'],
    supporting: ['ideal gas', 'kinetic theory', 'pressure of gas', 'temperature']
  },
  phy_oscillations: {
    strong: ['simple harmonic', 'shm', 'pendulum', 'force constant', 'oscillation period', 'damping', 'spring-mass'],
    supporting: ['oscillation', 'amplitude', 'frequency', 'time period', 'phase']
  },
  phy_waves: {
    strong: ['doppler effect', 'sound wave', 'beats', 'organ pipe', 'stretched string', 'wave equation'],
    supporting: ['wave', 'frequency', 'wavelength', 'string', 'velocity of sound', 'transverse', 'longitudinal']
  },
  phy_electrostatics: {
    strong: ['coulomb', 'electric field', 'electric dipole', 'gauss\'s law', 'electric flux', 'charge density'],
    supporting: ['charge', 'electrostatic', 'force between charges'],
    exclusions: ['current', 'circuit', 'electrolysis']
  },
  phy_potential_cap: {
    strong: ['electrostatic potential', 'dielectric', 'capacitance', 'capacitor', 'potential energy of charge', 'parallel plate'],
    supporting: ['potential', 'voltage', 'charge']
  },
  phy_current_elec: {
    strong: ['wheatstone', 'potentiometer', 'drift velocity', 'kirchhoff', 'resistivity', 'temperature coefficient', 'internal resistance'],
    supporting: ['resistor', 'resistance', 'current', 'voltage', 'circuit', 'ohm']
  },
  phy_moving_charges: {
    strong: ['biot-savart', 'ampere\'s circuital', 'lorentz force', 'cyclotron', 'galvanometer', 'magnetic force on wire'],
    supporting: ['magnetic field', 'magnetic force', 'current loop']
  },
  phy_mag_matter: {
    strong: ['magnetic susceptibility', 'hysteresis', 'paramagnetic', 'diamagnetic', 'ferromagnetic', 'magnetic dipole moment'],
    supporting: ['magnet', 'magnetic field', 'susceptibility', 'permeability']
  },
  phy_em_induction: {
    strong: ['faraday\'s law', 'lenz\'s law', 'self-induction', 'mutual induction', 'induced emf', 'magnetic flux'],
    supporting: ['induction', 'induced current', 'coil']
  },
  phy_ac: {
    strong: ['lcr circuit', 'alternating current', 'ac resonance', 'quality factor', 'transformer', 'power in ac', 'reactance', 'impedance'],
    supporting: ['ac', 'frequency', 'circuit', 'capacitor', 'inductor', 'resistor']
  },
  phy_em_waves: {
    strong: ['maxwell\'s equations', 'displacement current', 'electromagnetic spectrum', 'wave propagation', 'pointing vector'],
    supporting: ['electromagnetic wave', 'em wave', 'radiation']
  },
  phy_ray_optics: {
    strong: ['lens maker', 'prism', 'refraction at spherical', 'microscope', 'telescope', 'total internal reflection', 'magnification'],
    supporting: ['mirror', 'lens', 'refraction', 'reflection', 'focal length', 'refractive index']
  },
  phy_wave_optics: {
    strong: ['double slit', 'ydse', 'diffraction', 'polarization', 'brewster\'s angle', 'coherent source', 'fringe width'],
    supporting: ['interference', 'wave optics', 'fringes', 'huygens', 'light']
  },
  phy_dual_nature: {
    strong: ['photoelectric effect', 'work function', 'de broglie wavelength', 'photon', 'stopping potential', 'davisson-germer'],
    supporting: ['radiation', 'wave-particle', 'electrons']
  },
  phy_atoms: {
    strong: ['bohr model', 'rutherford scattering', 'hydrogen spectrum', 'spectral series', 'rydberg constant'],
    supporting: ['atom', 'orbit', 'energy level', 'line spectrum']
  },
  phy_nuclei: {
    strong: ['half-life', 'radioactive decay', 'binding energy per nucleon', 'nuclear fission', 'nuclear fusion', 'mass defect'],
    supporting: ['nucleus', 'nuclei', 'radioactivity', 'decay constant', 'neutron']
  },
  phy_semiconductor: {
    strong: ['logic gate', 'p-n junction', 'zener diode', 'photodiode', 'solar cell', 'transistor amplifier', 'rectifier'],
    supporting: ['semiconductor', 'diode', 'gate', 'doping']
  },

  // === CHEMISTRY ===
  chem_basic_concepts: {
    strong: ['mole fraction', 'stoichiometry', 'molarity', 'molality', 'limiting reagent', 'empirical formula'],
    supporting: ['mole', 'concentration', 'mass percentage']
  },
  chem_atom_struct: {
    strong: ['quantum number', 'de broglie', 'heisenberg uncertainty', 'schrodinger', 'angular node', 'radial node'],
    supporting: ['orbital', 'bohr\'s orbit', 'spectral line', 'node'],
    exclusions: ['anode', 'cathode', 'electrolysis']
  },
  chem_periodic: {
    strong: ['ionization enthalpy', 'electron gain enthalpy', 'electronegativity', 'atomic radius', 'diagonal relationship'],
    supporting: ['periodic table', 'periodic properties', 'periodicity']
  },
  chem_bonding: {
    strong: ['hybridization', 'vsepr', 'molecular orbital', 'bond order', 'dipole moment', 'formal charge', 'hydrogen bonding'],
    supporting: ['covalent bond', 'bond', 'overlap']
  },
  chem_df_block: {
    strong: ['lanthanoid contraction', 'transition metal', 'potassium dichromate', 'potassium permanganate', 'd-d transition'],
    supporting: ['d-block', 'f-block', 'oxidation state', 'lanthanide']
  },
  chem_coord: {
    strong: ['coordination number', 'crystal field', 'cft', 'isomerism in coordination', 'ligand', 'iupac name of complex', 'ambidentate'],
    supporting: ['complex', 'coordination compound', 'metal ion']
  },
  chem_thermo: {
    strong: ['entropy change', 'gibbs energy', 'spontaneous', 'enthalpy of reaction', 'hess\'s law'],
    supporting: ['thermodynamics', 'first law', 'heat capacity', 'work done']
  },
  chem_eq: {
    strong: ['solubility product', 'buffer solution', 'le chatelier', 'ph of weak', 'common ion effect', 'ksp', 'conjugate acid'],
    supporting: ['equilibrium', 'ph scale', 'equilibrium constant']
  },
  chem_redox: {
    strong: ['oxidation number', 'redox reaction', 'disproportionation', 'balancing of redox'],
    supporting: ['oxidation', 'reduction', 'oxidizing agent']
  },
  chem_solutions: {
    strong: ['colligative properties', 'raoult\'s law', 'osmotic pressure', 'vant hoff factor', 'henry\'s law', 'azeotrope'],
    supporting: ['solution', 'solute', 'solvent', 'vapor pressure']
  },
  chem_electrochemistry: {
    strong: ['nernst equation', 'kohlrausch law', 'faraday\'s laws of electrolysis', 'molar conductivity', 'fuel cell', 'salt bridge', 'electrolysis'],
    supporting: ['electrochemistry', 'galvanic cell', 'anode', 'cathode', 'electrode', 'emf']
  },
  chem_kinetics: {
    strong: ['activation energy', 'arrhenius equation', 'rate constant', 'half-life of first', 'order of reaction', 'pseudo first order'],
    supporting: ['kinetics', 'rate of reaction', 'reaction mechanism', 'half-life']
  },
  chem_org_basics: {
    strong: ['inductive effect', 'resonance effect', 'hyperconjugation', 'electrophile', 'nucleophile', 'carbocation stability', 'iupac nomenclature'],
    supporting: ['organic chemistry', 'isomerism', 'nomenclature']
  },
  chem_hydrocarbons: {
    strong: ['ozonolysis', 'markovnikov\'s rule', 'friedel-crafts', 'wurtz reaction', 'aromaticity', 'huckel\'s rule', 'alkyne hydration'],
    supporting: ['alkane', 'alkene', 'alkyne', 'benzene', 'hydrocarbon']
  },
  chem_env: {
    strong: ['acid rain', 'photochemical smog', 'greenhouse effect', 'eutrophication', 'bod', 'ozone depletion'],
    supporting: ['pollution', 'environment', 'pollutant']
  },
  chem_solid_state: {
    strong: ['packing efficiency', 'bragg\'s law', 'fcc', 'bcc', 'schottky defect', 'frenkel defect'],
    supporting: ['solid state', 'unit cell', 'lattice', 'crystal']
  },
  chem_surface: {
    strong: ['adsorption isotherm', 'gold number', 'tyndall effect', 'hardy-schulze', 'lyophilic', 'lyophobic', 'colloidal state'],
    supporting: ['colloid', 'adsorption', 'catalyst']
  },
  chem_gen_principles: {
    strong: ['froth floatation', 'zone refining', 'ellingham diagram', 'roasting', 'calcination', 'blast furnace'],
    supporting: ['metallurgy', 'ore', 'extraction']
  },
  chem_haloalkanes: {
    strong: ['sn1 mechanism', 'sn2 mechanism', 'grignard reagent', 'nucleophilic substitution', 'sandmeyer'],
    supporting: ['haloalkane', 'alkyl halide', 'haloarene']
  },
  chem_alcohol: {
    strong: ['lucas test', 'reimer-tiemann', 'kolbe\'s reaction', 'dehydration of alcohol', 'ether synthesis'],
    supporting: ['alcohol', 'phenol', 'ether']
  },
  chem_aldehyde: {
    strong: ['aldol condensation', 'cannizzaro reaction', 'clemmensen reduction', 'tollens\' test', 'fehling\'s test', 'haloform reaction'],
    supporting: ['aldehyde', 'ketone', 'carboxylic acid', 'oxidation']
  },
  chem_amines: {
    strong: ['hinsberg reagent', 'hoffmann bromamide', 'carbylamine reaction', 'diazotization', 'basic strength of amines'],
    supporting: ['amine', 'diazonium salt']
  },
  chem_biomolecules: {
    strong: ['denaturation of proteins', 'peptide linkage', 'nucleotide', 'glucose structure', 'anomers', 'mutarotation', 'essential amino acids'],
    supporting: ['protein', 'dna', 'carbohydrate', 'rna', 'amino acid']
  },

  // === BIOLOGY ===
  bio_diversity: {
    strong: ['binomial nomenclature', 'taxonomic hierarchy', 'archaebacteria', 'fungi classification', 'bryophytes', 'pteridophytes', 'gymnosperms'],
    supporting: ['kingdom', 'phylum', 'genus', 'species', 'diversity']
  },
  bio_struct_org: {
    strong: ['malpighian tubules', 'nephridia', 'open circulatory system', 'closed circulatory system', 'cockroach anatomy', 'earthworm segment', 'xylem trachea'],
    supporting: ['anatomy', 'tissue', 'epithelium', 'morphology']
  },
  bio_cell: {
    strong: ['mitochondrial matrix', 'cristae', 'g0 stage', 'meiosis i', 'mitotic spindle', 'fluid mosaic model', 'euchromatin', '70s ribosome'],
    supporting: ['mitosis', 'meiosis', 'cell cycle', 'mitochondrion', 'nucleus', 'chromosome', 'ribosome']
  },
  bio_plant_physio: {
    strong: ['photosystem', 'calvin cycle', 'nitrogenase', 'transpiration pull', 'abscisic acid', 'photoperiodism', 'crassulacean acid'],
    supporting: ['photosynthesis', 'respiration in plants', 'transpiration', 'auxin', 'hormone']
  },
  bio_human_physio: {
    strong: ['counter-current mechanism', 'sliding filament', 'sinoatrial node', 'pulmonary volume', 'juxtaglomerular', 'reflex arc', 'double circulation'],
    supporting: ['circulation', 'excretion', 'neuron', 'heart', 'kidney', 'excretory', 'respiratory']
  },
  bio_reproduction: {
    strong: ['double fertilization', 'megasporogenesis', 'triple fusion', 'endosperm', 'sertoli cells', 'corpus luteum', 'acrosome reaction'],
    supporting: ['reproduction', 'gamete', 'fertilization', 'embryo', 'pollination']
  },
  bio_genetics: {
    strong: ['dihybrid cross', 'natural selection', 'dna replication', 'transcription unit', 'lac operon', 'pedigree analysis', 'genetic code', 'direction selection'],
    supporting: ['genetics', 'evolution', 'mendel', 'gene', 'chromosome', 'mutation', 'translation']
  },
  bio_human_welfare: {
    strong: ['humoral immunity', 'active immunity', 'antibody structure', 'interferons', 'plasmodium life cycle', 'retrovirus replication'],
    supporting: ['disease', 'immunity', 'antibody', 'pathogen', 'vaccine']
  },
  bio_biotech: {
    strong: ['restriction endonuclease', 'pcr cycle', 'dna ligase', 'bt cotton', 'elisa technique', 'gene therapy', 'ti plasmid'],
    supporting: ['biotechnology', 'restriction enzyme', 'cloning', 'plasmid']
  },
  bio_ecology: {
    strong: ['carrying capacity', 'ecological succession', 'niche overlap', 'logistic growth', 'competitive exclusion', 'pyramid of biomass', 'mutualism'],
    supporting: ['ecology', 'ecosystem', 'biodiversity', 'population', 'niche']
  },

  // === MATHEMATICS ===
  math_sets: {
    strong: ['equivalence relation', 'one-to-one function', 'onto function', 'domain of function', 'composite function', 'symmetric relation', 'reflexive relation'],
    supporting: ['set', 'relation', 'function', 'subset', 'union', 'intersection']
  },
  math_perm_comb: {
    strong: ['number of circular permutations', 'binomial coefficient', 'general term in binomial expansion', 'multinomial theorem', 'derangement'],
    supporting: ['permutation', 'combination', 'binomial', 'coefficient', 'factorial']
  },
  math_complex: {
    strong: ['de moivre\'s theorem', 'roots of unity', 'complex conjugate', 'argand plane', 'triangle inequality in complex', 'quadratic equation roots'],
    supporting: ['complex number', 'quadratic', 'inequality', 'modulus', 'argument']
  },
  math_trig: {
    strong: ['general solution of trigonometric', 'inverse trigonometric', 'domain of arcsin', 'principal value branch', 'heights and distances'],
    supporting: ['trigonometry', 'sin', 'cos', 'tan', 'theta', 'arcsin', 'arccos', 'arctan']
  },
  math_matrices: {
    strong: ['orthogonal matrix', 'skew-symmetric matrix', 'adjoint of matrix', 'cramer\'s rule', 'characteristic equation', 'rank of matrix'],
    supporting: ['matrix', 'determinant', 'transpose', 'eigenvalue', 'eigenvector']
  },
  math_straight_lines: {
    strong: ['orthogonal trajectory', 'eccentricity of hyperbola', 'latus rectum', 'tangent to parabola', 'director circle', 'shortest distance between lines'],
    supporting: ['straight line', 'slope', 'circle', 'parabola', 'ellipse', 'hyperbola', 'coordinate']
  },
  math_seq_series: {
    strong: ['sum of arithmetico-geometric', 'harmonic progression', 'infinite geometric series', 'sum of squares of first', 'telescoping series'],
    supporting: ['sequence', 'series', 'gp', 'ap', 'hp', 'progression']
  },
  math_3d_geo: {
    strong: ['angle between planes', 'coplanar lines', 'direction cosines', 'skew lines distance', 'foot of perpendicular'],
    supporting: ['three dimensional', 'plane', 'line in space', 'direction ratios']
  },
  math_limits_deriv: {
    strong: ['l\'hopital\'s rule', 'sandwich theorem', 'limits at infinity', 'derivative of composite', 'first principles'],
    supporting: ['limit', 'continuity', 'derivative', 'differentiability', 'tangent']
  },
  math_stats: {
    strong: ['coefficient of variation', 'variance of first n', 'mean deviation about median', 'grouped data variance'],
    supporting: ['mean', 'median', 'mode', 'variance', 'standard deviation']
  },
  math_prob: {
    strong: ['bayes\' theorem', 'conditional probability', 'binomial distribution probability', 'total probability theorem', 'independent events'],
    supporting: ['probability', 'conditional', 'bayes', 'independent']
  },
  math_limits: {
    strong: ['continuity in interval', 'differentiability of absolute', 'mean value theorem', 'rolle\'s theorem'],
    supporting: ['limit', 'continuity', 'differentiable']
  },
  math_diff: {
    strong: ['maxima and minima', 'point of inflection', 'angle of intersection of curves', 'local extremum', 'increasing and decreasing'],
    supporting: ['differentiation', 'derivative', 'tangent', 'normal']
  },
  math_integ_basics: {
    strong: ['integration by parts', 'definite integral as limit of sum', 'leibniz rule', 'reduction formula', 'definite integral properties'],
    supporting: ['integral', 'integration', 'area under', 'definite integral', 'substitution']
  },
  math_integ: {
    strong: ['area bounded by curves', 'length of curve', 'volume of solid of revolution'],
    supporting: ['integral', 'integration', 'area']
  },
  math_diff_eq: {
    strong: ['integrating factor', 'homogeneous differential equation', 'linear differential equation of first', 'separable variables'],
    supporting: ['differential equation', 'homogeneous', 'separable']
  },
  math_vec: {
    strong: ['scalar triple product', 'vector triple product', 'projection of vector', 'coplanar vectors', 'reciprocal system of vectors'],
    supporting: ['vector', 'dot product', 'cross product', 'scalar triple']
  }
};

const confidenceStats = {
  EXACT: 0,
  HIGH_CONFIDENCE: 0,
  NEEDS_REVIEW: 0,
  UNMAPPED: 0,
  MANUAL_REVIEW: 0
};

const subjectCoverage = {
  Physics: { total: 0, chMapped: 0, chUnmapped: 0, topMapped: 0, topUnmapped: 0, EXACT: 0, HIGH_CONFIDENCE: 0, NEEDS_REVIEW: 0, UNMAPPED: 0, MANUAL_REVIEW: 0 },
  Chemistry: { total: 0, chMapped: 0, chUnmapped: 0, topMapped: 0, topUnmapped: 0, EXACT: 0, HIGH_CONFIDENCE: 0, NEEDS_REVIEW: 0, UNMAPPED: 0, MANUAL_REVIEW: 0 },
  Biology: { total: 0, chMapped: 0, chUnmapped: 0, topMapped: 0, topUnmapped: 0, EXACT: 0, HIGH_CONFIDENCE: 0, NEEDS_REVIEW: 0, UNMAPPED: 0, MANUAL_REVIEW: 0 },
  Mathematics: { total: 0, chMapped: 0, chUnmapped: 0, topMapped: 0, topUnmapped: 0, EXACT: 0, HIGH_CONFIDENCE: 0, NEEDS_REVIEW: 0, UNMAPPED: 0, MANUAL_REVIEW: 0 }
};

const mappingReport = [];
const acceptedAudit = [];
const allBackendQuestions = [];

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasWordMatch(text, keyword) {
  const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'i');
  return regex.test(text);
}

files.forEach(file => {
  const filePath = path.join(pyqDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const year = parseInt(file.replace(/[^0-9]/g, ''), 10);
  const exam = "IAT";

  const migratedQuestions = [];

  data.questions.forEach((q, idx) => {
    const qId = `${exam.toLowerCase()}-${year}-${(idx + 1).toString().padStart(3, '0')}`;
    const subject = q.subject;
    const subjectId = subject.toLowerCase();

    subjectCoverage[subject].total++;

    const searchArea = `${q.question} ${q.explanation} ${q.options.join(' ')}`.toLowerCase();

    let finalChapterId = null;
    let finalTopicId = null;
    let confidence = 'UNMAPPED';
    let reason = "No strong matches found.";
    let sourceUsed = "Classifier";

    // Priority 1: Check permanent reviewed mappings registry
    if (reviewed[qId] && reviewed[qId].chapterId) {
      finalChapterId = reviewed[qId].chapterId;
      finalTopicId = reviewed[qId].topicId;
      confidence = reviewed[qId].reviewStatus === "VERIFIED" ? "HIGH_CONFIDENCE" : "EXACT";
      reason = reviewed[qId].reason;
      sourceUsed = "ReviewedRegistry";
    } 
    // Priority 2: Check manual overrides
    else if (overrides[qId]) {
      finalChapterId = overrides[qId].chapterId;
      finalTopicId = overrides[qId].topicId;
      confidence = "HIGH_CONFIDENCE";
      reason = "Manual override Applied.";
      sourceUsed = "ManualOverride";
    } 
    // Priority 3 & 4: Run deterministic classifier fallbacks
    else {
      let scores = {};
      Object.keys(chapterSignatures).forEach(chId => {
        const chSubj = catalog[chId]?.subject;
        if (chSubj && chSubj.toLowerCase() === subjectId) {
          let score = 0;
          const matchedStrong = [];
          const matchedSupporting = [];
          let excluded = false;

          const sig = chapterSignatures[chId];
          if (sig.exclusions) {
            sig.exclusions.forEach(ex => {
              if (hasWordMatch(searchArea, ex)) excluded = true;
            });
          }

          if (excluded) {
            scores[chId] = { score: -100 };
            return;
          }

          sig.strong.forEach(term => {
            if (hasWordMatch(searchArea, term)) {
              score += 5;
              matchedStrong.push(term);
            }
          });

          sig.supporting.forEach(term => {
            if (hasWordMatch(searchArea, term)) {
              score += 2;
              matchedSupporting.push(term);
            }
          });

          if (hasWordMatch(searchArea, catalog[chId].chapterTitle)) {
            score += 10;
          }

          catalog[chId].topicIds.forEach(tId => {
            const tTitle = tId.replace(/-/g, ' ');
            if (hasWordMatch(searchArea, tTitle)) {
              score += 8;
            }
          });

          if (score > 0) {
            scores[chId] = { score, matchedStrong, matchedSupporting };
          }
        }
      });

      const sorted = Object.entries(scores).sort((a, b) => b[1].score - a[1].score);

      if (sorted.length > 0) {
        const highestScore = sorted[0][1].score;
        const highestChId = sorted[0][0];
        const runnerUpScore = sorted.length > 1 ? sorted[1][1].score : 0;
        const margin = highestScore - runnerUpScore;

        if (highestScore >= 12 && margin >= 6) {
          finalChapterId = highestChId;
          confidence = 'EXACT';
          reason = `EXACT match (Score ${highestScore}, Margin ${margin}).`;
        } else if (highestScore >= 5 && margin >= 4) {
          finalChapterId = highestChId;
          confidence = 'HIGH_CONFIDENCE';
          reason = `HIGH_CONFIDENCE match (Score ${highestScore}, Margin ${margin}).`;
        } else if (highestScore > 0) {
          confidence = 'NEEDS_REVIEW';
          reason = `NEEDS_REVIEW: Ambiguous match with score ${highestScore}.`;
        }
      }

      if (finalChapterId) {
        const topicIds = catalog[finalChapterId]?.topicIds || [];
        for (const tId of topicIds) {
          const cleanTId = tId.replace(/-/g, ' ');
          if (hasWordMatch(searchArea, cleanTId)) {
            finalTopicId = tId;
            break;
          }
        }
      }
    }

    // Set topic to null if not in list
    if (finalChapterId && finalTopicId) {
      const validTopics = catalog[finalChapterId]?.topicIds || [];
      if (!validTopics.includes(finalTopicId)) {
        finalTopicId = null;
      }
    }

    // If still null, generate reasons
    if (!finalChapterId) {
      confidence = reviewed[qId]?.reviewStatus || 'UNMAPPED';
      reason = reviewed[qId]?.reason || "Unmapped: interdisciplinary question.";
    }

    const finalChapterTitle = catalog[finalChapterId]?.chapterTitle || null;
    const finalTopicTitle = finalTopicId ? finalTopicId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : null;

    confidenceStats[confidence]++;
    subjectCoverage[subject][confidence]++;

    if (finalChapterId) {
      subjectCoverage[subject].chMapped++;
    } else {
      subjectCoverage[subject].chUnmapped++;
    }

    if (finalTopicId) {
      subjectCoverage[subject].topMapped++;
    } else {
      subjectCoverage[subject].topUnmapped++;
    }

    const questionObj = {
      id: qId,
      exam,
      year,
      subject,
      subjectId,
      section: q.section,
      chapterId: finalChapterId,
      chapterTitle: finalChapterTitle,
      topicId: finalTopicId,
      topicTitle: finalTopicTitle,
      question: q.question,
      options: q.options,
      correct: parseInt(q.correct, 10),
      explanation: q.explanation || null,
      difficulty: q.difficulty || "Medium",
      imagePrompt: q.imagePrompt || null
    };

    migratedQuestions.push(questionObj);
    allBackendQuestions.push(questionObj);

    mappingReport.push({
      questionId: qId,
      year,
      subject,
      questionPreview: q.question.substring(0, 80) + '...',
      proposedChapterId: finalChapterId,
      proposedChapterTitle: finalChapterTitle,
      proposedTopicId: finalTopicId,
      proposedTopicTitle: finalTopicTitle,
      confidenceLevel: confidence,
      matchedKeywords: [sourceUsed],
      mappingReason: reason
    });

    if (confidence === 'EXACT' || confidence === 'HIGH_CONFIDENCE') {
      acceptedAudit.push({
        questionId: qId,
        questionPreview: q.question.substring(0, 80) + '...',
        subject,
        assignedChapter: finalChapterId,
        assignedTopic: finalTopicId,
        confidence,
        score: sourceUsed === 'ReviewedRegistry' ? 99 : 0,
        runnerUpChapter: null,
        runnerUpScore: 0,
        confidenceMargin: 99,
        strongTerms: [sourceUsed],
        supportingTerms: [],
        mappingReason: reason
      });
    }
  });

  // Write migrated file for staging verification
  fs.writeFileSync(
    path.join(migratedDir, file),
    JSON.stringify({
      testId: data.testId,
      duration: data.duration,
      totalMarks: data.totalMarks,
      questions: migratedQuestions
    }, null, 4)
  );
});

// Save reports
fs.writeFileSync(reportPath, JSON.stringify(mappingReport, null, 4));
fs.writeFileSync(auditPath, JSON.stringify(acceptedAudit, null, 4));
fs.writeFileSync(
  path.join(__dirname, './output/pyq-subject-coverage.json'),
  JSON.stringify(subjectCoverage, null, 4)
);

// Secure backend write - compile all 420 questions directly into backend Questions database
fs.writeFileSync(backendPyqPath, JSON.stringify(allBackendQuestions, null, 4));

console.log("Migration and database updates completed successfully!");
console.log(`Backend questions database updated: ${allBackendQuestions.length} records written to ${backendPyqPath}`);
console.log(`Confidence distribution:`, confidenceStats);
