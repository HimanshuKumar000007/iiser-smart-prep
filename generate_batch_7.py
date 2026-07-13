import json
import os

# CHAPTER 1: phy_dual_nature
phy_dual_nature = {
    "id": "phy_dual_nature",
    "averageQuestions": "1-2 questions per year",
    "whatYoullLearn": [
        "Understand different electron emission processes including thermionic, field, photoelectric, and secondary emissions.",
        "Analyze experimental observations of the photoelectric effect and how they contradict wave theory.",
        "Apply Einstein's photoelectric equation to calculate maximum kinetic energy, stopping potential, and threshold frequency.",
        "Determine photon parameters such as energy, momentum, and effective mass.",
        "Calculate de Broglie wavelengths of particles (electrons, protons, alpha particles) under various accelerating potentials.",
        "Understand the Davisson-Germer experiment and Heisenberg's uncertainty principle."
    ],
    "concepts": [
        {
            "title": "Einstein's Photoelectric Equation and Energy Conservation",
            "explanation": "When a photon of frequency $\\nu$ strikes a metal surface, its energy $h\\nu$ is used in two parts: first, to overcome the binding force of the electron (work function $\\phi_0 = h\\nu_0$), and second, to impart maximum kinetic energy $K_{\\max}$ to the emitted photoelectron. This is expressed as $h\\nu = \\phi_0 + K_{\\max}$.",
            "example": "If a light of frequency $2\\nu_0$ is incident, $K_{\\max} = 2h\\nu_0 - h\\nu_0 = h\\nu_0$. If light of frequency $3\\nu_0$ is incident, $K_{\\max} = 2h\\nu_0$.",
            "trap": "Do not confuse maximum kinetic energy of photoelectrons with the average kinetic energy. The emitted electrons have a range of kinetic energies from $0$ to $K_{\\max}$ due to internal collisions before escaping the metal."
        },
        {
            "title": "Stopping Potential and its Dependence on Frequency",
            "explanation": "The stopping potential $V_0$ is the retarding potential required to reduce the photoelectric current to zero: $e V_0 = K_{\\max} = h\\nu - \\phi_0$. A plot of stopping potential $V_0$ versus frequency $\\nu$ is a straight line with slope $h/e$ and intercept $-\\phi_0/e$ on the voltage axis.",
            "example": "If the incident light frequency is doubled, the new stopping potential is more than double the original stopping potential (since $e V'_0 = 2h\\nu - \\phi_0 = 2(eV_0 + \\phi_0) - \\phi_0 = 2eV_0 + \\phi_0$).",
            "trap": "Stopping potential depends only on the frequency (or wavelength) of the incident radiation, not on its intensity. Increasing the intensity increases the saturation current but keeps the stopping potential unchanged."
        },
        {
            "title": "de Broglie Wavelength of Charged Particles",
            "explanation": "Any moving particle has a wave associated with it. The de Broglie wavelength is $\\lambda = \\frac{h}{p} = \\frac{h}{mv}$. For a charged particle of mass $m$ and charge $q$ accelerated through a potential difference $V$, the kinetic energy is $qV$, giving $\\lambda = \\frac{h}{\\sqrt{2mqV}}$.",
            "example": "For an electron, substituting standard constants yields $\\lambda \\approx \\frac{12.27}{\\sqrt{V}}$ Å, where $V$ is in volts.",
            "trap": "When comparing different particles (e.g., electron, proton, alpha particle) accelerated through the same potential, their wavelengths scale as $\\lambda \\propto \\frac{1}{\\sqrt{m q}}$. An electron will have a much larger wavelength than a proton because it is much lighter and has the same charge magnitude."
        }
    ],
    "formulas": [
        "$E = h\\nu = \\frac{hc}{\\lambda}$ (Energy of a photon)",
        "$p = \\frac{E}{c} = \\frac{h}{\\lambda}$ (Momentum of a photon)",
        "$h\\nu = \\phi_0 + K_{\\max}$ (Einstein's Photoelectric Equation)",
        "$K_{\\max} = e V_0$ (Maximum kinetic energy and stopping potential)",
        "$V_0 = \\left(\\frac{h}{e}\\right)\\nu - \\frac{\\phi_0}{e}$ (Stopping potential vs frequency relation)",
        "$\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2m K}}$ (de Broglie wavelength)",
        "$\\lambda = \\frac{h}{\\sqrt{2mqV}}$ (de Broglie wavelength for accelerated charged particle)",
        "$\\lambda_e = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA}$ (de Broglie wavelength of an electron)",
        "$\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$ (Heisenberg's Uncertainty Principle)"
    ],
    "examTraps": [
        {
            "trap": "Intensity vs Frequency in Photoelectric Effect",
            "warning": "Doubling the intensity of light doubles the number of photons and hence doubles the photocurrent (if $\\nu > \\nu_0$), but has absolutely no effect on the maximum kinetic energy or the stopping potential of the emitted electrons."
        },
        {
            "trap": "Same Kinetic Energy vs Same Accelerating Potential",
            "warning": "If a proton and an electron have the same kinetic energy, their de Broglie wavelengths satisfy $\\lambda_e > \\lambda_p$ (since $\\lambda \\propto 1/\\sqrt{m}$). However, if they are accelerated through the same potential, their kinetic energies are the same (since charges are equal) and still $\\lambda_e > \\lambda_p$. But for a proton and an alpha particle accelerated through the same potential, the alpha particle has charge $2e$ and mass $4m$, so $mq$ is 8 times larger, making its wavelength shorter than the proton's."
        }
    ],
    "questionPattern": [
        "Determining stopping potential changes when wavelength or frequency of incident light is varied",
        "Calculating de Broglie wavelengths of particles with given kinetic energy, accelerating potential, or thermal energy ($K = \\frac{3}{2}kT$)",
        "Analyzing graphical questions of photocurrent vs collector potential and stopping potential vs frequency",
        "Using Heisenberg's uncertainty principle to estimate minimum kinetic energy of confined particles"
    ],
    "quizQuestions": [
        {
            "id": "phy_dual_nature-q1",
            "topicId": "electron-emission",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "Which of the following processes of electron emission requires heating the metal to a high temperature?",
            "options": ["Thermionic emission", "Field emission", "Photoelectric emission", "Secondary emission"],
            "correctAnswerIndex": 0,
            "explanation": "Thermionic emission is the process of electron emission from a metal surface when thermal energy is supplied to it (by heating). Field emission uses a strong electric field, photoelectric emission uses light photons, and secondary emission is caused by the bombardment of fast-moving primary electrons."
        },
        {
            "id": "phy_dual_nature-q2",
            "topicId": "stopping-potential",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "When a plot of stopping potential ($V_0$) versus frequency ($\\nu$) of incident light is drawn for a given photoelectric material, the slope of the straight line obtained is equal to:",
            "options": ["$h$", "$e$", "$h/e$", "$e/h$"],
            "correctAnswerIndex": 2,
            "explanation": "From Einstein's photoelectric equation, $e V_0 = h\\nu - \\phi_0$, which can be rearranged as $V_0 = (h/e)\\nu - \\phi_0/e$. Comparing this with the straight-line equation $y = mx + c$, the slope $m$ is $h/e$."
        },
        {
            "id": "phy_dual_nature-q3",
            "topicId": "de-broglie-wavelength",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "An electron is accelerated from rest through a potential difference of $100\\text{ V}$. What is the approximate de Broglie wavelength associated with the electron?",
            "options": ["$1.23\\text{ \\AA}$", "$12.3\\text{ \\AA}$", "$0.123\\text{ \\AA}$", "$123\\text{ \\AA}$"],
            "correctAnswerIndex": 0,
            "explanation": "The de Broglie wavelength of an electron accelerated through a potential difference of $V$ volts is given by $\\lambda_e = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA}$. For $V = 100\\text{ V}$, $\\lambda_e = \\frac{12.27}{\\sqrt{100}}\\text{ \\AA} = 1.227\\text{ \\AA} \\approx 1.23\\text{ \\AA}$."
        },
        {
            "id": "phy_dual_nature-q4",
            "topicId": "stopping-potential",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A monochromatic light source of frequency $\\nu$ illuminates a metal surface. The stopping potential is $V_0$. If the frequency of the incident light is doubled to $2\\nu$, the new stopping potential $V_0'$ will satisfy:",
            "options": ["$V_0' = 2V_0$", "$V_0' < 2V_0$", "$V_0' > 2V_0$", "$V_0' = V_0 / 2$"],
            "correctAnswerIndex": 2,
            "explanation": "Initially, $e V_0 = h\\nu - \\phi_0$. When the frequency is doubled, the new stopping potential $V_0'$ satisfies $e V_0' = 2h\\nu - \\phi_0 = 2(e V_0 + \\phi_0) - \\phi_0 = 2e V_0 + \\phi_0$. Dividing by $e$ gives $V_0' = 2V_0 + \\phi_0/e$. Since the work function $\\phi_0 > 0$, we have $V_0' > 2V_0$."
        },
        {
            "id": "phy_dual_nature-q5",
            "topicId": "photoelectric-effect",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "When a metallic surface is illuminated with light of wavelength $\\lambda$, the stopping potential is $V_0$. When the same surface is illuminated with light of wavelength $2\\lambda$, the stopping potential becomes $V_0/4$. The threshold wavelength for this metal is:",
            "options": ["$3\\lambda$", "$4\\lambda$", "$5\\lambda/2$", "$3\\lambda/2$"],
            "correctAnswerIndex": 0,
            "explanation": "From the photoelectric equation, $e V_0 = \\frac{hc}{\\lambda} - \\phi_0$ (Equation 1), and $e \\frac{V_0}{4} = \\frac{hc}{2\\lambda} - \\phi_0 \\implies e V_0 = \\frac{2hc}{\\lambda} - 4\\phi_0$ (Equation 2). Equating both: $\\frac{hc}{\\lambda} - \\phi_0 = \\frac{2hc}{\\lambda} - 4\\phi_0 \\implies 3\\phi_0 = \\frac{hc}{\\lambda} \\implies \\phi_0 = \\frac{hc}{3\\lambda}$. Since $\\phi_0 = \\frac{hc}{\\lambda_0}$, we get $\\frac{hc}{\\lambda_0} = \\frac{hc}{3\\lambda} \\implies \\lambda_0 = 3\\lambda$."
        },
        {
            "id": "phy_dual_nature-q6",
            "topicId": "de-broglie-wavelength",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "What is the de Broglie wavelength of a thermal neutron in thermal equilibrium with its surroundings at temperature $T$ (in Kelvin)? (Let $m_n$ be the mass of a neutron and $k_B$ be the Boltzmann constant).",
            "options": ["$\\frac{h}{\\sqrt{3m_n k_B T}}$", "$\\frac{h}{\\sqrt{2m_n k_B T}}$", "$\\frac{h}{\\sqrt{m_n k_B T}}$", "$\\frac{h}{3m_n k_B T}$"],
            "correctAnswerIndex": 0,
            "explanation": "The average kinetic energy of a thermal neutron at temperature $T$ is $K = \\frac{3}{2} k_B T$. The de Broglie wavelength is given by $\\lambda = \\frac{h}{\\sqrt{2m_n K}}$. Substituting $K$: $\\lambda = \\frac{h}{\\sqrt{2m_n (\\frac{3}{2} k_B T)}} = \\frac{h}{\\sqrt{3m_n k_B T}}$."
        },
        {
            "id": "phy_dual_nature-q7",
            "topicId": "de-broglie-wavelength",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A proton and an alpha particle are accelerated through the same potential difference $V$. What is the ratio of their de Broglie wavelengths ($\\lambda_p / \\lambda_\\alpha$)?",
            "options": ["$2\\sqrt{2}$", "$\\sqrt{2}$", "$2$", "$4$"],
            "correctAnswerIndex": 0,
            "explanation": "The de Broglie wavelength is $\\lambda = \\frac{h}{\\sqrt{2mqV}}$. Since they are accelerated through the same potential $V$, $\\lambda \\propto \\frac{1}{\\sqrt{m q}}$. The mass of an alpha particle is $m_\\alpha = 4m_p$ and its charge is $q_\\alpha = 2q_p$. Thus, $\\frac{\\lambda_p}{\\lambda_\\alpha} = \\sqrt{\\frac{m_\\alpha q_\\alpha}{m_p q_p}} = \\sqrt{\\frac{(4m_p)(2q_p)}{m_p q_p}} = \\sqrt{8} = 2\\sqrt{2}$."
        },
        {
            "id": "phy_dual_nature-q8",
            "topicId": "photoelectric-effect",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A point source of light is kept at a distance of $0.5\\text{ m}$ from a photoelectric cell, producing a saturation current of $16\\text{ mA}$. If the distance of the source is increased to $1.0\\text{ m}$, what will be the new saturation current?",
            "options": ["$4\\text{ mA}$", "$8\\text{ mA}$", "$16\\text{ mA}$", "$2\\text{ mA}$"],
            "correctAnswerIndex": 0,
            "explanation": "For a point source of light, the intensity $I$ of light at a distance $d$ varies as $I \\propto 1/d^2$. The photoelectric saturation current is directly proportional to the intensity of light incident on the cell: $i \\propto I \\propto 1/d^2$. If the distance is doubled from $0.5\\text{ m}$ to $1.0\\text{ m}$, the intensity and hence the saturation current becomes $1/2^2 = 1/4$-th of its original value. Thus, new current is $16\\text{ mA} / 4 = 4\\text{ mA}$."
        },
        {
            "id": "phy_dual_nature-q9",
            "topicId": "photoelectric-effect",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Light of wavelength $\\lambda_1$ is incident on a photo-emissive surface, causing electrons to be emitted with a maximum velocity $v_1$. If the wavelength is changed to $\\lambda_2$, the maximum velocity of the emitted electrons becomes $v_2$. Assuming the work function is negligible compared to the photon energy, what is the ratio $v_1 / v_2$?",
            "options": ["$\\sqrt{\\lambda_2 / \\lambda_1}$", "$\\sqrt{\\lambda_1 / \\lambda_2}$", "$\\lambda_2 / \\lambda_1$", "$\\lambda_1 / \\lambda_2$"],
            "correctAnswerIndex": 0,
            "explanation": "If the work function is negligible, the maximum kinetic energy is approximately equal to the photon energy: $\\frac{1}{2} m v^2 \\approx \\frac{hc}{\\lambda} \\implies v^2 \\propto 1/\\lambda \\implies v \\propto 1/\\sqrt{\\lambda}$. Therefore, $\\frac{v_1}{v_2} = \\sqrt{\\frac{\\lambda_2}{\\lambda_1}}$."
        },
        {
            "id": "phy_dual_nature-q10",
            "topicId": "heisenberg-uncertainty",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "If the uncertainty in the position of an electron is equal to its de Broglie wavelength, what is the minimum fractional uncertainty in its momentum ($\\Delta p / p$)?",
            "options": ["$1 / (4\\pi)$", "$1 / 2$", "$1 / (2\\pi)$", "$1$"],
            "correctAnswerIndex": 0,
            "explanation": "According to Heisenberg's Uncertainty Principle, $\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$. We are given that the position uncertainty is equal to the de Broglie wavelength: $\\Delta x = \\lambda = \\frac{h}{p}$. Substituting this gives $\\frac{h}{p} \\cdot \\Delta p \\ge \\frac{h}{4\\pi} \\implies \\frac{\\Delta p}{p} \\ge \\frac{1}{4\\pi}$. Thus, the minimum fractional uncertainty in momentum is $1/(4\\pi)$."
        },
        {
            "id": "phy_dual_nature-q11",
            "topicId": "photon-properties",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A parallel beam of light of wavelength $\\lambda$ and intensity $I$ is incident normally on a perfectly reflecting surface of area $A$. What is the force exerted by the light beam on the surface?",
            "options": ["$\\frac{2IA}{c}$", "$\\frac{IA}{c}$", "$\\frac{2IA\\lambda}{hc}$", "$\\frac{IA\\lambda}{2hc}$"],
            "correctAnswerIndex": 0,
            "explanation": "The momentum of each photon is $p = h/\\lambda$. The power incident on the surface is $P = IA$. The number of photons hitting the surface per second is $N = \\frac{P}{hc/\\lambda} = \\frac{IA\\lambda}{hc}$. Since the surface is perfectly reflecting, each photon undergoes a momentum change of $\\Delta p = 2p = 2h/\\lambda$. The force exerted is the rate of change of momentum: $F = N \\Delta p = \\left(\\frac{IA\\lambda}{hc}\\right) \\left(\\frac{2h}{\\lambda}\\right) = \\frac{2IA}{c}$."
        },
        {
            "id": "phy_dual_nature-q12",
            "topicId": "photoelectric-effect",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "The work function of a certain metal is $4.13\\text{ eV}$. What is the threshold wavelength of light that can cause photoelectric emission from this metal?",
            "options": ["$300\\text{ nm}$", "$200\\text{ nm}$", "$400\\text{ nm}$", "$600\\text{ nm}$"],
            "correctAnswerIndex": 0,
            "explanation": "The work function is $\\phi_0 = \\frac{hc}{\\lambda_0}$. In practical units, $\\phi_0\\text{ (in eV)} = \\frac{1240}{\\lambda_0\\text{ (in nm)}}$. Substituting $\\phi_0 = 4.13\\text{ eV}$, we get $\\lambda_0 = \\frac{1240}{4.13}\\text{ nm} \\approx 300\\text{ nm}$."
        },
        {
            "id": "phy_dual_nature-q13",
            "topicId": "photon-properties",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A hydrogen atom in its ground state is free to move. A photon of wavelength $\\lambda$ hits the stationary atom, is absorbed, and excites it. What is the relation between the photon energy $E_\\gamma = hc/\\lambda$ and the excitation energy $\\Delta E$ of the atom when the recoil of the atom is taken into account? (Let $M$ be the mass of the hydrogen atom).",
            "options": ["$E_\\gamma \\approx \\Delta E + \\frac{(\\Delta E)^2}{2Mc^2}$", "$E_\\gamma \\approx \\Delta E - \\frac{(\\Delta E)^2}{2Mc^2}$", "$E_\\gamma = \\Delta E$", "$E_\\gamma \\approx \\Delta E + \\frac{\\Delta E}{Mc^2}$"],
            "correctAnswerIndex": 0,
            "explanation": "By conservation of momentum, the recoil momentum of the hydrogen atom must equal the momentum of the incident photon: $p = E_\\gamma/c$. The kinetic energy of the recoiling atom is $K = \\frac{p^2}{2M} = \\frac{E_\\gamma^2}{2Mc^2}$. By conservation of energy, the energy of the photon is converted into the excitation energy $\\Delta E$ of the atom and the recoil kinetic energy $K$: $E_\\gamma = \\Delta E + \\frac{E_\\gamma^2}{2Mc^2}$. Since the recoil energy is very small compared to $\\Delta E$, we can approximate $E_\\gamma \\approx \\Delta E$ on the right side, giving $E_\\gamma \\approx \\Delta E + \\frac{(\\Delta E)^2}{2Mc^2}$."
        },
        {
            "id": "phy_dual_nature-q14",
            "topicId": "photoelectric-effect",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "An isolated, neutral, conducting sphere of radius $R$ is illuminated with light of wavelength $\\lambda$. The work function of the metal is $\\phi_0$ (where $hc/\\lambda > \\phi_0$). As photoelectrons are emitted, the sphere becomes positively charged. What is the maximum number of photoelectrons $N$ that can escape from the sphere before the emission stops?",
            "options": ["$\\frac{4\\pi\\varepsilon_0 R}{e^2} \\left(\\frac{hc}{\\lambda} - \\phi_0\\right)$", "$\\frac{4\\pi\\varepsilon_0 R}{e} \\left(\\frac{hc}{\\lambda} - \\phi_0\\right)$", "$\\frac{4\\pi\\varepsilon_0 R}{e^2} \\left(\\frac{hc}{\\lambda}\\right)$", "$\\frac{4\\pi\\varepsilon_0 R}{e^2} \\phi_0$"],
            "correctAnswerIndex": 0,
            "explanation": "As photoelectrons escape, the sphere acquires a positive charge $Q = Ne$. The electrical potential at the surface of the sphere is $V = \\frac{Q}{4\\pi\\varepsilon_0 R} = \\frac{Ne}{4\\pi\\varepsilon_0 R}$. This positive potential acts as a retarding potential. The maximum kinetic energy of the photoelectrons is $K_{\\max} = \\frac{hc}{\\lambda} - \\phi_0$. Photoelectric emission will stop when the surface potential of the sphere reaches the stopping potential $V_0$: $e V = K_{\\max} \\implies e \\left(\\frac{Ne}{4\\pi\\varepsilon_0 R}\\right) = \\frac{hc}{\\lambda} - \\phi_0 \\implies N = \\frac{4\\pi\\varepsilon_0 R}{e^2} \\left(\\frac{hc}{\\lambda} - \\phi_0\\right)$."
        },
        {
            "id": "phy_dual_nature-q15",
            "topicId": "de-broglie-wavelength",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "An electron of mass $m_e$ and a photon have the same wavelength $\\lambda$. If $E_e$ is the kinetic energy of the electron and $E_p$ is the energy of the photon, which of the following is correct? (Let $c$ be the speed of light).",
            "options": ["$\\frac{E_e}{E_p} = \\frac{h}{2m_e c\\lambda}$", "$\\frac{E_e}{E_p} = \\frac{2m_e c\\lambda}{h}$", "$\\frac{E_e}{E_p} = \\frac{h^2}{2m_e c\\lambda}$", "$\\frac{E_e}{E_p} = 1$"],
            "correctAnswerIndex": 0,
            "explanation": "For the photon, the energy is $E_p = \\frac{hc}{\\lambda}$. For the electron, the de Broglie wavelength is $\\lambda = \\frac{h}{p_e} \\implies p_e = \\frac{h}{\\lambda}$. The kinetic energy of the electron is $E_e = \\frac{p_e^2}{2m_e} = \\frac{h^2}{2m_e \\lambda^2}$. The ratio of their energies is: $\\frac{E_e}{E_p} = \\frac{h^2 / (2m_e \\lambda^2)}{hc / \\lambda} = \\frac{h}{2m_e c \\lambda}$."
        },
        {
            "id": "phy_dual_nature-q16",
            "topicId": "heisenberg-uncertainty",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A quantum particle of mass $m$ is confined inside a one-dimensional box of width $L$ (so the position uncertainty $\\Delta x \\le L$). According to the uncertainty principle, the minimum kinetic energy of this particle is approximately:",
            "options": ["$\\frac{\\hbar^2}{8mL^2}$", "$\\frac{\\hbar^2}{2mL^2}$", "$\\frac{\\hbar^2}{mL^2}$", "$\\frac{\\hbar}{mL}$"],
            "correctAnswerIndex": 0,
            "explanation": "Since the particle is confined to a box of width $L$, its position uncertainty is $\\Delta x \\approx L/2$ (or at most $L$). By Heisenberg's Uncertainty Principle, $\\Delta x \\cdot \\Delta p \\ge \\hbar/2 \\implies \\Delta p \\ge \\frac{\\hbar}{2\\Delta x} \\approx \\frac{\\hbar}{L}$. The momentum $p$ of the particle must be at least of the order of its uncertainty $\\Delta p$, so $p \\ge \\frac{\\hbar}{2L}$. The minimum kinetic energy is $K_{\\min} = \\frac{p^2}{2m} = \\frac{(\\hbar/2L)^2}{2m} = \\frac{\\hbar^2}{8mL^2}$."
        },
        {
            "id": "phy_dual_nature-q17",
            "topicId": "davisson-germer",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "In a Davisson-Germer experiment, a beam of electrons accelerated through $54\\text{ V}$ is incident normally on a nickel crystal. A strong peak in the intensity of scattered electrons is observed at a scattering angle of $\\theta = 50^\\circ$. What is the interplanar spacing $d$ of the crystal if the Bragg's diffraction first-order peak occurs at this angle?",
            "options": ["$0.91\\text{ \\AA}$", "$1.65\\text{ \\AA}$", "$2.15\\text{ \\AA}$", "$0.53\\text{ \\AA}$"],
            "correctAnswerIndex": 0,
            "explanation": "In this experiment, the scattering angle $\\theta$ is the angle between the incident beam and the scattered beam. The Bragg angle $\\phi$ (angle made by the diffracted beam with the crystal planes) is related to $\\theta$ by $\\phi = 90^\\circ - \\theta/2 = 90^\\circ - 25^\\circ = 65^\\circ$. The de Broglie wavelength for $V = 54\\text{ V}$ is $\\lambda = \\frac{12.27}{\\sqrt{54}} \\approx 1.67\\text{ \\AA}$. Bragg's Law for first-order ($n=1$) diffraction is $2d \\sin\\phi = \\lambda \\implies d = \\frac{\\lambda}{2\\sin\\phi} = \\frac{1.67}{2 \\sin(65^\\circ)} \\approx \\frac{1.67}{2 \\times 0.906} = 0.92\\text{ \\AA}$ (which is very close to the experimental value of $0.91\\text{ \\AA}$)."
        },
        {
            "id": "phy_dual_nature-q18",
            "topicId": "stopping-potential",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A photosensitive metal plate is simultaneously illuminated by two monochromatic light beams of wavelengths $\\lambda_1 = 300\\text{ nm}$ and $\\lambda_2 = 400\\text{ nm}$. The work function of the metal is $\\phi_0 = 2.0\\text{ eV}$. What is the measured stopping potential for this setup? (Use $hc = 1240\\text{ eV nm}$).",
            "options": ["$2.13\\text{ V}$", "$1.10\\text{ V}$", "$3.23\\text{ V}$", "$1.62\\text{ V}$"],
            "correctAnswerIndex": 0,
            "explanation": "When the surface is illuminated by light of multiple wavelengths, photoelectrons will be emitted by both wavelengths (since both photon energies exceed the work function: $E_1 = 1240/300 = 4.13\\text{ eV}$ and $E_2 = 1240/400 = 3.1\\text{ eV}$, both $> 2.0\\text{ eV}$). The maximum kinetic energy of the emitted electrons is determined by the highest energy photons (shorter wavelength $\\lambda_1 = 300\\text{ nm}$): $K_{\\max} = E_1 - \\phi_0 = 4.13\\text{ eV} - 2.0\\text{ eV} = 2.13\\text{ eV}$. The stopping potential is the potential required to stop even the fastest electrons, which is determined by $K_{\\max}$, so $V_0 = 2.13\\text{ V}$."
        }
    ]
}

