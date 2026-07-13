import os
import json

phy_units_questions = [
    {
        "id": "phy_units-q1",
        "topicId": "units-system",
        "difficulty": "easy",
        "estimatedTimeSeconds": 45,
        "question": "In the 2019 redefinition of the SI base units, which of the following sets of physical constants are assigned exact numerical values to define the units?",
        "options": [
            "Planck constant h, speed of light c, elementary charge e, Avogadro constant N_A",
            "Gravitational constant G, Planck constant h, speed of light c, elementary charge e",
            "Planck constant h, speed of light c, Boltzmann constant k, Stefan-Boltzmann constant σ",
            "Speed of light c, acceleration due to gravity g, Avogadro constant N_A, Planck constant h"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Under the 2019 SI redefinition, the defining constants are: the ground-state hyperfine transition frequency of the cesium-133 atom (Δν_Cs), the speed of light in vacuum (c), the Planck constant (h), the elementary charge (e), the Boltzmann constant (k), the Avogadro constant (N_A), and the luminous efficacy of monochromatic radiation of frequency 540 × 10^12 Hz (K_cd). Gravitational constant G and Stefan-Boltzmann constant σ are measured, not defined exactly."
    },
    {
        "id": "phy_units-q2",
        "topicId": "significant-figures",
        "difficulty": "easy",
        "estimatedTimeSeconds": 45,
        "question": "A student performs the following calculation using measurements obtained in a laboratory: y = (42.18 - 42.06) / 1.200. What should be the value of y reported with the correct number of significant figures?",
        "options": [
            "0.1",
            "0.10",
            "0.100",
            "0.1000"
        ],
        "correctAnswerIndex": 1,
        "explanation": "First, perform subtraction in the numerator: 42.18 - 42.06 = 0.12. By the rules of subtraction, the result has 2 decimal places, which yields two significant figures (1 and 2). Next, perform division: 0.12 / 1.200. Here, 0.12 has 2 significant figures, and 1.200 has 4 significant figures. The final result of multiplication/division must have the same number of significant figures as the term with the fewest significant figures, which is 2. Thus, y = 0.10."
    },
    {
        "id": "phy_units-q3",
        "topicId": "dimensions",
        "difficulty": "easy",
        "estimatedTimeSeconds": 50,
        "question": "The dimensional formula for the permittivity of free space (ε_0) in terms of fundamental quantities [M], [L], [T], and electric current [A] is:",
        "options": [
            "[M^-1 L^-3 T^4 A^2]",
            "[M^-1 L^3 T^-4 A^{-2}]",
            "[M L^-3 T^4 A^2]",
            "[M^-1 L^-3 T^-2 A^2]"
        ],
        "correctAnswerIndex": 0,
        "explanation": "From Coulomb's Law, F = (1 / (4πε_0)) * (q_1 * q_2 / r^2) => ε_0 = q^2 / (4π F r^2). Since charge q = I * t => [q] = [A T], force [F] = [M L T^-2], and distance [r] = [L], we have: [ε_0] = [A T]^2 / ([M L T^-2] [L]^2) = [A^2 T^2] / [M L^3 T^-2] = [M^-1 L^-3 T^4 A^2]."
    },
    {
        "id": "phy_units-q4",
        "topicId": "dimensional-analysis",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "A physical quantity P varies with time t and position x as P = P_0 * e^(-α * t^2) * sin(β * x + φ), where P_0, α, and β are constants. The dimensional formula of the ratio α / β^2 is:",
        "options": [
            "[M^0 L^2 T^-2]",
            "[M^0 L^2 T^-1]",
            "[M^0 L^-2 T^-2]",
            "[M^0 L^-2 T^2]"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The arguments of exponential and trigonometric functions must be dimensionless. Thus: [α * t^2] = [M^0 L^0 T^0] => [α] = [T^-2], and [β * x] = [M^0 L^0 T^0] => [β] = [L^-1]. The ratio α / β^2 has dimensions: [α / β^2] = [T^-2] / [L^-1]^2 = [L^2 T^-2]."
    },
    {
        "id": "phy_units-q5",
        "topicId": "error-analysis",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "The density of a solid sphere is determined by measuring its mass and diameter. If the percentage error in measuring the mass is 1.5% and that in measuring the diameter is 1.0%, the maximum percentage error in the calculated density of the sphere is:",
        "options": [
            "2.5%",
            "4.5%",
            "3.5%",
            "5.5%"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Density ρ = Mass / Volume = m / ((4/3) * π * (d/2)^3) = 6m / (π * d^3). The maximum relative error is given by: Δρ/ρ = Δm/m + 3 * (Δd/d). In percentage terms: (Δρ/ρ) * 100% = ((Δm/m) * 100%) + 3 * ((Δd/d) * 100%) = 1.5% + 3 * (1.0%) = 4.5%."
    },
    {
        "id": "phy_units-q6",
        "topicId": "error-analysis",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "A Vernier calliper is designed such that 10 divisions on the Vernier scale coincide with 9 divisions on the main scale. Each main scale division is 1.0 mm. When the jaws of the calliper are closed, the zero of the Vernier scale lies slightly to the right of the main scale zero, and the 3rd Vernier division coincides with a main scale division. The zero error of the instrument is:",
        "options": [
            "+0.3 mm",
            "-0.3 mm",
            "+0.7 mm",
            "-0.7 mm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Least Count (LC) of the Vernier calliper: LC = 1 MSD - 1 VSD = 1.0 mm - 0.9 mm = 0.1 mm. Since the Vernier zero lies to the right of the main scale zero, the zero error is positive. The zero error is calculated as: Zero Error = +(Coinciding division * LC) = +(3 * 0.1 mm) = +0.3 mm."
    },
    {
        "id": "phy_units-q7",
        "topicId": "error-analysis",
        "difficulty": "medium",
        "estimatedTimeSeconds": 75,
        "question": "A student measures the diameter of a thin wire using a screw gauge with pitch 0.5 mm and 100 circular scale divisions. When the two studs are in contact, the zero of the circular scale lies 4 divisions below the reference line. When the wire is placed between the studs, the linear scale reads 1.5 mm and the 42nd circular division coincides with the reference line. The correct diameter of the wire is:",
        "options": [
            "1.71 mm",
            "1.67 mm",
            "1.69 mm",
            "1.73 mm"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Least Count (LC) = Pitch / Number of circular divisions = 0.5 mm / 100 = 0.005 mm. When studs are in contact, the circular scale zero is 4 divisions below the reference line, meaning when closed the instrument already reads 4 divisions. Thus, there is a positive zero error of: Zero Error = +4 * LC = +0.02 mm. Observed reading = LSR + (Coinciding circular division * LC) = 1.5 mm + (42 * 0.005 mm) = 1.5 + 0.21 = 1.71 mm. Correct reading = Observed reading - Zero Error = 1.71 mm - 0.02 mm = 1.69 mm."
    },
    {
        "id": "phy_units-q8",
        "topicId": "dimensions",
        "difficulty": "medium",
        "estimatedTimeSeconds": 65,
        "question": "In electromagnetic theory, the characteristic impedance of free space is defined as Z_0 = sqrt(μ_0 / ε_0), where μ_0 is the permeability of free space and ε_0 is the permittivity of free space. The dimensional formula of Z_0 is equivalent to that of:",
        "options": [
            "Resistance",
            "Inductance",
            "Capacitance",
            "Conductance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Impedance has the same units and dimensions as electrical resistance. Since the speed of light is c = 1 / sqrt(μ_0 * ε_0) => μ_0 = 1 / (ε_0 * c^2), we get Z_0 = sqrt(μ_0 / ε_0) = 1 / (ε_0 * c). We know that [ε_0] = [M^-1 L^-3 T^4 A^2] and [c] = [L T^-1]. Thus, [Z_0] = 1 / ([M^-1 L^-3 T^4 A^2] * [L T^-1]) = [M L^2 T^-3 A^-2], which is the dimensional formula of resistance (from R = V / I = Work / (Q * I) = [M L^2 T^-2] / ([A T] * [A]) = [M L^2 T^-3 A^-2])."
    },
    {
        "id": "phy_units-q9",
        "topicId": "dimensional-analysis",
        "difficulty": "medium",
        "estimatedTimeSeconds": 80,
        "question": "If the speed of light c, the Planck constant h, and the universal gravitational constant G are taken as fundamental quantities, which of the following expressions represents the Planck mass m_p?",
        "options": [
            "sqrt(h * c / G)",
            "sqrt(h * G / c^3)",
            "sqrt(G * c / h)",
            "sqrt(h * c^3 / G)"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Let m_p ∝ c^x * h^y * G^z. In terms of dimensions: [M] = [L T^-1]^x [M L^2 T^-1]^y [M^-1 L^3 T^-2]^z = M^(y-z) L^(x+2y+3z) T^(-x-y-2z). Comparing exponents: (1) y - z = 1 => y = 1 + z, (2) x + 2y + 3z = 0 => x + 2(1+z) + 3z = 0 => x + 5z = -2, (3) -x - y - 2z = 0 => x + y + 2z = 0 => x + 1 + 3z = 0 => x + 3z = -1. Subtracting: 2z = -1 => z = -1/2. Thus y = 1/2 and x = -1 - 3(-1/2) = 1/2. Therefore, m_p ∝ c^(1/2) * h^(1/2) * G^(-1/2) = sqrt(h * c / G)."
    },
    {
        "id": "phy_units-q10",
        "topicId": "significant-figures",
        "difficulty": "medium",
        "estimatedTimeSeconds": 50,
        "question": "A rectangular plate has a measured length of 15.30 cm and a measured width of 2.4 cm. The area of the plate, reported with the correct number of significant figures, is:",
        "options": [
            "36.72 cm^2",
            "36.7 cm^2",
            "37 cm^2",
            "40 cm^2"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Calculated Area = 15.30 cm * 2.4 cm = 36.72 cm^2. The measurement 15.30 cm has 4 significant figures, while 2.4 cm has 2 significant figures. For multiplication, the result must be rounded to the number of significant figures of the least precise term, which is 2 significant figures. Rounding 36.72 to 2 significant figures gives 37 cm^2."
    },
    {
        "id": "phy_units-q11",
        "topicId": "error-analysis",
        "difficulty": "medium",
        "estimatedTimeSeconds": 90,
        "question": "Two resistors with values R_1 = (100 ± 3) Ω and R_2 = (200 ± 4) Ω are connected in parallel. The equivalent resistance of the combination, written with its absolute uncertainty, is:",
        "options": [
            "(66.7 ± 7.0) Ω",
            "(66.7 ± 1.8) Ω",
            "(66.7 ± 4.7) Ω",
            "(66.7 ± 1.2) Ω"
        ],
        "correctAnswerIndex": 1,
        "explanation": "The equivalent resistance of a parallel combination is R_p = (R_1 * R_2) / (R_1 + R_2) = (100 * 200) / (100 + 200) = 66.7 Ω. The relative error propagation formula is: ΔR_p / R_p^2 = ΔR_1 / R_1^2 + ΔR_2 / R_2^2 => ΔR_p = R_p^2 * (ΔR_1 / R_1^2 + ΔR_2 / R_2^2). Substituting values: ΔR_p = (66.67)^2 * (3 / 100^2 + 4 / 200^2) = 4444.4 * (0.0003 + 0.0001) = 4444.4 * 0.0004 = 1.778 Ω. Rounding to one decimal place aligns with the value's precision, giving 1.8 Ω. Thus, R_p = (66.7 ± 1.8) Ω."
    },
    {
        "id": "phy_units-q12",
        "topicId": "dimensional-analysis",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "A physical quantity X is defined as X = (A^2 * B^(3/2)) / (C^3 * D^(1/2)). If the maximum percentage errors in the measurements of A, B, C, and D are 1%, 2%, 3%, and 4%, respectively, what is the maximum percentage error in the determination of X?",
        "options": [
            "12%",
            "16%",
            "10%",
            "14%"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Relative error in X is: ΔX/X = 2 * (ΔA/A) + (3/2) * (ΔB/B) + 3 * (ΔC/C) + (1/2) * (ΔD/D). Maximum percentage error is: (ΔX/X) * 100% = 2*(1%) + (3/2)*(2%) + 3*(3%) + (1/2)*(4%) = 2% + 3% + 9% + 2% = 16%. Note that errors are always added to find the maximum possible error, even if the variables are in the denominator."
    },
    {
        "id": "phy_units-q13",
        "topicId": "error-analysis",
        "difficulty": "hard",
        "estimatedTimeSeconds": 90,
        "question": "A Vernier calliper is constructed such that the main scale has 20 divisions per centimeter. On the Vernier scale, 25 divisions coincide with 22 divisions of the main scale. What is the least count of this instrument?",
        "options": [
            "0.06 mm",
            "0.04 mm",
            "0.02 mm",
            "0.08 mm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The main scale has 20 divisions per cm, so 1 MSD = 1/20 cm = 0.05 cm = 0.5 mm. 25 VSD coincide with 22 MSD. Thus, 1 VSD = 22/25 MSD. The least count (LC) of the Vernier calliper is: LC = 1 MSD - 1 VSD = 1 MSD - (22/25) MSD = (3/25) MSD = (3/25) * 0.5 mm = 0.06 mm."
    },
    {
        "id": "phy_units-q14",
        "topicId": "error-analysis",
        "difficulty": "hard",
        "estimatedTimeSeconds": 100,
        "question": "In an experiment to determine the acceleration due to gravity g using a simple pendulum, the formula used is g = 4*π^2 * L / T^2. The length L of the pendulum is measured with a meter scale of least count 1 mm and is found to be 20.0 cm. The time T for 50 oscillations is measured with a stopwatch of least count 0.2 s and is found to be 40.0 s. The maximum relative error in the measurement of g, and the parameter that contributes more to the error, are respectively:",
        "options": [
            "1.5%, time T",
            "1.5%, length L",
            "2.5%, time T",
            "2.5%, length L"
        ],
        "correctAnswerIndex": 0,
        "explanation": "We have g = 4*π^2 * L / T^2. The relative error is: Δg/g = ΔL/L + 2 * (ΔT/T). Let's calculate: (1) Error in length L: ΔL = 1 mm = 0.1 cm => ΔL/L = 0.1 / 20.0 = 0.005 (0.5%). (2) Error in time period T: Let t be the total time for N oscillations, so t = N*T. The error is ΔT = Δt/N. Thus, ΔT/T = (Δt/N)/(t/N) = Δt/t = 0.2 s / 40.0 s = 0.005 (0.5%). The contribution from the time term is 2 * (ΔT/T) = 2 * 0.5% = 1.0%. Total maximum relative error is: Δg/g = 0.5% + 1.0% = 1.5%. Since time contributes 1.0% and length contributes 0.5%, the time measurement contributes more to the overall error."
    },
    {
        "id": "phy_units-q15",
        "topicId": "dimensions",
        "difficulty": "hard",
        "estimatedTimeSeconds": 75,
        "question": "The Stefan-Boltzmann law states that the total energy radiated per unit surface area of a blackbody per unit time (E) is proportional to the fourth power of its absolute temperature (T), given by E = σ * T^4, where σ is the Stefan-Boltzmann constant. The dimensions of σ in terms of base dimensions [M], [L], [T], and temperature [K] are:",
        "options": [
            "[M L^0 T^-3 K^-4]",
            "[M L^2 T^-3 K^-4]",
            "[M L^0 T^-2 K^-4]",
            "[M L^2 T^-2 K^-4]"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Energy per unit area per unit time is E = Energy / (Area * Time). Its dimensions are: [E] = [M L^2 T^-2] / ([L^2] * [T]) = [M T^-3]. Since E = σ * T^4, the dimensions of the Stefan-Boltzmann constant σ are: [σ] = [E] / [T]^4 = [M T^-3] / [K]^4 = [M L^0 T^-3 K^-4]."
    },
    {
        "id": "phy_units-q16",
        "topicId": "dimensional-analysis",
        "difficulty": "hard",
        "estimatedTimeSeconds": 120,
        "question": "A particle of mass m executes one-dimensional periodic motion under the influence of a potential energy function V(x) = k * |x|^n, where k is a constant and n > 0. Using dimensional analysis, the dependency of the period of oscillation T on the amplitude of oscillation A is found to be:",
        "options": [
            "T ∝ A^(1 - n/2)",
            "T ∝ A^(1/2 - n)",
            "T ∝ A^(1 - 2/n)",
            "T ∝ A^(1/n - 1/2)"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Potential energy is V(x) = k * |x|^n. Dimensions: [V] = [M L^2 T^-2]. Since [x] = [L], we have [k] = [M L^(2-n) T^-2]. Let period T ∝ m^a * k^b * A^c. In terms of dimensions: [T] = [M]^a * [M L^(2-n) T^-2]^b * [L]^c = M^(a+b) * L^((2-n)b + c) * T^(-2b). Comparing exponents: For T: -2b = 1 => b = -1/2. For M: a + b = 0 => a = 1/2. For L: (2-n)b + c = 0 => (2-n)(-1/2) + c = 0 => c = 1 - n/2. Thus, T ∝ A^(1 - n/2)."
    },
    {
        "id": "phy_units-q17",
        "topicId": "error-analysis",
        "difficulty": "hard",
        "estimatedTimeSeconds": 110,
        "question": "A physical quantity Z is calculated from two measured variables X and Y using the formula Z = X^2 * sqrt(Y). The measurements of X and Y are reported as X = 10.0 ± 0.1 and Y = 4.00 ± 0.04. Using the standard differential error propagation (where errors are treated as independent and random, combining in quadrature: ΔZ = sqrt(((∂Z/∂X)*ΔX)^2 + ((∂Z/∂Y)*ΔY)^2)), what is the calculated value of Z along with its uncertainty?",
        "options": [
            "200 ± 4",
            "200 ± 5",
            "200.0 ± 4.1",
            "200 ± 6"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Z = X^2 * Y^(1/2). For X = 10.0, Y = 4.00: Z = 10.0^2 * sqrt(4.00) = 200. Partial derivatives: ∂Z/∂X = 2 * X * Y^(1/2) = 2*(10.0)*2 = 40. ∂Z/∂Y = (1/2) * X^2 * Y^(-1/2) = (1/2)*100*(1/2) = 25. Error contributions: ΔZ_X = (∂Z/∂X)*ΔX = 40 * 0.1 = 4.0. ΔZ_Y = (∂Z/∂Y)*ΔY = 25 * 0.04 = 1.0. Combining in quadrature: ΔZ = sqrt(4.0^2 + 1.0^2) = sqrt(17) ≈ 4.12. Rounding the uncertainty to one significant figure gives 4, which forces the value to be rounded to the units place. Thus, Z = 200 ± 4."
    },
    {
        "id": "phy_units-q18",
        "topicId": "error-analysis",
        "difficulty": "hard",
        "estimatedTimeSeconds": 100,
        "question": "A screw gauge with a pitch of 0.5 mm and 100 divisions on its circular scale has a zero error. When the studs are in contact without any object, the 92nd division of the circular scale coincides with the reference line, and the zero of the main scale is not visible. When a metal sheet is placed between the studs, the main scale reads 1.0 mm and the 35th circular division coincides with the reference line. What is the actual thickness of the metal sheet?",
        "options": [
            "1.215 mm",
            "1.135 mm",
            "1.255 mm",
            "1.175 mm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Pitch = 0.5 mm, divisions = 100. LC = 0.5 mm / 100 = 0.005 mm. Since the zero of the main scale is not visible and the 92nd division coincides, the zero of the circular scale has gone past the reference line in the negative direction, indicating a negative zero error. Zero Error = -(100 - 92) * LC = -8 * 0.005 mm = -0.040 mm. Observed reading = LSR + CSR * LC = 1.0 mm + 35 * 0.005 mm = 1.175 mm. Actual thickness = Observed thickness - Zero Error = 1.175 mm - (-0.040 mm) = 1.215 mm."
    }
]

phy_motion_straight_questions = [
    {
        "id": "phy_motion_straight-q1",
        "topicId": "speed-velocity",
        "difficulty": "easy",
        "estimatedTimeSeconds": 70,
        "question": "A particle travels half of its total path length with speed v_1. The remaining half is covered with speed v_2 for half the time and speed v_3 for the other half of the time. What is the average speed of the particle over the entire journey?",
        "options": [
            "2 * v_1 * (v_2 + v_3) / (2 * v_1 + v_2 + v_3)",
            "v_1 * (v_2 + v_3) / (v_1 + v_2 + v_3)",
            "2 * v_1 * v_2 * v_3 / (v_1 * v_2 + v_2 * v_3 + v_3 * v_1)",
            "(v_1 + v_2 + v_3) / 3"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Let the total distance be 2S. The first half distance S is covered with speed v_1, so time t_1 = S/v_1. For the second half S, it is covered in two equal time intervals t_2 each, with speeds v_2 and v_3. So S = v_2 * t_2 + v_3 * t_2 => t_2 = S / (v_2 + v_3). The total time for the second half is 2 * t_2 = 2S / (v_2 + v_3). Total time for the entire journey T = t_1 + 2 * t_2 = S/v_1 + 2S/(v_2 + v_3) = S * (v_2 + v_3 + 2*v_1) / (v_1 * (v_2 + v_3)). Average speed is 2S / T = 2 * v_1 * (v_2 + v_3) / (2 * v_1 + v_2 + v_3)."
    },
    {
        "id": "phy_motion_straight-q2",
        "topicId": "acceleration",
        "difficulty": "easy",
        "estimatedTimeSeconds": 45,
        "question": "The position of a particle moving along a straight line is given by x(t) = 9 * t^2 - t^3, where x is in meters and t is in seconds. The acceleration of the particle when it momentarily comes to rest is:",
        "options": [
            "-18 m/s^2",
            "-6 m/s^2",
            "12 m/s^2",
            "0 m/s^2"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Velocity v(t) = dx/dt = 18t - 3t^2. The particle comes to rest when v(t) = 0 => 3t(6 - t) = 0. Since t > 0, this occurs at t = 6 s. The acceleration is a(t) = dv/dt = 18 - 6t. At t = 6 s, the acceleration is a(6) = 18 - 6(6) = -18 m/s^2."
    },
    {
        "id": "phy_motion_straight-q3",
        "topicId": "kinematics-equations",
        "difficulty": "easy",
        "estimatedTimeSeconds": 45,
        "question": "A stone is dropped from the top of a tower of height H. It takes time T to reach the ground. At what height from the ground is the stone at time t = T/2?",
        "options": [
            "3H/4",
            "H/4",
            "H/2",
            "2H/3"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Using the equation of motion for a dropped object: H = (1/2) * g * T^2. At t = T/2, the distance fallen from the top is y = (1/2) * g * (T/2)^2 = (1/4) * ((1/2) * g * T^2) = H/4. The height of the stone from the ground is H - y = H - H/4 = 3H/4."
    },
    {
        "id": "phy_motion_straight-q4",
        "topicId": "graphical-kinematics",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "A velocity-time graph of a particle moving in a straight line is symmetric and consists of a triangle of height v_0 (at t = T/2) and base T along the positive time axis, followed by an identical inverted triangle of depth -v_0 (at t = 3T/2) and base T along the negative velocity region. Over the total time interval 2T, the average velocity and the average speed of the particle are, respectively:",
        "options": [
            "0 and v_0/2",
            "0 and v_0",
            "v_0/2 and v_0/2",
            "0 and 0"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Displacement = Area(upper triangle) + Area(lower triangle) = (1/2)*T*v_0 - (1/2)*T*v_0 = 0. So average velocity = 0/2T = 0. Distance = |Area(upper)| + |Area(lower)| = (1/2)*T*v_0 + (1/2)*T*v_0 = T*v_0. Average speed = Distance / 2T = T*v_0 / 2T = v_0/2."
    },
    {
        "id": "phy_motion_straight-q5",
        "topicId": "relative-motion-1d",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "Two trains, A and B, each of length 150 m, are moving on parallel tracks. Train A is moving with a constant speed of 72 km/h and train B is moving with a constant speed of 54 km/h in the same direction, with A behind B. What is the time taken by train A to completely overtake train B?",
        "options": [
            "60 s",
            "30 s",
            "15 s",
            "45 s"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Speeds in m/s: v_A = 72 * (5/18) = 20 m/s and v_B = 54 * (5/18) = 15 m/s. Relative velocity of A with respect to B: v_AB = v_A - v_B = 20 - 15 = 5 m/s. To completely overtake B, train A must cover a relative distance equal to the sum of the lengths of both trains: s_rel = L_A + L_B = 150 + 150 = 300 m. Time taken is t = s_rel / v_AB = 300 m / 5 m/s = 60 s."
    },
    {
        "id": "phy_motion_straight-q6",
        "topicId": "kinematics-equations",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "A particle starts from rest and moves along a straight line with a constant acceleration. The ratio of the displacement of the particle in the n-th second to the total displacement in the first n seconds is:",
        "options": [
            "(2n - 1) / n^2",
            "(2n + 1) / n^2",
            "(2n - 1) / (2n^2)",
            "(2n - 1) / (2n - 2)"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Displacement in the n-th second: s_n = u + (a/2)*(2n - 1). Starting from rest means u = 0, so s_n = (a/2)*(2n - 1). Total displacement in the first n seconds is S_n = u*n + (1/2)*a*n^2 = (1/2)*a*n^2. The ratio s_n / S_n = ((a/2)*(2n - 1)) / ((1/2)*a*n^2) = (2n - 1) / n^2."
    },
    {
        "id": "phy_motion_straight-q7",
        "topicId": "speed-velocity",
        "difficulty": "medium",
        "estimatedTimeSeconds": 50,
        "question": "The velocity v of a particle moving along a straight line varies with position x as v^2 = 144 - 9x, where v is in m/s and x is in meters. The acceleration of the particle is:",
        "options": [
            "-4.5 m/s^2",
            "-9.0 m/s^2",
            "4.5 m/s^2",
            "Variable and depends on position x"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Differentiating v^2 = 144 - 9x with respect to x: 2v * (dv/dx) = -9. Since acceleration a is defined as a = v * (dv/dx), we have 2a = -9 => a = -4.5 m/s^2. Thus, the acceleration is constant and equals -4.5 m/s^2."
    },
    {
        "id": "phy_motion_straight-q8",
        "topicId": "acceleration",
        "difficulty": "medium",
        "estimatedTimeSeconds": 70,
        "question": "A car starts from rest and accelerates at a constant rate α = 2.0 m/s^2 for a time t_1. It then immediately decelerates at a constant rate β = 4.0 m/s^2 to come to rest. If the total time of travel is t = 9.0 s, the maximum velocity reached by the car is:",
        "options": [
            "12.0 m/s",
            "6.0 m/s",
            "18.0 m/s",
            "8.0 m/s"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Let t_1 be the acceleration time and t_2 be the deceleration time: t_1 + t_2 = 9.0 s. The maximum velocity v_max is reached at t_1: v_max = α * t_1 = β * t_2 => 2.0 * t_1 = 4.0 * t_2 => t_1 = 2 * t_2. Substituting this into the time sum: 2 * t_2 + t_2 = 9.0 => 3 * t_2 = 9.0 => t_2 = 3.0 s and t_1 = 6.0 s. The maximum velocity is v_max = α * t_1 = 2.0 * 6.0 = 12.0 m/s."
    },
    {
        "id": "phy_motion_straight-q9",
        "topicId": "relative-motion-1d",
        "difficulty": "medium",
        "estimatedTimeSeconds": 60,
        "question": "A ball A is thrown vertically upwards from the ground with an initial velocity of 40 m/s. At the same instant, another ball B is dropped from a height of 80 m directly above A. Taking g = 10 m/s^2, how long after projection will the two balls collide?",
        "options": [
            "2.0 s",
            "1.5 s",
            "2.5 s",
            "3.0 s"
        ],
        "correctAnswerIndex": 0,
        "explanation": "In relative coordinates, the relative initial velocity of A with respect to B is u_AB = u_A - u_B = 40 - 0 = 40 m/s. Since both experience gravity g downwards, their relative acceleration is a_AB = (-g) - (-g) = 0. The relative distance to cover is s_rel = 80 m. Using s_rel = u_AB * t + (1/2)*a_AB*t^2 => 80 = 40*t + 0 => t = 2.0 s."
    },
    {
        "id": "phy_motion_straight-q10",
        "topicId": "graphical-kinematics",
        "difficulty": "medium",
        "estimatedTimeSeconds": 65,
        "question": "The acceleration-position (a-x) graph of a particle moving in a straight line starts at the origin and rises linearly to a = 6.0 m/s^2 at x = 10.0 m. If the particle starts from rest at x = 0, its velocity at x = 10.0 m is:",
        "options": [
            "sqrt(60) m/s",
            "6.0 m/s",
            "30 m/s",
            "10 m/s"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The area under the a-x graph is equal to ∫ a dx = (1/2)*(v_f^2 - v_i^2). The graph is a triangle from x = 0 to x = 10.0 m with a height of 6.0 m/s^2. Area = (1/2) * base * height = (1/2) * 10.0 * 6.0 = 30 m^2/s^2. Since it starts from rest, v_i = 0 => (1/2)*v_f^2 = 30 => v_f^2 = 60 => v_f = sqrt(60) m/s."
    },
    {
        "id": "phy_motion_straight-q11",
        "topicId": "kinematics-equations",
        "difficulty": "medium",
        "estimatedTimeSeconds": 70,
        "question": "A hot-air balloon is ascending vertically at a constant speed of 10.0 m/s. When it is at a height of 75.0 m above the ground, a stone is released from it. Taking g = 10.0 m/s^2, the time taken by the stone to reach the ground is:",
        "options": [
            "5.0 s",
            "3.0 s",
            "6.0 s",
            "4.0 s"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Upon release, the stone inherits the velocity of the balloon: u = +10.0 m/s. Taking upward as positive: displacement s = -75.0 m and acceleration a = -g = -10.0 m/s^2. Using s = u*t + (1/2)*a*t^2: -75 = 10*t - 5*t^2 => 5*t^2 - 10*t - 75 = 0 => t^2 - 2*t - 15 = 0. Solving gives (t - 5)(t + 3) = 0. Since time must be positive, t = 5.0 s."
    },
    {
        "id": "phy_motion_straight-q12",
        "topicId": "graphical-kinematics",
        "difficulty": "medium",
        "estimatedTimeSeconds": 65,
        "question": "A small ball is released from rest at a height h above a hard, flat floor. It falls vertically, collides elastically with the floor, bounces back to the same height, and continues this motion. Which of the following qualitatively describes the velocity v of the ball as a function of time t (taking upward as the positive direction)?",
        "options": [
            "A series of parallel straight lines with negative slopes, separated by instantaneous vertical upward jumps.",
            "A series of parallel straight lines with positive slopes, separated by instantaneous vertical downward jumps.",
            "A continuous sinusoidal wave.",
            "A saw-tooth wave that is completely in the positive velocity region."
        ],
        "correctAnswerIndex": 0,
        "explanation": "Taking upward as positive, while in the air the acceleration is a = -g (constant negative slope). When the ball hits the floor, the elastic collision instantly reverses its downward velocity to an upward velocity of equal magnitude. This corresponds to an instantaneous vertical jump in the v-t graph from negative to positive velocity. The graph is thus a series of parallel lines with negative slope, separated by instantaneous vertical upward jumps."
    },
    {
        "id": "phy_motion_straight-q13",
        "topicId": "kinematics-equations",
        "difficulty": "hard",
        "estimatedTimeSeconds": 100,
        "question": "A particle is moving along a straight line. Its retardation is proportional to the square root of its velocity, given by a = -k * sqrt(v), where k is a positive constant. If the initial velocity of the particle at t = 0 is v_0, what is the total distance traveled by the particle before it comes to rest?",
        "options": [
            "2 * v_0^(3/2) / (3 * k)",
            "v_0^(3/2) / (3 * k)",
            "4 * v_0^(3/2) / (3 * k)",
            "2 * v_0^2 / (3 * k)"
        ],
        "correctAnswerIndex": 0,
        "explanation": "We have a = v * (dv/dx) = -k * sqrt(v) => sqrt(v) dv = -k dx. Integrating from initial velocity v_0 at x = 0 to 0 velocity at x = S: ∫[v_0 to 0] v^(1/2) dv = -k * ∫[0 to S] dx => [2/3 * v^(3/2)] between v_0 and 0 = -k * S => 0 - 2/3 * v_0^(3/2) = -k * S => S = 2 * v_0^(3/2) / (3 * k)."
    },
    {
        "id": "phy_motion_straight-q14",
        "topicId": "relative-motion-1d",
        "difficulty": "hard",
        "estimatedTimeSeconds": 95,
        "question": "Particle A is moving with a constant velocity v along a straight line towards particle B, which is initially at a distance d from A. At t = 0, particle B starts from rest and moves away from A with a constant acceleration a along the same line. The minimum velocity v required for A to collide with B is:",
        "options": [
            "sqrt(a * d)",
            "sqrt(2 * a * d)",
            "2 * sqrt(a * d)",
            "(1/2) * sqrt(a * d)"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Let initial positions be x_A(0) = 0 and x_B(0) = d. Then x_A(t) = v*t and x_B(t) = d + (1/2)*a*t^2. For collision, x_A(t) = x_B(t) => (1/2)*a*t^2 - v*t + d = 0. For a real solution for time t to exist, the discriminant must be non-negative: D = v^2 - 4 * (1/2 * a) * d = v^2 - 2*a*d >= 0 => v >= sqrt(2*a*d). The minimum velocity is therefore sqrt(2*a*d)."
    },
    {
        "id": "phy_motion_straight-q15",
        "topicId": "graphical-kinematics",
        "difficulty": "hard",
        "estimatedTimeSeconds": 110,
        "question": "A particle moves along a straight line. Its velocity v varies with position x as v = α * sqrt(x), where α is a positive constant. The average velocity of the particle between x = 0 and x = d is:",
        "options": [
            "α * sqrt(d) / 2",
            "2 * α * sqrt(d) / 3",
            "α * sqrt(d)",
            "3 * α * sqrt(d) / 4"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Velocity v = dx/dt = α * sqrt(x) => dx/sqrt(x) = α dt. Integrating from x = 0 at t = 0 to x = d at t = t_f gives: 2*sqrt(d) = α * t_f => t_f = 2*sqrt(d)/α. Average velocity is defined as the time-averaged velocity: v_avg = Total Displacement / Total Time = d / t_f = d / (2*sqrt(d)/α) = α * sqrt(d) / 2. (Note: the spatial-averaged velocity 2/3 * α * sqrt(d) is a common exam trap)."
    },
    {
        "id": "phy_motion_straight-q16",
        "topicId": "kinematics-equations",
        "difficulty": "hard",
        "estimatedTimeSeconds": 90,
        "question": "A rocket is launched vertically upwards from the ground with a constant upward acceleration of g. The fuel burns out completely after a time t_0. The maximum height reached by the rocket from the ground is:",
        "options": [
            "g * t_0^2",
            "1.5 * g * t_0^2",
            "2 * g * t_0^2",
            "0.5 * g * t_0^2"
        ],
        "correctAnswerIndex": 0,
        "explanation": "First stage (fuel burn, 0 to t_0): height h_1 = (1/2)*g*t_0^2, velocity v_1 = g*t_0. Second stage (after burnout): acceleration is -g, rocket comes to rest at additional height h_2. Using v^2 = u^2 + 2as: 0 = v_1^2 - 2g*h_2 => h_2 = v_1^2 / 2g = (g*t_0)^2 / 2g = (1/2)*g*t_0^2. The total maximum height is H = h_1 + h_2 = (1/2)*g*t_0^2 + (1/2)*g*t_0^2 = g*t_0^2."
    },
    {
        "id": "phy_motion_straight-q17",
        "topicId": "relative-motion-1d",
        "difficulty": "hard",
        "estimatedTimeSeconds": 110,
        "question": "A lift is ascending with a constant upward acceleration a = 2.0 m/s^2. At t = 0, a passenger inside the lift drops a coin from a height of 2.4 m above the floor of the lift. Taking g = 10.0 m/s^2 and assuming the lift starts from rest at t = 0, the time taken by the coin to hit the floor, and the displacement of the coin with respect to the ground in this time interval are respectively:",
        "options": [
            "0.63 s and -2.0 m",
            "0.63 s and -2.4 m",
            "0.50 s and -2.0 m",
            "0.50 s and -2.4 m"
        ],
        "correctAnswerIndex": 0,
        "explanation": "In the lift's reference frame: relative acceleration is a_rel = a_coin - a_lift = (-g) - (+a) = -(g + a) = -12.0 m/s^2. With relative initial velocity u_rel = 0 and relative displacement s_rel = -2.4 m: -2.4 = -(1/2)*12.0*t^2 => t^2 = 0.4 => t = sqrt(0.4) ≈ 0.63 s. In the ground reference frame: since the lift starts from rest, the coin's initial velocity relative to the ground is 0. Its displacement is s_ground = u_coin*t - (1/2)*g*t^2 = 0 - (1/2)*10.0*(0.4) = -2.0 m."
    },
    {
        "id": "phy_motion_straight-q18",
        "topicId": "graphical-kinematics",
        "difficulty": "hard",
        "estimatedTimeSeconds": 110,
        "question": "A particle moves along a straight line. Its velocity v varies with position x as v = v_0 * (1 - x / x_0), where v_0 and x_0 are positive constants. The acceleration of the particle as a function of position, and the time taken to reach x = x_0 / 2 starting from x = 0 are, respectively:",
        "options": [
            "a = (v_0^2 / x_0) * (x / x_0 - 1) and t = (x_0 / v_0) * ln(2)",
            "a = (v_0^2 / x_0) * (1 - x / x_0) and t = (x_0 / v_0) * ln(2)",
            "a = (v_0^2 / x_0) * (x / x_0 - 1) and t = (x_0 / v_0) * ln(1.5)",
            "a = -v_0^2 / x_0 and t = x_0 / (2 * v_0)"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Acceleration is a = v * (dv/dx). Since v = v_0 * (1 - x / x_0), we have dv/dx = -v_0 / x_0. Thus, a = v_0 * (1 - x / x_0) * (-v_0 / x_0) = (v_0^2 / x_0) * (x / x_0 - 1). For time, v = dx/dt = v_0 * (1 - x / x_0) => dx / (1 - x / x_0) = v_0 dt. Integrating from x = 0 (t = 0) to x_0 / 2 (t_f) yields: -x_0 * ln(1 - x / x_0) evaluated from 0 to x_0/2 = v_0 * t_f => -x_0 * ln(1/2) = v_0 * t_f => x_0 * ln(2) = v_0 * t_f => t_f = (x_0 / v_0) * ln(2)."
    }
]

phy_units_content = {
    "id": "phy_units",
    "averageQuestions": "1–2 questions per year",
    "whatYoullLearn": [
        "Understand SI base and derived units and the 2019 redefinition of base units.",
        "Apply the rules of significant figures in mathematical operations and rounding off.",
        "Determine the dimensions and dimensional formulae of physical quantities.",
        "Use dimensional analysis for homogeneity checks and deriving physical relations.",
        "Calculate error propagation in complex mathematical functions.",
        "Master the usage and zero error corrections of Vernier Callipers and Screw Gauges."
    ],
    "concepts": [
        {
            "title": "SI Base Units and Redefinition",
            "explanation": "The International System of Units (SI) defines seven base units: meter (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), and candela (cd). In 2019, the SI definitions were updated to be based on fixed numerical values of seven defining physical constants: the Planck constant (h), the elementary charge (e), the Boltzmann constant (k), the Avogadro constant (N_A), the speed of light (c), the transition frequency of Cesium-133 (Δν_Cs), and the luminous efficacy of monochromatic radiation of frequency 540 × 10^12 Hz (K_cd).",
            "example": "The kilogram is now defined in terms of the Planck constant h, rather than a physical prototype cylinder of platinum-iridium.",
            "trap": "Although base units are defined using these constants, the constants themselves are not the units; rather, their values are fixed to define the units exactly."
        },
        {
            "title": "Significant Figures and Rounding Rules",
            "explanation": "Significant figures represent the digits in a measurement that are known with certainty plus one uncertain digit. Rules: (1) All non-zero digits are significant. (2) Zeroes between non-zero digits are significant. (3) Leading zeroes are not significant. (4) Trailing zeroes in a number with a decimal point are significant. In addition/subtraction, the result should have the same number of decimal places as the term with the least decimal places. In multiplication/division, the result should have the same number of significant figures as the term with the least significant figures.",
            "example": "Adding 12.11 (2 decimal places) and 18.0 (1 decimal place) gives 30.11, which rounds to 30.1.",
            "trap": "Do not confuse significant figures with decimal places! In multiplication, look at total significant figures; in addition, look only at decimal places."
        },
        {
            "title": "Dimensional Analysis & Principle of Homogeneity",
            "explanation": "The dimensions of a physical quantity are the powers to which the base quantities are raised to represent that quantity. The Principle of Homogeneity states that terms on both sides of a physical equation must have the same dimensions. This is used to test the correctness of equations, convert units, and derive relationships between physical variables.",
            "example": "In s = u t + 1/2 a t^2, the dimension of s is [L], of u t is [L T^-1 * T] = [L], and of 1/2 a t^2 is [L T^-2 * T^2] = [L].",
            "trap": "Dimensional analysis cannot determine dimensionless constants (like 1/2 or 2π) or handle trigonometric/exponential arguments, which must always be dimensionless."
        },
        {
            "title": "Error Propagation",
            "explanation": "When physical quantities are measured with experimental uncertainties, these errors propagate through mathematical formulas. For addition/subtraction (Z = A ± B), absolute errors add up: ΔZ = ΔA + ΔB. For multiplication/division (Z = A^a B^b / C^c), relative/fractional errors combine as: ΔZ/Z = a * (ΔA/A) + b * (ΔB/B) + c * (ΔC/C). Always sum the absolute values of the terms, since errors accumulate and we seek the maximum possible error.",
            "example": "If density ρ = m/V, then the maximum fractional error is Δρ/ρ = Δm/m + ΔV/V.",
            "trap": "Never subtract errors, even if a quantity is in the denominator! Always add fractional errors to find the maximum possible error."
        },
        {
            "title": "Vernier Calliper & Screw Gauge",
            "explanation": "Vernier Calliper: Least Count (LC) = 1 Main Scale Division (MSD) - 1 Vernier Scale Division (VSD). Usually, N VSD = (N-1) MSD, so LC = 1 MSD / N. Total Reading = Main Scale Reading (MSR) + (Coinciding Vernier Division * LC) - Zero Error. Screw Gauge: LC = Pitch / Number of Circular Scale Divisions. Total Reading = Linear Scale Reading (LSR) + (Coinciding Circular Division * LC) - Zero Error. Zero error is positive if the zero mark of the vernier/circular scale is ahead of (to the right of/above) the main scale zero, and negative if it lags behind.",
            "example": "In a screw gauge with LC = 0.01 mm, if circular zero is 4 divisions below reference line when closed, it has a positive zero error of +0.04 mm.",
            "trap": "Remember to subtract the zero error algebraically: Correct Reading = Observed Reading - (Zero Error with proper sign)."
        }
    ],
    "formulas": [
        "Least Count of Vernier Calliper: LC = 1 MSD - 1 VSD = (1 - (N-1)/N) MSD = (1/N) MSD",
        "Least Count of Screw Gauge: LC = Pitch / Number of circular scale divisions",
        "Addition/Subtraction Error (Z = A ± B): ΔZ = ΔA + ΔB",
        "Product/Quotient Error (Z = A^x * B^y / C^z): ΔZ/Z = x * (ΔA/A) + y * (ΔB/B) + z * (ΔC/C)",
        "Corrected Measurement: Correct Reading = Observed Reading - Zero Error"
    ],
    "examTraps": [
        {
            "trap": "Negative Zero Error in Screw Gauge",
            "warning": "For negative zero error in a screw gauge, the zero of the circular scale lies above the reference line. If the n-th division coincides with the reference line, the zero error is -(N - n) * LC, where N is the total divisions. Do not just use -n * LC."
        },
        {
            "trap": "Significant Figures in Subtraction",
            "warning": "When subtracting numbers like 100.25 - 100.21 = 0.04, the number of significant figures drops from 5 to 1. The result is dictated by decimal places, not total significant figures of the inputs."
        }
    ],
    "questionPattern": [
        "Calculating percentage error in density or g-value from experimental measurements.",
        "Finding dimensions of scaling constants in complex physical laws.",
        "Reading Vernier calliper and screw gauge measurements with zero errors.",
        "Deriving power-law dependencies using dimensional analysis."
    ],
    "quizQuestions": phy_units_questions
}

phy_motion_straight_content = {
    "id": "phy_motion_straight",
    "averageQuestions": "1–2 questions per year",
    "whatYoullLearn": [
        "Distinguish between distance, displacement, speed, and velocity in 1D.",
        "Analyze average and instantaneous acceleration.",
        "Apply the equations of motion for constant acceleration.",
        "Solve 1D relative velocity problems for overtaking and collision.",
        "Interpret and convert position-time (x-t), velocity-time (v-t), and acceleration-time (a-t) graphs."
    ],
    "concepts": [
        {
            "title": "Average vs. Instantaneous Quantities",
            "explanation": "Average velocity is the total displacement divided by the total time interval: v_avg = Δx / Δt. Instantaneous velocity is the derivative of position with respect to time: v(t) = dx/dt. Similarly, average acceleration is Δv / Δt, while instantaneous acceleration is a(t) = dv/dt = d^2x/dt^2 = v * dv/dx.",
            "example": "If position x(t) = 2*t^3, the instantaneous velocity at t = 2 s is v(2) = 6*(2)^2 = 24 m/s.",
            "trap": "Average speed is not simply the magnitude of average velocity! Average speed is total distance divided by total time, whereas average velocity is displacement divided by time."
        },
        {
            "title": "Kinematic Equations for Constant Acceleration",
            "explanation": "For constant acceleration a, the motion is governed by: (1) v = u + a*t, (2) s = u*t + 1/2 * a * t^2, (3) v^2 = u^2 + 2*a*s, and (4) s_n = u + a/2 * (2n - 1) (displacement in the n-th second). These equations are vector equations in one dimension and require consistent sign conventions.",
            "example": "A stone thrown upwards with velocity +u experiences acceleration -g. Its displacement is given by y = u*t - 1/2 * g * t^2.",
            "trap": "These equations are ONLY valid when acceleration is constant. If acceleration depends on time or velocity (e.g., a = -k*v), you must use integration: ∫ dv/a = ∫ dt or ∫ v dv/a = ∫ dx."
        },
        {
            "title": "Relative Motion in One Dimension",
            "explanation": "The relative velocity of body A with respect to body B is given by v_AB = v_A - v_B. The relative acceleration is a_AB = a_A - a_B. By choosing a frame of reference attached to one of the bodies, the equations of motion can be simplified to relative variables: s_AB = u_AB * t + 1/2 * a_AB * t^2.",
            "example": "Two cars moving towards each other with speeds v_A and v_B have a relative speed of approach of v_AB = v_A - (-v_B) = v_A + v_B.",
            "trap": "Be extremely careful with signs. If A moves to the right (+v) and B moves to the left (-v), the relative velocity v_AB = v - (-v) = 2v, not 0."
        },
        {
            "title": "Graphical Kinematics and Calculus Connections",
            "explanation": "On a position-time (x-t) graph, the slope represents velocity. On a velocity-time (v-t) graph, the slope represents acceleration, and the area under the curve represents displacement (or distance, if using the absolute value of velocity). On an acceleration-time (a-t) graph, the area represents the change in velocity. On an acceleration-position (a-x) graph, the area represents 1/2 * (v_f^2 - v_i^2).",
            "example": "For a particle under constant negative acceleration (e.g. ball thrown up), the x-t graph is a downward-opening parabola, v-t is a straight line with negative slope, and a-t is a horizontal line below the axis.",
            "trap": "The area under a v-t curve below the time axis is negative for displacement but positive for distance. Always pay attention to whether the question asks for distance or displacement."
        }
    ],
    "formulas": [
        "Average Velocity: v_avg = Δx / Δt",
        "Instantaneous Acceleration: a = dv/dt = v * dv/dx",
        "Equations of Motion (Constant a): v = u + at, s = ut + 1/2 * a * t^2, v^2 = u^2 + 2as",
        "Displacement in n-th Second: s_n = u + a/2 * (2n - 1)",
        "Relative Velocity: v_AB = v_A - v_B"
    ],
    "examTraps": [
        {
            "trap": "Average Speed vs. Magnitude of Average Velocity",
            "warning": "Average speed is Total Distance / Total Time. If a particle reverses direction, the total distance is greater than the magnitude of displacement, so average speed is strictly greater than the magnitude of average velocity."
        },
        {
            "trap": "Kinematic Equations with Variable Acceleration",
            "warning": "Do not use v = u + at or s = ut + 1/2 * a * t^2 if acceleration is variable (e.g., a = 3*t^2 or a = -k*v). You must integrate a = dv/dt or v dv/dx to find the motion equations."
        }
    ],
    "questionPattern": [
        "Calculating average speed for split-journey problems.",
        "Determining relative meeting time and position of two objects.",
        "Interpreting slopes and areas of kinematic graphs (v-t, a-x).",
        "Solving variable acceleration problems using differentiation and integration."
    ],
    "quizQuestions": phy_motion_straight_questions
}

output_data = {
    "phy_units": phy_units_content,
    "phy_motion_straight": phy_motion_straight_content
}

target_file = r"C:\Users\human\.gemini\antigravity\brain\d45a1739-9c09-47ff-a43b-64ca3db2cf33\scratch\batch_1.json"
os.makedirs(os.path.dirname(target_file), exist_ok=True)

with open(target_file, "w", encoding="utf-8") as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print("SUCCESS: JSON file generated successfully.")
