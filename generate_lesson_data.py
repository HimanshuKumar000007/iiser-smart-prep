import os
import json

def generate_data():
    phy_current_elec = {
        "id": "phy_current_elec",
        "averageQuestions": "1-2 questions per year",
        "whatYoullLearn": [
            "Understanding drift velocity and its relationship with electric field and relaxation time",
            "Analyzing Ohm's law, electrical conductivity, resistivity, and temperature dependence",
            "Applying Kirchhoff's rules to solve complex electrical networks",
            "Understanding emf, internal resistance, and cells in series and parallel combinations",
            "Analyzing Wheatstone bridge, meter bridge, and potentiometer principles and applications"
        ],
        "concepts": [
            {
                "title": "Drift Velocity and Relaxation Time",
                "explanation": "Under an electric field, charge carriers experience acceleration, but scatter frequently against lattice ions. This results in a small net drift velocity $v_d = \\frac{e E \\tau}{m}$ in the opposite direction of the field, where $\\tau$ is the average relaxation time between collisions. The relation between current and drift velocity is $I = n e A v_d$.",
                "example": "A copper conductor has $n \\approx 8.5 \\times 10^{28} \\text{ m}^{-3}$. For a current of 1 A in a 1 mm diameter wire, $v_d \\approx 0.1 \\text{ mm/s}$, which is extremely slow compared to the speed of signal propagation (nearly the speed of light).",
                "trap": "Do not confuse the thermal velocity of electrons (around $10^5 \\text{ m/s}$) with their drift velocity (around $10^{-4} \\text{ m/s}$). Thermal velocity is random and averages to zero current."
            },
            {
                "title": "Temperature Dependence of Resistivity",
                "explanation": "For metals, resistivity $\\rho(T) = \\rho_0 [1 + \\alpha(T - T_0)]$ increases with temperature because lattice vibrations increase, reducing the relaxation time $\\tau$ ($\\rho \\propto 1/\\tau$). For semiconductors and insulators, resistivity decreases exponentially with temperature because carrier concentration $n$ increases exponentially ($n(T) \\propto e^{-E_g / k_B T}$).",
                "example": "Nichrome and Manganin have very small temperature coefficients of resistance ($\\alpha$), making them suitable for standard resistance coils.",
                "trap": "For semiconductors, relaxation time $\\tau$ still decreases with temperature, but the exponential increase in carrier concentration $n$ dominates, causing resistivity to drop overall."
            },
            {
                "title": "Cells, EMF, and Internal Resistance",
                "explanation": "EMF ($E$) is the potential difference between cell terminals in an open circuit. When current $I$ is drawn, terminal voltage is $V = E - I r$ due to internal resistance $r$. If charging, $V = E + I r$.",
                "example": "A cell of 2.0 V emf and 0.5 ohm internal resistance connected to a 3.5 ohm external resistor draws a current of $I = 2.0 / (3.5 + 0.5) = 0.5\\text{ A}$. The terminal voltage is $V = 2.0 - (0.5 \\times 0.5) = 1.75\\text{ V}$.",
                "trap": "Terminal potential difference $V$ is equal to $E$ only if no current is flowing ($I=0$). It is less than $E$ during discharge and greater than $E$ during charging."
            },
            {
                "title": "Kirchhoff's Rules",
                "explanation": "Kirchhoff's Current Law (KCL): The algebraic sum of currents at any junction is zero, representing charge conservation. Kirchhoff's Voltage Law (KVL): The algebraic sum of potential changes around any closed loop is zero, representing energy conservation.",
                "example": "In a closed loop with a cell of emf $E_1$ and internal resistance $r_1$ connected to a resistor $R$, loop equation clockwise is $E_1 - I r_1 - I R = 0$.",
                "trap": "When applying KVL, traversing a cell from negative to positive terminal adds $+E$, while going from positive to negative terminal adds $-E$. Traversing a resistor in the direction of current subtracts $-IR$."
            },
            {
                "title": "Potentiometer and Meter Bridge",
                "explanation": "A potentiometer operates on the principle that the potential drop across a uniform wire is directly proportional to its length ($V \\propto L$). It draws zero current from the test cell at the balancing point, rendering it an ideal voltmeter. A Wheatstone bridge is balanced when $R_1/R_2 = R_3/R_4$, meaning no current flows through the galvanometer.",
                "example": "To compare emfs of two cells: $E_1 / E_2 = l_1 / l_2$. To find internal resistance: $r = R(l_1/l_2 - 1)$.",
                "trap": "If the driver cell emf is less than the test cell emf, a balance point cannot be obtained on the potentiometer wire."
            }
        ],
        "formulas": [
            "Current: I = dq / dt = n * e * A * v_d",
            "Current Density: J = I / A = n * e * v_d = \\sigma * E",
            "Resistivity: \\rho = m / (n * e^2 * \\tau) = 1 / \\sigma",
            "Resistance: R = \\rho * l / A",
            "Temperature Dependence: R(T) = R_0 * (1 + \\alpha * (T - T_0))",
            "Terminal Voltage: V = E - I * r (discharging), V = E + I * r (charging)",
            "Equivalent EMF (Series): E_eq = \\sum E_i, r_eq = \\sum r_i",
            "Equivalent EMF (Parallel, 2 cells): E_eq = (E_1 * r_2 + E_2 * r_1) / (r_1 + r_2), 1/r_eq = 1/r_1 + 1/r_2",
            "Wheatstone Bridge (Balanced): P/Q = R/S",
            "Potentiometer: E = k * l, where k is the potential gradient (V_primary / L_wire)",
            "Potentiometer Internal Resistance: r = R * ((l_1 - l_2) / l_2)"
        ],
        "examTraps": [
            {
                "trap": "Potentiometer Balance Point Failure",
                "warning": "If the balance point cannot be found (galvanometer deflects in only one direction throughout), check if: (1) driver cell emf is smaller than the test cell emf, or (2) the positive terminals of driver and test cells are not connected to the same starting point."
            },
            {
                "trap": "Resistivity vs. Resistance under Stretching",
                "warning": "When a wire is stretched to $n$ times its length, its resistance increases to $n^2 R$ (since area decreases to $A/n$ to conserve volume). However, its resistivity remains unchanged because resistivity is a material property."
            },
            {
                "trap": "Internal Resistance in Parallel Cell Formulas",
                "warning": "For parallel combinations of non-identical cells, pay close attention to polarity. If one cell is reversed, its emf term in the formula changes sign ($E_1 r_2 - E_2 r_1$ instead of $E_1 r_2 + E_2 r_1$)."
            }
        ],
        "questionPattern": [
            "Calculating current density and drift velocity in non-uniform cross-section wires",
            "Determining terminal potential difference of cells under charging and discharging conditions",
            "Solving circuit networks using nodal analysis and Kirchhoff's rules",
            "Finding unknown resistance and internal resistance using Wheatstone/meter bridges and potentiometers"
        ],
        "quizQuestions": [
            {
                "id": "phy_current_elec-q1",
                "topicId": "electric-current",
                "difficulty": "easy",
                "estimatedTimeSeconds": 45,
                "question": "A steady current of 2.0 A flows through a metal wire. How many electrons pass through a cross-section of this wire in 10 seconds? (Take elementary charge $e = 1.6 \\times 10^{-19}$ C)",
                "options": [
                    "$1.25 \\times 10^{20}$",
                    "$1.25 \\times 10^{19}$",
                    "$2.0 \\times 10^{19}$",
                    "$3.2 \\times 10^{20}$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Total charge $Q = I \\times t = 2.0\\text{ A} \\times 10\\text{ s} = 20\\text{ C}$. The number of electrons is $N = Q/e = 20 / (1.6 \\times 10^{-19}) = 1.25 \\times 10^{20}$ electrons."
            },
            {
                "id": "phy_current_elec-q2",
                "topicId": "ohms-law",
                "difficulty": "easy",
                "estimatedTimeSeconds": 45,
                "question": "A cylindrical wire of length $L$ and radius $r$ has a resistance $R$. If the wire is melted and drawn into a new wire of length $2L$, what is the new resistance of the wire?",
                "options": [
                    "$R/2$",
                    "$2R$",
                    "$4R$",
                    "$8R$"
                ],
                "correctAnswerIndex": 2,
                "explanation": "Since the volume of the wire remains constant during stretching, $V = A_1 L_1 = A_2 L_2$. Here $L_2 = 2L_1$, so $A_2 = A_1 / 2$. Resistance is given by $R = \\rho L/A$. The new resistance is $R' = \\rho L_2 / A_2 = \\rho (2L_1) / (A_1 / 2) = 4 (\\rho L_1 / A_1) = 4R$."
            },
            {
                "id": "phy_current_elec-q3",
                "topicId": "drift-velocity",
                "difficulty": "easy",
                "estimatedTimeSeconds": 45,
                "question": "How does the drift velocity $v_d$ of conduction electrons in a metal wire vary with the applied electric field $E$?",
                "options": [
                    "$v_d \\propto \\sqrt{E}$",
                    "$v_d \\propto E$",
                    "$v_d \\propto E^2$",
                    "$v_d$ is independent of $E$"
                ],
                "correctAnswerIndex": 1,
                "explanation": "The drift velocity of electrons is given by $v_d = \\frac{e E \\tau}{m}$, where $e$ is the electron charge, $m$ is the mass, and $\\tau$ is the average relaxation time. Thus, drift velocity is directly proportional to the applied electric field, $v_d \\propto E$."
            },
            {
                "id": "phy_current_elec-q4",
                "topicId": "drift-velocity",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "A copper wire of non-uniform cross-section has a steady current flowing through it. Which of the following quantities remains constant along the length of the wire?",
                "options": [
                    "Drift velocity",
                    "Current density",
                    "Electric field",
                    "Electric current"
                ],
                "correctAnswerIndex": 3,
                "explanation": "For a steady current flowing through a conductor, charge conservation dictates that the same amount of charge must enter and leave any cross-section per unit time. Therefore, the electric current $I$ remains constant. Since current density $J = I/A$, drift velocity $v_d = I/(n e A)$, and electric field $E = J/\\sigma$ all depend on the cross-sectional area $A$, they will vary along the non-uniform wire."
            },
            {
                "id": "phy_current_elec-q5",
                "topicId": "temperature-dependence-resistivity",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "The resistance of a platinum wire is found to be $5.0\\ \\Omega$ at the ice point ($0^\\circ\\text{C}$) and $5.5\\ \\Omega$ at the steam point ($100^\\circ\\text{C}$). When the wire is inserted into a hot bath, its resistance becomes $5.8\\ \\Omega$. Assuming a linear temperature dependence, what is the temperature of the bath?",
                "options": [
                    "$120^\\circ\\text{C}$",
                    "$150^\\circ\\text{C}$",
                    "$160^\\circ\\text{C}$",
                    "$180^\\circ\\text{C}$"
                ],
                "correctAnswerIndex": 2,
                "explanation": "Using the linear relation $R(T) = R_0(1 + \\alpha T)$, we have $\\alpha = \\frac{R_{100} - R_0}{100 \\cdot R_0} = \\frac{5.5 - 5.0}{500} = 0.001\\ ^\\circ\\text{C}^{-1}$. For resistance $R_T = 5.8\\ \\Omega$, we write $R_T = R_0(1 + \\alpha T) \\implies 5.8 = 5.0(1 + 0.001 \\cdot T) \\implies 1.16 = 1 + 0.001 \\cdot T \\implies 0.16 = 0.001 \\cdot T \\implies T = 160^\\circ\\text{C}$."
            },
            {
                "id": "phy_current_elec-q6",
                "topicId": "ohms-law",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "The current-voltage ($I-V$) characteristics of a non-ohmic device are shown in a graph where the slope $dI/dV$ is negative in a certain region. Which of the following statements is true for this negative resistance region?",
                "options": [
                    "The device absorbs power from the circuit and stores it as electrostatic energy",
                    "The dynamic resistance $r = dV/dI$ is negative, which can be used to amplify signals or sustain oscillations",
                    "Ohm's law holds perfectly since $V/I$ is still positive",
                    "The resistivity of the material increases exponentially with temperature"
                ],
                "correctAnswerIndex": 1,
                "explanation": "In a negative resistance region (like in a tunnel diode or thyristor), an increase in voltage leads to a decrease in current. The dynamic resistance $r = dV/dI$ is negative. This property is widely used in active circuits like oscillators and amplifiers to compensate for resistive energy losses and sustain oscillations."
            },
            {
                "id": "phy_current_elec-q7",
                "topicId": "cells-emf",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "A cell of emf $E$ and internal resistance $r$ is connected across a variable external resistor $R$. As $R$ is increased from zero, which graph correctly represents the variation of terminal potential difference $V$ across the cell?",
                "options": [
                    "$V$ increases linearly with $R$",
                    "$V$ decreases exponentially with $R$",
                    "$V$ increases asymptotically towards $E$ as $R \\to \\infty$",
                    "$V$ remains constant at $E$"
                ],
                "correctAnswerIndex": 2,
                "explanation": "The current in the circuit is $I = E/(R+r)$. The terminal potential difference is $V = I R = \\frac{E R}{R + r} = \\frac{E}{1 + r/R}$. When $R = 0$, $V = 0$. As $R \\to \\infty$, the term $r/R \\to 0$, so $V \\to E$. Thus, $V$ increases asymptotically towards the open-circuit emf $E$ as $R$ increases."
            },
            {
                "id": "phy_current_elec-q8",
                "topicId": "cells-emf",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "Two non-identical cells of emfs $E_1 = 6\\text{ V}$ and $E_2 = 4\\text{ V}$ and internal resistances $r_1 = 1\\ \\Omega$ and $r_2 = 2\\ \\Omega$ respectively are connected in parallel with their like terminals together. What is the equivalent emf of this parallel combination?",
                "options": [
                    "$5.0\\text{ V}$",
                    "$4.7\\text{ V}$",
                    "$5.3\\text{ V}$",
                    "$4.5\\text{ V}$"
                ],
                "correctAnswerIndex": 2,
                "explanation": "For two cells in parallel with similar polarities connected together, the equivalent emf is given by: $E_{eq} = \\frac{E_1 r_2 + E_2 r_1}{r_1 + r_2} = \\frac{6 \\times 2 + 4 \\times 1}{1 + 2} = \\frac{12 + 4}{3} = \\frac{16}{3} \\approx 5.33\\text{ V}$."
            },
            {
                "id": "phy_current_elec-q9",
                "topicId": "kirchhoffs-rules",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "In a circuit loop, a 12 V battery with internal resistance $1\\ \\Omega$ is being charged by an external charger with a current of 2 A. What is the terminal potential difference across the battery during this charging process?",
                "options": [
                    "10 V",
                    "11 V",
                    "12 V",
                    "14 V"
                ],
                "correctAnswerIndex": 3,
                "explanation": "During charging, current enters the positive terminal of the battery. The terminal potential difference is $V = E + I r$. Here, $E = 12\\text{ V}$, $I = 2\\text{ A}$, and $r = 1\\ \\Omega$. Thus, $V = 12 + 2 \\times 1 = 14\\text{ V}$."
            },
            {
                "id": "phy_current_elec-q10",
                "topicId": "kirchhoffs-rules",
                "difficulty": "medium",
                "estimatedTimeSeconds": 120,
                "question": "Twelve identical resistors, each of resistance $R$, are connected to form a cube skeleton. What is the equivalent resistance of this network between two diagonally opposite corners of the cube?",
                "options": [
                    "$\\frac{5}{6}R$",
                    "$\\frac{3}{4}R$",
                    "$\\frac{7}{12}R$",
                    "$R$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Let a current $6I$ enter one corner $A$ and leave the diagonally opposite corner $G$. Due to symmetry, the current divides equally into three paths at $A$, each carrying $2I$. At the next nodes, each of these currents divides into two paths of current $I$. At the nodes leading to $G$, these currents recombine to form three paths of $2I$ meeting at $G$. The potential difference is $V = (2I \\times R) + (I \\times R) + (2I \\times R) = 5I R$. The total current is $I_{tot} = 6I$. Thus, $R_{eq} = V / I_{tot} = 5I R / 6I = \\frac{5}{6}R$."
            },
            {
                "id": "phy_current_elec-q11",
                "topicId": "wheatstone-bridge",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "In a meter bridge experiment, the null point is obtained at a distance of $40\\text{ cm}$ from the left end when a standard resistance of $10\\ \\Omega$ is placed in the right gap. What is the value of the unknown resistance in the left gap?",
                "options": [
                    "$6.67\\ \\Omega$",
                    "$15\\ \\Omega$",
                    "$25\\ \\Omega$",
                    "$1.5\\ \\Omega$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "In a balanced meter bridge, the ratio of resistances is equal to the ratio of corresponding wire lengths: $X / R = l / (100 - l)$. Here, $l = 40\\text{ cm}$ and $R = 10\\ \\Omega$. So $X = R \\times \\frac{l}{100 - l} = 10 \\times \\frac{40}{60} = \\frac{40}{6} = 6.67\\ \\Omega$."
            },
            {
                "id": "phy_current_elec-q12",
                "topicId": "wheatstone-bridge",
                "difficulty": "medium",
                "estimatedTimeSeconds": 120,
                "question": "A potentiometer wire of length 10 m has a resistance of $20\\ \\Omega$. It is connected in series with a 2 V driver battery and a series resistance of $30\\ \\Omega$. What is the potential gradient along the potentiometer wire?",
                "options": [
                    "$0.08\\text{ V/m}$",
                    "$0.04\\text{ V/m}$",
                    "$0.20\\text{ V/m}$",
                    "$0.10\\text{ V/m}$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "The total resistance of the primary circuit is $R_{tot} = R_{wire} + R_{series} = 20 + 30 = 50\\ \\Omega$. The current in the primary circuit is $I = V / R_{tot} = 2 / 50 = 0.04\\text{ A}$. The potential drop across the wire is $V_{wire} = I \\times R_{wire} = 0.04\\text{ A} \\times 20\\ \\Omega = 0.8\\text{ V}$. The potential gradient $k$ is potential drop per unit length: $k = V_{wire} / L = 0.8\\text{ V} / 10\\text{ m} = 0.08\\text{ V/m}$."
            },
            {
                "id": "phy_current_elec-q13",
                "topicId": "electric-current",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "A hollow cylindrical conductor of length $L$ has inner radius $a$ and outer radius $b$. A radial current flows outwards from the inner surface to the outer surface when a potential difference is maintained between them. If the resistivity of the material is $\\rho$, what is the total radial resistance of this conductor?",
                "options": [
                    "$\\frac{\\rho}{2\\pi L} \\ln\\left(\\frac{b}{a}\\right)$",
                    "$\\frac{\\rho \\pi (b^2 - a^2)}{L}$",
                    "$\\frac{\\rho}{4\\pi L} \\left(\\frac{b-a}{b+a}\\right)$",
                    "$\\frac{\\rho L}{2\\pi (b^2 - a^2)}$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Consider a thin cylindrical shell of radius $r$ and thickness $dr$ concentric with the cylinder. The area perpendicular to the radial current flow is $A(r) = 2\\pi r L$. The resistance of this shell is $dR = \\rho \\frac{dr}{2\\pi r L}$. Integrating from $r = a$ to $r = b$: $R = \\int_a^b \\frac{\\rho dr}{2\\pi r L} = \\frac{\\rho}{2\\pi L} \\ln(b/a)$."
            },
            {
                "id": "phy_current_elec-q14",
                "topicId": "drift-velocity",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "In a metal, conduction electrons scatter off lattice vibrations (phonons) and impurities. The relaxation time $\\tau$ varies with absolute temperature $T$ as $\\tau \\propto T^{-1}$ at high temperatures. If the applied electric field is kept constant, how does the drift velocity $v_d$ and the electrical conductivity $\\sigma$ depend on temperature $T$ in this regime?",
                "options": [
                    "$v_d \\propto T$, $\\sigma \\propto T$",
                    "$v_d \\propto T^{-1}$, $\\sigma \\propto T^{-1}$",
                    "$v_d \\propto T^{-1/2}$, $\\sigma \\propto T^{-1/2}$",
                    "$v_d$ is independent of $T$, $\\sigma \\propto T^{-1}$"
                ],
                "correctAnswerIndex": 1,
                "explanation": "The drift velocity is given by $v_d = \\frac{e E \\tau}{m}$. Since $E$ is constant, $v_d \\propto \\tau \\propto T^{-1}$. The conductivity is $\\sigma = \\frac{n e^2 \\tau}{m}$, which is also proportional to $\\tau$. Therefore, $\\sigma \\propto T^{-1}$. Both drift velocity and conductivity decrease as $T^{-1}$ due to the increased rate of electron-phonon collisions at higher temperatures."
            },
            {
                "id": "phy_current_elec-q15",
                "topicId": "temperature-dependence-resistivity",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "A carbon resistor of resistance $R_c = 100\\ \\Omega$ (with temperature coefficient $\\alpha_c = -0.0005\\ ^\\circ\\text{C}^{-1}$) is connected in series with a metallic resistor of resistance $R_m$ (with temperature coefficient $\\alpha_m = 0.004\\ ^\\circ\\text{C}^{-1}$). If the total resistance of the series combination remains independent of temperature, what must be the value of $R_m$?",
                "options": [
                    "$12.5\\ \\Omega$",
                    "$25.0\\ \\Omega$",
                    "$125.0\\ \\Omega$",
                    "$800.0\\ \\Omega$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "The total resistance in series is $R(T) = R_c(T) + R_m(T) = R_{c0}(1 + \\alpha_c \\Delta T) + R_{m0}(1 + \\alpha_m \\Delta T)$. For $R(T)$ to be independent of temperature, the coefficient of $\\Delta T$ must sum to zero: $R_{c0} \\alpha_c + R_{m0} \\alpha_m = 0 \\implies R_{m0} = - \\frac{R_{c0} \\alpha_c}{\\alpha_m}$. Substituting the values: $R_{m0} = - \\frac{100 \\times (-0.0005)}{0.004} = \\frac{0.05}{0.004} = 12.5\\ \\Omega$."
            },
            {
                "id": "phy_current_elec-q16",
                "topicId": "cells-emf",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "An infinite ladder network is constructed using identical resistors of resistance $r$. Each repeating section consists of a series resistance $r$ and a shunt resistance $r$ connected in parallel across the remainder of the network. What is the equivalent resistance $R_{eq}$ of this network?",
                "options": [
                    "$\\frac{1+\\sqrt{5}}{2}r$",
                    "$\\frac{\\sqrt{5}-1}{2}r$",
                    "$(\\sqrt{3}-1)r$",
                    "$(\\sqrt{3}+1)r$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "For an infinite ladder network of resistors where each section consists of a series resistance $r$ and a parallel shunt resistance $r$, adding one more section at the input does not change the equivalent resistance $R_{eq}$. Thus, $R_{eq} = r + \\frac{r R_{eq}}{r + R_{eq}}$. Solving the quadratic equation $R_{eq}^2 - r R_{eq} - r^2 = 0$ gives the positive root $R_{eq} = \\frac{1 + \\sqrt{5}}{2} r$."
            },
            {
                "id": "phy_current_elec-q17",
                "topicId": "kirchhoffs-rules",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "In a circuit, six identical capacitors of capacitance $C$ are connected along the edges of a regular tetrahedron. What is the equivalent capacitance of this network between any two vertices?",
                "options": [
                    "$2C$",
                    "$\\frac{3}{2}C$",
                    "$\\frac{4}{3}C$",
                    "$\\frac{1}{2}C$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "By symmetry, if a potential difference is applied across vertices $A$ and $B$, the potential at the remaining two vertices $C$ and $D$ is equal ($V_C = V_D$). Therefore, no charge is stored in the capacitor connected between $C$ and $D$. Removing this capacitor from the network leaves the direct capacitor between $A$ and $B$ (capacitance $C$) in parallel with two identical series paths ($A \\to C \\to B$ and $A \\to D \\to B$), each having an equivalent capacitance of $C/2$. The parallel combination of these paths gives $C_{eq} = C + C/2 + C/2 = 2C$."
            },
            {
                "id": "phy_current_elec-q18",
                "topicId": "wheatstone-bridge",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "In a potentiometer experiment, a cell of emf $E$ is balanced at a length $L_1$ on the wire. When a shunt resistance $R$ is connected across this cell, the balance point shifts to a length $L_2$. If the primary driver cell has an internal resistance $r_0$ and the potentiometer wire itself has resistance $R_w$, how does this affect the measurement of the internal resistance $r$ of the test cell?",
                "options": [
                    "The measured internal resistance is $r = R(L_1 - L_2)/L_2$, independent of $r_0$ and $R_w$",
                    "The measured internal resistance is larger than the true value by a factor of $(1 + r_0/R_w)$",
                    "The measured internal resistance is smaller than the true value by a factor of $(1 - r_0/R_w)$",
                    "No balance point can be obtained if $r_0 > 0$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "In a potentiometer, the balance point occurs when the potential drop across the balanced length of the wire equals the terminal potential difference of the cell. Without shunt, the cell is in open circuit, so $E = k L_1$. With shunt $R$, the terminal voltage is $V = E \\frac{R}{R+r} = k L_2$. Taking the ratio, we get $E/V = (R+r)/R = L_1/L_2 \\implies 1 + r/R = L_1/L_2 \\implies r = R \\frac{L_1 - L_2}{L_2}$. Because the potential gradient $k$ cancels out when taking the ratio, the measured internal resistance is completely independent of the potential gradient, and thus independent of the driver cell's internal resistance $r_0$ and the wire resistance $R_w$."
            }
        ]
    }

    phy_moving_charges = {
        "id": "phy_moving_charges",
        "averageQuestions": "2 questions per year",
        "whatYoullLearn": [
            "Analyzing the magnetic force on moving charges and current-carrying conductors",
            "Understanding the motion of charged particles in uniform and non-uniform magnetic fields",
            "Applying the Biot-Savart law to calculate magnetic fields of wires and loops",
            "Using Ampere's circuital law to find magnetic fields in high-symmetry configurations like solenoids and toroids",
            "Calculating the torque on current loops and understanding galvanometer functionality"
        ],
        "concepts": [
            {
                "title": "Lorentz Force and Charged Particle Motion",
                "explanation": "A charge $q$ moving with velocity $\\vec{v}$ in electric field $\\vec{E}$ and magnetic field $\\vec{B}$ experiences the Lorentz force $\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})$. The magnetic force $\\vec{F}_B = q(\\vec{v} \\times \\vec{B})$ is always perpendicular to velocity, doing zero work. Consequently, it changes only the direction of velocity, not its speed.",
                "example": "A proton entering a perpendicular magnetic field undergoes uniform circular motion with radius $r = \\frac{mv}{qB}$ and time period $T = \\frac{2\\pi m}{qB}$, which is independent of the speed.",
                "trap": "Magnetic fields cannot change the kinetic energy of a charged particle. If a question asks for the change in kinetic energy of a particle moving solely in a magnetic field, it is always zero."
            },
            {
                "title": "Biot-Savart Law and Circular Loops",
                "explanation": "The Biot-Savart law describes the magnetic field $d\\vec{B}$ due to a current element $Id\\vec{l}$: $d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I d\\vec{l} \\times \\hat{r}}{r^2}$. For a circular loop of radius $R$ carrying current $I$, the magnetic field at the center is $B = \\frac{\\mu_0 I}{2R}$, and at a distance $x$ along the axis, it is $B(x) = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}$.",
                "example": "At a large distance $x \\gg R$, the field behaves like a magnetic dipole: $B(x) \\approx \\frac{\\mu_0 M}{2\\pi x^3}$, where $M = I \\pi R^2$ is the magnetic dipole moment.",
                "trap": "Be careful with direction! Use the right-hand rule where fingers curl along the current and the thumb points in the direction of the magnetic field at the center."
            },
            {
                "title": "Ampere's Circuital Law",
                "explanation": "Ampere's law states that the line integral of the magnetic field $\\vec{B}$ around any closed loop is equal to $\\mu_0$ times the total current passing through the surface bounded by the loop: $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enclosed}$. It is the magnetic equivalent of Gauss's law.",
                "example": "For an infinite wire, taking a circular Amperian loop of radius $r$ gives $B(2\\pi r) = \\mu_0 I \\implies B = \\frac{\\mu_0 I}{2\\pi r}$.",
                "trap": "Ampere's law holds for any closed loop, but is only useful for calculating $B$ when the magnetic field is tangent to the loop and has constant magnitude along it due to symmetry."
            },
            {
                "title": "Solenoids and Toroids",
                "explanation": "An ideal solenoid has a long length compared to its radius, rendering the external magnetic field practically zero. Inside, the field is uniform, parallel to the axis, and given by $B = \\mu_0 n I$, where $n = N/L$ is the number of turns per unit length. A toroid is a solenoid bent into a circle, with $B = \\mu_0 n I$ inside and zero outside.",
                "example": "At the end of a long solenoid, the magnetic field is exactly half of that at the center, i.e., $B_{end} = \\frac{1}{2} \\mu_0 n I$.",
                "trap": "In non-ideal solenoids, the field near the edge starts fringing, causing the axial field to drop to half its central value at the physical end of the coil."
            },
            {
                "title": "Torque on a Current Loop and Galvanometer",
                "explanation": "A current loop of area vector $\\vec{A}$ carrying current $I$ in a uniform magnetic field $\\vec{B}$ experiences a torque $\\vec{\\tau} = \\vec{M} \\times \\vec{B}$, where $\\vec{M} = I\\vec{A}$ is the magnetic dipole moment. Moving coil galvanometers use a radial magnetic field to ensure that the angle between $\\vec{A}$ and $\\vec{B}$ remains $90^\\circ$, making torque constant and linear with current: $\\tau = N I A B = C \\theta$.",
                "example": "A galvanometer is converted to an ammeter by connecting a small shunt resistance $S$ in parallel ($S = \\frac{I_g R_g}{I - I_g}$), and to a voltmeter by connecting a large resistance $R$ in series ($R = \\frac{V}{I_g} - R_g$).",
                "trap": "The magnetic force on a closed current loop in a uniform magnetic field is always zero, but the torque is zero only when the magnetic dipole moment is aligned with the magnetic field."
            }
        ],
        "formulas": [
            "Lorentz Force: \\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})",
            "Magnetic Force on Wire: \\vec{F} = I(\\vec{L} \\times \\vec{B})",
            "Cyclotron Radius: r = m*v / (q*B) = \\sqrt{2*m*K} / (q*B)",
            "Cyclotron Frequency: f = q*B / (2*\\pi*m)",
            "Biot-Savart Law: d\\vec{B} = (\\mu_0 / 4\\pi) * I * (d\\vec{l} \\times \\vec{r}) / r^3",
            "Magnetic Field of Circular Loop (Center): B = \\mu_0 * I / (2 * R)",
            "Magnetic Field of Circular Loop (Axis): B(x) = \\mu_0 * I * R^2 / (2 * (R^2 + x^2)^{3/2})",
            "Ampere's Circuital Law: \\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 * I_enclosed",
            "Solenoid (Inside Center): B = \\mu_0 * n * I, where n = N/L",
            "Torque on Current Loop: \\vec{\\tau} = \\vec{M} \\times \\vec{B}, where \\vec{M} = N * I * \\vec{A}",
            "Galvanometer Deflection: \\theta = (N * B * A / C) * I",
            "Ammeter Shunt: S = I_g * R_g / (I - I_g)",
            "Voltmeter Series Resistance: R = V / I_g - R_g"
        ],
        "examTraps": [
            {
                "trap": "Zero Work Done by Magnetic Field",
                "warning": "A purely magnetic field never changes the speed or kinetic energy of a charged particle. If a question asks for the final speed of a particle accelerated only by a magnetic field, the speed remains equal to its initial speed."
            },
            {
                "trap": "Net Force vs. Net Torque on a Loop",
                "warning": "In a uniform magnetic field, the net magnetic force on any closed current-carrying loop is always zero, regardless of its shape. However, the net torque is only zero when the magnetic moment is parallel or antiparallel to the field."
            },
            {
                "trap": "Ammeter and Voltmeter Conversion Resistances",
                "warning": "An ammeter must have a very low resistance (so it is connected in parallel with a shunt), whereas a voltmeter must have a very high resistance (so it is connected in series with a large resistance). Do not swap these configurations in numerical problems."
            }
        ],
        "questionPattern": [
            "Determining the trajectory of charged particles in combined electric and magnetic fields",
            "Calculating magnetic fields of wire configurations combining straight lines and circular arcs",
            "Applying Ampere's law for cylinders and thick wires with variable current density",
            "Solving torque and equilibrium configurations for current loops in magnetic fields"
        ],
        "quizQuestions": [
            {
                "id": "phy_moving_charges-q1",
                "topicId": "magnetic-force",
                "difficulty": "easy",
                "estimatedTimeSeconds": 45,
                "question": "A proton is moving along the positive x-axis in a region where a uniform magnetic field points along the positive y-axis. What is the direction of the magnetic force acting on the proton?",
                "options": [
                    "Positive z-axis",
                    "Negative z-axis",
                    "Positive y-axis",
                    "Negative x-axis"
                ],
                "correctAnswerIndex": 0,
                "explanation": "The magnetic force on a charge $q$ is $\\vec{F} = q(\\vec{v} \\times \\vec{B})$. Since the proton has a positive charge ($q > 0$), velocity is along $+\\hat{i}$, and magnetic field is along $+\\hat{j}$, the force is in the direction of $\\hat{i} \\times \\hat{j} = \\hat{k}$, which is the positive z-axis."
            },
            {
                "id": "phy_moving_charges-q2",
                "topicId": "motion-magnetic-field",
                "difficulty": "easy",
                "estimatedTimeSeconds": 45,
                "question": "An electron and a proton enter a uniform perpendicular magnetic field with the same kinetic energy. How do the radii of their circular paths compare?",
                "options": [
                    "The electron's path has a larger radius",
                    "The proton's path has a larger radius",
                    "Both paths have the same radius",
                    "The paths are straight lines"
                ],
                "correctAnswerIndex": 1,
                "explanation": "The radius of circular motion in a magnetic field is $r = \\frac{mv}{qB} = \\frac{\\sqrt{2mK}}{qB}$, where $K$ is the kinetic energy. Since both particles have the same charge magnitude ($q = e$) and kinetic energy $K$, the radius is proportional to the square root of the mass, $r \\propto \\sqrt{m}$. Since the proton is much heavier than the electron ($m_p \\approx 1836 m_e$), the proton's path has a much larger radius."
            },
            {
                "id": "phy_moving_charges-q3",
                "topicId": "biot-savart-law",
                "difficulty": "easy",
                "estimatedTimeSeconds": 45,
                "question": "A circular wire loop of radius $R$ carries a current $I$. What is the magnitude of the magnetic field at the center of the loop?",
                "options": [
                    "$\\frac{\\mu_0 I}{4\\pi R}$",
                    "$\\frac{\\mu_0 I}{2\\pi R}$",
                    "$\\frac{\\mu_0 I}{2 R}$",
                    "$\\frac{\\mu_0 I}{4 R}$"
                ],
                "correctAnswerIndex": 2,
                "explanation": "From the Biot-Savart law, the magnetic field at the center of a circular loop of radius $R$ carrying current $I$ is $B = \\frac{\\mu_0 I}{2R}$."
            },
            {
                "id": "phy_moving_charges-q4",
                "topicId": "amperes-circuital-law",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "A long straight solid copper wire of radius $R$ carries a steady current $I$ uniformly distributed across its cross-section. How does the magnetic field magnitude $B$ vary with the distance $r$ from the axis of the wire?",
                "options": [
                    "$B \\propto r$ inside ($r < R$) and $B \\propto 1/r$ outside ($r > R$)",
                    "$B \\propto 1/r$ inside ($r < R$) and $B \\propto r$ outside ($r > R$)",
                    "$B$ is zero inside ($r < R$) and $B \\propto 1/r$ outside ($r > R$)",
                    "$B \\propto r^2$ inside ($r < R$) and $B \\propto 1/r^2$ outside ($r > R$)"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Using Ampere's circuital law: Inside ($r < R$), the enclosed current is $I_{encl} = I \\frac{\\pi r^2}{\\pi R^2} = I \\frac{r^2}{R^2}$. Thus, $B(2\\pi r) = \\mu_0 I \\frac{r^2}{R^2} \\implies B = \\frac{\\mu_0 I r}{2\\pi R^2}$, which means $B \\propto r$. Outside ($r > R$), the enclosed current is $I$. Thus, $B(2\\pi r) = \\mu_0 I \\implies B = \\frac{\\mu_0 I}{2\\pi r}$, which means $B \\propto 1/r$."
            },
            {
                "id": "phy_moving_charges-q5",
                "topicId": "solenoid",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "A long solenoid has $n$ turns per unit length and carries a current $I$. If the solenoid is cut in half and the same current $I$ is passed through one of the halves, what is the magnetic field at the center of this new solenoid compared to the original value $B_0$?",
                "options": [
                    "$B_0 / 2$",
                    "$B_0$",
                    "$2 B_0$",
                    "$4 B_0$"
                ],
                "correctAnswerIndex": 1,
                "explanation": "The magnetic field inside a long solenoid near its center is $B = \\mu_0 n I$, where $n = N/L$ is the number of turns per unit length. When the solenoid is cut in half, both the number of turns $N$ and the length $L$ are halved, so the turns per unit length $n = (N/2)/(L/2) = N/L$ remains unchanged. Since the current $I$ is also the same, the magnetic field remains $B = B_0$."
            },
            {
                "id": "phy_moving_charges-q6",
                "topicId": "torque-current-loop",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "A rectangular current loop carrying current $I$ is placed in a uniform magnetic field $\\vec{B}$. In which orientation is the loop in stable equilibrium?",
                "options": [
                    "When the plane of the loop is parallel to the magnetic field",
                    "When the plane of the loop is perpendicular to the magnetic field and the magnetic dipole moment $\\vec{M}$ is parallel to $\\vec{B}$",
                    "When the plane of the loop is perpendicular to the magnetic field and the magnetic dipole moment $\\vec{M}$ is antiparallel to $\\vec{B}$",
                    "The loop has no equilibrium position in a uniform magnetic field"
                ],
                "correctAnswerIndex": 1,
                "explanation": "The potential energy of a magnetic dipole in a magnetic field is $U = -\\vec{M} \\cdot \\vec{B} = -M B \\cos\\theta$. For stable equilibrium, the potential energy must be a minimum, which occurs when $\\theta = 0$, meaning the magnetic dipole moment $\\vec{M}$ is parallel to the magnetic field $\\vec{B}$. Since $\\vec{M}$ is perpendicular to the plane of the loop, this corresponds to the plane of the loop being perpendicular to $\\vec{B}$."
            },
            {
                "id": "phy_moving_charges-q7",
                "topicId": "magnetic-force",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "Two long, parallel wires separated by a distance $d$ carry currents $I_1$ and $I_2$ in opposite directions. What is the nature and magnitude of the force per unit length between them?",
                "options": [
                    "Attractive, $\\frac{\\mu_0 I_1 I_2}{2\\pi d}$",
                    "Repulsive, $\\frac{\\mu_0 I_1 I_2}{2\\pi d}$",
                    "Attractive, $\\frac{\\mu_0 I_1 I_2}{4\\pi d}$",
                    "Repulsive, $\\frac{\\mu_0 I_1 I_2}{4\\pi d}$"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Parallel wires carrying currents in opposite directions (antiparallel currents) repel each other. The magnitude of the force per unit length is given by Ampere's force law: $F/L = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$."
            },
            {
                "id": "phy_moving_charges-q8",
                "topicId": "motion-magnetic-field",
                "difficulty": "medium",
                "estimatedTimeSeconds": 120,
                "question": "A student projects a charged particle into a uniform magnetic field at an angle of $60^\\circ$ to the field lines. What is the ratio of the pitch of its helical path to the radius of its circular projection?",
                "options": [
                    "$\\frac{2\\pi}{\\sqrt{3}}$",
                    "$2\\pi \\sqrt{3}$",
                    "$\\pi$",
                    "$\\frac{\\pi}{\\sqrt{3}}$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Let the velocity of the particle be $v$. The component parallel to the field is $v_{\\parallel} = v \\cos\\theta$, and the component perpendicular is $v_{\\perp} = v \\sin\\theta$. The radius of the helix is $r = \\frac{m v_{\\perp}}{qB} = \\frac{m v \\sin\\theta}{qB}$. The pitch is the distance traveled along the field in one time period $T = \\frac{2\\pi m}{q B}$: $p = v_{\\parallel} T = v \\cos\\theta \\frac{2\\pi m}{qB}$. The ratio of pitch to radius is: $\\frac{p}{r} = \\frac{v \\cos\\theta \\frac{2\\pi m}{qB}}{\\frac{m v \\sin\\theta}{qB}} = 2\\pi \\cot\\theta$. For $\\theta = 60^\\circ$, $\\cot 60^\\circ = 1/\\sqrt{3}$. Thus, $\\frac{p}{r} = \\frac{2\\pi}{\\sqrt{3}}$."
            },
            {
                "id": "phy_moving_charges-q9",
                "topicId": "biot-savart-law",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "At what distance along the axis from the center of a circular current-carrying coil of radius $R$ is the magnetic field equal to $\\frac{1}{8}$ of its value at the center?",
                "options": [
                    "$R$",
                    "$\\sqrt{3}R$",
                    "$2R$",
                    "$\\sqrt{8}R$"
                ],
                "correctAnswerIndex": 1,
                "explanation": "The magnetic field on the axis of a circular coil is $B(x) = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}$, and at the center it is $B_0 = \\frac{\\mu_0 I}{2R}$. We are given $B(x) = \\frac{1}{8} B_0 \\implies \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} = \\frac{1}{8} \\frac{\\mu_0 I}{2R} \\implies \\frac{R^2}{(R^2+x^2)^{3/2}} = \\frac{1}{8R} \\implies (R^2+x^2)^{3/2} = 8 R^3$. Taking the $2/3$ power of both sides: $R^2 + x^2 = (8 R^3)^{2/3} = 4 R^2 \\implies x^2 = 3 R^2 \\implies x = \\sqrt{3}R$."
            },
            {
                "id": "phy_moving_charges-q10",
                "topicId": "magnetic-force",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "A galvanometer of resistance $50\\ \\Omega$ gives a full-scale deflection for a current of $2\\text{ mA}$. How can it be converted into an ammeter capable of measuring currents up to $2\\text{ A}$?",
                "options": [
                    "By connecting a $0.05\\ \\Omega$ resistor in parallel",
                    "By connecting a $0.05\\ \\Omega$ resistor in series",
                    "By connecting a $50\\ \\Omega$ resistor in parallel",
                    "By connecting a $4950\\ \\Omega$ resistor in series"
                ],
                "correctAnswerIndex": 0,
                "explanation": "To convert a galvanometer to an ammeter, a shunt resistor $S$ is connected in parallel. The shunt value is: $S = \\frac{I_g R_g}{I - I_g} = \\frac{0.002 \\times 50}{2 - 0.002} = \\frac{0.1}{1.998} \\approx 0.05\\ \\Omega$."
            },
            {
                "id": "phy_moving_charges-q11",
                "topicId": "motion-magnetic-field",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "A beam of electrons passes undeflected through a velocity selector containing mutually perpendicular electric and magnetic fields of magnitudes $E = 1.2 \\times 10^5\\text{ V/m}$ and $B = 0.4\\text{ T}$ respectively. What is the speed of the electrons?",
                "options": [
                    "$3.0 \\times 10^5\\text{ m/s}$",
                    "$4.8 \\times 10^4\\text{ m/s}$",
                    "$3.3 \\times 10^{-6}\\text{ m/s}$",
                    "$3.0 \\times 10^6\\text{ m/s}$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "For a particle to pass undeflected through a velocity selector, the electric force must balance the magnetic force: $q E = q v B \\implies v = E/B$. Here, $v = \\frac{1.2 \\times 10^5\\text{ V/m}}{0.4\\text{ T}} = 3.0 \\times 10^5\\text{ m/s}$."
            },
            {
                "id": "phy_moving_charges-q12",
                "topicId": "torque-current-loop",
                "difficulty": "medium",
                "estimatedTimeSeconds": 90,
                "question": "In a moving coil galvanometer, the pole pieces of the magnet are made cylindrical and a soft iron core is placed at the center of the coil. What is the primary purpose of this design?",
                "options": [
                    "To increase the torsional constant of the spring",
                    "To make the magnetic field radial and maximize torque for all positions of the coil",
                    "To shield the coil from external electrostatic disturbances",
                    "To reduce the electrical resistance of the coil"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Cylindrical pole pieces combined with a coaxial soft iron core produce a radial magnetic field. In a radial magnetic field, the plane of the coil is always parallel to the magnetic field lines (meaning the area vector is perpendicular to the field) regardless of the rotation angle. This ensures that the angle between the magnetic moment and the magnetic field is always $90^\\circ$, keeping the torque maximal and directly proportional to the current ($\\tau = N I A B$)."
            },
            {
                "id": "phy_moving_charges-q13",
                "topicId": "motion-magnetic-field",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "A particle of mass $m$ and charge $q$ enters a region of uniform magnetic field $B$ pointing perpendicularly into the page. The field has a finite width $d$. If the initial velocity $v$ of the particle is perpendicular to the boundary and $d < \\frac{mv}{qB}$, what is the angle of deflection $\\theta$ of the particle as it exits the magnetic field?",
                "options": [
                    "$\\theta = \\sin^{-1}\\left(\\frac{q B d}{m v}\\right)$",
                    "$\\theta = \\cos^{-1}\\left(\\frac{q B d}{m v}\\right)$",
                    "$\\theta = \\tan^{-1}\\left(\\frac{q B d}{m v}\\right)$",
                    "$\\theta = \\frac{q B d}{m v}$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Inside the magnetic field, the particle moves in a circular path of radius $R = \\frac{mv}{qB}$. Let the center of the path be at $(0, R)$ if the particle enters at the origin $(0,0)$ moving along the x-axis. The equation of the circle is $x^2 + (y-R)^2 = R^2$. At the exit boundary, $x = d$. Substituting this: $d^2 + (y-R)^2 = R^2 \\implies (y-R)^2 = R^2 - d^2 \\implies y = R - \\sqrt{R^2-d^2}$. The velocity vector at any point is tangent to the circle. The angle $\\theta$ that the velocity makes with the initial direction (x-axis) is equal to the angle subtended by the arc at the center. From the geometry, $\\sin\\theta = \\frac{d}{R}$. Substituting $R = \\frac{mv}{qB}$, we get $\\sin\\theta = \\frac{q B d}{m v} \\implies \\theta = \\sin^{-1}\\left(\\frac{q B d}{m v}\\right)$."
            },
            {
                "id": "phy_moving_charges-q14",
                "topicId": "biot-savart-law",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "A thin non-conducting disk of radius $R$ has a uniform surface charge density $\\sigma$. The disk rotates about its central axis with a constant angular velocity $\\omega$. What is the magnetic field at the center of the disk?",
                "options": [
                    "$\\frac{1}{2} \\mu_0 \\sigma \\omega R$",
                    "$\\mu_0 \\sigma \\omega R$",
                    "$\\frac{1}{4} \\mu_0 \\sigma \\omega R$",
                    "$\\frac{1}{3} \\mu_0 \\sigma \\omega R$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Consider a ring of radius $r$ and width $dr$ on the disk. The charge on this ring is $dq = \\sigma (2\\pi r dr)$. The current due to the rotation of this ring is $dI = \\frac{dq}{T} = \\frac{dq \\omega}{2\\pi} = \\sigma \\omega r dr$. The magnetic field at the center due to this current ring is $dB = \\frac{\\mu_0 dI}{2r} = \\frac{\\mu_0 \\sigma \\omega dr}{2}$. Integrating from $r = 0$ to $r = R$: $B = \\int_0^R \\frac{\\mu_0 \\sigma \\omega}{2} dr = \\frac{1}{2} \\mu_0 \\sigma \\omega R$."
            },
            {
                "id": "phy_moving_charges-q15",
                "topicId": "amperes-circuital-law",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "A long cylindrical wire of radius $R$ carries a current $I$ such that the current density $J$ is non-uniform and varies with radial distance $r$ from the axis as $J(r) = J_0 \\left(1 - \\frac{r^2}{R^2}\\right)$. What is the magnetic field inside the wire at a distance $r < R$?",
                "options": [
                    "$\\frac{\\mu_0 J_0}{2} \\left(r - \\frac{r^3}{2R^2}\\right)$",
                    "$\\frac{\\mu_0 J_0}{2} \\left(r - \\frac{r^3}{4R^2}\\right)$",
                    "$\\frac{\\mu_0 J_0}{2} \\left(r - \\frac{r^3}{3R^2}\\right)$",
                    "$\\frac{\\mu_0 J_0 r}{2}$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Using Ampere's Law, $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{encl}$. For an Amperian loop of radius $r < R$, the enclosed current is $I_{encl}(r) = \\int_0^r J(r') 2\\pi r' dr' = 2\\pi J_0 \\int_0^r (r' - r'^3/R^2) dr' = 2\\pi J_0 [\\frac{r^2}{2} - \\frac{r^4}{4R^2}] = \\pi J_0 r^2 (1 - \\frac{r^2}{2R^2})$. Ampere's Law gives $B(2\\pi r) = \\mu_0 I_{encl} \\implies B = \\frac{\\mu_0 \\pi J_0 r^2 (1 - r^2/2R^2)}{2\\pi r} = \\frac{\\mu_0 J_0 r}{2} \\left(1 - \\frac{r^2}{2R^2}\\right) = \\frac{\\mu_0 J_0}{2} \\left(r - \\frac{r^3}{2R^2}\\right)$."
            },
            {
                "id": "phy_moving_charges-q16",
                "topicId": "motion-magnetic-field",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "A charged particle of mass $m$ and charge $q$ is released from rest at the origin in a region with a uniform electric field $\\vec{E} = E_0 \\hat{j}$ and a uniform magnetic field $\\vec{B} = B_0 \\hat{k}$. Which of the following equations describes the trajectory of the particle?",
                "options": [
                    "A cycloid in the xy-plane: $x(t) = \\frac{E_0}{\\omega B_0} (\\omega t - \\sin \\omega t)$, $y(t) = \\frac{E_0}{\\omega B_0} (1 - \\cos \\omega t)$",
                    "A helix along the z-axis: $x(t) = R \\cos \\omega t$, $y(t) = R \\sin \\omega t$, $z(t) = \\frac{q E_0}{2m} t^2$",
                    "A circle in the xy-plane: $x(t) = R \\sin \\omega t$, $y(t) = R (1 - \\cos \\omega t)$",
                    "A parabola in the yz-plane: $y(t) = \\frac{q E_0}{2m} t^2$, $z(t) = 0$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "In crossed electric and magnetic fields ($\\vec{E} = E_0\\hat{j}$, $\\vec{B} = B_0\\hat{k}$), the equations of motion are $m \\frac{dv_x}{dt} = q v_y B_0$ and $m \\frac{dv_y}{dt} = q E_0 - q v_x B_0$. Since the particle starts from rest, integrating these equations with $\\omega = \\frac{q B_0}{m}$ yields the cycloid equations: $x(t) = \\frac{E_0}{\\omega B_0}(\\omega t - \\sin\\omega t)$ and $y(t) = \\frac{E_0}{\\omega B_0}(1 - \\cos\\omega t)$."
            },
            {
                "id": "phy_moving_charges-q17",
                "topicId": "solenoid",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "A toroid has a rectangular cross-section of inner radius $a$, outer radius $b$, and height $h$. It is closely wound with $N$ turns carrying current $I$. What is the total magnetic flux $\\Phi$ through the cross-section of this toroid?",
                "options": [
                    "$\\frac{\\mu_0 N I h}{2\\pi} \\ln\\left(\\frac{b}{a}\\right)$",
                    "$\\frac{\\mu_0 N I h (b-a)}{2\\pi(b+a)}$",
                    "$\\frac{\\mu_0 N I h}{\\pi} \\ln\\left(\\frac{b}{a}\\right)$",
                    "$\\frac{\\mu_0 N I (b^2 - a^2)}{2 R}$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "The magnetic field inside the toroid at a radial distance $r$ from the center is $B(r) = \\frac{\\mu_0 N I}{2\\pi r}$. The area element for a vertical strip of height $h$ and width $dr$ is $dA = h dr$. The magnetic flux through this strip is $d\\Phi = B dA = \\frac{\\mu_0 N I h}{2\\pi r} dr$. Integrating from $r = a$ to $r = b$: $\\Phi = \\int_a^b \\frac{\\mu_0 N I h}{2\\pi r} dr = \\frac{\\mu_0 N I h}{2\\pi} \\ln(b/a)$."
            },
            {
                "id": "phy_moving_charges-q18",
                "topicId": "torque-current-loop",
                "difficulty": "hard",
                "estimatedTimeSeconds": 150,
                "question": "A planar loop of arbitrary shape carrying a current $I$ lies in the xy-plane. It is placed in a uniform magnetic field $\\vec{B} = B_x \\hat{i} + B_y \\hat{j} + B_z \\hat{k}$. What is the net magnetic force $\\vec{F}$ and the net torque $\\vec{\\tau}$ acting on the loop? (Let the area vector of the loop be $\\vec{A} = A_0 \\hat{k}$)",
                "options": [
                    "$\\vec{F} = 0$, $\\vec{\\tau} = I A_0 (-B_y \\hat{i} + B_x \\hat{j})$",
                    "$\\vec{F} = 0$, $\\vec{\\tau} = I A_0 (B_y \\hat{i} - B_x \\hat{j})$",
                    "$\\vec{F} = 0$, $\\vec{\\tau} = I A_0 (B_x \\hat{i} + B_y \\hat{j})$",
                    "$\\vec{F} = I A_0 B_z \\hat{k}$, $\\vec{\\tau} = 0$"
                ],
                "correctAnswerIndex": 0,
                "explanation": "For any closed loop in a uniform magnetic field, the net force is always zero ($\\vec{F} = 0$). The net torque is given by $\\vec{\\tau} = \\vec{M} \\times \\vec{B}$. Since the loop lies in the xy-plane, its magnetic dipole moment is $\\vec{M} = I \\vec{A} = I A_0 \\hat{k}$. Thus, $\\vec{\\tau} = (I A_0 \\hat{k}) \times (B_x \\hat{i} + B_y \\hat{j} + B_z \\hat{k}) = -I A_0 B_y \\hat{i} + I A_0 B_x \\hat{j} = I A_0 (-B_y \\hat{i} + B_x \\hat{j})$."
            }
        ]
    }

    # Combine into a single JSON object
    data = {
        "phy_current_elec": phy_current_elec,
        "phy_moving_charges": phy_moving_charges
    }

    # Verify counts:
    for chapter_id, val in data.items():
        questions = val["quizQuestions"]
        print(f"Chapter: {chapter_id}, Total Questions: {len(questions)}")
        
        easy_count = sum(1 for q in questions if q["difficulty"] == "easy")
        medium_count = sum(1 for q in questions if q["difficulty"] == "medium")
        hard_count = sum(1 for q in questions if q["difficulty"] == "hard")
        print(f"Easy: {easy_count}, Medium: {medium_count}, Hard: {hard_count}")
        
        # Verify IDs:
        for idx, q in enumerate(questions):
            expected_id = f"{chapter_id}-q{idx+1}"
            if q["id"] != expected_id:
                print(f"ID mismatch for {q['id']}: expected {expected_id}")
            
            # Verify options and correctAnswerIndex:
            if q["correctAnswerIndex"] < 0 or q["correctAnswerIndex"] >= len(q["options"]):
                print(f"Invalid correctAnswerIndex for {q['id']}")

    output_path = r"C:\Users\human\.gemini\antigravity\brain\d45a1739-9c09-47ff-a43b-64ca3db2cf33\scratch\batch_9.json"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Successfully wrote data to:", output_path)

if __name__ == "__main__":
    generate_data()