# CHAPTER 2: phy_atoms
phy_atoms = {
    "id": "phy_atoms",
    "averageQuestions": "1-2 questions per year",
    "whatYoullLearn": [
        "Analyze the Geiger-Marsden alpha-scattering experiment and Rutherford's model of the atom.",
        "Understand Bohr's postulates of the hydrogen atom and quantum conditions.",
        "Calculate Bohr orbit radius, electron speed, and energy levels in hydrogen-like atoms.",
        "Determine wavelengths and frequencies of spectral series (Lyman, Balmer, Paschen, Brackett, Pfund).",
        "Derive Bohr's quantization of angular momentum using de Broglie's hypothesis of standing waves.",
        "Understand the limitations of the Bohr model for multi-electron atoms."
    ],
    "concepts": [
        {
            "title": "Distance of Closest Approach and Rutherford Scattering",
            "explanation": "When an alpha particle of mass $m$ and charge $2e$ is projected directly towards a heavy nucleus of atomic number $Z$, it slows down due to electrostatic repulsion. At the distance of closest approach ($r_0$), its entire initial kinetic energy is converted into electrostatic potential energy: $K = \\frac{k(2e)(Ze)}{r_0}$. This sets an upper limit on the size of the nucleus.",
            "example": "An alpha particle of energy $5\\text{ MeV}$ fired at a gold nucleus ($Z=79$) reaches a closest distance $r_0 = \\frac{2 k Z e^2}{K} \\approx 4.5 \\times 10^{-14}\\text{ m}$.",
            "trap": "The distance of closest approach is calculated for a head-on collision (impact parameter $b = 0$). For non-zero impact parameters, the scattering angle $\\theta$ is less than $180^\\circ$, and the minimum separation is greater than $r_0$."
        },
        {
            "title": "Bohr's Quantization and Energy Levels",
            "explanation": "Bohr's second postulate states that electrons revolve only in orbits where their angular momentum is an integral multiple of $\\hbar$: $mvr = n\\hbar$. Combined with the centripetal force from Coulomb attraction, this yields quantized radii $r_n = a_0 \\frac{n^2}{Z}$ and energy levels $E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}$.",
            "example": "For hydrogen ($Z=1$) in the ground state ($n=1$), $E_1 = -13.6\\text{ eV}$ and $r_1 = 0.529\\text{ \\AA}$.",
            "trap": "The kinetic energy is positive ($K = -E_n = 13.6 \\frac{Z^2}{n^2}\\text{ eV}$) and the potential energy is negative ($U = 2 E_n = -27.2 \\frac{Z^2}{n^2}\\text{ eV}$). Keep the signs straight in conservation equations."
        },
        {
            "title": "de Broglie's Explanation of Bohr's Quantization",
            "explanation": "de Broglie explained Bohr's quantization by proposing that the electron orbiting the nucleus behaves as a standing wave. For the wave to interfere constructively with itself, the circumference of the circular orbit must be an integral multiple of the wavelength: $2\\pi r = n\\lambda$. Since $\\lambda = h/p = h/mv$, this yields $2\\pi r = n(h/mv) \\implies mvr = n\\hbar$.",
            "example": "In the 3rd orbit of hydrogen, the electron's wave makes exactly 3 complete wavelengths around the orbit.",
            "trap": "This standing wave condition applies to circular orbits only and does not explain elliptical orbits (which require Sommerfeld's extension)."
        }
    ],
    "formulas": [
        "$r_0 = \\frac{2kZe^2}{K}$ (Distance of closest approach)",
        "$b = \\frac{kZe^2 \\cot(\\theta/2)}{K}$ (Impact parameter vs scattering angle)",
        "$mvr = n\\hbar = \\frac{nh}{2\\pi}$ (Bohr's quantization of angular momentum)",
        "$r_n = 0.529 \\frac{n^2}{Z}\\text{ \\AA}$ (Radius of $n$-th Bohr orbit)",
        "$v_n = 2.18 \\times 10^6 \\frac{Z}{n}\\text{ m/s}$ (Speed in $n$-th orbit)",
        "$E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}$ (Total energy of electron)",
        "$K_n = 13.6 \\frac{Z^2}{n^2}\\text{ eV}$ (Kinetic energy)",
        "$U_n = -27.2 \\frac{Z^2}{n^2}\\text{ eV}$ (Potential energy)",
        "$\\frac{1}{\\lambda} = R Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\right)$ (Rydberg formula)",
        "$2\\pi r = n\\lambda$ (de Broglie standing wave condition)"
    ],
    "examTraps": [
        {
            "trap": "Energy Sign Conventions",
            "warning": "Always remember that the total energy is negative. If an electron transitions from a higher energy state (larger $n$) to a lower one (smaller $n$), energy is emitted. The change in energy is $\\Delta E = E_{\\text{higher}} - E_{\\text{lower}} > 0$. If you calculate $E_{\\text{lower}} - E_{\\text{higher}}$, you will get a negative number; the magnitude gives the photon energy."
        },
        {
            "trap": "Ionization vs Excitation Potential",
            "warning": "Ionization energy is the energy required to remove an electron completely from the state $n$ to infinity ($E_\\infty = 0$), which is $+|E_n|$. Excitation energy is the energy needed to shift it to a higher bound state $n_f > n_i$, which is $E_{n_f} - E_{n_i}$."
        }
    ],
    "questionPattern": [
        "Calculating transition wavelengths and identifying the spectral series and regions",
        "Finding the ratio of time periods, frequencies, or angular velocities in different Bohr orbits",
        "Analyzing recoil of hydrogen atoms during photon emission/absorption",
        "Applying Bohr's model to exotic hydrogen-like systems (e.g., muonic atoms where a muon replaces an electron)"
    ],
    "quizQuestions": [
        {
            "id": "phy_atoms-q1",
            "topicId": "bohr-model-energy",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "The ionization energy of hydrogen atom in its ground state is $13.6\\text{ eV}$. The ionization energy of a singly ionized helium atom ($\\text{He}^+$) in its ground state is:",
            "options": ["$54.4\\text{ eV}$", "$27.2\\text{ eV}$", "$13.6\\text{ eV}$", "$3.4\\text{ eV}$"],
            "correctAnswerIndex": 0,
            "explanation": "The energy of an electron in a hydrogen-like atom of atomic number $Z$ is $E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}$. For helium, $Z = 2$. In the ground state ($n=1$), $E_1 = -13.6 \\frac{2^2}{1^2} = -54.4\\text{ eV}$. The ionization energy is the energy required to remove the electron to infinity ($E_\\infty = 0$), which is $-E_1 = +54.4\\text{ eV}$."
        },
        {
            "id": "phy_atoms-q2",
            "topicId": "bohr-model-radius",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "If the radius of the first Bohr orbit of a hydrogen atom is $a_0 = 0.53\\text{ \\AA}$, what is the radius of the second orbit of a singly ionized helium atom ($\\text{He}^+$)?",
            "options": ["$1.06\\text{ \\AA}$", "$0.53\\text{ \\AA}$", "$2.12\\text{ \\AA}$", "$0.265\\text{ \\AA}$"],
            "correctAnswerIndex": 0,
            "explanation": "The radius of the $n$-th orbit of a hydrogen-like atom is given by $r_n = a_0 \\frac{n^2}{Z}$. For $\\text{He}^+$, $Z = 2$. For the second orbit, $n = 2$. Therefore, $r_2 = a_0 \\frac{2^2}{2} = 2 a_0 = 2(0.53\\text{ \\AA}) = 1.06\\text{ \\AA}$."
        },
        {
            "id": "phy_atoms-q3",
            "topicId": "spectral-series",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "The shortest wavelength in the Lyman series of the hydrogen spectrum is $\\lambda_L$. What is the shortest wavelength in the Balmer series of the hydrogen spectrum?",
            "options": ["$4\\lambda_L$", "$2\\lambda_L$", "$9\\lambda_L/4$", "$3\\lambda_L/2$"],
            "correctAnswerIndex": 0,
            "explanation": "The shortest wavelength in any spectral series occurs when the transition is from $n_2 = \\infty$ to the lower state $n_1$. For the Lyman series ($n_1 = 1$), $\\frac{1}{\\lambda_L} = R \\left(\\frac{1}{1^2} - 0\\right) \\implies \\lambda_L = \\frac{1}{R}$. For the Balmer series ($n_1 = 2$), the shortest wavelength $\\lambda_B$ is given by $\\frac{1}{\\lambda_B} = R \\left(\\frac{1}{2^2} - 0\\right) = \\frac{R}{4} \\implies \\lambda_B = \\frac{4}{R} = 4\\lambda_L$."
        },
        {
            "id": "phy_atoms-q4",
            "topicId": "spectral-series",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "An electron in a hydrogen atom makes a transition from the $n = 4$ state to the ground state. What is the maximum number of different spectral lines that can be emitted?",
            "options": ["$6$", "$3$", "$4$", "$10$"],
            "correctAnswerIndex": 0,
            "explanation": "The maximum number of spectral lines emitted when an electron de-excites from state $n$ to the ground state is given by the formula $N = \\frac{n(n-1)}{2}$. For $n = 4$, $N = \\frac{4(4-1)}{2} = \\frac{12}{2} = 6$. The transitions are $4\\to 3, 4\\to 2, 4\\to 1, 3\\to 2, 3\\to 1, 2\\to 1$."
        },
        {
            "id": "phy_atoms-q5",
            "topicId": "bohr-model-kinematics",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "What is the ratio of the time period of an electron revolving in the ground state of hydrogen ($n=1$) to that in the first excited state ($n=2$)?",
            "options": ["$1 : 8$", "$1 : 4$", "$1 : 2$", "$1 : 16$"],
            "correctAnswerIndex": 0,
            "explanation": "The orbital period is $T = \\frac{2\\pi r}{v}$. Since $r_n \\propto n^2$ and $v_n \\propto 1/n$, the time period scales as $T_n \\propto \\frac{n^2}{1/n} = n^3$. The ratio of the period of the first orbit ($n=1$) to the second orbit ($n=2$) is $\\frac{T_1}{T_2} = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$, which is $1 : 8$."
        },
        {
            "id": "phy_atoms-q6",
            "topicId": "bohr-model-energy",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "How much energy (in eV) must be supplied to a hydrogen atom in its ground state to excite its electron to the second excited state?",
            "options": ["$12.09\\text{ eV}$", "$10.2\\text{ eV}$", "$1.51\\text{ eV}$", "$13.6\\text{ eV}$"],
            "correctAnswerIndex": 0,
            "explanation": "The ground state is $n=1$. The second excited state is $n=3$ (the first excited state is $n=2$). The energy of the electron in ground state is $E_1 = -13.6\\text{ eV}$. The energy in the $n=3$ state is $E_3 = -13.6 / 3^2 = -1.51\\text{ eV}$. The energy required to excite the electron is $\\Delta E = E_3 - E_1 = -1.51 - (-13.6) = 12.09\\text{ eV}$."
        },
        {
            "id": "phy_atoms-q7",
            "topicId": "bohr-model-kinematics",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "What is the speed of an electron revolving in the third orbit of a doubly ionized lithium atom ($\\text{Li}^{2+}$) compared to its speed in the ground state of hydrogen?",
            "options": ["Equal", "3 times faster", "3 times slower", "9 times faster"],
            "correctAnswerIndex": 0,
            "explanation": "The speed of an electron in a hydrogen-like atom is given by $v_n = v_0 \\frac{Z}{n}$, where $v_0$ is the speed in the ground state of hydrogen. For $\\text{Li}^{2+}$, $Z = 3$. In the third orbit, $n = 3$. Therefore, $v_3 = v_0 \\frac{3}{3} = v_0$. The speed is equal."
        },
        {
            "id": "phy_atoms-q8",
            "topicId": "rutherford-scattering",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "In the Rutherford alpha-particle scattering experiment, what is the relation between the scattering angle $\\theta$ and the impact parameter $b$?",
            "options": ["$b \\propto \\cot(\\theta/2)$", "$b \\propto \\tan(\\theta/2)$", "$b \\propto \\cos(\\theta/2)$", "$b \\propto \\sin(\\theta/2)$"],
            "correctAnswerIndex": 0,
            "explanation": "The impact parameter $b$ is related to the scattering angle $\\theta$ by the equation $b = \\frac{kZe^2 \\cot(\\theta/2)}{K}$. This shows that $b$ is directly proportional to $\\cot(\\theta/2)$. For $b=0$ (head-on collision), $\\cot(\\theta/2) = 0 \\implies \\theta = 180^\\circ$."
        },
        {
            "id": "phy_atoms-q9",
            "topicId": "bohr-de-broglie",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "According to de Broglie's standing wave condition, what is the de Broglie wavelength of the electron in the third orbit of a hydrogen atom? (Let $r_3$ be the radius of the third orbit).",
            "options": ["$\\frac{2\\pi r_3}{3}$", "$2\\pi r_3$", "$\\frac{3}{2\\pi r_3}$", "$\\frac{2\\pi}{3r_3}$"],
            "correctAnswerIndex": 0,
            "explanation": "According to de Broglie's standing wave explanation of Bohr's orbits, the circumference of the orbit must be an integer number of wavelengths: $2\\pi r_n = n \\lambda$. For the third orbit ($n=3$), $2\\pi r_3 = 3 \\lambda \\implies \\lambda = \\frac{2\\pi r_3}{3}$."
        },
        {
            "id": "phy_atoms-q10",
            "topicId": "spectral-series",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "The wavelength of the first line of the Balmer series for hydrogen is $\\lambda_H$. What is the wavelength of the first line of the Balmer series for a singly ionized helium atom ($\\text{He}^+$)?",
            "options": ["$\\lambda_H / 4$", "$\\lambda_H / 2$", "$4\\lambda_H$", "$2\\lambda_H$"],
            "correctAnswerIndex": 0,
            "explanation": "By the Rydberg formula, $\\frac{1}{\\lambda} = R Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$. For the first line of the Balmer series, $n_1 = 2$ and $n_2 = 3$. The term in the parentheses is constant. Thus, the wavelength is inversely proportional to $Z^2$: $\\lambda \\propto 1/Z^2$. For hydrogen, $Z=1$, and for $\\text{He}^+$, $Z=2$. Therefore, $\\lambda_{\\text{He}} = \\lambda_H / 2^2 = \\lambda_H / 4$."
        },
        {
            "id": "phy_atoms-q11",
            "topicId": "bohr-model-energy",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A hydrogen-like atom has a ground state energy of $-54.4\\text{ eV}$. What is the second excitation potential (in Volts) of this atom?",
            "options": ["$48.36\\text{ V}$", "$40.8\\text{ V}$", "$54.4\\text{ V}$", "$13.6\\text{ V}$"],
            "correctAnswerIndex": 0,
            "explanation": "The ground state energy is $E_1 = -54.4\\text{ eV}$. The energy levels scale as $E_n = E_1/n^2$. The first excited state is $n=2$, with $E_2 = -54.4 / 4 = -13.6\\text{ eV}$. The second excited state is $n=3$, with $E_3 = -54.4 / 9 = -6.04\\text{ eV}$. The second excitation energy is $\\Delta E = E_3 - E_1 = -6.04 - (-54.4) = 48.36\\text{ eV}$. The corresponding second excitation potential is $48.36\\text{ V}$."
        },
        {
            "id": "phy_atoms-q12",
            "topicId": "bohr-model-energy",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "What is the potential energy of an electron in the second orbit of a hydrogen atom?",
            "options": ["$-6.8\\text{ eV}$", "$-3.4\\text{ eV}$", "$+3.4\\text{ eV}$", "$-13.6\\text{ eV}$"],
            "correctAnswerIndex": 0,
            "explanation": "The total energy of an electron in the second orbit ($n=2$) of hydrogen is $E_2 = -13.6 / 2^2 = -3.4\\text{ eV}$. The potential energy $U$ is related to the total energy $E$ by $U = 2E$. Therefore, $U_2 = 2 \\times (-3.4\\text{ eV}) = -6.8\\text{ eV}$."
        },
        {
            "id": "phy_atoms-q13",
            "topicId": "exotic-atoms",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "In a muonic hydrogen atom, a muon of mass $m_\\mu \\approx 207 m_e$ (where $m_e$ is the electron mass) and charge $-e$ orbits a proton. What are the ground-state Bohr radius ($a_\\mu$) and ground-state energy ($E_\\mu$) of this atom in terms of the normal hydrogen Bohr radius $a_0$ and ground state energy $E_1 = -13.6\\text{ eV}$? (Assume proton is infinitely heavy).",
            "options": ["$a_\\mu = a_0 / 207$ and $E_\\mu = 207 E_1$", "$a_\\mu = 207 a_0$ and $E_\\mu = E_1 / 207$", "$a_\\mu = a_0 / 207$ and $E_\\mu = E_1 / 207$", "$a_\\mu = a_0$ and $E_\\mu = 207 E_1$"],
            "correctAnswerIndex": 0,
            "explanation": "The Bohr radius is given by $r = \\frac{4\\pi\\varepsilon_0 \\hbar^2}{m e^2}$, which is inversely proportional to the mass of the orbiting particle ($r \\propto 1/m$). Therefore, $a_\\mu = a_0 \\frac{m_e}{m_\\mu} = a_0 / 207$. The ground state energy is $E = -\\frac{m e^4}{8\\varepsilon_0^2 h^2}$, which is directly proportional to the mass of the orbiting particle ($E \\propto m$). Therefore, $E_\\mu = E_1 \\frac{m_\\mu}{m_e} = 207 E_1$."
        },
        {
            "id": "phy_atoms-q14",
            "topicId": "bohr-recoil",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A hydrogen atom of mass $M$ is initially at rest in its ground state. It is excited to the $n=2$ state by absorbing a photon, and then de-excites back to the ground state by emitting a photon of frequency $\\nu$. What is the recoil speed $v$ of the hydrogen atom after the emission? (Assume the recoil kinetic energy is tiny compared to the photon energy, and let $h$ be the Planck constant).",
            "options": ["$v = \\frac{3hR}{4M}$", "$v = \\frac{hR}{M}$", "$v = \\frac{3hR}{8M}$", "$v = \\frac{4hR}{3M}$"],
            "correctAnswerIndex": 0,
            "explanation": "During de-excitation from $n=2$ to $n=1$, the atom emits a photon of momentum $p = h/\\lambda$. By conservation of momentum, the atom recoils with momentum $P_{\\text{recoil}} = p = h/\\lambda$. The Rydberg formula gives $\\frac{1}{\\lambda} = R \\left(\\frac{1}{1^2} - \\frac{1}{2^2}\\right) = \\frac{3R}{4}$. Thus, the recoil momentum is $P_{\\text{recoil}} = h \\left(\\frac{3R}{4}\\right) = \\frac{3hR}{4}$. Since the mass of the atom is $M$, the recoil speed is $v = \\frac{P_{\\text{recoil}}}{M} = \\frac{3hR}{4M}$."
        },
        {
            "id": "phy_atoms-q15",
            "topicId": "bohr-quantization-general",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "Suppose the electrostatic potential energy between a proton and an electron was given by $V(r) = k r^4$, where $k$ is a positive constant. Applying Bohr's angular momentum quantization rule ($mvr = n\\hbar$) to circular orbits, how does the radius $r_n$ of the $n$-th orbit scale with the principal quantum number $n$?",
            "options": ["$r_n \\propto n^{1/3}$", "$r_n \\propto n^2$", "$r_n \\propto n^{1/2}$", "$r_n \\propto n^{2/3}$"],
            "correctAnswerIndex": 0,
            "explanation": "The potential energy is $V(r) = k r^4$. The electrostatic force is $F(r) = -\\frac{dV}{dr} = -4k r^3$. The magnitude of this force provides the centripetal force for circular orbit: $\\frac{m v^2}{r} = 4k r^3 \\implies m v^2 = 4k r^4 \\implies v^2 = \\frac{4k r^4}{m} \\implies v \\propto r^2$. From Bohr's quantization condition, $m v r = n\\hbar \\implies v \\propto \\frac{n}{r}$. Equating these two proportionalities for $v$: $r^2 \\propto \\frac{n}{r} \\implies r^3 \\propto n \\implies r_n \\propto n^{1/3}$."
        },
        {
            "id": "phy_atoms-q16",
            "topicId": "bohr-magnetic-field",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "An electron in a hydrogen atom revolves around the proton in a circular orbit of radius $r$. This orbital motion is equivalent to a tiny current loop, which produces a magnetic field $B$ at the center (the nucleus). What is the ratio of the magnetic fields produced at the center in the ground state ($n=1$) and the first excited state ($n=2$)? (i.e. $B_1 / B_2$)",
            "options": ["$32$", "$8$", "$16$", "$64$"],
            "correctAnswerIndex": 0,
            "explanation": "The magnetic field at the center of a circular current loop of radius $r$ carrying current $i$ is $B = \\frac{\\mu_0 i}{2r}$. The equivalent current is $i = \\frac{e}{T} = \\frac{e v}{2\\pi r}$. Thus, $B = \\frac{\\mu_0 e v}{4\\pi r^2} \\propto \\frac{v}{r^2}$. Under the Bohr model, $v_n \\propto 1/n$ and $r_n \\propto n^2$. Substituting these gives: $B_n \\propto \\frac{1/n}{(n^2)^2} = \\frac{1}{n^5}$. Therefore, the ratio of the magnetic field in the first orbit ($n=1$) to the second orbit ($n=2$) is: $\\frac{B_1}{B_2} = \\left(\\frac{2}{1}\\right)^5 = 32$."
        },
        {
            "id": "phy_atoms-q17",
            "topicId": "bohr-model-energy",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A hydrogen atom in its ground state absorbs a photon of energy $12.75\\text{ eV}$ and gets excited to a higher state. If the electron then transitions to a lower state, what is the maximum possible angular momentum change $\\Delta L$ of the electron during its de-excitation process to any state?",
            "options": ["$3\\hbar$", "$2\\hbar$", "$\\hbar$", "$4\\hbar$"],
            "correctAnswerIndex": 0,
            "explanation": "The energy of the electron in the ground state ($n=1$) is $-13.6\\text{ eV}$. Absorbing $12.75\\text{ eV}$ changes its energy to $E = -13.6 + 12.75 = -0.85\\text{ eV}$. Since $E_n = -13.6/n^2$, we find $n = \\sqrt{-13.6 / -0.85} = \\sqrt{16} = 4$. So, the electron is excited to the $n=4$ state. The angular momentum of the electron in state $n$ is $L_n = n\\hbar$. During de-excitation, the electron can transition to the $n=1, 2,$ or $3$ states. The maximum possible change in angular momentum occurs when it transitions from $n=4$ to the ground state $n=1$: $\\Delta L = L_4 - L_1 = 4\\hbar - 1\\hbar = 3\\hbar$."
        },
        {
            "id": "phy_atoms-q18",
            "topicId": "rutherford-scattering",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "In a Rutherford scattering experiment, a beam of alpha particles ($q_1 = 2e$) is fired with kinetic energy $E$ at a stationary heavy gold nucleus ($Z = 79$). If the experiment is repeated under the same conditions with a platinum nucleus ($Z = 78$), what is the ratio of the distance of closest approach ($r_{\\text{Au}} / r_{\\text{Pt}}$) for a head-on collision?",
            "options": ["$79 / 78$", "$78 / 79$", "$79^2 / 78^2$", "$\\sqrt{79/78}$"],
            "correctAnswerIndex": 0,
            "explanation": "For a head-on collision, the distance of closest approach $r_0$ is found by equating the initial kinetic energy $E$ to the potential energy at $r_0$: $E = \\frac{k (2e)(Ze)}{r_0} \\implies r_0 = \\frac{2k Z e^2}{E}$. Since the kinetic energy $E$ of the alpha particles is the same in both experiments, the distance of closest approach is directly proportional to the atomic number $Z$ of the target nucleus: $r_0 \\propto Z$. Therefore, the ratio of the distance of closest approach for gold ($Z=79$) to platinum ($Z=78$) is $r_{\\text{Au}} / r_{\\text{Pt}} = 79/78$."
        }
    ]
}

