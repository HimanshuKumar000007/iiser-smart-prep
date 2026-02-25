bio_questions = [
    {
        "id": 46,
        "subject": "Biology",
        "topic": "Genetics and Evolution",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": True,
        "image_prompt": "A pedigree chart showing an autosomal recessive trait. Affected individuals are shaded. Circles for females, squares for males. Generation I has normal parents (heterozygous carriers) producing an affected daughter and normal son. Generation II and III show further inheritance.",
        "question": "Based on the given pedigree chart showing the inheritance of a certain human disease, which of the following modes of inheritance is most likely?",
        "options": {
            "A": "Autosomal Dominant",
            "B": "Autosomal Recessive",
            "C": "X-linked Dominant",
            "D": "X-linked Recessive"
        },
        "answer": "B",
        "solution": "1. Two unaffected parents in Generation I produce an affected daughter.\n2. This immediately rules out any dominant inheritance (Autosomal or X-linked), because for a dominant trait, at least one parent must be affected.\n3. It also rules out X-linked recessive inheritance because an affected daughter must inherit an affected X chromosome from her father, meaning the father would have to be affected.\n4. Therefore, the trait must be autosomal recessive, where both normal parents are heterozygous carriers (Aa x Aa -> aa daughter)."
    },
    {
        "id": 47,
        "subject": "Biology",
        "topic": "Cell Biology",
        "difficulty": "Hard",
        "time_minutes": 4,
        "image_based": False,
        "image_prompt": "",
        "question": "A researcher isolates a mutant strain of mammalian cells that lacks functional cyclins required for the G1 to S phase transition. Which of the following consequences is most likely to be observed?",
        "options": {
            "A": "Cells will arrest indefinitely in the G2 phase.",
            "B": "Cells will undergo premature chromosome condensation.",
            "C": "Retinoblastoma (Rb) protein will remain unphosphorylated, halting DNA replication.",
            "D": "Maturation Promoting Factor (MPF) activity will be constitutively high."
        },
        "answer": "C",
        "solution": "1. The $G1 \\rightarrow S$ transition is driven by G1/S cyclins (like Cyclin E) complexing with CDKs.\n2. A primary target of these Cyclin-CDK complexes is the Retinoblastoma (Rb) protein.\n3. When unphosphorylated, Rb binds to E2F transcription factors, inhibiting the transcription of genes required for DNA synthesis (S phase).\n4. Cyclin-CDK complexes phosphorylate Rb, causing it to release E2F, allowing the cell to enter S phase.\n5. Without functional G1/S cyclins, Rb remains unphosphorylated and bound to E2F. The cells cannot enter S phase and arrest in G1."
    },
    {
        "id": 48,
        "subject": "Biology",
        "topic": "Human Physiology - Neural Control",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": True,
        "image_prompt": "Diagram of a synapse showing the pre-synaptic membrane, synaptic cleft, and post-synaptic membrane. Vesicles containing neurotransmitters are fusing with the pre-synaptic membrane. Receptors are shown on the post-synaptic side.",
        "question": "During synaptic transmission at a chemical synapse, the influx of which ion into the presynaptic terminal directly triggers the exocytosis of neurotransmitter vesicles?",
        "options": {
            "A": "$Na^+$",
            "B": "$K^+$",
            "C": "$Ca^{2+}$",
            "D": "$Cl^-$"
        },
        "answer": "C",
        "solution": "1. When an action potential reaches the axon terminal, it depolarizes the presynaptic membrane.\n2. This depolarization opens voltage-gated Calcium ($Ca^{2+}$) channels.\n3. Given the steep concentration gradient, $Ca^{2+}$ rushes into the terminal.\n4. The rise in intracellular $Ca^{2+}$ concentration directly causes synaptic vesicles to fuse with the presynaptic membrane and release their neurotransmitters via exocytosis."
    },
    {
        "id": 49,
        "subject": "Biology",
        "topic": "Plant Physiology - Photosynthesis",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "In the $C_4$ pathway of photosynthesis, the primary $CO_2$ acceptor in mesophyll cells is:",
        "options": {
            "A": "Ribulose bisphosphate (RuBP)",
            "B": "Phosphoenolpyruvate (PEP)",
            "C": "Oxaloacetic acid (OAA)",
            "D": "Malic acid"
        },
        "answer": "B",
        "solution": "1. In $C_4$ plants, the initial fixation of $CO_2$ occurs in the mesophyll cells.\n2. The primary $CO_2$ acceptor is a 3-carbon molecule, Phosphoenolpyruvate (PEP).\n3. The enzyme involved is PEP carboxylase (PEPcase).\n4. This reaction forms the 4-carbon acid Oxaloacetic acid (OAA), which is the first stable product, not the acceptor."
    },
    {
        "id": 50,
        "subject": "Biology",
        "topic": "Passage 4 - Molecular Basis of Inheritance",
        "difficulty": "Hard",
        "time_minutes": 4,
        "image_based": False,
        "image_prompt": "",
        "question": "**Passage Question 1:** The lac operon in *E. coli* is an inducible operon. The z gene encodes $\\beta$-galactosidase, y encodes permease, and a encodes transacetylase. The i gene is the regulatory gene. Consider a mutant bacterial cell with a non-functional repressor protein ($i^-$ mutation). What will be the expression profile of the lac operon genes in this mutant when lactose is ABSENT and glucose is PRESENT?",
        "options": {
            "A": "Completely completely repressed (No expression)",
            "B": "Constitutively expressed at maximum high levels",
            "C": "Expressed at basal (low) levels",
            "D": "Only the z gene is expressed"
        },
        "answer": "C",
        "solution": "1. The $i$ gene codes for the repressor. A non-functional repressor ($i^-$) cannot bind to the operator. This removes the negative control, meaning the operon is constitutively \"on\".\n2. However, the lac operon is also subject to positive control by CAP (Catabolite Activator Protein).\n3. When glucose is present, cAMP levels are low. CAP cannot bind to the promoter efficiently without cAMP.\n4. Without the CAP-cAMP complex bound, RNA polymerase has a low affinity for the promoter.\n5. Therefore, even though the repressor is absent, transcription occurs only at a low (basal) level due to the presence of glucose (catabolite repression)."
    },
    {
        "id": 51,
        "subject": "Biology",
        "topic": "Passage 4 - Molecular Basis of Inheritance",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "**Passage Question 2:** continuing from Passage 4. If an operator-constitutive ($o^c$) mutation is introduced alongside a wild-type $i$ gene ($i^+$), what happens when lactose is absent?",
        "options": {
            "A": "Transcription is completely blocked.",
            "B": "The repressor binds permanently to the operator.",
            "C": "Transcription occurs constitutively because the repressor cannot bind the mutated operator.",
            "D": "The permease is synthesized but not the transacetylase."
        },
        "answer": "C",
        "solution": "1. An $o^c$ mutation alters the DNA sequence of the operator such that the wild-type repressor (produced by $i^+$) can no longer recognize or bind to it.\n2. Since the repressor cannot physically block RNA polymerase at the operator, the operon can no longer be repressed.\n3. Therefore, transcription of the structural genes will occur continuously (constitutively) regardless of whether lactose (the inducer) is present or absent."
    },
    {
        "id": 52,
        "subject": "Biology",
        "topic": "Ecology and Environment",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": False,
        "image_prompt": "",
        "question": "In an ecosystem, the rate of production of organic matter during photosynthesis by plants is called:",
        "options": {
            "A": "Net Primary Productivity (NPP)",
            "B": "Secondary Productivity",
            "C": "Gross Primary Productivity (GPP)",
            "D": "Ecological Efficiency"
        },
        "answer": "C",
        "solution": "1. Gross Primary Productivity (GPP) of an ecosystem is the total rate of photosynthesis, or the rate of production of organic matter by producers.\n2. Net Primary Productivity (NPP) is GPP minus respiratory losses (R).\n3. Secondary productivity is the rate of formation of new organic matter by consumers.\n4. Therefore, the total rate of production during photosynthesis is GPP."
    },
    {
        "id": 53,
        "subject": "Biology",
        "topic": "Human Physiology - Endocrine System",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "Which of the following hormones acts via a secondary messenger system like cAMP because it cannot cross the target cell membrane?",
        "options": {
            "A": "Cortisol",
            "B": "Aldosterone",
            "C": "Estrogen",
            "D": "Glucagon"
        },
        "answer": "D",
        "solution": "1. Hormones are classified chemically into steroid/lipid-soluble hormones and peptide/water-soluble hormones.\n2. Steroid hormones (Cortisol, Aldosterone, Estrogen) are lipid-soluble. They easily cross the lipophilic cell membrane and bind to intracellular receptors.\n3. Peptide/protein/amine hormones (like Glucagon, Insulin, Epinephrine) are water-soluble and cannot cross the membrane. \n4. They bind to cell surface receptors, triggering a cascade that generates secondary messengers like cyclic AMP (cAMP) inside the cell to mediate their physiological responses."
    },
    {
        "id": 54,
        "subject": "Biology",
        "topic": "Biotechnology",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": True,
        "image_prompt": "A schematic diagram of the pBR322 plasmid cloning vector. Prominent labels for the ampicillin resistance gene (ampR) and tetracycline resistance gene (tetR). BamHI and SalI restriction sites are marked within the tetR gene. PstI and PvuI sites are inside ampR. Origin of replication (ori) is clearly marked.",
        "question": "A recombinant DNA molecule is created by inserting a foreign gene into the BamHI site of the plasmid vector pBR322. The resulting recombinant *E. coli* cells will:",
        "options": {
            "A": "Be resistant to both Ampicillin and Tetracycline.",
            "B": "Be resistant to Tetracycline but sensitive to Ampicillin.",
            "C": "Be resistant to Ampicillin but sensitive to Tetracycline.",
            "D": "Be sensitive to both Ampicillin and Tetracycline."
        },
        "answer": "C",
        "solution": "1. In pBR322, the BamHI restriction site is located within the tetracycline resistance gene ($tet^R$).\n2. The ampicillin resistance gene ($amp^R$) has restriction sites for PstI and PvuI.\n3. Inserting a foreign gene into the BamHI site disrupts the $tet^R$ gene, a process known as insertional inactivation.\n4. The resulting recombinant plasmid will no longer confer resistance to tetracycline.\n5. However, the $amp^R$ gene remains intact and fully functional.\n6. Therefore, the recombinant cells will be resistant to ampicillin but sensitive to tetracycline."
    },
    {
        "id": 55,
        "subject": "Biology",
        "topic": "Plant Anatomy",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": False,
        "image_prompt": "",
        "question": "Casparian strips are critical features found in the endodermis of roots. They are primarily composed of:",
        "options": {
            "A": "Cellulose",
            "B": "Suberin",
            "C": "Pectin",
            "D": "Chitin"
        },
        "answer": "B",
        "solution": "1. The endodermis in roots acts as a biological checkpoint.\n2. Its cells have water-impermeable, waxy bands on their radial and transverse walls called Casparian strips.\n3. These strips are composed primarily of suberin.\n4. Suberin prevents water from moving through the apoplastic pathway, forcing it to enter the symplast (cytoplasm) before reaching the xylem, allowing the plant to regulate ion uptake."
    },
    {
        "id": 56,
        "subject": "Biology",
        "topic": "Evolution",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "In a population of 10,000 individuals, the frequency of an autosomal recessive disease is 1 in 10,000. Assuming the population is in Hardy-Weinberg equilibrium, approximately how many individuals in this population are carriers (heterozygotes) for the disease?",
        "options": {
            "A": "20",
            "B": "198",
            "C": "200",
            "D": "500"
        },
        "answer": "B",
        "solution": "1. Let $q^2$ be the frequency of the homozygous recessive (diseased) genotype.\n2. Given: $q^2 = 1 / 10,000 = 0.0001$.\n3. Therefore, the frequency of the recessive allele $q = \\sqrt{0.0001} = 0.01$.\n4. Since $p + q = 1$, the frequency of the dominant allele $p = 1 - 0.01 = 0.99$.\n5. The frequency of heterozygous carriers is $2pq = 2 \\times 0.99 \\times 0.01 = 0.0198$.\n6. The number of carriers in the population of 10,000 is $0.0198 \\times 10,000 = 198$."
    },
    {
        "id": 57,
        "subject": "Biology",
        "topic": "Microbiology and Immunity",
        "difficulty": "Hard",
        "time_minutes": 4,
        "image_based": True,
        "image_prompt": "A schematic showing an antibody molecule (Immunoglobulin G). It has two heavy chains and two light chains. Variable regions (Fab) are at the top, and the constant region (Fc) is at the stem. Disulfide bonds linking the chains are clearly shown.",
        "question": "An antibody molecule consists of heavy and light chains. The antigen-binding site (paratope) of an antibody is formed by:",
        "options": {
            "A": "The constant regions of one heavy and one light chain.",
            "B": "The variable regions of one heavy and one light chain.",
            "C": "The variable region of two heavy chains only.",
            "D": "The constant region of two light chains only."
        },
        "answer": "B",
        "solution": "1. An antibody molecule (Ig) is Y-shaped, consisting of two identical heavy (H) chains and two identical light (L) chains.\n2. Each chain has a variable (V) region at the amino-terminal end and a constant (C) region.\n3. The stem of the Y is composed of the constant regions of the heavy chains.\n4. The two arms of the Y (the Fab regions) bind specifically to antigens.\n5. Each antigen-binding site is formed jointly by the highly variable regions of one heavy chain ($V_H$) and one light chain ($V_L$).\n6. Therefore, the paratope is formed by the variable regions of one heavy and one light chain."
    },
    {
        "id": 58,
        "subject": "Biology",
        "topic": "Reproduction",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": False,
        "image_prompt": "",
        "question": "In human females, meiosis II is not completed until:",
        "options": {
            "A": "Puberty",
            "B": "Uterine implantation",
            "C": "Birth",
            "D": "Fertilization"
        },
        "answer": "D",
        "solution": "1. Oogenesis in females begins during fetal development, but primary oocytes arrest in Prophase I of meiosis I.\n2. At puberty, ovulation begins: the primary oocyte completes Meiosis I to form a secondary oocyte, which then arrests again at Metaphase II.\n3. The secondary oocyte is released from the ovary in this arrested state.\n4. Metaphase II is only completed if and when a sperm cell penetrates the oocyte (fertilization), resulting in the formation of the true ovum and a second polar body."
    },
    {
        "id": 59,
        "subject": "Biology",
        "topic": "Cell Cycle",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "During which stage of meiosis is the chiasmata visible, marking the sites where crossing over has occurred, while homologous chromosomes begin to separate?",
        "options": {
            "A": "Pachytene",
            "B": "Diplotene",
            "C": "Diakinesis",
            "D": "Zygotene"
        },
        "answer": "B",
        "solution": "1. Prophase I of meiosis has 5 substages: Leptotene, Zygotene, Pachytene, Diplotene, Diakinesis.\n2. Zygotene: Synapsis begins, forming the synaptonemal complex.\n3. Pachytene: Crossing over occurs between non-sister chromatids of homologous chromosomes.\n4. Diplotene: The synaptonemal complex dissolves, and homologous chromosomes begin to repel each other. They remain attached only at the sites of crossing over, forming X-shaped structures called chiasmata.\n5. Therefore, chiasmata first become visible and define the Diplotene stage."
    },
    {
        "id": 60,
        "subject": "Biology",
        "topic": "Animal Diversity",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "Which of the following character combinations is strictly unique to mammals and found in no other class of vertebrates?",
        "options": {
            "A": "Four-chambered heart and homoiothermy (warm-bloodedness).",
            "B": "Presence of hair and mammary glands.",
            "C": "Viviparity and internal fertilization.",
            "D": "Lungs for respiration and a closed circulatory system."
        },
        "answer": "B",
        "solution": "1. Four-chambered heart and homoiothermy are also shared with Class Aves (Birds).\n2. Viviparity (giving live birth) and internal fertilization are found in some fishes (e.g., sharks) and reptiles.\n3. Lungs and a closed circulatory system are common to many terrestrial vertebrates including amphibians, reptiles, and birds.\n4. However, the presence of hair (or fur) and mammary glands (to nourish young with milk) are defining, exclusive characteristics (synapomorphies) found ONLY in mammals."
    }
]
