import json
import os

phy_thermo_questions = [
    {
        "id": "phy_thermo-q1",
        "topicId": "zeroth-law",
        "difficulty": "easy",
        "estimatedTimeSeconds": 45,
        "question": "Two systems A and B are in thermal equilibrium with a third system C. According to the Zeroth Law of Thermodynamics, which of the following is correct?",
        "options": [
            "Systems A and B must be in mechanical equilibrium but not necessarily thermal equilibrium.",
            "Systems A and B must be in thermal equilibrium with each other, meaning they share the same temperature.",
            "Systems A and B must exchange matter until they reach the same pressure.",
            "No heat can flow between A and B even if they are at different temperatures."
        ],
        "correctAnswerIndex": 1,
        "explanation": "The Zeroth Law states that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This physical law allows us to define temperature as a state variable and construct thermometers."
    },
    {
        "id": "phy_thermo-q2",
        "topicId": "first-law",
        "difficulty": "easy",
        "estimatedTimeSeconds": 45,
        "question": "In a thermodynamic process, a gas expands by performing $400\\text{ J}$ of work while absorbing $250\\text{ J}$ of heat from the surroundings. What is the change in the internal energy of the gas? (Using physics sign convention where work done by the gas is positive).",
        "options": [
            "$+650\\text{ J}$",
            "$-150\\text{ J}$",
            "$+150\\text{ J}$",
            "$-650\\text{ J}$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "By the First Law of Thermodynamics, $\\Delta U = Q - W$. Here, $Q = +250\\text{ J}$ (heat absorbed) and $W = +400\\text{ J}$ (work done by the gas). Therefore, $\\Delta U = 250 - 400 = -150\\text{ J}$. The internal energy decreases by $150\\text{ J}$."
    },
    {
        "id": "phy_thermo-q3",
        "topicId": "carnot-engine",
        "difficulty": "easy",
        "estimatedTimeSeconds": 45,
        "question": "A Carnot engine operates between a high-temperature reservoir at $500\\text{ K}$ and a low-temperature reservoir at $300\\text{ K}$. What is the thermal efficiency of this engine?",
        "options": [
            "$60\\%$",
            "$40\\%$",
            "$66.7\\%$",
            "$37.5\\%$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The efficiency of a Carnot engine is $\\eta = 1 - \\frac{T_C}{T_H}$. Substituting $T_C = 300\\text{ K}$ and $T_H = 500\\text{ K}$, we get $\\eta = 1 - \\frac{300}{500} = 0.40$ or $40\\%$."
    },
    {
        "id": "phy_thermo-q4",
        "topicId": "thermodynamic-state",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "Which of the following sets consists only of state variables of a thermodynamic system?",
        "options": [
            "Pressure, Volume, Heat, Internal Energy",
            "Pressure, Temperature, Work, Entropy",
            "Volume, Temperature, Internal Energy, Entropy",
            "Heat, Work, Enthalpy, Temperature"
        ],
        "correctAnswerIndex": 2,
        "explanation": "State variables depend only on the current state of the system and are independent of the path. Volume ($V$), Temperature ($T$), Internal Energy ($U$), and Entropy ($S$) are state variables. Heat ($Q$) and Work ($W$) are path functions, meaning their values depend on the specific thermodynamic path taken."
    },
    {
        "id": "phy_thermo-q5",
        "topicId": "thermodynamic-processes",
        "difficulty": "medium",
        "estimatedTimeSeconds": 75,
        "question": "An ideal gas is expanded from a given initial state $(P_0, V_0, T_0)$ to a final volume $2V_0$ via two different processes: (I) Isothermal expansion, and (II) Adiabatic expansion. If $W_1$ and $W_2$ are the work done by the gas in the isothermal and adiabatic processes respectively, which of the following statements is correct?",
        "options": [
            "$W_1 > W_2$, and the final temperature in the adiabatic process is higher than $T_0$.",
            "$W_1 < W_2$, and the final temperature in the adiabatic process is lower than $T_0$.",
            "$W_1 > W_2$, and the final temperature in the adiabatic process is lower than $T_0$.",
            "$W_1 = W_2$, because the change in volume is the same in both processes."
        ],
        "correctAnswerIndex": 2,
        "explanation": "In an isothermal expansion, temperature remains constant ($T_f = T_0$), and the pressure drops as $P \\propto 1/V$. In an adiabatic expansion, pressure drops faster as $P \\propto 1/V^\\gamma$ (where $\\gamma > 1$). On a $P-V$ diagram, the adiabatic curve lies below the isothermal curve, meaning the area under the isothermal curve is larger, so $W_1 > W_2$. Also, during adiabatic expansion, work is done at the expense of internal energy, so the temperature drops ($T_f < T_0$)."
    },
    {
        "id": "phy_thermo-q6",
        "topicId": "thermodynamic-processes",
        "difficulty": "medium",
        "estimatedTimeSeconds": 90,
        "question": "An ideal gas is taken through a cyclic process $A \\to B \\to C \\to A$. The coordinates on the $P-V$ diagram are $A(V_0, P_0)$, $B(2V_0, P_0)$, and $C(2V_0, 3P_0)$. The path $C \\to A$ is a straight line. What is the net work done by the gas in one complete cycle?",
        "options": [
            "$-P_0 V_0$",
            "$+P_0 V_0$",
            "$+2P_0 V_0$",
            "$-2P_0 V_0$"
        ],
        "correctAnswerIndex": 0,
        "explanation": "On a $P-V$ diagram, the magnitude of net work done in a cycle equals the area enclosed by the path. The path represents a right-angled triangle with base $2V_0 - V_0 = V_0$ and height $3P_0 - P_0 = 2P_0$. The area is $\\frac{1}{2} \\times V_0 \\times 2P_0 = P_0 V_0$. Since the cycle is counter-clockwise, the work done by the gas is negative: $W_{net} = -P_0 V_0$."
    },
    {
        "id": "phy_thermo-q7",
        "topicId": "first-law",
        "difficulty": "medium",
        "estimatedTimeSeconds": 75,
        "question": "Two moles of an ideal monatomic gas are mixed with three moles of an ideal diatomic gas at the same temperature $T$. What is the molar specific heat at constant volume ($C_v$) of the mixture?",
        "options": [
            "$1.9 R$",
            "$2.1 R$",
            "$2.5 R$",
            "$1.5 R$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "For a monatomic gas, $C_{v1} = 1.5R$. For a diatomic gas, $C_{v2} = 2.5R$. The effective molar specific heat at constant volume for the mixture is given by $C_{v,\\text{eff}} = \\frac{n_1 C_{v1} + n_2 C_{v2}}{n_1 + n_2}$. Substituting: $C_{v,\\text{eff}} = \\frac{2(1.5R) + 3(2.5R)}{2 + 3} = \\frac{3R + 7.5R}{5} = \\frac{10.5R}{5} = 2.1R$."
    },
    {
        "id": "phy_thermo-q8",
        "topicId": "thermodynamic-processes",
        "difficulty": "medium",
        "estimatedTimeSeconds": 75,
        "question": "An ideal gas undergoes a polytropic process represented by the equation $PV^3 = \\text{constant}$. If the gas is diatomic, what is the molar heat capacity $C$ of the gas during this process?",
        "options": [
            "$3R$",
            "$2R$",
            "$R$",
            "$-R$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "For a polytropic process $PV^n = \\text{constant}$, the molar heat capacity is $C = C_v + \\frac{R}{1-n}$. For a diatomic gas, $C_v = 2.5R$. Here $n = 3$. So $C = 2.5R + \\frac{R}{1-3} = 2.5R - 0.5R = 2R$."
    },
    {
        "id": "phy_thermo-q9",
        "topicId": "second-law",
        "difficulty": "medium",
        "estimatedTimeSeconds": 90,
        "question": "A solid block of copper of heat capacity $C = 1000\\text{ J/K}$ at temperature $100^\\circ\\text{C}$ is placed in thermal contact with a large heat reservoir at $0^\\circ\\text{C}$. The system is allowed to reach thermal equilibrium. What is the total change in entropy of the universe (block + reservoir) during this process? (Given: $\\ln(373/273) \\approx 0.312$)",
        "options": [
            "$-312\\text{ J/K}$",
            "$+366\\text{ J/K}$",
            "$+54\\text{ J/K}$",
            "$+68\\text{ J/K}$"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Let $T_1 = 373\\text{ K}$ and $T_2 = 273\\text{ K}$. Change in block entropy is $\\Delta S_{\\text{block}} = \\int_{T_1}^{T_2} \\frac{C dT}{T} = C \\ln(T_2/T_1) = -1000 \\ln(373/273) \\approx -312\\text{ J/K}$. Heat released to the reservoir is $Q = C(T_1 - T_2) = 1000(100) = 100,000\\text{ J}$. Change in reservoir entropy is $\\Delta S_{\\text{res}} = \\frac{Q}{T_2} = \\frac{100,000}{273} \\approx 366.3\\text{ J/K}$. Total entropy change of the universe: $\\Delta S_{\\text{uni}} = \\Delta S_{\\text{block}} + \\Delta S_{\\text{res}} \\approx -312 + 366.3 = 54.3\\text{ J/K}$."
    },
    {
        "id": "phy_thermo-q10",
        "topicId": "carnot-engine",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "A Carnot refrigerator is used to maintain a freezer compartment at $-13^\\circ\\text{C}$ in a room that is at $27^\\circ\\text{C}$. To remove $260\\text{ J}$ of heat from the freezer compartment, what is the minimum electrical work that must be done on the refrigerator?",
        "options": [
            "$40\\text{ J}$",
            "$260\\text{ J}$",
            "$300\\text{ J}$",
            "$39\\text{ J}$"
        ],
        "correctAnswerIndex": 0,
        "explanation": "For a Carnot refrigerator, $\\text{COP} = \\frac{Q_C}{W} = \\frac{T_C}{T_H - T_C}$. Here $T_C = -13^\\circ\\text{C} = 260\\text{ K}$ and $T_H = 27^\\circ\\text{C} = 300\\text{ K}$. Thus, $\\text{COP} = \\frac{260}{300 - 260} = \\frac{260}{40} = 6.5$. The minimum work is $W = \\frac{Q_C}{\\text{COP}} = \\frac{260}{6.5} = 40\\text{ J}$."
    },
    {
        "id": "phy_thermo-q11",
        "topicId": "thermodynamic-processes",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "An ideal gas at pressure $P_0$ and volume $V_0$ undergoes a free expansion into an evacuated chamber of equal volume, so that its final volume is $2V_0$. Which of the following statements is true regarding this free expansion?",
        "options": [
            "No work is done, no heat is exchanged, and the entropy of the system remains constant.",
            "Work is done by the gas, temperature decreases, and the final pressure is $P_0/2$.",
            "No work is done, no heat is exchanged, temperature remains constant, and entropy of the system increases.",
            "Heat is absorbed from the walls, work is done on the gas, and the final temperature increases."
        ],
        "correctAnswerIndex": 2,
        "explanation": "During a free expansion into a vacuum: 1. External pressure is zero, so $W = 0$. 2. The chamber is insulated, so $Q = 0$. 3. By the First Law, $\\Delta U = Q - W = 0$. For an ideal gas, $U$ depends only on $T$, so $\\Delta T = 0$ (constant temperature). 4. The process is irreversible, so the entropy of the gas increases."
    },
    {
        "id": "phy_thermo-q12",
        "topicId": "carnot-engine",
        "difficulty": "medium",
        "estimatedTimeSeconds": 75,
        "question": "Two Carnot engines are operating in series. The first engine receives heat at temperature $T_1$ and rejects heat to an intermediate reservoir at temperature $T_2$. The second engine receives this rejected heat at $T_2$ and rejects heat to a sink at temperature $T_3$. If the work outputs of the two engines are equal, which of the following is the correct expression for $T_2$?",
        "options": [
            "$T_2 = \\sqrt{T_1 T_3}$",
            "$T_2 = \\frac{T_1 + T_3}{2}$",
            "$T_2 = \\frac{2 T_1 T_3}{T_1 + T_3}$",
            "$T_2 = \\frac{T_1^2 + T_3^2}{T_1 + T_3}$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Let $Q_1$ be the heat absorbed by engine 1 at $T_1$, and $Q_2$ be the heat rejected at $T_2$. Work is $W_1 = Q_1 - Q_2 = Q_2 (T_1/T_2 - 1) = Q_2 (T_1 - T_2)/T_2$. For engine 2, heat absorbed is $Q_2$ at $T_2$, and rejected is $Q_3$ at $T_3$. Work is $W_2 = Q_2 - Q_3 = Q_2 (1 - T_3/T_2) = Q_2 (T_2 - T_3)/T_2$. Equating work: $T_1 - T_2 = T_2 - T_3 \\implies 2T_2 = T_1 + T_3 \\implies T_2 = \\frac{T_1 + T_3}{2}$."
    },
    {
        "id": "phy_thermo-q13",
        "topicId": "thermodynamic-processes",
        "difficulty": "hard",
        "estimatedTimeSeconds": 120,
        "question": "One mole of an ideal monatomic gas is taken through a process where the pressure and volume are related by $P = P_0 e^{-\\alpha V}$, where $P_0$ and $\\alpha$ are positive constants. What is the maximum temperature reached by the gas during this process?",
        "options": [
            "$\\frac{P_0}{\\alpha e R}$",
            "$\\frac{P_0}{e R}$",
            "$\\frac{P_0}{\\alpha R}$",
            "$\\frac{P_0 e}{\\alpha R}$"
        ],
        "correctAnswerIndex": 0,
        "explanation": "By the ideal gas law for $n=1$ mole, $T = \\frac{PV}{R} = \\frac{P_0 V e^{-\\alpha V}}{R}$. To maximize $T$, we take the derivative with respect to $V$ and set it to zero: $\\frac{dT}{dV} = \\frac{P_0}{R} [e^{-\\alpha V}(1 - \\alpha V)] = 0 \\implies V = 1/\\alpha$. Substituting $V = 1/\\alpha$ back gives $T_{\\max} = \\frac{P_0 (1/\\alpha) e^{-1}}{R} = \\frac{P_0}{\\alpha e R}$."
    },
    {
        "id": "phy_thermo-q14",
        "topicId": "carnot-engine",
        "difficulty": "hard",
        "estimatedTimeSeconds": 120,
        "question": "An ideal monatomic gas undergoes a cyclic process $A \\to C \\to B \\to A$ represented on a $P-V$ diagram. The coordinates of the states are $A(V_0, P_0)$, $C(2V_0, 2P_0)$, and $B(2V_0, P_0)$. The path $A \\to C$ is a straight line. What is the thermal efficiency of this cycle?",
        "options": [
            "$15.4\\%$",
            "$10.5\\%$",
            "$12.0\\%$",
            "$8.3\\%$"
        ],
        "correctAnswerIndex": 3,
        "explanation": "1. Path $A(V_0, P_0) \\to C(2V_0, 2P_0)$: $W_{AC} = 1.5 P_0 V_0$, $\\Delta U_{AC} = 1.5(4P_0 V_0 - P_0 V_0) = 4.5 P_0 V_0$, so $Q_{AC} = 6 P_0 V_0 > 0$ (heat absorbed).\n2. Path $C(2V_0, 2P_0) \\to B(2V_0, P_0)$: $W_{CB} = 0$, $\\Delta U_{CB} = 1.5(2P_0 V_0 - 4P_0 V_0) = -3 P_0 V_0$, so $Q_{CB} = -3 P_0 V_0 < 0$ (heat rejected).\n3. Path $B(2V_0, P_0) \\to A(V_0, P_0)$: $W_{BA} = -P_0 V_0$, $\\Delta U_{BA} = 1.5(P_0 V_0 - 2P_0 V_0) = -1.5 P_0 V_0$, so $Q_{BA} = -2.5 P_0 V_0 < 0$ (heat rejected).\nNet work $W_{net} = W_{AC} + W_{CB} + W_{BA} = 1.5 P_0 V_0 + 0 - P_0 V_0 = 0.5 P_0 V_0$. Total heat absorbed $Q_{in} = Q_{AC} = 6 P_0 V_0$. Efficiency $\\eta = W_{net}/Q_{in} = 0.5/6 = 1/12 \\approx 8.33\\%$."
    },
    {
        "id": "phy_thermo-q15",
        "topicId": "first-law",
        "difficulty": "hard",
        "estimatedTimeSeconds": 120,
        "question": "A thermally insulated cylinder is divided into two compartments, L and R, by a frictionless, non-conducting piston. Initially, both compartments contain one mole of the same ideal monatomic gas at pressure $P_0$, volume $V_0$, and temperature $T_0$. A heating coil in compartment L slowly heats the gas until its volume becomes $1.5 V_0$. Since compartment R is compressed adiabatically by the piston, what is the final pressure of the gas in compartment R?",
        "options": [
            "$P_0 (1.5)^{5/3}$",
            "$P_0 (2)^{5/3}$",
            "$P_0 (1.5)^{3/5}$",
            "$P_0 (2)^{3/5}$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The total volume of the cylinder is $V_L + V_R = 2V_0$. Since the final volume of the left compartment is $V_L = 1.5 V_0$, the final volume of the right compartment is $V_R = 2V_0 - 1.5 V_0 = 0.5 V_0 = V_0 / 2$. Since compartment R is compressed adiabatically: $P_R V_R^\\gamma = P_0 V_0^\\gamma \\implies P_R = P_0 (V_0 / V_R)^\\gamma$. For a monatomic gas, $\\gamma = 5/3$. Therefore, $P_R = P_0 (2)^{5/3}$."
    },
    {
        "id": "phy_thermo-q16",
        "topicId": "second-law",
        "difficulty": "hard",
        "estimatedTimeSeconds": 120,
        "question": "A body of constant heat capacity $C$ at initial temperature $T_i$ is placed in contact with a heat reservoir at a higher temperature $T_f$. The body is heated isobarically until it reaches thermal equilibrium with the reservoir. If $\\Delta S_{\\text{univ}}$ is the total entropy change of the universe (body + reservoir), which of the following expressions is correct?",
        "options": [
            "$\\Delta S_{\\text{univ}} = C \\left[ \\ln\\left(\\frac{T_f}{T_i}\\right) - \\left(1 - \\frac{T_i}{T_f}\\right) \\right]$",
            "$\\Delta S_{\\text{univ}} = C \\left[ \\ln\\left(\\frac{T_f}{T_i}\\right) + \\left(1 - \\frac{T_i}{T_f}\\right) \\right]$",
            "$\\Delta S_{\\text{univ}} = C \\left[ \\ln\\left(\\frac{T_i}{T_f}\\right) - \\left(1 - \\frac{T_f}{T_i}\\right) \\right]$",
            "$\\Delta S_{\\text{univ}} = C \\left[ \\ln\\left(\\frac{T_i}{T_f}\\right) + \\left(1 - \\frac{T_f}{T_i}\\right) \\right]$"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Entropy change of the body is $\\Delta S_{\\text{body}} = \\int_{T_i}^{T_f} \\frac{C dT}{T} = C \\ln(T_f / T_i)$. The heat absorbed by the body from the reservoir is $Q = C(T_f - T_i)$. Since the reservoir is at constant temperature $T_f$, its entropy change is $\\Delta S_{\\text{res}} = -\\frac{Q}{T_f} = -C \\left(1 - \\frac{T_i}{T_f}\\right)$. The total entropy change of the universe is $\\Delta S_{\\text{univ}} = \\Delta S_{\\text{body}} + \\Delta S_{\\text{res}} = C \\left[ \\ln\\left(\\frac{T_f}{T_i}\\right) - \\left(1 - \\frac{T_i}{T_f}\\right) \\right]$."
    },
    {
        "id": "phy_thermo-q17",
        "topicId": "thermodynamic-processes",
        "difficulty": "hard",
        "estimatedTimeSeconds": 105,
        "question": "One mole of an ideal monatomic gas undergoes a process in which its molar heat capacity varies with temperature $T$ as $C = C_v + \\beta T$, where $\\beta$ is a positive constant. What is the work done by the gas when its temperature increases from $T_0$ to $2T_0$?",
        "options": [
            "$\\frac{3}{2} R T_0 + \\frac{3}{2} \\beta T_0^2$",
            "$\\frac{3}{2} \\beta T_0^2$",
            "$R T_0$",
            "$R T_0 + \\frac{3}{2} \\beta T_0^2$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The heat absorbed by $1\\text{ mole}$ is $Q = \\int_{T_0}^{2T_0} C dT = \\int_{T_0}^{2T_0} (C_v + \\beta T) dT = C_v T_0 + \\frac{1}{2} \\beta [(2T_0)^2 - T_0^2] = C_v T_0 + 1.5 \\beta T_0^2$. The change in internal energy is $\\Delta U = C_v \\Delta T = C_v T_0$. According to the First Law of Thermodynamics, $W = Q - \\Delta U = (C_v T_0 + 1.5 \\beta T_0^2) - C_v T_0 = 1.5 \\beta T_0^2$."
    },
    {
        "id": "phy_thermo-q18",
        "topicId": "thermodynamic-state",
        "difficulty": "hard",
        "estimatedTimeSeconds": 105,
        "question": "For a thermodynamic system, the Helmholtz free energy $F$ is defined as $F = U - TS$. Which of the following relationships correctly expresses the pressure $P$ and entropy $S$ as partial derivatives of $F$ with respect to volume $V$ and temperature $T$?",
        "options": [
            "$P = -\\left(\\frac{\\partial F}{\\partial V}\\right)_T$ and $S = -\\left(\\frac{\\partial F}{\\partial T}\\right)_V$",
            "$P = \\left(\\frac{\\partial F}{\\partial V}\\right)_T$ and $S = \\left(\\frac{\\partial F}{\\partial T}\\right)_V$",
            "$P = -\\left(\\frac{\\partial F}{\\partial V}\\right)_T$ and $S = \\left(\\frac{\\partial F}{\\partial T}\\right)_V$",
            "$P = \\left(\\frac{\\partial F}{\\partial V}\\right)_T$ and $S = -\\left(\\frac{\\partial F}{\\partial T}\\right)_V$"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The differential of Helmholtz free energy is $dF = dU - T dS - S dT$. Since $dU = T dS - P dV$, substituting $dU$ yields $dF = -P dV - S dT$. Comparing this to the total differential $dF = \\left(\\frac{\\partial F}{\\partial V}\\right)_T dV + \\left(\\frac{\\partial F}{\\partial T}\\right)_V dT$, we obtain $P = -\\left(\\frac{\\partial F}{\\partial V}\\right)_T$ and $S = -\\left(\\frac{\\partial F}{\\partial T}\\right)_V$."
    }
]

phy_kinetic_theory_questions = [
    {
        "id": "phy_kinetic_theory-q1",
        "topicId": "molecular-gas-behavior",
        "difficulty": "easy",
        "estimatedTimeSeconds": 45,
        "question": "An ideal gas is kept in a sealed container of fixed volume. If the absolute temperature of the gas is doubled, how do the pressure of the gas and the root-mean-square (rms) speed of the gas molecules change?",
        "options": [
            "Pressure doubles, rms speed doubles.",
            "Pressure doubles, rms speed increases by a factor of $\\sqrt{2}$.",
            "Pressure increases by $\\sqrt{2}$, rms speed doubles.",
            "Pressure remains constant, rms speed increases by a factor of $\\sqrt{2}$."
        ],
        "correctAnswerIndex": 1,
        "explanation": "For a gas at constant volume (Gay-Lussac's Law), $P \\propto T$. Thus, doubling $T$ doubles the pressure $P$. The rms speed of the molecules is $v_{rms} = \\sqrt{\\frac{3RT}{M}} \\propto \\sqrt{T}$. Thus, doubling $T$ increases the rms speed by a factor of $\\sqrt{2}$."
    },
    {
        "id": "phy_kinetic_theory-q2",
        "topicId": "kinetic-theory-pressure",
        "difficulty": "easy",
        "estimatedTimeSeconds": 45,
        "question": "At a given temperature, what is the ratio of the root-mean-square speed ($v_{\\text{rms}}$), the average speed ($v_{\\text{avg}}$), and the most probable speed ($v_{\\text{mp}}$) of ideal gas molecules?",
        "options": [
            "$v_{\\text{rms}} : v_{\\text{avg}} : v_{\\text{mp}} = \\sqrt{2} : \\sqrt{\\frac{8}{\\pi}} : \\sqrt{3}$",
            "$v_{\\text{rms}} : v_{\\text{avg}} : v_{\\text{mp}} = \\sqrt{3} : \\sqrt{\\frac{8}{\\pi}} : \\sqrt{2}$",
            "$v_{\\text{rms}} : v_{\\text{avg}} : v_{\\text{mp}} = 3 : 8 : 2$",
            "$v_{\\text{rms}} : v_{\\text{avg}} : v_{\\text{mp}} = \\sqrt{\\frac{8}{\\pi}} : \\sqrt{3} : \\sqrt{2}$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The formulas are $v_{rms} = \\sqrt{3RT/M}$, $v_{avg} = \\sqrt{8RT/\\pi M}$, and $v_{mp} = \\sqrt{2RT/M}$. Taking their ratio yields $\\sqrt{3} : \\sqrt{8/\\pi} : \\sqrt{2}$."
    },
    {
        "id": "phy_kinetic_theory-q3",
        "topicId": "mean-free-path",
        "difficulty": "easy",
        "estimatedTimeSeconds": 45,
        "question": "How does the mean free path ($\\lambda$) of a gas molecule in a container relate to the molecular diameter ($d$) and the number density ($n$) of the gas?",
        "options": [
            "$\\lambda \\propto \\frac{1}{n d}$",
            "$\\lambda \\propto \\frac{1}{n^2 d}$",
            "$\\lambda \\propto \\frac{1}{n d^2}$",
            "$\\lambda \\propto \\frac{d^2}{n}$"
        ],
        "correctAnswerIndex": 2,
        "explanation": "The mean free path is given by $\\lambda = \\frac{1}{\\sqrt{2} \\pi n d^2}$. Thus, the mean free path is inversely proportional to the number density $n$ and the square of the molecular diameter $d$."
    },
    {
        "id": "phy_kinetic_theory-q4",
        "topicId": "kinetic-theory-pressure",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "According to the kinetic theory of gases, the pressure $P$ exerted by an ideal gas is related to the average translational kinetic energy per unit volume ($E$) by which of the following relations?",
        "options": [
            "$P = \\frac{1}{2} E$",
            "$P = E$",
            "$P = \\frac{2}{3} E$",
            "$P = \\frac{3}{2} E$"
        ],
        "correctAnswerIndex": 2,
        "explanation": "The pressure of an ideal gas is $P = \\frac{1}{3} \\rho v_{rms}^2$. Since the translational kinetic energy per unit volume is $E = \\frac{1}{2} \\rho v_{rms}^2$, we can rewrite pressure as $P = \\frac{2}{3} \\left( \\frac{1}{2} \\rho v_{rms}^2 \\right) = \\frac{2}{3} E$."
    },
    {
        "id": "phy_kinetic_theory-q5",
        "topicId": "equipartition-of-energy",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "For a diatomic gas like Nitrogen ($N_2$) at room temperature, what are the values of the molar specific heats at constant volume ($C_v$) and constant pressure ($C_p$), and their ratio ($\\gamma = C_p/C_v$)? (Assume vibrational modes are not active).",
        "options": [
            "$C_v = \\frac{3}{2}R$, $C_p = \\frac{5}{2}R$, $\\gamma = 1.67$",
            "$C_v = \\frac{5}{2}R$, $C_p = \\frac{7}{2}R$, $\\gamma = 1.40$",
            "$C_v = \\frac{5}{2}R$, $C_p = \\frac{7}{2}R$, $\\gamma = 1.33$",
            "$C_v = 3R$, $C_p = 4R$, $\\gamma = 1.33$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "At room temperature, a diatomic gas has 5 active degrees of freedom (3 translational and 2 rotational). By the equipartition theorem, $C_v = \\frac{5}{2} R$. Using Mayer's relation, $C_p = C_v + R = \\frac{7}{2} R$. The ratio is $\\gamma = C_p / C_v = 7/5 = 1.40$."
    },
    {
        "id": "phy_kinetic_theory-q6",
        "topicId": "equipartition-of-energy",
        "difficulty": "medium",
        "estimatedTimeSeconds": 75,
        "question": "A mixture contains $1\\text{ mole}$ of Helium (monatomic, $C_v = 1.5R$) and $1\\text{ mole}$ of Hydrogen (diatomic, $C_v = 2.5R$ at room temperature). What is the adiabatic exponent $\\gamma = C_p/C_v$ of this mixture?",
        "options": [
            "$1.50$",
            "$1.40$",
            "$1.44$",
            "$1.33$"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The effective molar specific heat at constant volume for the mixture is $C_{v,\\text{eff}} = \\frac{n_1 C_{v1} + n_2 C_{v2}}{n_1 + n_2} = \\frac{1(1.5R) + 1(2.5R)}{1 + 1} = 2R$. The specific heat at constant pressure is $C_{p,\\text{eff}} = C_{v,\\text{eff}} + R = 3R$. The adiabatic exponent is $\\gamma = C_{p,\\text{eff}} / C_{v,\\text{eff}} = 3/2 = 1.50$."
    },
    {
        "id": "phy_kinetic_theory-q7",
        "topicId": "molecular-gas-behavior",
        "difficulty": "medium",
        "estimatedTimeSeconds": 75,
        "question": "An air bubble of volume $V_0$ is released from the bottom of a lake of depth $h$. As the bubble rises to the surface, its volume increases to $3V_0$. If the atmospheric pressure is equivalent to a water column of height $10\\text{ m}$ and the temperature of the lake is uniform, what is the depth $h$ of the lake?",
        "options": [
            "$10\\text{ m}$",
            "$20\\text{ m}$",
            "$30\\text{ m}$",
            "$40\\text{ m}$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Since the temperature of the lake is uniform, Boyle's Law ($PV = \\text{constant}$) applies. The pressure at the bottom is $P_{\\text{bottom}} = P_{\\text{atm}} + \\rho g h$, and at the surface is $P_{\\text{surface}} = P_{\\text{atm}} = \\rho g (10)$. Using $P_{\\text{bottom}} V_{\\text{bottom}} = P_{\\text{surface}} V_{\\text{surface}}$, we have $\\rho g(10 + h) V_0 = \\rho g(10) (3V_0) \\implies 10 + h = 30 \\implies h = 20\\text{ m}$."
    },
    {
        "id": "phy_kinetic_theory-q8",
        "topicId": "mean-free-path",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "If the temperature of an ideal gas in a closed container of fixed volume is increased such that the rms speed of the molecules is doubled, how does the mean free path ($\\lambda$) of the molecules change?",
        "options": [
            "$\\lambda$ is doubled.",
            "$\\lambda$ is halved.",
            "$\\lambda$ remains unchanged.",
            "$\\lambda$ increases by a factor of $\\sqrt{2}$."
        ],
        "correctAnswerIndex": 2,
        "explanation": "The mean free path is $\\lambda = \\frac{1}{\\sqrt{2} \\pi n d^2}$. For a closed container of fixed volume, the number density $n = N/V$ and the molecular diameter $d$ are constant. Therefore, the mean free path remains unchanged, regardless of the temperature or rms speed of the molecules."
    },
    {
        "id": "phy_kinetic_theory-q9",
        "topicId": "kinetic-theory-pressure",
        "difficulty": "medium",
        "estimatedTimeSeconds": 75,
        "question": "The Maxwell-Boltzmann speed distribution of a gas is plotted at two different temperatures $T_1$ and $T_2$. The peak of the curve at $T_2$ is shifted to the right and is lower than the peak at $T_1$. Which of the following is correct?",
        "options": [
            "$T_1 > T_2$, because a lower peak means fewer molecules have high speed.",
            "$T_1 < T_2$, because the most probable speed is higher at $T_2$.",
            "$T_1 = T_2$, but the pressure has changed.",
            "$T_1 < T_2$, because the area under the curve is smaller at $T_2$."
        ],
        "correctAnswerIndex": 1,
        "explanation": "The most probable speed is $v_{mp} = \\sqrt{2RT/M}$. Shifting the peak to the right indicates a higher $v_{mp}$ and thus a higher temperature ($T_2 > T_1$). The height of the peak decreases because the total area under the curve (representing the total number of molecules) must remain constant while the distribution broadens at higher temperature."
    },
    {
        "id": "phy_kinetic_theory-q10",
        "topicId": "equipartition-of-energy",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "At extremely high temperatures, a diatomic gas molecule (like $O_2$) exhibits vibrational motion in addition to translation and rotation. If the vibrational mode is fully activated, what is the predicted molar heat capacity at constant volume ($C_v$) according to the classical equipartition theorem?",
        "options": [
            "$\\frac{5}{2}R$",
            "$\\frac{7}{2}R$",
            "$\\frac{9}{2}R$",
            "$3R$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "A diatomic molecule has 3 translational and 2 rotational degrees of freedom (totaling 5 quadratic energy terms). One active vibrational mode adds two quadratic energy terms (kinetic energy and potential energy components), each contributing $\\frac{1}{2}R$ to $C_v$. Thus, $C_v = \\frac{5}{2}R + 1R = \\frac{7}{2}R$."
    },
    {
        "id": "phy_kinetic_theory-q11",
        "topicId": "molecular-gas-behavior",
        "difficulty": "medium",
        "estimatedTimeSeconds": 75,
        "question": "A container is divided into two equal compartments by a partition with a small hole. One side contains Helium ($M = 4\\text{ g/mol}$) and the other contains Oxygen ($M = 32\\text{ g/mol}$) at the same initial pressure and temperature. What is the ratio of the initial rate of effusion of Helium to that of Oxygen through the hole?",
        "options": [
            "$1 : 2\\sqrt{2}$",
            "$2\\sqrt{2} : 1$",
            "$8 : 1$",
            "$1 : 8$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "According to Graham's Law of Effusion, the rate of effusion is inversely proportional to the square root of the molar mass ($r \\propto 1/\\sqrt{M}$). Thus, the ratio of effusion rates is $\\frac{r_{\\text{He}}}{r_{\\text{O}_2}} = \\sqrt{\\frac{M_{\\text{O}_2}}{M_{\\text{He}}}} = \\sqrt{\\frac{32}{4}} = \\sqrt{8} = 2\\sqrt{2}$."
    },
    {
        "id": "phy_kinetic_theory-q12",
        "topicId": "equipartition-of-energy",
        "difficulty": "medium",
        "estimatedTimeSeconds": 75,
        "question": "According to the Dulong-Petit law, the molar heat capacity of a simple crystalline solid (such as copper or lead) at high temperatures is approximately $3R$. Which of the following assumptions of the classical equipartition theorem explains this behavior?",
        "options": [
            "Each atom in the solid lattice behaves as a 3D independent quantum harmonic oscillator with only kinetic energy.",
            "Each atom behaves as a 3D independent classical harmonic oscillator, contributing 6 quadratic energy terms.",
            "The atoms in a solid only have translational degrees of freedom, similar to a monatomic gas.",
            "The atoms in a solid have 3 rotational and 3 translational degrees of freedom."
        ],
        "correctAnswerIndex": 1,
        "explanation": "In a 3D crystalline lattice, each atom oscillates around its equilibrium position along three independent axes. Each axis contributes two quadratic energy terms (one kinetic, $\\frac{1}{2}m v_i^2$, and one potential, $\\frac{1}{2}k x_i^2$). Thus, each atom has 6 quadratic energy terms. By the equipartition theorem, each term contributes $\\frac{1}{2} k_B T$, resulting in an average energy of $3 k_B T$ per atom, or $3RT$ per mole of solid, giving a heat capacity $C = 3R$."
    },
    {
        "id": "phy_kinetic_theory-q13",
        "topicId": "kinetic-theory-pressure",
        "difficulty": "hard",
        "estimatedTimeSeconds": 105,
        "question": "A cylinder containing $N$ molecules of an ideal gas is closed by a piston of area $A$. The piston is slowly pulled outwards at a constant small speed $u$ (where $u \\ll v_{\\text{rms}}$). If the average speed of molecules colliding with the piston is $v$, what is the average loss in kinetic energy of a molecule of mass $m$ during a single elastic collision with the moving piston?",
        "options": [
            "$m u v$",
            "$2 m u v$",
            "$2 m u (v - u)$",
            "$m u^2$"
        ],
        "correctAnswerIndex": 2,
        "explanation": "In the reference frame of the piston moving at speed $u$, the approach velocity of the molecule is $v' = v - u$. Because the collision is elastic, the molecule rebounds with the same speed relative to the piston, $v_{bounce}' = -(v - u)$. Transforming back to the laboratory frame, the final velocity of the molecule is $v_f = -(v - u) + u = -v + 2u$. The loss in kinetic energy is $\\Delta K = \\frac{1}{2} m v^2 - \\frac{1}{2} m v_f^2 = \\frac{1}{2} m [v^2 - (2u - v)^2] = 2 m u (v - u)$."
    },
    {
        "id": "phy_kinetic_theory-q14",
        "topicId": "mean-free-path",
        "difficulty": "hard",
        "estimatedTimeSeconds": 120,
        "question": "An ideal gas in a closed container undergoes a thermodynamic process such that the average time between molecular collisions remains constant. If the mean free path of the molecules is $\\lambda$ and the volume of the container is $V$, how does the pressure $P$ of the gas vary with volume $V$ during this process?",
        "options": [
            "$P \\propto V^{-1}$",
            "$P \\propto V$",
            "$P \\propto V^{-2}$",
            "$P \\propto V^2$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The average time between collisions is $\\tau = \\lambda / v_{avg}$. Since the container is closed, $\\lambda \\propto V$. The average speed is $v_{avg} \\propto \\sqrt{T}$. Thus, $\\tau \\propto V / \\sqrt{T}$. Since $\\tau$ is constant, we have $V \\propto \\sqrt{T} \\implies T \\propto V^2$. From the ideal gas law ($PV \\propto T$), substituting $T$ yields $PV \\propto V^2 \\implies P \\propto V$."
    },
    {
        "id": "phy_kinetic_theory-q15",
        "topicId": "equipartition-of-energy",
        "difficulty": "hard",
        "estimatedTimeSeconds": 120,
        "question": "Consider a gas of diatomic molecules. At very low temperatures ($T < 50\\text{ K}$), the rotational motion is quantum mechanically frozen, and at moderate temperatures ($300\\text{ K}$), rotational motion is active. At very high temperatures ($T > 2000\\text{ K}$), vibrational motion also becomes active. If one mole of this gas is heated from $T_1 = 40\\text{ K}$ to $T_2 = 2000\\text{ K}$ at constant volume, what is the total change in the internal energy of the gas? (Assume sharp transitions where degrees of freedom $f = 3$ below $100\\text{ K}$, $f = 5$ between $100\\text{ K}$ and $1500\\text{ K}$, and $f = 7$ above $1500\\text{ K}$).",
        "options": [
            "$6940 R$",
            "$4900 R$",
            "$5820 R$",
            "$7000 R$"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Internal energy $U$ is a state function given by $U(T) = \\frac{f(T)}{2} R T$ for $1\\text{ mole}$. At the initial state $T_1 = 40\\text{ K}$, the rotational and vibrational modes are frozen, so $f_1 = 3$, giving $U(T_1) = 1.5 R (40) = 60 R$. At the final state $T_2 = 2000\\text{ K}$, both rotational and vibrational modes are active, so $f_2 = 7$, giving $U(T_2) = 3.5 R (2000) = 7000 R$. The change in internal energy is $\\Delta U = U(T_2) - U(T_1) = 7000 R - 60 R = 6940 R$."
    },
    {
        "id": "phy_kinetic_theory-q16",
        "topicId": "molecular-gas-behavior",
        "difficulty": "hard",
        "estimatedTimeSeconds": 105,
        "question": "A real gas behaves differently from an ideal gas due to intermolecular forces and finite molecular volume, described by the van der Waals equation: $\\left(P + \\frac{a n^2}{V^2}\\right)(V - n b) = n R T$. At what temperature (known as the Boyle temperature, $T_B$) does a real gas obey the ideal gas law over a wide range of pressures in the limit of low pressures?",
        "options": [
            "$T_B = \\frac{a}{b R}$",
            "$T_B = \\frac{8a}{27b R}$",
            "$T_B = \\frac{2a}{b R}$",
            "$T_B = \\frac{a}{2b R}$"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The Boyle temperature $T_B$ is the temperature at which the second virial coefficient $B(T)$ vanishes. The van der Waals equation can be expanded in terms of $1/V$: $PV = RT [ 1 + (b - a/RT)(1/V) + \\dots ]$. Setting the second virial coefficient to zero: $b - a/(RT_B) = 0 \\implies T_B = a / (bR)$."
    },
    {
        "id": "phy_kinetic_theory-q17",
        "topicId": "kinetic-theory-pressure",
        "difficulty": "hard",
        "estimatedTimeSeconds": 105,
        "question": "A beam of gas molecules, each of mass $m$ and speed $v$, strikes a flat surface at an angle $\\theta$ relative to the normal of the surface. The number density of the molecules in the beam is $n$. If the collisions are perfectly elastic and the molecules bounce off the surface at the same angle, what is the pressure exerted on the surface by the beam?",
        "options": [
            "$n m v^2 \\cos\\theta$",
            "$2 n m v^2 \\cos^2\\theta$",
            "$2 n m v^2 \\cos\\theta$",
            "$n m v^2 \\cos^2\\theta$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The normal component of velocity for the incident molecules is $v_n = v \\cos\\theta$. The rate of molecules colliding with a unit area of the surface is the flux: $J = n v_n = n v \\cos\\theta$. In an elastic collision, each molecule experiences a change in normal momentum of $\\Delta p = 2 m v_n = 2 m v \\cos\\theta$. The pressure is the rate of momentum transfer per unit area: $P = J \\Delta p = (n v \\cos\\theta)(2 m v \\cos\\theta) = 2 n m v^2 \\cos^2\\theta$."
    },
    {
        "id": "phy_kinetic_theory-q18",
        "topicId": "molecular-gas-behavior",
        "difficulty": "hard",
        "estimatedTimeSeconds": 90,
        "question": "An ideal gas of molar mass $M$ is kept in a very tall vertical cylinder at a constant temperature $T$ under a uniform gravitational acceleration $g$. If the pressure at the bottom of the cylinder ($h=0$) is $P_0$, which of the following expressions correctly gives the pressure $P(h)$ as a function of height $h$?",
        "options": [
            "$P(h) = P_0 \\left(1 - \\frac{Mgh}{RT}\\right)$",
            "$P(h) = P_0 e^{-\\frac{Mgh}{RT}}$",
            "$P(h) = P_0 e^{-\\frac{gh}{RT}}$",
            "$P(h) = P_0 e^{-\\frac{Mgh}{k_B T}}$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "For a layer of thickness $dh$ at height $h$, the hydrostatic equilibrium is $dP = -\\rho g dh$. From the ideal gas law, density is $\\rho = PM/RT$. Substituting density gives $\\frac{dP}{P} = -\\frac{Mg}{RT} dh$. Integrating from $h=0$ (where $P=P_0$) to $h$ yields $P(h) = P_0 e^{-\\frac{Mgh}{RT}}$."
    }
]

batch_6 = {
    "phy_thermo": {
        "id": "phy_thermo",
        "averageQuestions": "1-2 questions per year",
        "whatYoullLearn": [
            "State and apply the Zeroth, First, and Second Laws of Thermodynamics",
            "Identify and calculate changes in thermodynamic state variables (P, V, T, U, S, H)",
            "Analyze work, heat, and internal energy in isothermal, adiabatic, isobaric, isochoric, and cyclic processes",
            "Explain the principles and limits of the Carnot heat engine and calculate its efficiency",
            "Determine the Coefficient of Performance (COP) of refrigerators and heat pumps"
        ],
        "concepts": [
            {
                "title": "Zeroth Law and Thermal Equilibrium",
                "explanation": "The Zeroth Law of Thermodynamics states that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This law establishes temperature as a fundamental, measurable state variable and forms the scientific basis for thermometry.",
                "example": "When a thermometer is placed in contact with a cup of hot coffee, heat flows until they reach thermal equilibrium. The temperature read by the thermometer is then identical to that of the coffee.",
                "trap": "Thermal equilibrium does not mean that the systems have the same internal energy or pressure; it only guarantees they have the same temperature."
            },
            {
                "title": "First Law of Thermodynamics and Sign Conventions",
                "explanation": "The First Law of Thermodynamics is a statement of conservation of energy: $\\Delta U = Q - W$, where $\\Delta U$ is the change in internal energy, $Q$ is the heat added to the system, and $W$ is the work done BY the system (physics sign convention). For a cyclic process, $\\Delta U = 0$, so $Q = W$.",
                "example": "If a gas absorbs $500\\text{ J}$ of heat and performs $300\\text{ J}$ of work on its surroundings, its internal energy increases by $\\Delta U = 500 - 300 = 200\\text{ J}$.",
                "trap": "In chemistry, the sign convention defines work done ON the system as positive, so $\\Delta U = Q + W$. Always double-check which convention is being used in a question; in physics, work done BY the gas during expansion is positive."
            },
            {
                "title": "Thermodynamic State Variables and Path Functions",
                "explanation": "State functions (like $P$, $V$, $T$, $U$, $S$, $H$) depend only on the current thermodynamic state of the system and are independent of the path. Path functions (like heat $Q$ and work $W$) depend on the specific sequence of states connecting the initial and final states.",
                "example": "If you heat a gas from state A to state B, the change in internal energy $\\Delta U = U_B - U_A$ is the same whether you do it isobarically or isothermally followed by isochoric heating, but the heat absorbed $Q$ and work done $W$ will differ significantly.",
                "trap": "Although $Q$ and $W$ are path functions, their difference $Q - W = \\Delta U$ is a state function."
            },
            {
                "title": "Thermodynamic Processes (Isothermal, Adiabatic, etc.)",
                "explanation": "Isothermal: $T = \\text{const}$, $\\Delta U = 0$, $W = nRT \\ln(V_f/V_i)$. Adiabatic: $Q = 0$, $PV^\\gamma = \\text{const}$, $W = \\frac{nR(T_i - T_f)}{\\gamma - 1}$. Isobaric: $P = \\text{const}$, $W = P\\Delta V$, $Q = n C_p \\Delta T$. Isochoric: $V = \\text{const}$, $W = 0$, $Q = n C_v \\Delta T$.",
                "example": "Rapid expansion of a gas (like releasing air from a tire valve) happens so quickly that no heat is exchanged, making it an adiabatic process, which results in significant cooling.",
                "trap": "In an adiabatic expansion, the temperature drops, whereas in an isothermal expansion, temperature remains constant because heat is continually exchanged with the surroundings."
            },
            {
                "title": "Second Law of Thermodynamics and Entropy",
                "explanation": "The Second Law states that the entropy of an isolated system always increases in an irreversible process ($dS \\ge 0$). Heat cannot spontaneously flow from a cooler body to a warmer body (Clausius statement), and no engine can convert heat entirely into work without rejecting some heat to a sink (Kelvin-Planck statement).",
                "example": "Mixing hot and cold water is an irreversible process that results in a net increase in the total entropy of the system, even though the total energy remains constant.",
                "trap": "While the entropy of a subsystem can decrease (e.g., water freezing into ice), the entropy of the universe (system + surroundings) must increase."
            },
            {
                "title": "Carnot Cycle and Refrigerator COP",
                "explanation": "The Carnot engine is a theoretical reversible cycle consisting of two isothermal and two adiabatic processes. Its efficiency is $\\eta = 1 - T_C/T_H$. A refrigerator operates in reverse; its Coefficient of Performance (COP) is $\\text{COP} = Q_C/W = T_C/(T_H - T_C)$.",
                "example": "A Carnot engine operating between $600\\text{ K}$ and $300\\text{ K}$ has an efficiency of $1 - 300/600 = 50\\%$. No real engine operating between these temperatures can exceed this efficiency.",
                "trap": "Efficiency can never be $100\\%$ (or $\\text{COP} = \\infty$) because that would require the sink temperature $T_C$ to be absolute zero ($0\\text{ K}$), which is impossible to reach according to the Third Law."
            }
        ],
        "formulas": [
            "Zeroth Law: $T_A = T_C \\text{ and } T_B = T_C \\implies T_A = T_B$",
            "First Law: $\\Delta U = Q - W$ (Physics convention: $W > 0$ for expansion)",
            "Work in Isobaric: $W = P(V_f - V_i)$",
            "Work in Isothermal: $W = nRT \\ln\\left(\\frac{V_f}{V_i}\\right)$",
            "Work in Adiabatic: $W = \\frac{P_i V_i - P_f V_f}{\\gamma - 1} = \\frac{nR(T_i - T_f)}{\\gamma - 1}$",
            "Adiabatic Relations: $PV^\\gamma = \\text{const}$, $TV^{\\gamma-1} = \\text{const}$, $P^{1-\\gamma} T^\\gamma = \\text{const}$",
            "Polytropic Process: $PV^n = \\text{const} \\implies C = C_v + \\frac{R}{1-n}$",
            "Molar Heat Capacities: $C_v = \\frac{f}{2}R$, $C_p = C_v + R = (1 + \\frac{f}{2})R$, $\\gamma = \\frac{C_p}{C_v} = 1 + \\frac{2}{f}$",
            "Carnot Engine Efficiency: $\\eta = 1 - \\frac{T_C}{T_H} = \\frac{W}{Q_H}$",
            "Refrigerator COP: $\\text{COP} = \\frac{Q_C}{W} = \\frac{T_C}{T_H - T_C}$",
            "Heat Pump COP: $\\text{COP}_{HP} = \\frac{Q_H}{W} = \\frac{T_H}{T_H - T_C} = \\text{COP} + 1$"
        ],
        "examTraps": [
            {
                "trap": "Confusion between $C_p$ and $C_v$",
                "warning": "When calculating heat transfer in processes, ensure you use $C_p$ for isobaric processes ($Q = n C_p \\Delta T$) and $C_v$ for isochoric processes ($Q = n C_v \\Delta T$). For internal energy changes, $\\Delta U = n C_v \\Delta T$ is ALWAYS true for an ideal gas, regardless of the process."
            },
            {
                "trap": "Temperature unit in efficiency/COP formulas",
                "warning": "Always convert temperatures to Kelvin (K) before plugging them into thermodynamic formulas (e.g., Carnot efficiency or refrigerator COP). Using Celsius ($^\\circ\\text{C}$) will yield completely incorrect answers."
            },
            {
                "trap": "Sign of Work in Cyclic Processes",
                "warning": "On a $P-V$ diagram, a clockwise cycle represents net positive work done BY the gas (heat engine). A counter-clockwise cycle represents net negative work done by the gas (refrigerator/heat pump). Do not swap these up!"
            }
        ],
        "questionPattern": [
            "Calculating temperature, work, heat, and internal energy changes in various individual or combined thermodynamic processes.",
            "Analyzing cyclic processes on P-V, T-S, or P-T diagrams to find net work, heat absorbed, and cycle efficiency.",
            "Using the first law of thermodynamics to find internal energy change and molar specific heats of gas mixtures.",
            "Determining efficiency of Carnot engines and COP of refrigerators operating between given temperatures."
        ],
        "quizQuestions": phy_thermo_questions
    },
    "phy_kinetic_theory": {
        "id": "phy_kinetic_theory",
        "averageQuestions": "1 question per year",
        "whatYoullLearn": [
            "Explain molecular behavior and properties of ideal gases using kinetic theory assumptions",
            "Relate macroscopic variables like pressure and temperature to microscopic molecular motions",
            "Calculate root-mean-square, average, and most probable molecular speeds",
            "Apply the law of equipartition of energy to determine degrees of freedom and specific heats of gases and solids",
            "Define and calculate the mean free path and collision frequency of gas molecules"
        ],
        "concepts": [
            {
                "title": "Molecular Behavior and Ideal Gas Laws",
                "explanation": "An ideal gas is modeled as a collection of point-like molecules undergoing continuous random motion and elastic collisions. The state of an ideal gas is governed by the equation of state: $PV = nRT = N k_B T$. Boyle's, Charles's, and Gay-Lussac's laws are special cases where one variable is held constant.",
                "example": "A weather balloon filled with Helium expands as it rises because the external atmospheric pressure decreases, demonstrating Boyle's Law.",
                "trap": "Real gases only behave ideally at high temperatures (where kinetic energy overcomes intermolecular attractions) and low pressures (where molecular volume is negligible compared to container volume)."
            },
            {
                "title": "Kinetic Theory of Pressure and Energy",
                "explanation": "Pressure is the macroscopic manifestation of microscopic molecular collisions with the container walls. Kinetic theory shows that $P = \\frac{1}{3} \\rho v_{rms}^2$. This directly links pressure to the average translational kinetic energy per unit volume: $P = \\frac{2}{3} E$.",
                "example": "Pumping air into a bicycle tire increases the number density of molecules, which increases the rate of wall collisions and therefore raises the internal pressure.",
                "trap": "Pressure does not depend on the speed of a single molecule, but on the statistical average of the squared speeds of all molecules ($v_{rms}^2$)."
            },
            {
                "title": "Molecular Speeds (RMS, Average, Most Probable)",
                "explanation": "Due to frequent collisions, gas molecules have a distribution of speeds described by the Maxwell-Boltzmann distribution. Three key statistical speeds are: 1. Most Probable: $v_{mp} = \\sqrt{2RT/M}$. 2. Average: $v_{avg} = \\sqrt{8RT/\\pi M}$. 3. Root-Mean-Square: $v_{rms} = \\sqrt{3RT/M}$. Their ratio is $v_{mp} < v_{avg} < v_{rms}$.",
                "example": "In a sample of Nitrogen gas at $300\\text{ K}$, the most common speed (peak of distribution) is $v_{mp} \\approx 422\\text{ m/s}$, the average is $v_{avg} \\approx 476\\text{ m/s}$, and the energy-representative speed is $v_{rms} \\approx 517\\text{ m/s}$.",
                "trap": "The average velocity of gas molecules in equilibrium is exactly zero because their motions are isotropic (equally likely in all directions), but their average speed is non-zero."
            },
            {
                "title": "Equipartition of Energy and Specific Heats",
                "explanation": "The law of equipartition of energy states that in thermal equilibrium, the average energy associated with each independent quadratic degree of freedom is $\\frac{1}{2} k_B T$ per molecule (or $\\frac{1}{2} RT$ per mole). Monatomic: 3 translational ($C_v = 1.5R$). Diatomic (room temp): 3 trans + 2 rot ($C_v = 2.5R$). Polyatomic: 3 trans + 3 rot ($C_v = 3R$). At high temperatures, vibrational modes activate, adding $R$ per mode to $C_v$.",
                "example": "Heating a diatomic gas like Carbon Monoxide ($CO$) from room temperature to $3000\\text{ K}$ increases its $C_v$ from $\\frac{5}{2}R$ to $\\frac{7}{2}R$ because its vibrational modes become active.",
                "trap": "Vibrational modes contribute twice as much energy ($k_B T$ per mode) as translational or rotational modes ($\\frac{1}{2} k_B T$ per mode) because a vibrational mode contains both kinetic and potential energy components."
            },
            {
                "title": "Mean Free Path and Collision Frequency",
                "explanation": "The mean free path ($\\lambda$) is the average distance traveled by a molecule between successive collisions, given by $\\lambda = \\frac{1}{\\sqrt{2} \\pi n d^2}$, where $n$ is the number density and $d$ is the molecular diameter. The collision frequency is $f = v_{avg}/\\lambda$.",
                "example": "In a vacuum chamber where the pressure is extremely low, the number density $n$ is small, so the mean free path can become larger than the dimensions of the chamber itself.",
                "trap": "If the temperature of a gas in a closed container of fixed volume is doubled, the molecular speeds increase, but the mean free path remains unchanged because the number density $n$ and molecular diameter $d$ are constant."
            }
        ],
        "formulas": [
            "Ideal Gas Law: $PV = nRT = N k_B T$",
            "Kinetic Pressure: $P = \\frac{1}{3} \\rho v_{rms}^2 = \\frac{1}{3} \\frac{N}{V} m v_{rms}^2$",
            "Kinetic Energy per molecule: $E_k = \\frac{3}{2} k_B T$ (translational only)",
            "Kinetic Energy per mole: $E_{\\text{molar}} = \\frac{3}{2} R T$ (translational only)",
            "Most Probable Speed: $v_{mp} = \\sqrt{\\frac{2RT}{M}} = \\sqrt{\\frac{2k_B T}{m}}$",
            "Average Speed: $v_{avg} = \\sqrt{\\frac{8RT}{\\pi M}} = \\sqrt{\\frac{8k_B T}{\\pi m}}$",
            "Root-Mean-Square Speed: $v_{rms} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3k_B T}{m}}$",
            "Molar Heat Capacity: $C_v = \\frac{f}{2}R$, $C_p = (\\frac{f}{2} + 1)R$, $\\gamma = 1 + \\frac{2}{f}$",
            "Mean Free Path: $\\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2} = \\frac{k_B T}{\\sqrt{2}\\pi P d^2}$",
            "Collision Frequency: $f = \\frac{v_{avg}}{\\lambda} = \\sqrt{2}\\pi n d^2 v_{avg}$",
            "Dulong-Petit Law for Solids: $C_v = 3R$ (due to $f=6$ per atom in 3D lattice)"
        ],
        "examTraps": [
            {
                "trap": "Molecular mass vs. Molar mass",
                "warning": "In speed calculations, make sure to use molar mass $M$ (in kg/mol, e.g., $0.028\\text{ kg/mol}$ for $N_2$) when using $R = 8.314\\text{ J/(mol K)}$, or molecular mass $m$ (in kg) when using Boltzmann constant $k_B = 1.38 \\times 10^{-23}\\text{ J/K}$."
            },
            {
                "trap": "Average velocity vs. Average speed",
                "warning": "The average velocity of molecules in a gas is zero due to symmetry, but the average speed is a positive value ($v_{avg} = \\sqrt{8RT/\\pi M}$). Read the question wording carefully."
            },
            {
                "trap": "Vibrational contribution to $C_v$",
                "warning": "Each vibrational mode contributes $1R$ to the molar heat capacity $C_v$ (not $0.5R$) because a harmonic oscillator has two quadratic energy terms (kinetic and potential energy)."
            }
        ],
        "questionPattern": [
            "Calculating rms, average, and most probable speeds of gas molecules under different temperature and mass conditions.",
            "Applying the law of equipartition of energy to find specific heats ($C_v$, $C_p$, $\\gamma$) of gases, mixtures, or solids.",
            "Analyzing how mean free path and collision rate scale with pressure, temperature, volume, and density.",
            "Evaluating molecular collisions with walls to calculate pressure or force exerted in elastic/inelastic interactions."
        ],
        "quizQuestions": phy_kinetic_theory_questions
    }
}

target_path = r"C:\Users\human\.gemini\antigravity\brain\d45a1739-9c09-47ff-a43b-64ca3db2cf33\scratch\batch_6.json"
os.makedirs(os.path.dirname(target_path), exist_ok=True)

with open(target_path, "w", encoding="utf-8") as f:
    json.dump(batch_6, f, indent=2, ensure_ascii=False)

print("SUCCESS")