# CHAPTER 3: phy_nuclei
phy_nuclei = {
    "id": "phy_nuclei",
    "averageQuestions": "1-2 questions per year",
    "whatYoullLearn": [
        "Understand nuclear composition, isotopes, isobars, and isotones.",
        "Calculate nuclear size, volume, and density using the empirical radius formula.",
        "Determine mass defect and binding energy of nuclei, and analyze the BE/A curve.",
        "Apply the laws of radioactive decay to calculate half-life, mean life, activity, and remaining nuclei.",
        "Understand alpha, beta (plus and minus), and gamma decay processes, including neutrino emission.",
        "Calculate the Q-value of nuclear reactions and analyze nuclear fission and fusion."
    ],
    "concepts": [
        {
            "title": "Nuclear Size and Constant Density",
            "explanation": "The radius of a nucleus of mass number $A$ is given by $R = R_0 A^{1/3}$, where $R_0 \\approx 1.2\\text{ fm}$. Since the volume of the nucleus is $V = \\frac{4}{3}\\pi R^3 \\propto A$, and the mass of the nucleus is approximately $A \\times m_p$, the nuclear density $\\rho = \\frac{\\text{Mass}}{\\text{Volume}}$ is independent of the mass number $A$. Its value is extremely high, approximately $2.3 \\times 10^{17}\\text{ kg/m}^3$.",
            "example": "Comparing Aluminum ($A=27$) and Copper ($A=64$), their radii ratio is $R_{\\text{Al}}/R_{\\text{Cu}} = (27/64)^{1/3} = 3/4$, but their nuclear densities are identical.",
            "trap": "While the density of nuclear matter is constant, the density of the electron cloud in the atom is much smaller, and the atom is mostly empty space."
        },
        {
            "title": "Binding Energy per Nucleon and Nuclear Stability",
            "explanation": "The binding energy (BE) is the energy released when nucleons combine to form a nucleus: $BE = \\Delta m c^2$, where $\\Delta m = [Z m_p + (A-Z)m_n] - M_{\\text{nucleus}}$. The plot of binding energy per nucleon ($BE/A$) versus $A$ shows that nuclei of intermediate mass ($A \\approx 50-60$, peaking at Fe-56 at $\\approx 8.8\\text{ MeV}$) are the most stable. Very light nuclei can undergo fusion, and very heavy nuclei can undergo fission to form more stable products.",
            "example": "In a fission reaction: $A \\to B + C$, where $A$ is heavy and $B, C$ are intermediate. Since $BE/A$ is higher for products, energy is released: $Q = (BE_B + BE_C) - BE_A > 0$.",
            "trap": "When calculating energy released, $Q = (m_{\\text{reactants}} - m_{\\text{products}})c^2$ using masses, or $Q = BE_{\\text{products}} - BE_{\\text{reactants}}$ using binding energies. Note the opposite order of subtraction."
        },
        {
            "title": "Radioactive Decay Law and Half-Life",
            "explanation": "The rate of disintegration of a radioactive sample is proportional to the number of active nuclei present: $\\frac{dN}{dt} = -\\lambda N$. Integration gives $N(t) = N_0 e^{-\\lambda t}$. The half-life is $T_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda}$, and the mean life is $\\tau = \\frac{1}{\\lambda}$.",
            "example": "After 3 half-lives, the remaining fraction of active nuclei is $(1/2)^3 = 1/8$ of the initial amount.",
            "trap": "Activity $A = \\lambda N$ is the rate of decay, not the number of nuclei. Note that both $N(t)$ and $A(t)$ decay exponentially with the same decay constant $\\lambda$."
        }
    ],
    "formulas": [
        "$R = R_0 A^{1/3}$ (Nuclear radius)",
        "$1\\text{ u} = 931.5\\text{ MeV/c}^2$ (Atomic mass unit energy equivalent)",
        "$\\Delta m = [Z m_p + (A-Z) m_n] - M_{\\text{nucleus}}$ (Mass defect)",
        "$BE = \\Delta m \\times 931.5\\text{ MeV}$ (Binding energy using $\\Delta m$ in u)",
        "$N(t) = N_0 e^{-\\lambda t}$ (Radioactive decay law)",
        "$A(t) = A_0 e^{-\\lambda t} = \\lambda N(t)$ (Activity of a sample)",
        "$T_{1/2} = \\frac{\\ln 2}{\\lambda} = 0.693 \\tau$ (Half-life)",
        "$\\tau = \\frac{1}{\\lambda}$ (Mean life)",
        "$Q = (m_{\\text{initial}} - m_{\\text{final}}) c^2$ (Q-value of a decay/reaction)"
    ],
    "examTraps": [
        {
            "trap": "Beta Decay Equations and Conservation",
            "warning": "In $\\beta^-$ decay, a neutron inside the nucleus converts to a proton, emitting an electron and an antineutrino ($n \\to p + e^- + \\bar{\\nu}$). The atomic number increases by 1 ($Z \\to Z+1$), while the mass number $A$ remains unchanged. In $\\beta^+$ decay, a proton converts to a neutron, emitting a positron and a neutrino ($p \\to n + e^+ + \\nu$), and $Z \\to Z-1$."
        },
        {
            "trap": "Successive Half-Lives",
            "warning": "If a sample has a half-life of 10 days, it does not mean that it will completely decay in 20 days. In the first 10 days, 50% decays, leaving 50%. In the next 10 days, 50% of the remaining decays (25% of original), leaving 25%."
        }
    ],
    "questionPattern": [
        "Calculating binding energy changes in fission and fusion reactions",
        "Finding the fraction of a radioactive isotope remaining after a given time",
        "Analyzing mixture of two radioactive substances with different half-lives",
        "Identifying products and missing particles in nuclear decay chains"
    ],
    "quizQuestions": [
        {
            "id": "phy_nuclei-q1",
            "topicId": "nuclear-density",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "The mass number of Lithium is $7$ and that of Gold is $197$. What is the ratio of the nuclear density of Lithium to that of Gold?",
            "options": ["$1 : 1$", "$7 : 197$", "$197 : 7$", "$1 : 3$"],
            "correctAnswerIndex": 0,
            "explanation": "The radius of a nucleus of mass number $A$ is given by $R = R_0 A^{1/3}$. The volume is $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi R_0^3 A$. The mass is approximately $A \\times m_u$, where $m_u$ is the atomic mass unit. The nuclear density is $\\rho = \\frac{\\text{Mass}}{\\text{Volume}} = \\frac{A m_u}{\\frac{4}{3}\\pi R_0^3 A} = \\frac{m_u}{\\frac{4}{3}\\pi R_0^3}$. Since $A$ cancels out, the nuclear density is constant for all nuclei. Thus, the ratio of the nuclear density of Lithium to Gold is $1 : 1$."
        },
        {
            "id": "phy_nuclei-q2",
            "topicId": "nuclear-density",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "Two nuclei have their mass numbers in the ratio $1 : 8$. What is the ratio of their nuclear radii?",
            "options": ["$1 : 2$", "$1 : 4$", "$1 : 8$", "$1 : 64$"],
            "correctAnswerIndex": 0,
            "explanation": "The nuclear radius is given by $R = R_0 A^{1/3}$. Therefore, the ratio of the radii of two nuclei with mass numbers $A_1$ and $A_2$ is $\\frac{R_1}{R_2} = \\left(\\frac{A_1}{A_2}\\right)^{1/3}$. Given $\\frac{A_1}{A_2} = \\frac{1}{8}$, the ratio of their radii is $\\left(\\frac{1}{8}\\right)^{1/3} = \\frac{1}{2}$, which is $1 : 2$."
        },
        {
            "id": "phy_nuclei-q3",
            "topicId": "radioactivity-decay",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "A radioactive element has a half-life of $10\\text{ hours}$. Starting with a certain initial mass, what fraction of the element remains active after $30\\text{ hours}$?",
            "options": ["$1/8$", "$1/3$", "$1/6$", "$7/8$"],
            "correctAnswerIndex": 0,
            "explanation": "The number of half-lives elapsed in $t = 30\\text{ hours}$ is $n = t / T_{1/2} = 30 / 10 = 3$. The fraction of active nuclei remaining is given by $N/N_0 = (1/2)^n = (1/2)^3 = 1/8$."
        },
        {
            "id": "phy_nuclei-q4",
            "topicId": "nuclear-decay",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A nucleus $^{238}_{92}\\text{U}$ undergoes a series of decays, emitting $8$ alpha particles and $6$ beta-minus ($\\beta^-$) particles. What is the mass number and atomic number of the final product nucleus?",
            "options": ["$^{206}_{82}\\text{Pb}$", "$^{206}_{84}\\text{Po}$", "$^{210}_{82}\\text{Pb}$", "$^{208}_{82}\\text{Pb}$"],
            "correctAnswerIndex": 0,
            "explanation": "Each alpha particle emission reduces the mass number $A$ by $4$ and the atomic number $Z$ by $2$. Each $\\beta^-$ emission does not change $A$ but increases $Z$ by $1$. Let the final nucleus be $^{A'}_{Z'}\\text{X}$. The change in mass number is $\\Delta A = 8 \\times 4 = 32 \\implies A' = 238 - 32 = 206$. The change in atomic number is $\\Delta Z = 8 \\times 2 - 6 \\times 1 = 16 - 6 = 10 \\implies Z' = 92 - 10 = 82$. Thus, the product is $^{206}_{82}\\text{Pb}$."
        },
        {
            "id": "phy_nuclei-q5",
            "topicId": "binding-energy",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Calculate the binding energy (in MeV) of a Helium nucleus ($^4_2\\text{He}$) given the following masses: mass of proton $m_p = 1.00728\\text{ u}$, mass of neutron $m_n = 1.00866\\text{ u}$, mass of helium nucleus $m_{\\text{He}} = 4.00150\\text{ u}$. (Use $1\\text{ u} = 931.5\\text{ MeV}$).",
            "options": ["$28.3\\text{ MeV}$", "$30.4\\text{ MeV}$", "$27.1\\text{ MeV}$", "$25.6\\text{ MeV}$"],
            "correctAnswerIndex": 0,
            "explanation": "The Helium nucleus contains $Z = 2$ protons and $N = A - Z = 4 - 2 = 2$ neutrons. The total mass of constituent nucleons is $m_{\\text{const}} = 2 m_p + 2 m_n = 2(1.00728) + 2(1.00866) = 2.01456 + 2.01732 = 4.03188\\text{ u}$. The mass defect is $\\Delta m = m_{\\text{const}} - m_{\\text{He}} = 4.03188 - 4.00150 = 0.03038\\text{ u}$. The binding energy is $BE = \\Delta m \\times 931.5\\text{ MeV} = 0.03038 \\times 931.5 \\approx 28.3\\text{ MeV}$."
        },
        {
            "id": "phy_nuclei-q6",
            "topicId": "radioactivity-decay",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "The half-life of a radioactive isotope is $T_{1/2}$. What is the mean life $\\tau$ of the isotope?",
            "options": ["$T_{1/2} / \\ln 2$", "$T_{1/2} \\ln 2$", "$T_{1/2} / 2$", "$2 T_{1/2}$"],
            "correctAnswerIndex": 0,
            "explanation": "The decay constant $\\lambda$ is related to the half-life by $\\lambda = \\frac{\\ln 2}{T_{1/2}}$. The mean life $\\tau$ is the reciprocal of the decay constant: $\\tau = \\frac{1}{\\lambda} = \\frac{T_{1/2}}{\\ln 2}$."
        },
        {
            "id": "phy_nuclei-q7",
            "topicId": "nuclear-reactions",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "In a nuclear fusion reaction: $^2_1\\text{H} + ^3_1\\text{H} \\to ^4_2\\text{He} + ^1_0\\text{n} + Q$. If the binding energy per nucleon of $^2_1\\text{H}$, $^3_1\\text{H}$, and $^4_2\\text{He}$ are $1.11\\text{ MeV}$, $2.83\\text{ MeV}$, and $7.07\\text{ MeV}$ respectively, what is the Q-value of this reaction?",
            "options": ["$17.6\\text{ MeV}$", "$20.2\\text{ MeV}$", "$15.4\\text{ MeV}$", "$11.3\\text{ MeV}$"],
            "correctAnswerIndex": 0,
            "explanation": "The binding energy of a nucleus is $(BE/A) \\times A$. The binding energies of the reactants are: $BE(^2_1\\text{H}) = 1.11 \\times 2 = 2.22\\text{ MeV}$, and $BE(^3_1\\text{H}) = 2.83 \\times 3 = 8.49\\text{ MeV}$. The total binding energy of reactants is $BE_{\\text{react}} = 2.22 + 8.49 = 10.71\\text{ MeV}$. For the products: $BE(^4_2\\text{He}) = 7.07 \\times 4 = 28.28\\text{ MeV}$. The neutron $^1_0\\text{n}$ is a free nucleon, so its binding energy is $0$. The Q-value is the difference: $Q = BE_{\\text{products}} - BE_{\\text{reactants}} = 28.28 - 10.71 = 17.57\\text{ MeV} \\approx 17.6\\text{ MeV}$."
        },
        {
            "id": "phy_nuclei-q8",
            "topicId": "radioactivity-decay",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A radioactive sample has an activity of $8.0\\text{ mCi}$ initially. After $6\\text{ days}$, its activity is found to be $2.0\\text{ mCi}$. What will be its activity after another $6\\text{ days}$?",
            "options": ["$0.5\\text{ mCi}$", "$1.0\\text{ mCi}$", "$1.5\\text{ mCi}$", "$0.25\\text{ mCi}$"],
            "correctAnswerIndex": 0,
            "explanation": "Since activity $A(t) = A_0 e^{-\\lambda t}$ decays exponentially, the ratio of activities over equal intervals of time is constant. In the first $6\\text{ days}$, the activity drops from $8.0\\text{ mCi}$ to $2.0\\text{ mCi}$ (which is $1/4$-th). In the next $6\\text{ days}$, the activity will drop by the same factor of $1/4$. Thus, the new activity will be $2.0\\text{ mCi} / 4 = 0.5\\text{ mCi}$."
        },
        {
            "id": "phy_nuclei-q9",
            "topicId": "radioactivity-decay",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "In a laboratory, a radioactive isotope is being produced at a constant rate of $R$ nuclei per second. The decay constant of the isotope is $\\lambda$. If initially there are no radioactive nuclei, what is the number of active nuclei $N(t)$ present after time $t$?",
            "options": ["$\\frac{R}{\\lambda} (1 - e^{-\\lambda t})$", "$\\frac{R}{\\lambda} e^{-\\lambda t}$", "$R t$", "$\\frac{R}{\\lambda} (1 + e^{-\\lambda t})$"],
            "correctAnswerIndex": 0,
            "explanation": "The rate of change of the number of active nuclei is given by $\\frac{dN}{dt} = R - \\lambda N$. Rearranging and integrating with boundary condition $N(0) = 0$ yields: $\\int_0^N \\frac{dN}{R - \\lambda N} = \\int_0^t dt \\implies -\\frac{1}{\\lambda} \\ln\\left(\\frac{R - \\lambda N}{R}\\right) = t \\implies 1 - \\frac{\\lambda N}{R} = e^{-\\lambda t} \\implies N(t) = \\frac{R}{\\lambda} (1 - e^{-\\lambda t})$."
        },
        {
            "id": "phy_nuclei-q10",
            "topicId": "binding-energy",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "The binding energy per nucleon of two nuclei $A$ and $B$ are $5.6\\text{ MeV}$ and $8.2\\text{ MeV}$ respectively. If four nuclei of $A$ fuse to form one nucleus of $B$, is this reaction energetically favorable, and what is the net energy change per nucleon?",
            "options": ["Favorable; energy released is $2.6\\text{ MeV}$ per nucleon", "Unfavorable; energy absorbed is $2.6\\text{ MeV}$ per nucleon", "Favorable; energy released is $10.4\\text{ MeV}$ per nucleon", "Unfavorable; energy absorbed is $10.4\\text{ MeV}$ per nucleon"],
            "correctAnswerIndex": 0,
            "explanation": "The binding energy per nucleon of the product nucleus $B$ ($8.2\\text{ MeV}$) is higher than that of the reactant nuclei $A$ ($5.6\\text{ MeV}$). Since the product nucleus is more tightly bound, it is more stable, and this fusion process is energetically favorable (releases energy). The energy released per nucleon is the difference in binding energy per nucleon: $\\Delta E/A = 8.2\\text{ MeV} - 5.6\\text{ MeV} = 2.6\\text{ MeV}$ per nucleon."
        },
        {
            "id": "phy_nuclei-q11",
            "topicId": "nuclear-decay",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Which of the following processes represents beta-plus ($\\beta^+$) decay of a nucleus $^{A}_{Z}\\text{X}$?",
            "options": ["$^{A}_{Z}\\text{X} \\to ^{A}_{Z-1}\\text{Y} + e^+ + \\nu$", "$^{A}_{Z}\\text{X} \\to ^{A}_{Z+1}\\text{Y} + e^- + \\bar{\\nu}$", "$^{A}_{Z}\\text{X} \\to ^{A-4}_{Z-2}\\text{Y} + ^4_2\\text{He}$", "$^{A}_{Z}\\text{X} \\to ^{A}_{Z-1}\\text{Y} + e^+ + \\bar{\\nu}$"],
            "correctAnswerIndex": 0,
            "explanation": "In beta-plus ($\\beta^+$) decay, a proton inside the nucleus converts into a neutron, emitting a positron ($e^+$) and a neutrino ($\\nu$): $p \\to n + e^+ + \\nu$. This decreases the atomic number $Z$ by 1 while keeping the mass number $A$ constant. Therefore, the process is $^{A}_{Z}\\text{X} \\to ^{A}_{Z-1}\\text{Y} + e^+ + \\nu$. (Note: $\\beta^+$ is always accompanied by a neutrino $\\nu$, not an antineutrino $\\bar{\\nu}$)."
        },
        {
            "id": "phy_nuclei-q12",
            "topicId": "nuclear-density",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Two elements have nuclear radii in the ratio $2 : 3$. What is the ratio of their mass numbers?",
            "options": ["$8 : 27$", "$2 : 3$", "$4 : 9$", "$3 : 2$"],
            "correctAnswerIndex": 0,
            "explanation": "The nuclear radius is related to the mass number by $R = R_0 A^{1/3} \\implies R \\propto A^{1/3} \\implies A \\propto R^3$. Therefore, the ratio of mass numbers is $\\frac{A_1}{A_2} = \\left(\\frac{R_1}{R_2}\right)^3$. Given $\\frac{R_1}{R_2} = \\frac{2}{3}$, we get $\\frac{A_1}{A_2} = \\left(\\frac{2}{3}\right)^3 = \\frac{8}{27}$."
        },
        {
            "id": "phy_nuclei-q13",
            "topicId": "radioactivity-decay",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "Two radioactive substances $X_1$ and $X_2$ have decay constants $10\\lambda$ and $\\lambda$ respectively. At $t = 0$, they have the same number of nuclei $N_0$. After what time interval will the ratio of the number of nuclei of $X_1$ to that of $X_2$ be equal to $1/e$?",
            "options": ["$\\frac{1}{9\\lambda}$", "$\\frac{1}{11\\lambda}$", "$\\frac{1}{10\\lambda}$", "$\\frac{9}{\\lambda}$"],
            "correctAnswerIndex": 0,
            "explanation": "The number of nuclei of $X_1$ at time $t$ is $N_1(t) = N_0 e^{-10\\lambda t}$. The number of nuclei of $X_2$ is $N_2(t) = N_0 e^{-\\lambda t}$. The ratio is $\\frac{N_1(t)}{N_2(t)} = \\frac{N_0 e^{-10\\lambda t}}{N_0 e^{-\\lambda t}} = e^{-9\\lambda t}$. We want this ratio to be $1/e = e^{-1}$. Thus, $e^{-9\\lambda t} = e^{-1} \\implies 9\\lambda t = 1 \\implies t = \\frac{1}{9\\lambda}$."
        },
        {
            "id": "phy_nuclei-q14",
            "topicId": "nuclear-decay",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A stationary nucleus of mass number $A$ undergoes alpha decay, emitting an alpha particle with Q-value $Q$. Neglecting any gamma emission, what is the kinetic energy of the emitted alpha particle?",
            "options": ["$\\frac{A-4}{A} Q$", "$\\frac{4}{A} Q$", "$\\frac{A}{A-4} Q$", "$\\frac{A-4}{A+4} Q$"],
            "correctAnswerIndex": 0,
            "explanation": "Let $M$ be the mass of the parent nucleus, which is approximately $A m_u$. The alpha particle has mass $m_\\alpha \\approx 4 m_u$, and the daughter nucleus has mass $M_d \\approx (A-4) m_u$. Since the parent nucleus is at rest, by conservation of linear momentum: $p_d = p_\\alpha = p$. The Q-value is equal to the total kinetic energy of the products: $Q = K_d + K_\\alpha = \\frac{p^2}{2M_d} + \\frac{p^2}{2m_\\alpha} = \\frac{p^2}{2m_\\alpha} \\left(1 + \\frac{m_\\alpha}{M_d}\\right) = K_\\alpha \\left(1 + \\frac{4}{A-4}\\right) = K_\\alpha \\left(\\frac{A}{A-4}\\right)$. Solving for $K_\\alpha$ gives $K_\\alpha = \\frac{A-4}{A} Q$."
        },
        {
            "id": "phy_nuclei-q15",
            "topicId": "nuclear-reactions",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "In a nuclear reactor, energy is produced by the fission of $^{235}_{92}\\text{U}$. Each fission reaction releases about $200\\text{ MeV}$ of energy. If the reactor produces an electrical power of $20\\text{ MW}$ and has an efficiency of $20\\%$, how many $^{235}_{92}\\text{U}$ nuclei undergo fission per second?",
            "options": ["$3.125 \\times 10^{18}$", "$6.25 \\times 10^{17}$", "$1.25 \\times 10^{19}$", "$3.125 \\times 10^{17}$"],
            "correctAnswerIndex": 0,
            "explanation": "The electrical power output is $P_{\\text{elec}} = 20\\text{ MW} = 2 \\times 10^7\\text{ W}$. Since the efficiency is $\\eta = 20\\% = 0.20$, the thermal power required from fission is $P_{\\text{thermal}} = P_{\\text{elec}} / \\eta = 2 \\times 10^7 / 0.20 = 10^8\\text{ W (J/s)}$. The energy released per fission is $E_{\\text{fission}} = 200\\text{ MeV} = 200 \\times 10^6 \\times 1.6 \\times 10^{-19}\\text{ J} = 3.2 \\times 10^{-11}\\text{ J}$. Let $n$ be the number of fissions per second. Then: $n \\times E_{\\text{fission}} = P_{\\text{thermal}} \\implies n \\times (3.2 \\times 10^{-11}\\text{ J}) = 10^8\\text{ J/s} \\implies n = \\frac{10^8}{3.2 \\times 10^{-11}} = 3.125 \\times 10^{18}$ fissions per second."
        },
        {
            "id": "phy_nuclei-q16",
            "topicId": "radioactivity-decay",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A radioactive nucleus can decay by two different paths: alpha decay with a decay constant $\\lambda_1$ and beta decay with a decay constant $\\lambda_2$. If the half-lives of the individual processes are $T_1$ and $T_2$ respectively, what is the effective half-life $T$ of the nucleus?",
            "options": ["$\\frac{T_1 T_2}{T_1 + T_2}$", "$T_1 + T_2$", "$\\frac{T_1 + T_2}{2}$", "$\\sqrt{T_1 T_2}$"],
            "correctAnswerIndex": 0,
            "explanation": "The total rate of decay is the sum of the rates of the individual decay paths: $-\\frac{dN}{dt} = \\lambda_1 N + \\lambda_2 N = (\\lambda_1 + \\lambda_2) N$. Thus, the effective decay constant is $\\lambda = \\lambda_1 + \\lambda_2$. Since $\\lambda = \\frac{\\ln 2}{T}$, $\\lambda_1 = \\frac{\\ln 2}{T_1}$, and $\\lambda_2 = \\frac{\\ln 2}{T_2}$, we can substitute these to get: $\\frac{\\ln 2}{T} = \\frac{\\ln 2}{T_1} + \\frac{\\ln 2}{T_2} \\implies \\frac{1}{T} = \\frac{1}{T_1} + \\frac{1}{T_2} \\implies T = \\frac{T_1 T_2}{T_1 + T_2}$."
        },
        {
            "id": "phy_nuclei-q17",
            "topicId": "nuclear-decay",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "In a beta decay process, a neutron inside a nucleus decays: $n \\to p + e^- + \\bar{\\nu}$. If the maximum kinetic energy of the emitted electron is $0.78\\text{ MeV}$, and in a specific decay the electron is detected with a kinetic energy of $0.25\\text{ MeV}$, what is the energy of the emitted antineutrino? (Assume the recoil of the heavy daughter nucleus is negligible).",
            "options": ["$0.53\\text{ MeV}$", "$1.03\\text{ MeV}$", "$0.25\\text{ MeV}$", "$0.78\\text{ MeV}$"],
            "correctAnswerIndex": 0,
            "explanation": "In beta decay, the Q-value of the reaction represents the total energy shared between the beta particle (electron) and the antineutrino (neglecting the recoil energy of the heavy nucleus). The maximum kinetic energy of the electron $K_{\\max}$ corresponds to the case where the antineutrino carries away zero kinetic energy, so $Q \\approx K_{\\max} = 0.78\\text{ MeV}$. In any other decay, the energy is shared: $Q = K_e + E_\\nu$. Therefore, $E_\\nu = Q - K_e = 0.78\\text{ MeV} - 0.25\\text{ MeV} = 0.53\\text{ MeV}$."
        },
        {
            "id": "phy_nuclei-q18",
            "topicId": "nuclear-reactions",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "Two elements $X$ and $Y$ have binding energy per nucleon of $8.5\\text{ MeV}$ and $7.6\\text{ MeV}$ respectively. Element $Y$ undergoes fission into two equal fragments of element $X$: $Y \\to 2X$. If the mass number of $Y$ is $240$, what is the Q-value of this fission reaction?",
            "options": ["$216\\text{ MeV}$", "$108\\text{ MeV}$", "$432\\text{ MeV}$", "$54\\text{ MeV}$"],
            "correctAnswerIndex": 0,
            "explanation": "The mass number of $Y$ is $A_Y = 240$. The fission produces two fragments of $X$, so each fragment has a mass number of $A_X = 240 / 2 = 120$. The total binding energy of the reactant nucleus $Y$ is $BE_Y = (BE/A)_Y \\times A_Y = 7.6 \\times 240 = 1824\\text{ MeV}$. The total binding energy of the product nuclei (two fragments of $X$) is $BE_{\\text{prod}} = 2 \\times (BE_X) = 2 \\times [ (BE/A)_X \\times A_X ] = 2 \\times [ 8.5 \\times 120 ] = 2040\\text{ MeV}$. The Q-value of the reaction is the energy released, which is the difference in binding energies: $Q = BE_{\\text{products}} - BE_{\\text{reactants}} = 2040\\text{ MeV} - 1824\\text{ MeV} = 216\\text{ MeV}$."
        }
    ]
}

