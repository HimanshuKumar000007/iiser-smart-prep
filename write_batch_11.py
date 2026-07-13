import json
import os

phy_ac_data = {
    "id": "phy_ac",
    "averageQuestions": "1-2 questions per year",
    "whatYoullLearn": [
        "Analyze AC circuits with resistors, inductors, and capacitors individually and in series (LCR)",
        "Understand RMS values of voltage and current and use phasors to represent them",
        "Determine impedance, resonance conditions, and quality factor in series LCR circuits",
        "Calculate average power, power factor, and understand wattless current in AC circuits",
        "Explain the principle, construction, and working of step-up and step-down transformers"
    ],
    "concepts": [
        {
            "title": "Phasor Representation and RMS Values",
            "explanation": "Phasors are rotating vectors representing sinusoidally varying voltage and current. The root mean square (RMS) value is the equivalent DC value that produces the same heating effect in a resistor, given by $V_{rms} = V_0 / \\sqrt{2}$.",
            "example": "A standard domestic AC outlet of $220\\text{ V}$ has a peak voltage of $220\\sqrt{2} \\approx 311\\text{ V}$.",
            "trap": "Never use peak values directly in power formulas ($P = V I$) unless you divide them by 2 (since $P = \\frac{1}{2} V_0 I_0 \\cos\\phi$)."
        },
        {
            "title": "Series LCR Circuit and Resonance",
            "explanation": "In a series LCR circuit, total impedance is $Z = \\sqrt{R^2 + (X_L - X_C)^2}$. Resonance occurs when inductive reactance equals capacitive reactance ($X_L = X_C$), minimizing impedance to $Z = R$ and maximizing current.",
            "example": "Tuning a radio to a specific frequency adjusts the capacitance until the circuit's resonant frequency matches the incoming signal's frequency.",
            "trap": "At resonance, the voltages across the inductor ($V_L$) and capacitor ($V_C$) are equal in magnitude but opposite in phase, so they cancel out, but individual voltages can be much higher than the source voltage."
        },
        {
            "title": "Power in AC and Q-factor",
            "explanation": "Average power is $P = V_{rms} I_{rms} \\cos\\phi$, where $\\cos\\phi = R/Z$ is the power factor. The Q-factor measures the sharpness of resonance, given by $Q = \\frac{\\omega_0 L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$.",
            "example": "A high-Q circuit has a narrow bandwidth, making it highly selective in tuning applications.",
            "trap": "Wattless current does not dissipate power because the phase angle is $\\pm \\pi/2$ (e.g., in a pure capacitor or inductor), but current still flows."
        }
    ],
    "formulas": [
        "$V_{rms} = \\frac{V_0}{\\sqrt{2}}$, $I_{rms} = \\frac{I_0}{\\sqrt{2}}$",
        "$X_L = \\omega L$, $X_C = \\frac{1}{\\omega C}$",
        "$Z = \\sqrt{R^2 + (X_L - X_C)^2}$",
        "$\\tan\\phi = \\frac{X_L - X_C}{R}$",
        "$\\omega_0 = \\frac{1}{\\sqrt{LC}}$ (Resonant angular frequency)",
        "$Q = \\frac{\\omega_0 L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}} = \\frac{\\omega_0}{\\Delta \\omega}$",
        "$P_{avg} = V_{rms} I_{rms} \\cos\\phi$",
        "$\\text{Power Factor} = \\cos\\phi = \\frac{R}{Z}$",
        "$\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}$ (for ideal transformer)"
    ],
    "examTraps": [
        {
            "trap": "Phase angle sign",
            "warning": "Always check if current leads or lags. If $X_C > X_L$, current leads the voltage ($\\phi < 0$). If $X_L > X_C$, current lags ($\\phi > 0$)."
        },
        {
            "trap": "Transformer turns ratio calculation",
            "warning": "Ensure you do not mix up primary and secondary coils in efficiency calculations: $\\eta = P_{out}/P_{in} = V_s I_s / V_p I_p$."
        }
    ],
    "questionPattern": [
        "Calculating impedance and phase difference in series AC circuits",
        "Determining resonant frequency, Q-factor, and bandwidth",
        "Power factor and average power dissipation calculations",
        "Transformer voltage, current, turns, and efficiency calculations"
    ],
    "quizQuestions": [
        {
            "id": "phy_ac-q1",
            "topicId": "ac-circuits-basics",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "A sinusoidal AC voltage is given by $V(t) = 220\\sqrt{2}\\sin(100\\pi t + \\phi)$ (in Volts). What is the root mean square (rms) voltage and the frequency of the source?",
            "options": [
                "220 V, 50 Hz",
                "220 V, 100 Hz",
                "220\\sqrt{2} V, 50 Hz",
                "220\\sqrt{2} V, 100 Hz"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The rms voltage is $V_{rms} = V_0 / \\sqrt{2} = (220\\sqrt{2}) / \\sqrt{2} = 220$ V. The angular frequency is $\\omega = 100\\pi$ rad/s. The frequency is $f = \\omega / (2\\pi) = 100\\pi / (2\\pi) = 50$ Hz."
        },
        {
            "id": "phy_ac-q2",
            "topicId": "ac-components",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "A pure capacitor of capacitance $C$ is connected across an AC source $V = V_0 \\sin(\\omega t)$. Which of the following statements correctly describes the phase relationship between the current $I$ and the voltage $V$ across the capacitor?",
            "options": [
                "Current lags voltage by $\\pi/2$ radians.",
                "Current and voltage are in phase.",
                "Current leads voltage by $\\pi/2$ radians.",
                "Current leads voltage by $\\pi$ radians."
            ],
            "correctAnswerIndex": 2,
            "explanation": "For a purely capacitive circuit, the current is $I = C(dV/dt) = \\omega C V_0 \\cos(\\omega t) = I_0 \\sin(\\omega t + \\pi/2)$. Thus, the current leads the voltage by $\\pi/2$ radians (or $90^\\circ$)."
        },
        {
            "id": "phy_ac-q3",
            "topicId": "transformers",
            "difficulty": "easy",
            "estimatedTimeSeconds": 60,
            "question": "An ideal step-down transformer has a turns ratio of $N_p / N_s = 10$. If the primary coil is connected to a $220\\text{ V}, 50\\text{ Hz}$ AC line and the primary current is $1\\text{ A}$, what are the output voltage and output current?",
            "options": [
                "$22\\text{ V}, 0.1\\text{ A}$",
                "$2200\\text{ V}, 0.1\\text{ A}$",
                "$22\\text{ V}, 10\\text{ A}$",
                "$2200\\text{ V}, 10\\text{ A}$"
            ],
            "correctAnswerIndex": 2,
            "explanation": "For an ideal transformer, the voltage ratio is $V_s / V_p = N_s / N_p = 1/10 \\implies V_s = 22\\text{ V}$. Since the transformer is ideal, power is conserved ($P_p = P_s$), which means $V_p I_p = V_s I_s \\implies I_s = (V_p/V_s) I_p = 10 \\times 1\\text{ A} = 10\\text{ A}$."
        },
        {
            "id": "phy_ac-q4",
            "topicId": "ac-circuits-basics",
            "difficulty": "medium",
            "estimatedTimeSeconds": 60,
            "question": "The average power dissipated in a pure inductor of inductance $L$ when connected to an AC source $V = V_0 \\sin(\\omega t)$ over a complete cycle is:",
            "options": [
                "$P_{avg} = \\frac{V_0^2}{2\\omega L}$",
                "$P_{avg} = 0$",
                "$P_{avg} = \\frac{V_0^2}{\\sqrt{2}\\omega L}$",
                "$P_{avg} = \\frac{V_0^2 \\omega L}{2}$"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In a purely inductive circuit, the phase difference between voltage and current is $\\phi = \\pi/2$. The average power over a complete cycle is $P_{avg} = V_{rms} I_{rms} \\cos\\phi$. Since $\\cos(\\pi/2) = 0$, the average power dissipated is zero."
        },
        {
            "id": "phy_ac-q5",
            "topicId": "ac-components",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "A resistor $R = 100\\ \\Omega$ and an inductor $L = 0.5\\text{ H}$ are connected in series to an AC source of voltage $V = 220\\sin(200 t)$ Volts. The phase angle between the applied voltage and the current is:",
            "options": [
                "$45^\\circ$ with current leading",
                "$45^\\circ$ with current lagging",
                "$60^\\circ$ with current lagging",
                "$30^\\circ$ with current leading"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The inductive reactance is $X_L = \\omega L = 200 \\times 0.5 = 100\\ \\Omega$. The resistance is $R = 100\\ \\Omega$. The phase angle $\\phi$ is given by $\\tan\\phi = X_L / R = 100/100 = 1 \\implies \\phi = 45^\\circ$. In a series RL circuit, the current lags the voltage. Thus, the phase angle is $45^\\circ$ with the current lagging."
        },
        {
            "id": "phy_ac-q6",
            "topicId": "series-lcr-circuit",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "In a series $LCR$ circuit, the voltages across the inductor, capacitor, and resistor are $V_L = 80\\text{ V}$, $V_C = 40\\text{ V}$, and $V_R = 30\\text{ V}$ respectively. What is the total amplitude of the applied source voltage?",
            "options": [
                "$150\\text{ V}$",
                "$90\\text{ V}$",
                "$50\\text{ V}$",
                "$70\\text{ V}$"
            ],
            "correctAnswerIndex": 2,
            "explanation": "For a series LCR circuit, the source voltage is related to the individual components' voltages by $V = \\sqrt{V_R^2 + (V_L - V_C)^2}$. Substituting the given values: $V = \\sqrt{30^2 + (80 - 40)^2} = \\sqrt{30^2 + 40^2} = 50\\text{ V}$."
        },
        {
            "id": "phy_ac-q7",
            "topicId": "series-lcr-circuit",
            "difficulty": "medium",
            "estimatedTimeSeconds": 60,
            "question": "A series $LCR$ circuit is at resonance. If the capacitance is doubled and the inductance is halved, what happens to the resonant frequency of the circuit?",
            "options": [
                "It becomes doubled.",
                "It becomes halved.",
                "It remains unchanged.",
                "It decreases by a factor of $\\sqrt{2}$."
            ],
            "correctAnswerIndex": 2,
            "explanation": "The resonant frequency of a series LCR circuit is given by $f_r = \\frac{1}{2\\pi\\sqrt{LC}}$. If $C' = 2C$ and $L' = L/2$, then the new resonant frequency is $f_r' = \\frac{1}{2\\pi\\sqrt{(L/2)(2C)}} = \\frac{1}{2\\pi\\sqrt{LC}} = f_r$. So it remains unchanged."
        },
        {
            "id": "phy_ac-q8",
            "topicId": "power-ac",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "A wattless current of $2\\text{ A}$ flows in an AC circuit when connected to a $220\\text{ V}, 50\\text{ Hz}$ supply. What is the phase difference between the current and the voltage in this circuit, and what is the average power dissipated?",
            "options": [
                "$\\pi/2$ radians, $0\\text{ W}$",
                "$0$ radians, $440\\text{ W}$",
                "$\\pi$ radians, $440\\text{ W}$",
                "$\\pi/2$ radians, $440\\text{ W}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A current is wattless when it does not consume any average power. This occurs when the phase difference $\\phi$ between the voltage and the current is $\\pm \\pi/2$ (or $90^\\circ$), since the average power dissipated is $P_{avg} = V_{rms} I_{rms} \\cos\\phi = V_{rms} I_{rms} \\cos(\\pi/2) = 0\\text{ W}$."
        },
        {
            "id": "phy_ac-q9",
            "topicId": "transformers",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A transformer has an efficiency of $90\\%$ and is working on a $200\\text{ V}$ and $3\\text{ kW}$ power supply. If the terminal voltage of the secondary coil is $6\\text{ V}$, what is the secondary current?",
            "options": [
                "$300\\text{ A}$",
                "$450\\text{ A}$",
                "$500\\text{ A}$",
                "$15\\text{ A}$"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Efficiency is defined as $\\eta = P_{out} / P_{in} \\implies 0.90 = (V_s I_s) / P_{in} \\implies 0.90 = (6 \\times I_s) / 3000 \\implies 6 I_s = 2700 \\implies I_s = 450\\text{ A}$."
        },
        {
            "id": "phy_ac-q10",
            "topicId": "series-lcr-circuit",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A series $LCR$ circuit consists of a resistor $R = 10\\ \\Omega$, an inductor $L = 0.1\\text{ H}$, and a capacitor $C = 10\\ \\mu\\text{F}$. What is the quality factor ($Q$-factor) of this circuit at resonance?",
            "options": [
                "$10$",
                "$100$",
                "$1$",
                "$1000$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The Quality factor ($Q$-factor) at resonance is given by $Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$. Given $R = 10\\ \\Omega$, $L = 0.1\\text{ H}$, and $C = 10\\ \\mu\\text{F} = 10^{-5}\\text{ F}$. Substituting these values: $Q = \\frac{1}{10}\\sqrt{\\frac{0.1}{10^{-5}}} = \\frac{1}{10}\\sqrt{10^4} = \\frac{100}{10} = 10$."
        },
        {
            "id": "phy_ac-q11",
            "topicId": "power-ac",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "In an AC circuit, the instantaneous voltage and current are given by $V = 100\\sin(100t)\\text{ V}$ and $I = 100\\sin(100t + \\pi/3)\\text{ mA}$ respectively. The average power dissipated in the circuit is:",
            "options": [
                "$2.5\\text{ W}$",
                "$5.0\\text{ W}$",
                "$10.0\\text{ W}$",
                "$5000\\text{ W}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The peak voltage is $V_0 = 100\\text{ V}$ and the peak current is $I_0 = 100\\text{ mA} = 0.1\\text{ A}$. The phase difference is $\\phi = \\pi/3$. The average power is $P_{avg} = V_{rms} I_{rms} \\cos\\phi = \\frac{V_0}{\\sqrt{2}} \\frac{I_0}{\\sqrt{2}} \\cos(\\pi/3) = \\frac{100 \\times 0.1}{2} \\times \\cos(60^\\circ) = 5 \\times 0.5 = 2.5\\text{ W}$."
        },
        {
            "id": "phy_ac-q12",
            "topicId": "ac-components",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "An alternating current of frequency $50\\text{ Hz}$ is flowing through a circuit containing a resistor $R = 20\\ \\Omega$ and a capacitor $C = 100\\ \\mu\\text{F}$ in series. What is the impedance of the circuit? (Use $\\pi \\approx 3.14$)",
            "options": [
                "$37.6\\ \\Omega$",
                "$51.8\\ \\Omega$",
                "$20.0\\ \\Omega$",
                "$31.8\\ \\Omega$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The capacitive reactance is $X_C = \\frac{1}{2\\pi f C} = \\frac{1}{2 \\times 3.14 \\times 50 \\times 100 \\times 10^{-6}} = \\frac{10^6}{31400} \\approx 31.83\\ \\Omega$. The impedance $Z$ is $Z = \\sqrt{R^2 + X_C^2} = \\sqrt{20^2 + (31.83)^2} = \\sqrt{400 + 1013.15} = \\sqrt{1413.15} \\approx 37.6\\ \\Omega$."
        },
        {
            "id": "phy_ac-q13",
            "topicId": "series-lcr-circuit",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A series $LCR$ circuit containing a resistance $R$, inductance $L$, and capacitance $C$ is driven by a variable frequency AC voltage source $V(t) = V_0 \\sin(\\omega t)$. The plot of the average power $P_{avg}$ against $\\omega$ has a peak at the resonance frequency $\\omega_0$. The half-power bandwidth (the frequency range over which the average power is greater than or equal to half of its maximum value) is given by:",
            "options": [
                "$\\Delta \\omega = \\frac{R}{L}$",
                "$\\Delta \\omega = \\frac{1}{\\sqrt{LC}}$",
                "$\\Delta \\omega = \\frac{R}{\\sqrt{LC}}$",
                "$\\Delta \\omega = \\frac{L}{R}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The Q-factor is defined as $Q = \\omega_0 / \\Delta \\omega$, where $\\Delta \\omega$ is the half-power bandwidth. We also know that $Q = \\omega_0 L / R$. Equating the two expressions: $\\omega_0 / \\Delta \\omega = \\omega_0 L / R \\implies \\Delta \\omega = R / L$."
        },
        {
            "id": "phy_ac-q14",
            "topicId": "series-lcr-circuit",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A series $LCR$ circuit is connected to an AC source of voltage $V = V_0 \\sin(\\omega t)$. When the frequency of the source is varied, the current amplitude $I_0$ is plotted against the angular frequency $\\omega$. Let $\\omega_0$ be the resonant frequency. If the quality factor $Q$ of the circuit is very high, which of the following statements is/are correct?\n\nI. The current amplitude at resonance is high and the resonance curve is sharp.\nII. The phase difference between the current and the source voltage changes rapidly from $-\\pi/2$ to $+\\pi/2$ as $\\omega$ passes through $\\omega_0$.\nIII. The energy stored in the circuit is dissipated very quickly.",
            "options": [
                "I and II only",
                "II and III only",
                "I and III only",
                "I, II and III"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A high Q-factor means the resonance curve is sharp and the peak current amplitude is high (since low R gives high current amplitude $I_0 = V_0/R$). The phase difference $\\phi$ is given by $\\tan\\phi = (\\omega L - 1/(\\omega C))/R$. For small R, a slight deviation of $\\omega$ from $\\omega_0$ results in a large change in $\\tan\\phi$, so $\\phi$ transitions rapidly from $-\\pi/2$ to $+\\pi/2$. Since $Q = 2\\pi \\times \\frac{\\text{Energy Stored}}{\\text{Energy Dissipated per cycle}}$, a high Q-factor means that the energy is dissipated very slowly, not quickly. Therefore, statement III is incorrect."
        },
        {
            "id": "phy_ac-q15",
            "topicId": "power-ac",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A series $LCR$ circuit has $R = 80\\ \\Omega$, $X_L = 100\\ \\Omega$, and $X_C = 40\\ \\Omega$. It is connected to an AC source of $V_{rms} = 200\\text{ V}$. An additional capacitor $C_1$ is connected in parallel with the existing capacitor $C$ to make the power factor of the circuit equal to unity. What is the new reactance of the parallel combination of capacitors, and what is the new average power dissipated in the circuit?",
            "options": [
                "$100\\ \\Omega, 500\\text{ W}$",
                "$100\\ \\Omega, 400\\text{ W}$",
                "$40\\ \\Omega, 500\\text{ W}$",
                "$80\\ \\Omega, 400\\text{ W}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "For the power factor to be unity, the circuit must be at resonance, which means the equivalent capacitive reactance of the parallel combination ($X_{C,eq}$) must equal the inductive reactance ($X_L = 100\\ \\Omega$). Under resonance, the total impedance is $Z = R = 80\\ \\Omega$. The rms current is $I_{rms} = V_{rms} / R = 200 / 80 = 2.5\\text{ A}$. The new average power dissipated is $P = I_{rms}^2 R = (2.5)^2 \\times 80 = 6.25 \\times 80 = 500\\text{ W}$."
        },
        {
            "id": "phy_ac-q16",
            "topicId": "ac-components",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "An AC source of voltage $V = V_0 \\sin(\\omega t)$ is connected in series with a resistor $R$ and a device $X$. The current in the circuit is found to be $I = I_0 \\sin(\\omega t + \\pi/4)$. If the device $X$ is one of the standard circuit elements (L, C, or a combination), which of the following could be the device $X$?",
            "options": [
                "A capacitor of capacitance $C = \\frac{1}{\\omega R}$ in series with $R$",
                "A capacitor of capacitance $C = \\frac{1}{\\omega R}$",
                "An inductor of inductance $L = \\frac{R}{\\omega}$",
                "An inductor of inductance $L = \\frac{R}{\\omega}$ in series with $R$"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The current leads the voltage by $\\phi = \\pi/4$. A leading current implies the circuit is capacitive, so device $X$ must be capacitive. The phase angle is given by $\\tan\\phi = X_C / R_{total} = \\tan(\\pi/4) = 1$. Since the circuit already has a resistor $R$ in series, if $X$ is a pure capacitor of reactance $X_C$, then $X_C / R = 1 \\implies 1/(\\omega C) = R \\implies C = \\frac{1}{\\omega R}$. Thus, device $X$ is a capacitor of capacitance $C = \\frac{1}{\\omega R}$."
        },
        {
            "id": "phy_ac-q17",
            "topicId": "transformers",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A power transmission line feeds input power at $2300\\text{ V}$ to a step-down transformer with its primary windings having $4000$ turns. What should be the number of turns in the secondary windings in order to get output power at $230\\text{ V}$? If the efficiency of this transformer is $92\\%$ and it delivers $11.5\\text{ kW}$ of power to a factory, calculate the input current in the primary winding.",
            "options": [
                "$400\\text{ turns}, 5.43\\text{ A}$",
                "$400\\text{ turns}, 5.00\\text{ A}$",
                "$40\\text{ turns}, 5.43\\text{ A}$",
                "$400\\text{ turns}, 0.18\\text{ A}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The turns ratio is given by $N_s / N_p = V_s / V_p \\implies N_s = 4000 \\times (230 / 2300) = 400\\text{ turns}$. Efficiency is $\\eta = P_{out} / P_{in} \\implies 0.92 = 11500 / P_{in} \\implies P_{in} = 11500 / 0.92 = 12500\\text{ W}$. The input current is $I_p = P_{in} / V_p = 12500 / 2300 \\approx 5.43\\text{ A}$."
        },
        {
            "id": "phy_ac-q18",
            "topicId": "series-lcr-circuit",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "In a series $LCR$ circuit, let the frequency of the source be $\\omega$. The impedance of the circuit is $Z$. We define the resonant frequency $\\omega_0 = 1/\\sqrt{LC}$ and quality factor $Q = \\omega_0 L / R$. If the frequency $\\omega$ of the source is varied, at what frequency $\\omega_1$ is the voltage across the capacitor maximum?",
            "options": [
                "$\\omega_1 = \\omega_0 \\sqrt{1 - \\frac{1}{2Q^2}}$",
                "$\\omega_1 = \\omega_0 \\sqrt{1 + \\frac{1}{2Q^2}}$",
                "$\\omega_1 = \\omega_0$",
                "$\\omega_1 = \\omega_0 \\sqrt{1 - \\frac{1}{Q^2}}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The voltage across the capacitor is $V_C = I X_C = \\frac{V_0}{\\omega C \\sqrt{R^2 + (\\omega L - 1/(\\omega C))^2}} = \\frac{V_0}{C \\sqrt{\\omega^2 R^2 + (\\omega^2 L - 1/C)^2}}$. To find the frequency that maximizes $V_C$, we minimize the term under the square root: $f(\\omega^2) = \\omega^2 R^2 + \\omega^4 L^2 - \\frac{2\\omega^2 L}{C} + \\frac{1}{C^2}$. Differentiating with respect to $\\omega^2$ and setting to zero: $R^2 + 2\\omega^2 L^2 - \\frac{2L}{C} = 0 \\implies \\omega^2 = \\frac{1}{LC} - \\frac{R^2}{2L^2} = \\omega_0^2 - \\frac{\\omega_0^2}{2Q^2} = \\omega_0^2\\left(1 - \\frac{1}{2Q^2}\\right) \\implies \\omega_1 = \\omega_0 \\sqrt{1 - \\frac{1}{2Q^2}}$."
        }
    ]
}

phy_em_waves_data = {
    "id": "phy_em_waves",
    "averageQuestions": "1 question per year",
    "whatYoullLearn": [
        "Understand displacement current and how it completes Maxwell's equations",
        "Describe the transverse nature of electromagnetic waves and their properties",
        "Calculate energy density, momentum, intensity, and radiation pressure of EM waves",
        "Identify different bands of the electromagnetic spectrum, their wavelengths, and applications"
    ],
    "concepts": [
        {
            "title": "Displacement Current",
            "explanation": "A time-varying electric field produces a displacement current given by $I_d = \\epsilon_0 \\frac{d\\Phi_E}{dt}$. It acts as a source of magnetic field, satisfying the Ampere-Maxwell law: $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0(I_c + I_d)$.",
            "example": "During charging of a capacitor, conduction current flows in the wires, while displacement current flows between the plates.",
            "trap": "Displacement current is not due to real charges moving, but is a mathematical equivalent due to changing electric flux."
        },
        {
            "title": "Transverse Nature and Wave Speed",
            "explanation": "EM waves are transverse; electric field $\\vec{E}$ and magnetic field $\\vec{B}$ vectors are perpendicular to each other and to the direction of propagation. The speed of EM waves in vacuum is $c = 1/\\sqrt{\\mu_0 \\epsilon_0}$, and in a medium it is $v = 1/\\sqrt{\\mu \\epsilon}$.",
            "example": "Light waves from stars travel through vacuum at speed $c \\approx 3 \\times 10^8\\text{ m/s}$.",
            "trap": "The direction of propagation is always given by $\\vec{E} \\times \\vec{B}$ (Poynting vector), not $\\vec{B} \\times \\vec{E}$."
        },
        {
            "title": "Energy, Momentum, and Radiation Pressure",
            "explanation": "EM waves carry energy and momentum. The total energy density is $u = \\frac{1}{2}\\epsilon_0 E^2 + \\frac{B^2}{2\\mu_0}$. The momentum delivered to a completely absorbing surface is $p = U/c$, and to a completely reflecting surface is $2U/c$.",
            "example": "Comet tails point away from the Sun due to radiation pressure from solar EM waves.",
            "trap": "Radiation pressure depends on whether the surface is absorbing (pressure $I/c$) or reflecting (pressure $2I/c$)."
        }
    ],
    "formulas": [
        "$I_d = \\epsilon_0 \\frac{d\\Phi_E}{dt}$",
        "$\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 (I_c + I_d)$ (Ampere-Maxwell Law)",
        "$c = \\frac{1}{\\sqrt{\\mu_0 \\epsilon_0}} = \\frac{E_0}{B_0}$",
        "$v = \\frac{c}{n} = \\frac{c}{\\sqrt{\\epsilon_r \\mu_r}}$",
        "$u_{avg} = \\frac{1}{2}\\epsilon_0 E_0^2 = \\frac{B_0^2}{2\\mu_0}$",
        "$I = u_{avg} c = \\frac{1}{2}\\epsilon_0 E_0^2 c$ (Intensity)",
        "$P_{rad} = \\frac{I}{c}$ (for absorption), $P_{rad} = \\frac{2I}{c}$ (for reflection)"
    ],
    "examTraps": [
        {
            "trap": "Reflection vs Absorption in radiation pressure",
            "warning": "Multiply pressure by 2 for perfectly reflecting surfaces, but use 1 for perfectly absorbing surfaces."
        },
        {
            "trap": "Wavelength in a medium",
            "warning": "Frequency remains constant when entering a medium, but velocity and wavelength decrease by a factor of $n$ (refractive index)."
        }
    ],
    "questionPattern": [
        "Calculating displacement current and magnetic field inside charging capacitors",
        "Finding phase speed, frequency, wavelength, and direction of propagation of EM waves",
        "Computing energy density, intensity, and radiation pressure",
        "Identifying components of the EM spectrum and their applications"
    ],
    "quizQuestions": [
        {
            "id": "phy_em_waves-q1",
            "topicId": "displacement-current",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "Who proposed that an electric field changing with time gives rise to a magnetic field, thereby introducing the concept of displacement current?",
            "options": [
                "Heinrich Hertz",
                "James Clerk Maxwell",
                "Michael Faraday",
                "Guglielmo Marconi"
            ],
            "correctAnswerIndex": 1,
            "explanation": "James Clerk Maxwell realized that Ampere's law was incomplete for time-varying fields and introduced the displacement current term $I_d = \\epsilon_0 \\frac{d\\Phi_E}{dt}$ to ensure mathematical consistency."
        },
        {
            "id": "phy_em_waves-q2",
            "topicId": "em-waves-properties",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "If the magnetic field of an electromagnetic wave propagating in vacuum is directed along the $+y$-axis and the wave propagates along the $+z$-axis, what is the direction of the electric field vector at that instant?",
            "options": [
                "Along the $+x$-axis",
                "Along the $-x$-axis",
                "Along the $-y$-axis",
                "Along the $+z$-axis"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The direction of propagation of an electromagnetic wave is given by the cross product of the electric field $\\vec{E}$ and magnetic field $\\vec{B}$ (i.e. $\\vec{E} \\times \\vec{B}$). Since the wave propagates along $+z$ ($\\hat{k}$) and $\\vec{B}$ is along $+y$ ($\\hat{j}$), we need $\\vec{E}$ along $+x$ ($\\hat{i}$), because $\\hat{i} \\times \\hat{j} = \\hat{k}$."
        },
        {
            "id": "phy_em_waves-q3",
            "topicId": "em-spectrum",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "Which of the following bands of the electromagnetic spectrum has the highest frequency?",
            "options": [
                "Ultraviolet rays",
                "Microwaves",
                "X-rays",
                "Gamma rays"
            ],
            "correctAnswerIndex": 3,
            "explanation": "In the electromagnetic spectrum, the order of increasing frequency is: Radio waves < Microwaves < Infrared < Visible light < Ultraviolet < X-rays < Gamma rays. Thus, Gamma rays have the highest frequency."
        },
        {
            "id": "phy_em_waves-q4",
            "topicId": "displacement-current",
            "difficulty": "medium",
            "estimatedTimeSeconds": 60,
            "question": "A parallel-plate capacitor with circular plates of radius $R$ is being charged by a constant current $I$. The displacement current density in the region between the plates at a distance $r$ ($r < R$) from the central axis is:",
            "options": [
                "$\\frac{I}{\\pi R^2}$",
                "$\\frac{I r^2}{\\pi R^4}$",
                "$\\frac{I}{\\pi r^2}$",
                "Zero"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The total displacement current is equal to the charging conduction current $I$. Since the electric field between the plates is uniform, the displacement current is distributed uniformly over the area of the plates. Therefore, the displacement current density is $J_d = I_d / \\text{Area} = I / (\\pi R^2)$, which is independent of the distance $r$."
        },
        {
            "id": "phy_em_waves-q5",
            "topicId": "displacement-current",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "A parallel plate capacitor of capacitance $C = 100\\ \\mu\\text{F}$ is connected to an AC voltage source of $V = 220\\sqrt{2}\\sin(100\\pi t)$ Volts. The rms value of the displacement current in the capacitor is:",
            "options": [
                "$6.9\\text{ A}$",
                "$2.2\\text{ A}$",
                "$3.1\\text{ A}$",
                "$4.4\\text{ A}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The rms value of the conduction current is $I_{rms} = V_{rms} \\omega C$. Given $V_{rms} = 220\\text{ V}$, $\\omega = 100\\pi\\text{ rad/s}$, and $C = 100\\ \\mu\\text{F} = 10^{-4}\\text{ F}$. We get $I_{rms} = 220 \\times 100\\pi \\times 10^{-4} = 2.2\\pi \\approx 6.91\\text{ A}$. Since displacement current equals conduction current, its rms value is also $6.91\\text{ A}$."
        },
        {
            "id": "phy_em_waves-q6",
            "topicId": "em-waves-properties",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "The electric field of a plane electromagnetic wave in vacuum is represented by $E_y = 60\\cos(1.8\\times 10^3 x + 5.4\\times 10^{11} t)\\text{ V/m}$. What is the amplitude of the magnetic field and the direction of propagation of the wave?",
            "options": [
                "$2\\times 10^{-7}\\text{ T}$, along $+x$ direction",
                "$2\\times 10^{-7}\\text{ T}$, along $-x$ direction",
                "$1.8\\times 10^7\\text{ T}$, along $-x$ direction",
                "$1.8\\times 10^7\\text{ T}$, along $+x$ direction"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A wave represented by $\\cos(kx + \\omega t)$ propagates along the $-x$ direction. The amplitude of the magnetic field is $B_0 = E_0 / c = 60 / (3\\times 10^8) = 2\\times 10^{-7}\\text{ T}$."
        },
        {
            "id": "phy_em_waves-q7",
            "topicId": "em-waves-properties",
            "difficulty": "medium",
            "estimatedTimeSeconds": 60,
            "question": "A plane electromagnetic wave propagates in a medium with relative permittivity $\\epsilon_r = 4.0$ and relative permeability $\\mu_r = 1.0$. What is the speed of the electromagnetic wave in this medium?",
            "options": [
                "$3.0\\times 10^8\\text{ m/s}$",
                "$1.5\\times 10^8\\text{ m/s}$",
                "$6.0\\times 10^8\\text{ m/s}$",
                "$0.75\\times 10^8\\text{ m/s}$"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The speed in a medium is $v = c / n$, where the refractive index is $n = \\sqrt{\\epsilon_r \\mu_r} = \\sqrt{4.0 \\times 1.0} = 2.0$. Thus, $v = 3.0\\times 10^8 / 2.0 = 1.5\\times 10^8\\text{ m/s}$."
        },
        {
            "id": "phy_em_waves-q8",
            "topicId": "em-waves-properties",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "A laser beam of power $6\\text{ mW}$ is focused on a perfectly absorbing surface of area $2.0\\ \\mu\\text{m}^2$. The radiation pressure exerted by the beam on the surface under normal incidence is:",
            "options": [
                "$10\\text{ N/m}^2$",
                "$20\\text{ N/m}^2$",
                "$1.0\\text{ N/m}^2$",
                "$100\\text{ N/m}^2$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The intensity is $I = P/A = (6\\times 10^{-3}\\text{ W}) / (2.0\\times 10^{-12}\\text{ m}^2) = 3.0\\times 10^9\\text{ W/m}^2$. For a perfectly absorbing surface at normal incidence, the radiation pressure is $P_{rad} = I/c = (3.0\\times 10^9) / (3.0\\times 10^8) = 10\\text{ N/m}^2$."
        },
        {
            "id": "phy_em_waves-q9",
            "topicId": "em-spectrum",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "Match the following electromagnetic wave types with their typical application:\n(P) Infrared waves  -  (1) Cancer radiation therapy\n(Q) Microwaves  -  (2) Radar navigation\n(R) Gamma rays  -  (3) Remote controls\n(S) Ultraviolet rays  -  (4) Water purification",
            "options": [
                "P-3, Q-2, R-1, S-4",
                "P-2, Q-3, R-1, S-4",
                "P-3, Q-2, R-4, S-1",
                "P-1, Q-2, R-3, S-4"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Infrared waves are used in remote controls (P-3). Microwaves are used in radar navigation (Q-2). Gamma rays are used in cancer therapy (R-1). Ultraviolet rays are used in water purification (S-4). Thus, the correct mapping is P-3, Q-2, R-1, S-4."
        },
        {
            "id": "phy_em_waves-q10",
            "topicId": "em-spectrum",
            "difficulty": "medium",
            "estimatedTimeSeconds": 60,
            "question": "Greenhouse effect is the warming of the Earth's surface and atmosphere. Which part of the electromagnetic spectrum emitted by the Earth is mainly responsible for this effect?",
            "options": [
                "Visible light",
                "Ultraviolet rays",
                "Infrared rays",
                "Radio waves"
            ],
            "correctAnswerIndex": 2,
            "explanation": "The Earth absorbs solar radiation and re-radiates it as longer-wavelength infrared radiation. Greenhouse gases in the atmosphere absorb these infrared rays and radiate them back to Earth, trapping heat."
        },
        {
            "id": "phy_em_waves-q11",
            "topicId": "displacement-current",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "A parallel plate capacitor consists of two circular plates of radius $R = 0.1\\text{ m}$ separated by a distance $d = 1.0\\text{ mm}$. If the potential difference between the plates is changing at a rate of $10^{10}\\text{ V/s}$, what is the displacement current between the plates?",
            "options": [
                "$0.28\\text{ A}$",
                "$0.88\\text{ A}$",
                "$2.78\\text{ A}$",
                "$0.09\\text{ A}$"
            ],
            "correctAnswerIndex": 2,
            "explanation": "The capacitance is $C = \\epsilon_0 A / d = \\epsilon_0 \\pi R^2 / d$. The displacement current is $I_d = C (dV/dt) = (\\epsilon_0 \\pi R^2 / d) (dV/dt) = \\frac{8.854\\times 10^{-12} \\times \\pi \\times (0.1)^2}{10^{-3}} \\times 10^{10} \\approx 2.78\\text{ A}$."
        },
        {
            "id": "phy_em_waves-q12",
            "topicId": "em-waves-properties",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "An electromagnetic wave in vacuum has an electric field amplitude $E_0 = 120\\text{ V/m}$. What is the average energy density of the wave?",
            "options": [
                "$6.37\\times 10^{-8}\\text{ J/m}^3$",
                "$1.27\\times 10^{-7}\\text{ J/m}^3$",
                "$3.18\\times 10^{-8}\\text{ J/m}^3$",
                "$5.44\\times 10^{-9}\\text{ J/m}^3$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The average energy density of an EM wave is $u_{avg} = \\frac{1}{2}\\epsilon_0 E_0^2$. Substituting the values: $u_{avg} = 0.5 \times (8.854\\times 10^{-12}\\text{ F/m}) \times (120\\text{ V/m})^2 \\approx 6.37\\times 10^{-8}\\text{ J/m}^3$."
        },
        {
            "id": "phy_em_waves-q13",
            "topicId": "displacement-current",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A parallel-plate capacitor with circular plates of radius $R$ is being charged. The magnetic field $B(r)$ at a distance $r$ from the central axis in the region between the plates is measured. Which of the following graphs best represents the variation of the magnetic field $B(r)$ with $r$ for $0 \\le r \\le 2R$?",
            "options": [
                "Linear increase up to $r = R$, and then decreasing as $1/r$ for $r > R$.",
                "Linear increase up to $r = R$, and then zero for $r > R$.",
                "Zero up to $r = R$, and then decreasing as $1/r$ for $r > R$.",
                "Decreasing as $1/r$ for all $r$."
            ],
            "correctAnswerIndex": 0,
            "explanation": "Inside the capacitor ($r \\le R$), the displacement current enclosed by a circle of radius $r$ is $I_{d,enc} = I \\frac{r^2}{R^2}$. By Ampere-Maxwell law, $B(2\\pi r) = \\mu_0 I_{d,enc} \\implies B(r) = \\frac{\\mu_0 I r}{2\\pi R^2} \\propto r$. Outside the capacitor ($r > R$), the total displacement current enclosed is $I$. By Ampere-Maxwell law, $B(2\\pi r) = \\mu_0 I \\implies B(r) = \\frac{\\mu_0 I}{2\\pi r} \\propto 1/r$. Therefore, the magnetic field increases linearly up to $r = R$ and then decreases as $1/r$."
        },
        {
            "id": "phy_em_waves-q14",
            "topicId": "em-waves-properties",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A linearly polarized plane electromagnetic wave in vacuum is incident normally on a flat surface. The wave has an electric field amplitude $E_0$. If the surface is partially reflecting, with a reflection coefficient of $R_f = 0.4$ (meaning $40\\%$ of the incident energy is reflected and $60\\%$ is absorbed), the radiation pressure exerted on the surface is:",
            "options": [
                "$1.4 \\times \\left(\\frac{1}{2}\\epsilon_0 E_0^2\\right)$",
                "$0.6 \\times \\left(\\frac{1}{2}\\epsilon_0 E_0^2\\right)$",
                "$2.0 \\times \\left(\\frac{1}{2}\\epsilon_0 E_0^2\\right)$",
                "$1.0 \\times \\left(\\frac{1}{2}\\epsilon_0 E_0^2\\right)$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The incident momentum per unit area per unit time is $I/c$. Since $40\\%$ of the wave energy (and hence momentum) is reflected back, the reflected momentum per unit area per unit time is $0.4 I/c$ in the opposite direction. The change in momentum per unit area per unit time (radiation pressure) is $P_{rad} = \\frac{I}{c} - (-0.4\\frac{I}{c}) = 1.4 \\frac{I}{c}$. Since $I = \\frac{1}{2} c \\epsilon_0 E_0^2$, we get $P_{rad} = 1.4 \\times \\left(\\frac{1}{2}\\epsilon_0 E_0^2\\right)$."
        },
        {
            "id": "phy_em_waves-q15",
            "topicId": "em-waves-properties",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A plane electromagnetic wave of frequency $50\\text{ MHz}$ travels in the $+x$ direction in a non-magnetic, lossy dielectric medium. The electric field is given by $\\vec{E}(x,t) = E_0 e^{-\\alpha x} \\cos(\\beta x - \\omega t)\\hat{j}$. Which of the following is the correct physical significance of $\\alpha$ and $\\beta$?",
            "options": [
                "$\\alpha$ is the attenuation constant determining the rate of decay of wave amplitude, and $\\beta$ is the phase constant determining the phase velocity $v_p = \\omega/\\beta$.",
                "$\\alpha$ is the wave number determining wavelength, and $\\beta$ is the attenuation constant.",
                "Both $\\alpha$ and $\\beta$ represent attenuation, with $\\alpha$ representing dielectric losses and $\\beta$ representing conductor losses.",
                "$\\alpha$ represents the frequency of the wave, and $\\beta$ represents the speed."
            ],
            "correctAnswerIndex": 0,
            "explanation": "In a lossy dielectric, the amplitude decays exponentially as $e^{-\\alpha x}$, where $\\alpha$ is the attenuation constant. The sinusoidal oscillation is described by $\\cos(\\beta x - \\omega t)$, where $\\beta$ is the phase constant (wavenumber in the medium). The phase speed of the wave is given by $v_p = \\omega / \\beta$."
        },
        {
            "id": "phy_em_waves-q16",
            "topicId": "em-spectrum",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A microwave oven operates at a frequency of $2.45\\text{ GHz}$. What is the wavelength of this radiation in vacuum, and what is its wavelength inside a food item containing water with a relative permittivity of $\\epsilon_r = 81$ at this frequency? (Assume relative permeability $\\mu_r \\approx 1$ for the food item)",
            "options": [
                "$12.2\\text{ cm}, 1.36\\text{ cm}$",
                "$12.2\\text{ cm}, 0.15\\text{ cm}$",
                "$1.22\\text{ cm}, 0.136\\text{ cm}$",
                "$12.2\\text{ m}, 1.36\\text{ m}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Wavelength in vacuum is $\\lambda_0 = c / f = (3\\times 10^8\\text{ m/s}) / (2.45\\times 10^9\\text{ Hz}) \\approx 12.2\\text{ cm}$. The refractive index of the food item is $n = \\sqrt{\\epsilon_r \\mu_r} = \\sqrt{81 \\times 1} = 9$. The wavelength inside the food item is $\\lambda = \\lambda_0 / n = 12.2\\text{ cm} / 9 \\approx 1.36\\text{ cm}$."
        },
        {
            "id": "phy_em_waves-q17",
            "topicId": "displacement-current",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A parallel plate capacitor with plate area $A$ and separation $d$ is filled with a dielectric material whose relative permittivity varies with time as $\\epsilon_r(t) = \\epsilon_0 (1 + \\gamma t)$, where $\\gamma$ is a constant. The capacitor is connected to a constant DC voltage source $V_0$. The displacement current through the capacitor at any time $t > 0$ is:",
            "options": [
                "$\\frac{\\epsilon_0 A V_0 \\gamma}{d}$",
                "Zero, because the voltage is constant (DC)",
                "$\\frac{\\epsilon_0 A V_0 \\gamma t}{d}$",
                "$\\frac{\\epsilon_0 A V_0 (1 + \\gamma t)}{d}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The capacitance at time $t$ is $C(t) = \\frac{\\epsilon_r(t) A}{d} = \\frac{\\epsilon_0 A (1 + \\gamma t)}{d}$. The charge on the capacitor is $q(t) = C(t) V_0 = \\frac{\\epsilon_0 A V_0 (1 + \\gamma t)}{d}$. The conduction current in the wires is $I = dq/dt = \\frac{\\epsilon_0 A V_0 \\gamma}{d}$. By charge conservation and Maxwell's equations, the displacement current $I_d$ in the dielectric between the plates is equal to the conduction current $I$. Thus, $I_d = \\frac{\\epsilon_0 A V_0 \\gamma}{d}$."
        },
        {
            "id": "phy_em_waves-q18",
            "topicId": "em-waves-properties",
            "difficulty": "hard",
            "estimatedTimeSeconds": 150,
            "question": "A small, flat, perfectly reflecting mirror of mass $m = 10\\text{ mg}$ is suspended horizontally. A laser beam of wavelength $\\lambda = 600\\text{ nm}$ and power $P = 30\\text{ mW}$ is directed vertically upwards at the mirror. What is the acceleration of the mirror due to the radiation pressure?",
            "options": [
                "$2.0\\times 10^{-5}\\text{ m/s}^2$",
                "$1.0\\times 10^{-5}\\text{ m/s}^2$",
                "$2.0\\times 10^{-8}\\text{ m/s}^2$",
                "$0\\text{ m/s}^2$, since radiation carries no momentum"
            ],
            "correctAnswerIndex": 0,
            "explanation": "For a perfectly reflecting mirror, the force exerted by radiation is $F = 2P/c = (2 \\times 30\\times 10^{-3}\\text{ W}) / (3.0\\times 10^8\\text{ m/s}) = 2.0\\times 10^{-10}\\text{ N}$. The mass of the mirror is $m = 10\\text{ mg} = 10^{-5}\\text{ kg}$. The acceleration is $a = F/m = (2.0\\times 10^{-10}\\text{ N}) / 10^{-5}\\text{ kg} = 2.0\\times 10^{-5}\\text{ m/s}^2$."
        }
    ]
}

data = {
    "phy_ac": phy_ac_data,
    "phy_em_waves": phy_em_waves_data
}

output_path = r"C:\Users\human\.gemini\antigravity\brain\d45a1739-9c09-47ff-a43b-64ca3db2cf33\scratch\batch_11.json"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("SUCCESS")
