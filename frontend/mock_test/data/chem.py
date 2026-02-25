chemistry_questions = [
    {
        "id": 16,
        "subject": "Chemistry",
        "topic": "Atomic Structure",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": False,
        "image_prompt": "",
        "question": "The orbital having $n = 3, l = 2, m_l = -2$: ",
        "options": {
            "A": "is spherically symmetrical",
            "B": "has two radial nodes",
            "C": "has two angular nodes",
            "D": "is an f-orbital"
        },
        "answer": "C",
        "solution": "1. The quantum numbers are $n=3$, $l=2$. The subshell is $3d$.\n2. $d$-orbitals have $l=2$, so they have exactly 2 angular nodes.\n3. The number of radial nodes $= n - l - 1 = 3 - 2 - 1 = 0$.\n4. Therefore, it has two angular nodes."
    },
    {
        "id": 17,
        "subject": "Chemistry",
        "topic": "Chemical Bonding",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": True,
        "image_prompt": "Molecular orbital energy level diagram of O2 molecule showing filling of electrons from 1s to pi*(2p) orbitals. Arrows representing spin-up and spin-down electrons. Clean diagram.",
        "question": "According to Molecular Orbital Theory, which of the following species has the highest bond order and is diamagnetic?",
        "options": {
            "A": "$\\text{O}_2^+$",
            "B": "$\\text{N}_2^+$",
            "C": "$\\text{CO}$",
            "D": "$\\text{NO}$"
        },
        "answer": "C",
        "solution": "1. O2+ (15e-): Bond order = 2.5, Paramagnetic (1 unpaired electron in $\\pi^*$)\n2. N2+ (13e-): Bond order = 2.5, Paramagnetic (1 unpaired electron in $\\sigma_{2p_z}$ or $\\pi_{2p}$)\n3. CO (14e-): Isoelectronic with N2, Bond order = 3.0, Diamagnetic (all electrons paired)\n4. NO (15e-): Bond order = 2.5, Paramagnetic (1 unpaired electron in $\\pi^*$)\n5. Therefore, CO has the highest bond order and is diamagnetic."
    },
    {
        "id": 18,
        "subject": "Chemistry",
        "topic": "Thermodynamics",
        "difficulty": "Hard",
        "time_minutes": 4,
        "image_based": False,
        "image_prompt": "",
        "question": "Consider the reaction: $2\\text{NO}_2(g) \\rightleftharpoons \\text{N}_2\\text{O}_4(g)$. If $\\Delta H^{\\circ} = -57.2$ kJ/mol and $\\Delta S^{\\circ} = -175.8$ J/(K\\cdot mol), at what temperature does the reaction become spontaneous at standard state?",
        "options": {
            "A": "T > 325.4 K",
            "B": "T < 325.4 K",
            "C": "T > 273.15 K",
            "D": "T < 298 K"
        },
        "answer": "B",
        "solution": "1. For a process to be spontaneous, $\\Delta G^{\\circ} < 0$.\n2. $\\Delta G^{\\circ} = \\Delta H^{\\circ} - T\\Delta S^{\\circ}$.\n3. Setting $\\Delta G^{\\circ} = 0$: $T = \\frac{\\Delta H^{\\circ}}{\\Delta S^{\\circ}} = \\frac{-57.2 \\times 1000}{-175.8} \\approx 325.37$ K.\n4. Since both $\\Delta H^{\\circ}$ and $\\Delta S^{\\circ}$ are negative, the reaction is spontaneous only below this transition temperature.\n5. Therefore, the reaction is spontaneous for T < 325.4 K."
    },
    {
        "id": 19,
        "subject": "Chemistry",
        "topic": "Equilibrium",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "A buffer solution contains $0.1$ M of a weak acid HA and $0.05$ M of its salt NaA. If the $K_a$ of the acid is $2.0 \\times 10^{-5}$, the pH of the buffer is roughly: (Given $\\log 2 = 0.3$)",
        "options": {
            "A": "4.4",
            "B": "4.7",
            "C": "5.0",
            "D": "5.3"
        },
        "answer": "A",
        "solution": "1. The Henderson-Hasselbalch equation: pH = p$K_a$ + $\\log \\frac{[A^-]}{[HA]}$.\n2. $K_a = 2.0 \\times 10^{-5}$, so p$K_a = 5 - \\log 2 = 5 - 0.3 = 4.7$.\n3. $[A^-] = 0.05$ M, $[HA] = 0.1$ M.\n4. pH = $4.7 + \\log(0.05 / 0.1) = 4.7 + \\log(0.5) = 4.7 - 0.3 = 4.4$."
    },
    {
        "id": 20,
        "subject": "Chemistry",
        "topic": "Electrochemistry",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": True,
        "image_prompt": "Electrolytic cell with a lead storage battery during charging phase. Anodes and cathodes made of Pb and PbO2, immersed in dilute H2SO4 solution. Current direction and ion movements mapped.",
        "question": "During the charging of a lead-storage cell, which of the following statements is strictly correct?",
        "options": {
            "A": "PbSO4 is formed at the anode.",
            "B": "The $pH$ of the electrolyte increases.",
            "C": "The concentration of $H_2SO_4$ in the electrolyte increases.",
            "D": "Pb is deposited at the positive electrode (anode)."
        },
        "answer": "C",
        "solution": "1. During discharging, $Pb + PbO_2 + 2H_2SO_4 \\rightarrow 2PbSO_4 + 2H_2O$. This consumes $H_2SO_4$ and decreases density/increases pH.\n2. During charging, the reverse reaction occurs: $2PbSO_4 + 2H_2O \\rightarrow Pb + PbO_2 + 2H_2SO_4$.\n3. Therefore, $H_2SO_4$ is generated, its concentration increases, and the pH of the solution decreases.\n4. Solid Pb is deposited at the negative electrode (cathode) and PbO2 at the positive electrode (anode)."
    },
    {
        "id": 21,
        "subject": "Chemistry",
        "topic": "Chemical Kinetics",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "For a first order reaction $A \\rightarrow P$, the half-life is $10$ minutes. What fraction of the initial reactant A will remain unreacted after $33.22$ minutes? (Take $\\log 2 \\approx 0.301$)",
        "options": {
            "A": "$\\frac{1}{8}$",
            "B": "$\\frac{1}{10}$",
            "C": "$\\frac{1}{16}$",
            "D": "$\\frac{1}{6}$"
        },
        "answer": "B",
        "solution": "1. The number of half-lives is $n = \\frac{t}{t_{1/2}} = \\frac{33.22}{10} = 3.322$.\n2. The fraction remaining is $f = (\\frac{1}{2})^n = 2^{-3.322}$.\n3. Let $x = 2^{-3.322}$, so $\\log_{10} x = -3.322 \\times \\log_{10} 2 = -3.322 \\times 0.301 \\approx -1.0$.\n4. Therefore, $x = 10^{-1} = 0.1 = \\frac{1}{10}$."
    },
    {
        "id": 22,
        "subject": "Chemistry",
        "topic": "Coordination Compounds",
        "difficulty": "Hard",
        "time_minutes": 4,
        "image_based": True,
        "image_prompt": "Crystal field splitting diagram for an octahedral complex. Shows 5 degenerate d orbitals splitting into lower set of 3 (t2g) and upper set of 2 (eg). Let Delta_o be greater than pairing energy P. Arrows represent electron pairing.",
        "question": "For the complex ion $[Co(NH_3)_6]^{3+}$, what is the Crystal Field Stabilization Energy (CFSE) in terms of $\\Delta_o$ and pairing energy P? (Given NH3 is a strong field ligand for Co3+)",
        "options": {
            "A": "$-0.4\\Delta_o + P$",
            "B": "$-1.2\\Delta_o + 2P$",
            "C": "$-2.4\\Delta_o + 3P$",
            "D": "$-2.4\\Delta_o + 2P$"
        },
        "answer": "D",
        "solution": "1. The ion is $Co^{3+}$. Co is [Ar] 4s2 3d7, so Co3+ is [Ar] 3d6.\n2. In a strong field ligand like NH3, $\\Delta_o > P$, making it a low-spin string complex.\n3. The 6 electrons will occupy the lower $t_{2g}$ level, so the configuration is $t_{2g}^6 e_g^0$.\n4. CFSE = $(6 \\times -0.4)\\Delta_o = -2.4\\Delta_o$.\n5. Normally, an isolated gaseous $d^6$ ion would have 1 pair of electrons. In the complex, there are 3 pairs. The EXTRA pairing energy is $3P - 1P = 2P$.\n6. Therefore, the total CFSE is $-2.4\\Delta_o + 2P$."
    },
    {
        "id": 23,
        "subject": "Chemistry",
        "topic": "Organic Chemistry - Basic Principles",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": False,
        "image_prompt": "",
        "question": "Which of the following carbocations is the most stable?",
        "options": {
            "A": "Allyl carbocation ($CH_2=CH-CH_2^+$)",
            "B": "Benzyl carbocation ($C_6H_5-CH_2^+$)",
            "C": "Tert-butyl carbocation ($(CH_3)_3C^+$)",
            "D": "Tropylium cation ($C_7H_7^+$)"
        },
        "answer": "D",
        "solution": "1. The tropylium cation ($C_7H_7^+$) is a seven-membered planar ring with 6 $\\pi$ electrons.\n2. It perfectly satisfies Hückel's rule (4n+2 $\\pi$ electrons where n=1), making it an aromatic compound.\n3. The stability derived from aromaticity far exceeds resonance stability in benzyl/allyl or hyperconjugation in tert-butyl.\n4. Therefore, Tropylium cation is the most stable."
    },
    {
        "id": 24,
        "subject": "Chemistry",
        "topic": "Hydrocarbons",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "An alkyne $C_6H_{10}$ strictly yields only one product upon ozonolysis followed by hydrolysis with water. What is the structure of the alkyne?",
        "options": {
            "A": "1-Hexyne",
            "B": "2-Hexyne",
            "C": "3-Hexyne",
            "D": "3-Methyl-1-pentyne"
        },
        "answer": "C",
        "solution": "1. Ozonolysis of an alkyne followed by hydrolysis yields carboxylic acids. The triple bond is cleaved completely.\n2. If it yields strictly ONE product, the alkyne must be symmetric to produce two identical molecules of carboxylic acid.\n3. $C_6H_{10}$ must be symmetrical about its triple bond: $CH_3-CH_2-C\\equiv C-CH_2-CH_3$.\n4. This matches 3-Hexyne.\n5. Ozonolysis of 3-Hexyne gives 2 moles of Propanoic acid ($CH_3CH_2COOH$)."
    },
    {
        "id": 25,
        "subject": "Chemistry",
        "topic": "Passage 2 - Organic Reaction Mechanisms",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": True,
        "image_prompt": "Chemical reaction scheme. Alkyl halide R-X reacting with an alcoholic KOH solution. Arrow representing elimination leading to an alkene. Below it, R-X reacting with aqueous KOH leading to an alcohol R-OH.",
        "question": "**Passage Question 1:** The reaction of 2-bromo-2-methylbutane with sodium methoxide ($CH_3ONa$) in methanol predominantly yields:",
        "options": {
            "A": "2-Methoxy-2-methylbutane via SN1",
            "B": "2-Methoxy-2-methylbutane via SN2",
            "C": "2-Methyl-2-butene via E2",
            "D": "2-Methyl-1-butene via E2"
        },
        "answer": "C",
        "solution": "1. Sodium methoxide ($CH_3ONa$) is a strong base and a strong nucleophile.\n2. The substrate is a tertiary alkyl halide (2-bromo-2-methylbutane).\n3. Strong base + tertiary substrate favors the E2 elimination mechanism over substitution.\n4. The expected product will be an alkene. According to Zaitsev's rule, the more substituted alkene is the major product.\n5. Between 2-methyl-1-butene and 2-methyl-2-butene, the latter is tri-substituted and more stable.\n6. Therefore, 2-Methyl-2-butene via E2 is the answer."
    },
    {
        "id": 26,
        "subject": "Chemistry",
        "topic": "Passage 2 - Organic Reaction Mechanisms",
        "difficulty": "Hard",
        "time_minutes": 4,
        "image_based": False,
        "image_prompt": "",
        "question": "**Passage Question 2:** continuing from Passage 2. If the same substrate, 2-bromo-2-methylbutane, is treated with $CH_3OH$ (no alkoxide added) and gently heated, what accurately describes the mechanism and major product?",
        "options": {
            "A": "Major product is alkene, E1 mechanism.",
            "B": "Major product is ether, SN1 mechanism.",
            "C": "Major product is alkene, E2 mechanism.",
            "D": "Mixture of ether (SN2) and alkene (E2)."
        },
        "answer": "B",
        "solution": "1. Using $CH_3OH$ (a weak base and weak nucleophile) encourages first-order solvolysis (SN1 and E1) mechanisms through a carbocation intermediate.\n2. A tertiary carbocation is reasonably stable, thus it readily forms.\n3. Typically, in solvolysis without strong heating, the substitution product (SN1) dominates over the elimination product (E1).\n4. However, heating favors elimination. Usually, gentle heating still gives a large proportion of ether (majorly SN1) unless strongly heated. Let's look exactly at standard IUPAC/Solvolysis texts: Solvolysis of tertiary halides mainly gives substitution products at moderate temperatures, but heating heavily increases E1. The classic outcome of merely \"heating\" a tertiary halide in methanol is a mixture where SN1 > E1 unless $> 50-60^{\\circ}$C. Actually, the consensus in most textbooks is that solvolysis (neutral conditions) at room temperature/gentle heat gives mainly the SN1 product.\n5. So the major product is the ether, formed via an SN1 mechanism."
    },
    {
        "id": 27,
        "subject": "Chemistry",
        "topic": "Alcohols, Phenols and Ethers",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "Which of the following compounds will give a positive iodoform test?",
        "options": {
            "A": "1-Propanol",
            "B": "3-Pentanone",
            "C": "Isopropyl alcohol (2-Propanol)",
            "D": "Methanol"
        },
        "answer": "C",
        "solution": "1. The iodoform test is highly specific for compounds containing a methyl ketone group ($CH_3-CO-$) or a secondary alcohol group with a methyl at the alpha position ($CH_3-CH(OH)-$ ).\n2. 1-Propanol is $CH_3-CH_2-CH_2-OH$ (Negative).\n3. 3-Pentanone is $CH_3-CH_2-CO-CH_2-CH_3$ (Negative, no alpha methyl).\n4. Isopropyl alcohol is $CH_3-CH(OH)-CH_3$. It has the requisite $CH_3-CH(OH)-$ group. It oxidizes to acetone in situ, which gives a positive test.\n5. Methanol is $CH_3OH$ (Negative)."
    },
    {
        "id": 28,
        "subject": "Chemistry",
        "topic": "Biomolecules",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": False,
        "image_prompt": "",
        "question": "Which of the following amino acids contains a secondary amino group?",
        "options": {
            "A": "Lysine",
            "B": "Tryptophan",
            "C": "Proline",
            "D": "Histidine"
        },
        "answer": "C",
        "solution": "1. Most of the standard amino acids are primary amines.\n2. Proline has its $\\alpha$-amino nitrogen covalently bound into a five-membered pyrrolidine ring.\n3. This makes the amino group a secondary amine (strictly speaking, it's an imino acid).\n4. Therefore, Proline is the correct answer."
    },
    {
        "id": 29,
        "subject": "Chemistry",
        "topic": "Chemical Kinetics",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": True,
        "image_prompt": "A graph plotting generic concentration on the y-axis versus time on the x-axis. A clear linear relationship is shown with a negative slope, depicting [Reactant] vs time. White background, black lines, labels A and t.",
        "question": "A plot of Reactant Concentration [A] versus time $t$ yields a straight line with a negative slope. The order of the reaction is:",
        "options": {
            "A": "Zero order",
            "B": "First order",
            "C": "Second order",
            "D": "Fractional order"
        },
        "answer": "A",
        "solution": "1. For a Zero order reaction, the integrated rate law is $[A]_t = [A]_0 - kt$.\n2. This is an equation of a straight line $y = mx + c$, where $y = [A]_t$, $x = t$, and the slope $m = -k$.\n3. A first order reaction would have a linear plot for $\\ln[A]$ vs $t$.\n4. A second order reaction would have a linear plot for $1/[A]$ vs $t$.\n5. Therefore, the reaction is zero order."
    },
    {
        "id": 30,
        "subject": "Chemistry",
        "topic": "Qualitative Analysis",
        "difficulty": "Hard",
        "time_minutes": 5,
        "image_based": False,
        "image_prompt": "",
        "question": "A metal salt (X) on heating with solid $K_2Cr_2O_7$ and concentrated $H_2SO_4$ produces deep red vapors (Y). The vapors (Y) when passed into NaOH solution give a yellow solution (Z). The yellow solution (Z) gives a yellow precipitate with lead acetate solution. The salt (X) contains which anion?",
        "options": {
            "A": "$Br^-$",
            "B": "$NO_3^-$",
            "C": "$Cl^-$",
            "D": "$I^-$"
        },
        "answer": "C",
        "solution": "1. This sequence is precisely the Chromyl Chloride Test.\n2. Heating a chloride salt with solid Potassium Dichromate and conc. Sulfuric Acid produces deep red vapors of chromyl chloride ($CrO_2Cl_2$).\n3. Therefore, X represents a salt containing the chloride ion $Cl^-$.\n4. Passing chromyl chloride gas into NaOH solution hydrolyzes it to sodium chromate ($Na_2CrO_4$), which is a yellow solution (Z).\n5. Reacting sodium chromate with lead acetate produces a yellow precipitate of lead chromate ($PbCrO_4$).\n6. The test is specific for chloride ions."
    }
]