# CHAPTER 4: phy_semiconductor
phy_semiconductor = {
    "id": "phy_semiconductor",
    "averageQuestions": "1-2 questions per year",
    "whatYoullLearn": [
        "Classify materials into conductors, semiconductors, and insulators based on energy bands.",
        "Understand intrinsic semiconductors, carrier concentration, and the mass action law.",
        "Differentiate between n-type and p-type extrinsic semiconductors and their majority/minority carriers.",
        "Analyze the p-n junction formation, depletion region, barrier potential, and bias conditions.",
        "Evaluate diode characteristics in forward/reverse bias, and application as half-wave and full-wave rectifiers.",
        "Understand Zener diodes as voltage regulators, and the basics of logic gates (AND, OR, NOT, NAND, NOR) and De Morgan's laws."
    ],
    "concepts": [
        {
            "title": "Band Theory and Doping",
            "explanation": "In solid materials, energy levels split into bands. The valence band (VB) is filled with valence electrons, and the conduction band (CB) is empty or partially filled. The gap between them is the forbidden energy gap ($E_g$). In conductors, VB and CB overlap. In insulators, $E_g > 3\\text{ eV}$. In semiconductors, $E_g \\approx 1\\text{ eV}$. Intrinsic semiconductors are pure (e.g. Si, Ge). Doping with pentavalent impurities (P, As) creates n-type (electrons majority), and trivalent impurities (B, Al) create p-type (holes majority).",
            "example": "Doping Silicon with Phosphorus adds free electrons in the conduction band, increasing the conductivity by orders of magnitude.",
            "trap": "Doped semiconductors are electrically neutral because the total number of protons in the nuclei of host and impurity atoms equals the total number of electrons. Doping does not make a semiconductor charged."
        },
        {
            "title": "The Mass Action Law",
            "explanation": "In a semiconductor at thermal equilibrium, the product of electron concentration $n_e$ and hole concentration $n_h$ is constant and equal to the square of the intrinsic carrier concentration $n_i^2$, i.e., $n_e n_h = n_i^2$. This law holds for both intrinsic and extrinsic semiconductors.",
            "example": "If Silicon is doped with donors such that $n_e = 10^{17}\\text{ cm}^{-3}$ and $n_i = 1.5 \\times 10^{10}\\text{ cm}^{-3}$, then the hole concentration is reduced to $n_h = n_i^2 / n_e = 2.25 \\times 10^3\\text{ cm}^{-3}$.",
            "trap": "The intrinsic carrier concentration $n_i$ depends strongly on temperature ($n_i \\propto T^{3/2} e^{-E_g/2kT}$). Thus, even with the mass action law, the product $n_e n_h$ increases rapidly with temperature."
        },
        {
            "title": "p-n Junction Depletion Region and Biasing",
            "explanation": "When p and n regions meet, diffusion of majority carriers across the junction leaves behind immobile donor ions ($+$ on n-side) and acceptor ions ($-$ on p-side), creating a depletion region and a barrier potential. Under forward bias (p connected to $+$, n to $-$), the barrier height decreases, allowing exponential current flow. Under reverse bias (p to $-$, n to $+$), the barrier height increases, and only a tiny reverse saturation current flows.",
            "example": "For a silicon p-n junction, the barrier potential is typically $0.7\\text{ V}$ at room temperature.",
            "trap": "The width of the depletion region decreases in forward bias and increases in reverse bias. The capacitance of the junction (diffusion and transition capacitance) also changes with bias."
        }
    ],
    "formulas": [
        "$n_e n_h = n_i^2$ (Mass action law)",
        "$n_i(T) = A T^{3/2} e^{-\\frac{E_g}{2kT}}$ (Intrinsic carrier concentration vs temperature)",
        "$\\sigma = e(n_e \\mu_e + n_h \\mu_h)$ (Electrical conductivity of semiconductor)",
        "$I = I_0 \\left(e^{\\frac{eV}{\\eta kT}} - 1\\right)$ (Diode current equation)",
        "$f_{\\text{ripple}} = f_{\\text{in}}$ (Half-wave rectifier ripple frequency)",
        "$f_{\\text{ripple}} = 2f_{\\text{in}}$ (Full-wave rectifier ripple frequency)",
        "$Y = A \\cdot B$ (AND), $Y = A + B$ (OR), $Y = \\bar{A}$ (NOT)",
        "$\\overline{A \\cdot B} = \\bar{A} + \\bar{B}$ (De Morgan's First Law)",
        "$\\overline{A + B} = \\bar{A} \\cdot \\bar{B}$ (De Morgan's Second Law)"
    ],
    "examTraps": [
        {
            "trap": "Zener Diode in Breakdown",
            "warning": "A Zener diode is designed to operate in the reverse breakdown region. In this region, the voltage across the diode remains constant at the Zener voltage $V_Z$ over a wide range of currents. To act as a voltage regulator, the Zener diode must be connected in reverse bias and in parallel with the load."
        },
        {
            "trap": "Universal Logic Gates",
            "warning": "NAND and NOR gates are universal gates because any other basic gate (AND, OR, NOT) can be constructed using only NAND or only NOR gates. When simplifying logic circuits, always apply De Morgan's laws step-by-step from the outermost inversion inwards."
        }
    ],
    "questionPattern": [
        "Calculating carrier concentrations in doped semiconductors using the mass action law",
        "Determining diode currents, voltages, and resistance in circuit networks",
        "Finding Zener diode currents and load voltages in voltage regulator circuits",
        "Simplifying boolean expressions and identifying the logic gate represented by a combination of gates"
    ],
    "quizQuestions": [
        {
            "id": "phy_semiconductor-q1",
            "topicId": "extrinsic-semiconductors",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "To obtain an n-type extrinsic semiconductor, Silicon should be doped with which of the following impurity elements?",
            "options": ["Phosphorus", "Boron", "Aluminum", "Indium"],
            "correctAnswerIndex": 0,
            "explanation": "An n-type semiconductor is obtained by doping a tetravalent semiconductor (like Silicon or Germanium) with a pentavalent impurity (donor). Among the choices, Phosphorus is pentavalent, while Boron, Aluminum, and Indium are trivalent (which would yield a p-type semiconductor)."
        },
        {
            "id": "phy_semiconductor-q2",
            "topicId": "rectifiers",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "If the input AC frequency to a full-wave bridge rectifier is $50\\text{ Hz}$, what will be the ripple frequency of the output DC voltage?",
            "options": ["$100\\text{ Hz}$", "$50\\text{ Hz}$", "$200\\text{ Hz}$", "$25\\text{ Hz}$"],
            "correctAnswerIndex": 0,
            "explanation": "In a half-wave rectifier, only one half cycle of the AC input is rectified, so the output ripple frequency equals the input frequency ($f_{\\text{ripple}} = f_{\\text{in}}$). In a full-wave rectifier, both half-cycles are rectified, so the output wave has twice the frequency of the input ($f_{\\text{ripple}} = 2 f_{\\text{in}}$). For $f_{\\text{in}} = 50\\text{ Hz}$, the output ripple frequency is $2 \\times 50 = 100\\text{ Hz}$."
        },
        {
            "id": "phy_semiconductor-q3",
            "topicId": "logic-gates",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "The Boolean expression $Y = \\overline{A \\cdot B}$ represents which of the following logic gates?",
            "options": ["NAND", "NOR", "AND", "OR"],
            "correctAnswerIndex": 0,
            "explanation": "The Boolean expression for the AND gate is $A \\cdot B$. The horizontal bar represents inversion (NOT operation). Thus, $Y = \\overline{A \\cdot B}$ represents a NOT-AND, or NAND gate."
        },
        {
            "id": "phy_semiconductor-q4",
            "topicId": "mass-action-law",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "In an n-type Silicon semiconductor, the donor density is $N_D = 10^{16}\\text{ cm}^{-3}$. If the intrinsic carrier concentration of Silicon at room temperature is $n_i = 1.5 \\times 10^{10}\\text{ cm}^{-3}$, what is the hole concentration ($n_h$) in this doped semiconductor?",
            "options": ["$2.25 \\times 10^4\\text{ cm}^{-3}$", "$1.5 \\times 10^4\\text{ cm}^{-3}$", "$2.25 \\times 10^6\\text{ cm}^{-3}$", "$1.0 \\times 10^4\\text{ cm}^{-3}$"],
            "correctAnswerIndex": 0,
            "explanation": "For an extrinsic n-type semiconductor at room temperature, the electron concentration is approximately equal to the donor concentration: $n_e \\approx N_D = 10^{16}\\text{ cm}^{-3}$. By the Mass Action Law, $n_e \\cdot n_h = n_i^2$. Therefore, the hole concentration is $n_h = \\frac{n_i^2}{n_e} = \\frac{(1.5 \\times 10^{10})^2}{10^{16}} = \\frac{2.25 \\times 10^{20}}{10^{16}} = 2.25 \\times 10^4\\text{ cm}^{-3}$."
        },
        {
            "id": "phy_semiconductor-q5",
            "topicId": "pn-junction",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Which of the following statements correctly describes the behavior of the depletion region and potential barrier of a p-n junction under biasing?",
            "options": ["Forward bias decreases depletion width and barrier height; reverse bias increases both.", "Forward bias increases depletion width and barrier height; reverse bias decreases both.", "Forward bias decreases depletion width and increases barrier height; reverse bias increases depletion width and decreases barrier height.", "Depletion region width is unaffected by biasing, but barrier height changes."],
            "correctAnswerIndex": 0,
            "explanation": "Under forward bias, the applied electric field opposes the internal barrier field, lowering the potential barrier height and narrowing the depletion region. Under reverse bias, the applied field assists the barrier field, widening the depletion region and increasing the effective barrier potential height."
        },
        {
            "id": "phy_semiconductor-q6",
            "topicId": "diode-circuits",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "In the given circuit, two ideal diodes are connected in parallel with opposite polarities as shown. A voltage source of $10\\text{ V}$ is connected in series with a $5\\text{ k}\\Omega$ resistor. What is the current flowing in the circuit? [Assume Diode $D_1$ is in forward direction relative to positive terminal, and $D_2$ is in reverse].",
            "options": ["$2\\text{ mA}$", "$0\\text{ mA}$", "$4\\text{ mA}$", "$1\\text{ mA}$"],
            "correctAnswerIndex": 0,
            "explanation": "The positive terminal of the voltage source forward-biases diode $D_1$ and reverse-biases diode $D_2$. Since the diodes are ideal, $D_1$ acts as a closed switch (short circuit with $0\\text{ V}$ drop) and $D_2$ acts as an open switch (open circuit). The current flows entirely through the branch containing $D_1$ and the resistor. The current is $I = \\frac{V}{R} = \\frac{10\\text{ V}}{5 \\times 10^3\\text{ }\\Omega} = 2 \\times 10^{-3}\\text{ A} = 2\\text{ mA}$."
        },
        {
            "id": "phy_semiconductor-q7",
            "topicId": "logic-gates",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Using De Morgan's laws, simplify the Boolean expression $Y = \\overline{\\bar{A} + B}$. The simplified expression corresponds to:",
            "options": ["$A \\cdot \\bar{B}$", "$\\bar{A} \\cdot B$", "$A + \\bar{B}$", "$\\bar{A} + B$"],
            "correctAnswerIndex": 0,
            "explanation": "According to De Morgan's law, $\\overline{X + Y} = \\bar{X} \\cdot \\bar{Y}$. Let $X = \\bar{A}$ and $Y = B$. Then $Y = \\overline{\\bar{A} + B} = \\overline{(\\bar{A})} \\cdot \\bar{B}$. Since double inversion cancels out ($\\overline{(\\bar{A})} = A$), we get $Y = A \\cdot \\bar{B}$."
        },
        {
            "id": "phy_semiconductor-q8",
            "topicId": "band-theory",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "As the temperature of an intrinsic semiconductor is increased, what happens to its electrical conductivity and why?",
            "options": ["It increases, because more electron-hole pairs are thermally generated.", "It decreases, because the lattice vibrations increase, scattering charge carriers.", "It remains constant, because the increase in carrier concentration is offset by carrier scattering.", "It decreases, because holes recombine with electrons faster at high temperatures."],
            "correctAnswerIndex": 0,
            "explanation": "In semiconductors, as temperature increases, thermal energy excites more electrons from the valence band to the conduction band, generating more electron-hole pairs ($n_i \\propto e^{-E_g/2kT}$). The exponential increase in carrier concentration far outweighs the minor increase in carrier scattering due to lattice vibrations. Thus, the conductivity of a semiconductor increases (resistivity decreases) with temperature."
        },
        {
            "id": "phy_semiconductor-q9",
            "topicId": "zener-diode",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A Zener diode with a breakdown voltage of $V_Z = 6\\text{ V}$ is used in a voltage regulator circuit. The input voltage is $10\\text{ V}$, and the series resistance is $R_S = 200\\text{ }\\Omega$. If the load resistance is $R_L = 1\\text{ k}\\Omega$, what is the current flowing through the Zener diode?",
            "options": ["$14\\text{ mA}$", "$20\\text{ mA}$", "$6\\text{ mA}$", "$8\\text{ mA}$"],
            "correctAnswerIndex": 0,
            "explanation": "First, verify if Zener is in breakdown: without Zener, the voltage across $R_L$ is $V_L = V_{\\text{in}} \\frac{R_L}{R_S + R_L} = 10 \\frac{1000}{1200} = 8.33\\text{ V}$. Since $8.33\\text{ V} > 6\\text{ V}$, the Zener is in breakdown and regulates voltage at $V_L = 6\\text{ V}$. The current through the series resistor $R_S$ is $I_S = \\frac{V_{\\text{in}} - V_Z}{R_S} = \\frac{10 - 6}{200} = \\frac{4}{200} = 20\\text{ mA}$. The current through the load resistor $R_L$ is $I_L = \\frac{V_Z}{R_L} = \\frac{6\\text{ V}}{1000\\text{ }\\Omega} = 6\\text{ mA}$. By Kirchhoff's Current Law, the Zener current is $I_Z = I_S - I_L = 20\\text{ mA} - 6\\text{ mA} = 14\\text{ mA}$."
        },
        {
            "id": "phy_semiconductor-q10",
            "topicId": "logic-gates",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Which logic gate is represented by the following combination of gates? Two inputs $A$ and $B$ are passed through a NOR gate, and the output is then inverted using a NOT gate (made by tying inputs of a NOR gate).",
            "options": ["OR", "NOR", "AND", "NAND"],
            "correctAnswerIndex": 0,
            "explanation": "The output of the first NOR gate is $Y_1 = \\overline{A + B}$. When this output is inverted by a NOT gate, the final output is $Y = \\overline{Y_1} = \\overline{\\overline{A + B}} = A + B$. This is the Boolean expression for the OR gate."
        },
        {
            "id": "phy_semiconductor-q11",
            "topicId": "pn-junction",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "The forward characteristics of a p-n junction diode show that the current changes from $10\\text{ mA}$ to $20\\text{ mA}$ when the forward voltage is changed from $0.6\\text{ V}$ to $0.65\\text{ V}$. What is the dynamic forward resistance of the diode?",
            "options": ["$5\\text{ }\\Omega$", "$10\\text{ }\\Omega$", "$0.5\\text{ }\\Omega$", "$50\\text{ }\\Omega$"],
            "correctAnswerIndex": 0,
            "explanation": "The dynamic resistance $r_d$ of a diode is defined as the ratio of change in voltage ($\\Delta V$) to the change in current ($\\Delta I$): $r_d = \\frac{\\Delta V}{\\Delta I}$. Here, $\\Delta V = 0.65 - 0.6 = 0.05\\text{ V}$ and $\\Delta I = 20 - 10 = 10\\text{ mA} = 10 \\times 10^{-3}\\text{ A} = 0.01\\text{ A}$. Thus, $r_d = \\frac{0.05}{0.01} = 5\\text{ }\\Omega$."
        },
        {
            "id": "phy_semiconductor-q12",
            "topicId": "extrinsic-semiconductors",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "An n-type Germanium semiconductor is doped with Phosphorus. The conductivity of the sample is $2.24\\text{ S/cm}$. If the mobility of electrons is $\\mu_e = 3500\\text{ cm}^2\\text{/(V s)}$, what is the concentration of donor atoms? (Assume all donor atoms are ionized, and charge on electron is $1.6 \\times 10^{-19}\\text{ C}$).",
            "options": ["$4.0 \\times 10^{15}\\text{ cm}^{-3}$", "$2.0 \\times 10^{15}\\text{ cm}^{-3}$", "$8.0 \\times 10^{15}\\text{ cm}^{-3}$", "$1.0 \\times 10^{16}\\text{ cm}^{-3}$"],
            "correctAnswerIndex": 0,
            "explanation": "The conductivity of an n-type semiconductor is $\\sigma \\approx e n_e \\mu_e \\approx e N_D \\mu_e$, where $N_D$ is the donor concentration. Substituting the given values: $2.24 = (1.6 \\times 10^{-19}) \\times N_D \\times 3500 \\implies 2.24 = 5.6 \\times 10^{-16} \\times N_D \\implies N_D = \\frac{2.24}{5.6 \\times 10^{-16}} = 4.0 \\times 10^{15}\\text{ cm}^{-3}$."
        },
        {
            "id": "phy_semiconductor-q13",
            "topicId": "diode-circuits",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "In the given circuit, two Silicon p-n junction diodes are connected in parallel with opposite polarities. A resistor of $100\\text{ }\\Omega$ is connected in series with the parallel diode combination, and a $5\\text{ V}$ DC source is connected. If each diode has a forward barrier voltage of $0.7\\text{ V}$ and infinite reverse resistance, what is the current drawn from the source? [Assume Diode $D_1$ is forward-biased and $D_2$ is reverse-biased].",
            "options": ["$43\\text{ mA}$", "$50\\text{ mA}$", "$37\\text{ mA}$", "$0\\text{ mA}$"],
            "correctAnswerIndex": 0,
            "explanation": "Since $D_1$ is forward-biased, it conducts but acts as a voltage drop of $0.7\\text{ V}$ (silicon barrier potential). Diode $D_2$ is reverse-biased, so it does not conduct (open circuit). The circuit is a series combination of the source, the forward-biased diode $D_1$, and the $100\\text{ }\\Omega$ resistor. The current is: $I = \\frac{V_{\\text{source}} - V_{\\text{barrier}}}{R} = \\frac{5\\text{ V} - 0.7\\text{ V}}{100\\text{ }\\Omega} = \\frac{4.3\\text{ V}}{100\\text{ }\\Omega} = 0.043\\text{ A} = 43\\text{ mA}$."
        },
        {
            "id": "phy_semiconductor-q14",
            "topicId": "zener-diode",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A Zener voltage regulator circuit regulates a variable DC input voltage $V_{\\text{in}}$ (ranging from $12\\text{ V}$ to $20\\text{ V}$) to a constant $8\\text{ V}$ using a Zener diode of $V_Z = 8\\text{ V}$ and maximum power rating $P_Z = 1.6\\text{ W}$. What is the minimum value of series resistor $R_S$ required to prevent the Zener diode from burning out?",
            "options": ["$60\\text{ }\\Omega$", "$40\\text{ }\\Omega$", "$80\\text{ }\\Omega$", "$100\\text{ }\\Omega$"],
            "correctAnswerIndex": 0,
            "explanation": "The maximum power rating of the Zener is $P_{Z,\\max} = 1.6\\text{ W}$. The maximum Zener current is $I_{Z,\\max} = P_{Z,\\max} / V_Z = 1.6\\text{ W} / 8\\text{ V} = 0.2\\text{ A} = 200\\text{ mA}$. The maximum current flows through the Zener when the input voltage is at its maximum ($V_{\\text{in}} = 20\\text{ V}$) and the load current is zero (no-load condition: $I_L = 0$). In this case, the series resistor current is equal to the Zener current: $I_S = I_Z \\le 200\\text{ mA}$. The current is $I_S = \\frac{V_{\\text{in},\\max} - V_Z}{R_S} = \\frac{20 - 8}{R_S} = \\frac{12}{R_S}$. For $I_S \\le 0.2\\text{ A}$, we require: $\\frac{12}{R_S} \\le 0.2 \\implies R_S \\ge \\frac{12}{0.2} = 60\\text{ }\\Omega$. Thus, the minimum value of $R_S$ is $60\\text{ }\\Omega$."
        },
        {
            "id": "phy_semiconductor-q15",
            "topicId": "logic-gates",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A logic circuit has three inputs $A$, $B$, and $C$, and is built entirely using two-input NAND gates as follows: $Y_1 = \\overline{A \\cdot B}$, $Y_2 = \\overline{C \\cdot C}$, and final output $Y = \\overline{Y_1 \\cdot Y_2}$. What is the simplified Boolean expression for the output $Y$?",
            "options": ["$(A \\cdot B) + C$", "$(A + B) \\cdot C$", "$\\overline{A \\cdot B} \\cdot C$", "$(A \\cdot B) \\cdot C$"],
            "correctAnswerIndex": 0,
            "explanation": "Let's trace the gates step-by-step: 1. $Y_1 = \\overline{A \\cdot B}$ (NAND of $A$ and $B$). 2. $Y_2 = \\overline{C \\cdot C} = \\bar{C}$ (NAND of $C$ with itself acts as a NOT gate). 3. The final output is the NAND of $Y_1$ and $Y_2$: $Y = \\overline{Y_1 \\cdot Y_2} = \\overline{(\\overline{A \\cdot B}) \\cdot (\\bar{C})}$. By De Morgan's law, $\\overline{X \\cdot Y} = \\bar{X} + \\bar{Y}$. Letting $X = \\overline{A \\cdot B}$ and $Y = \\bar{C}$, we get: $Y = \\overline{\\overline{A \\cdot B}} + \\overline{\\bar{C}} = (A \\cdot B) + C$. This is option 1."
        },
        {
            "id": "phy_semiconductor-q16",
            "topicId": "extrinsic-semiconductors",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "In a semiconductor at constant temperature, the ratio of electron mobility to hole mobility is $\\mu_e / \\mu_h = 3$. If the ratio of electron drift current to hole drift current is $I_e / I_h = 2$, what is the ratio of carrier concentrations ($n_e / n_h$)?",
            "options": ["$2 / 3$", "$6$", "$3 / 2$", "$1 / 6$"],
            "correctAnswerIndex": 0,
            "explanation": "The drift current is given by $I = n e A v_d = n e A \\mu E$. For a given electric field $E$ and cross-sectional area $A$: $I_e = n_e e A \\mu_e E$ and $I_h = n_h e A \\mu_h E$. The ratio of currents is: $\\frac{I_e}{I_h} = \\frac{n_e \\mu_e}{n_h \\mu_h}$. Substituting the given ratios: $2 = \\frac{n_e}{n_h} \\times 3 \\implies \\frac{n_e}{n_h} = \\frac{2}{3}$."
        },
        {
            "id": "phy_semiconductor-q17",
            "topicId": "rectifiers",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A bridge rectifier without a filter is fed by an AC source of RMS voltage $V_s$. The diodes are ideal and the load resistance is $R_L$. If the average (DC) output voltage is $V_{\\text{dc}}$, and the RMS output voltage is $V_{\\text{rms}}$, what are their values in terms of the peak input voltage $V_m = \\sqrt{2} V_s$?",
            "options": ["$V_{\\text{dc}} = \\frac{2V_m}{\\pi}$ and $V_{\\text{rms}} = \\frac{V_m}{\\sqrt{2}}$", "$V_{\\text{dc}} = \\frac{V_m}{\\pi}$ and $V_{\\text{rms}} = \\frac{V_m}{\\sqrt{2}}$", "$V_{\\text{dc}} = \\frac{2V_m}{\\pi}$ and $V_{\\text{rms}} = \\frac{V_m}{2}$", "$V_{\\text{dc}} = \\frac{V_m}{\\pi}$ and $V_{\\text{rms}} = \\frac{V_m}{2}$"],
            "correctAnswerIndex": 0,
            "explanation": "For a full-wave rectifier (including bridge rectifiers): 1. The average (DC) value of a full-wave rectified sine wave is $V_{\\text{dc}} = \\frac{1}{\\pi} \\int_0^\\pi V_m \\sin\\theta d\\theta = \\frac{2V_m}{\\pi}$. 2. The RMS value of a full-wave rectified wave is the same as that of a regular sine wave because squaring the negative half-cycles makes them positive, leaving the mean-square value unchanged. Thus, $V_{\\text{rms}} = \\frac{V_m}{\\sqrt{2}}$. This matches option 1."
        },
        {
            "id": "phy_semiconductor-q18",
            "topicId": "logic-gates",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "Identify the logic gate represented by the circuit shown in the diagram, where two inputs $A$ and $B$ are connected to the bases of two npn transistors connected in parallel. The collectors are connected to the supply voltage $V_{CC}$ through a common resistor $R_C$, and the output $Y$ is taken from the collectors (with emitters grounded).",
            "options": ["NOR", "NAND", "OR", "AND"],
            "correctAnswerIndex": 0,
            "explanation": "Let's analyze the transistor behavior: 1. If both inputs are LOW ($A=0, B=0$), both transistors are in cutoff (OFF). No current flows through $R_C$, so there is no voltage drop across it. The output voltage at the collector is $Y = V_{CC}$ (HIGH, or $1$). 2. If $A$ is HIGH ($A=1$) and $B$ is LOW ($B=0$), the transistor connected to $A$ turns ON (saturated). It pulls the collector node down to ground potential. The output is $Y \\approx 0$ (LOW, or $0$). 3. If $A$ is LOW ($A=0$) and $B$ is HIGH ($B=1$), the transistor connected to $B$ turns ON and pulls the output down to ground, so $Y = 0$. 4. If both are HIGH ($A=1, B=1$), both are ON, pulling the collector down, so $Y = 0$. The truth table is: (0,0)->1; (0,1)->0; (1,0)->0; (1,1)->0. This is the truth table of a NOR gate."
        }
    ]
}


def format_to_ts(obj):
    out = []
    out.append("{\n")
    out.append(f"  id: '{obj['id']}',\n")
    out.append(f"  averageQuestions: '{obj['averageQuestions']}',\n")
    
    out.append("  whatYoullLearn: [\n")
    for s in obj['whatYoullLearn']:
        s_esc = s.replace("'", "\\'")
        out.append(f"    '{s_esc}',\n")
    out.append("  ],\n")
    
    out.append("  concepts: [\n")
    for c in obj['concepts']:
        t = c['title'].replace("'", "\\'")
        exp = c['explanation'].replace("'", "\\'")
        ex = c['example'].replace("'", "\\'")
        tr = c['trap'].replace("'", "\\'")
        out.append("    {\n")
        out.append(f"      title: '{t}',\n")
        out.append(f"      explanation: '{exp}',\n")
        out.append(f"      example: '{ex}',\n")
        out.append(f"      trap: '{tr}'\n")
        out.append("    },\n")
    out.append("  ],\n")
    
    out.append("  formulas: [\n")
    for f in obj['formulas']:
        f_esc = f.replace("'", "\\'")
        out.append(f"    '{f_esc}',\n")
    out.append("  ],\n")
    
    out.append("  examTraps: [\n")
    for et in obj['examTraps']:
        tr = et['trap'].replace("'", "\\'")
        wr = et['warning'].replace("'", "\\'")
        out.append("    {\n")
        out.append(f"      trap: '{tr}',\n")
        out.append(f"      warning: '{wr}'\n")
        out.append("    },\n")
    out.append("  ],\n")
    
    out.append("  questionPattern: [\n")
    for qp in obj['questionPattern']:
        qp_esc = qp.replace("'", "\\'")
        out.append(f"    '{qp_esc}',\n")
    out.append("  ],\n")
    
    out.append("  quizQuestions: [\n")
    for idx, q in enumerate(obj['quizQuestions']):
        q_id = q['id']
        topic = q['topicId']
        diff = q['difficulty']
        time_sec = q['estimatedTimeSeconds']
        ques = q['question'].replace("'", "\\'")
        
        opt_list = []
        for opt in q['options']:
            opt_list.append(f"'{opt.replace(\"'\", \"\\\\'\")}'")
        options_str = "[" + ", ".join(opt_list) + "]"
        
        ans_idx = q['correctAnswerIndex']
        expl = q['explanation'].replace("'", "\\'")
        
        comma = "," if idx < len(obj['quizQuestions']) - 1 else ""
        out.append("    {\n")
        out.append(f"      id: '{q_id}',\n")
        out.append(f"      topicId: '{topic}',\n")
        out.append(f"      difficulty: '{diff}' as const,\n")
        out.append(f"      estimatedTimeSeconds: {time_sec},\n")
        out.append(f"      question: '{ques}',\n")
        out.append(f"      options: {options_str},\n")
        out.append(f"      correctAnswerIndex: {ans_idx},\n")
        out.append(f"      explanation: '{expl}'\n")
        out.append(f"    }}{comma}\n")
    out.append("  ]\n")
    out.append("}")
    return "".join(out)


# Verify question counts and difficulties
def verify_chapter(ch):
    q_list = ch['quizQuestions']
    assert len(q_list) == 18, f"{ch['id']} has {len(q_list)} questions instead of 18"
    counts = {"easy": 0, "medium": 0, "hard": 0}
    for q in q_list:
        counts[q['difficulty']] += 1
    assert counts["easy"] == 3, f"{ch['id']} has {counts['easy']} easy questions instead of 3"
    assert counts["medium"] == 9, f"{ch['id']} has {counts['medium']} medium questions instead of 9"
    assert counts["hard"] == 6, f"{ch['id']} has {counts['hard']} hard questions instead of 6"
    print(f"Verified {ch['id']}: 18 questions (3 easy, 9 medium, 6 hard)")


verify_chapter(phy_dual_nature)
verify_chapter(phy_atoms)
verify_chapter(phy_nuclei)
verify_chapter(phy_semiconductor)

# Write to file
target_path = r"C:\Users\human\.gemini\antigravity\brain\f3db0bad-07c3-48ac-a6e1-5b73d213e87e\scratch\batch_7.ts"
os.makedirs(os.path.dirname(target_path), exist_ok=True)

with open(target_path, "w", encoding="utf-8") as f:
    f.write(f"// CHAPTER: phy_dual_nature | TYPE: NEW_FULL\n")
    f.write(format_to_ts(phy_dual_nature))
    f.write(f"\n// CHAPTER_END: phy_dual_nature\n\n")
    
    f.write(f"// CHAPTER: phy_atoms | TYPE: NEW_FULL\n")
    f.write(format_to_ts(phy_atoms))
    f.write(f"\n// CHAPTER_END: phy_atoms\n\n")
    
    f.write(f"// CHAPTER: phy_nuclei | TYPE: NEW_FULL\n")
    f.write(format_to_ts(phy_nuclei))
    f.write(f"\n// CHAPTER_END: phy_nuclei\n\n")
    
    f.write(f"// CHAPTER: phy_semiconductor | TYPE: NEW_FULL\n")
    f.write(format_to_ts(phy_semiconductor))
    f.write(f"\n// CHAPTER_END: phy_semiconductor\n")

print("SUCCESS")



