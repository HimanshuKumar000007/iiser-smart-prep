import json
import os

phy_electrostatics = {
    "id": "phy_electrostatics",
    "averageQuestions": "1-2 questions per year",
    "whatYoullLearn": [
        "Quantization and conservation of electric charge",
        "Applying Coulomb's Law to point charges and dielectric media",
        "Superposition principle for forces between multiple charges",
        "Calculating electric field of point charges, dipoles, and rings",
        "Electric flux and applying Gauss's Law to symmetrical charge distributions",
        "Electric field behavior inside and outside conducting and non-conducting bodies"
    ],
    "concepts": [
        {
            "title": "Quantization and Conservation of Charge",
            "explanation": "Electric charge is a fundamental property of matter. It is quantized, meaning any observable charge Q is an integral multiple of the elementary charge e (approx. 1.6 x 10^-19 C), so Q = ne where n is an integer. Charge is also globally conserved; the total net charge of an isolated system remains constant during any process.",
            "example": "When a glass rod is rubbed with silk, electrons transfer from the rod to the silk. The rod becomes positively charged (+Ne) and the silk becomes equally negatively charged (-Ne), preserving the net zero initial charge.",
            "trap": "Although charge is quantized, the discrete nature can be ignored at macroscopic scales where charges are on the order of microcoulombs, as the number of elementary charges is extremely large."
        },
        {
            "title": "Coulomb's Law and Dielectric Medium",
            "explanation": "The electrostatic force between two point charges q1 and q2 separated by distance r in vacuum is F = (1 / 4πε0) * (q1 * q2 / r^2). In a medium of dielectric constant K, the force is reduced: Fm = F / K = (1 / 4πε) * (q1 * q2 / r^2), where ε = K*ε0 is the permittivity of the medium.",
            "example": "If a dielectric slab of thickness t and dielectric constant K is placed between two charges separated by distance d, the effective vacuum distance becomes d' = d - t + t*sqrt(K), which decreases the force.",
            "trap": "Coulomb's law only applies directly to point charges. For extended conducting objects, charges redistribute due to electrostatic induction, shifting the effective centers of charge."
        },
        {
            "title": "Principle of Superposition",
            "explanation": "The net electrostatic force on a given charge due to a system of multiple charges is the vector sum of the individual forces exerted on it by each charge separately. The interaction between any two charges is completely unaffected by the presence of other charges.",
            "example": "For three equal point charges Q placed at the vertices of an equilateral triangle of side length a, the net force on any one charge is the vector sum of two forces of magnitude kQ^2/a^2 at an angle of 60 degrees, resulting in a net force of sqrt(3)*kQ^2/a^2.",
            "trap": "Never sum the magnitudes of the forces algebraically. You must always resolve them into components or use vector addition laws."
        },
        {
            "title": "Electric Field and Field Lines",
            "explanation": "The electric field E at a point is the electrostatic force per unit test charge placed at that point. Electric field lines are imaginary curves whose tangent at any point gives the direction of the field vector. They start from positive charges and end on negative charges.",
            "example": "The electric field due to a point charge drops off as 1/r^2, whereas the electric field of an electric dipole drops off as 1/r^3 at large distances.",
            "trap": "Electric field lines are not necessarily the paths that a released charge will follow. A charge only follows a field line if the line is a straight line."
        },
        {
            "title": "Electric Dipole",
            "explanation": "An electric dipole consists of two equal and opposite charges (+q and -q) separated by a small distance 2a. The dipole moment vector p has magnitude q*(2a) and points from the negative charge to the positive charge. In a uniform electric field E, a dipole experiences zero net force but a torque τ = p x E. Its potential energy is U = -p . E.",
            "example": "A dipole is in stable equilibrium when aligned parallel to the field (θ = 0, U = -pE) and in unstable equilibrium when aligned antiparallel (θ = 180 degrees, U = +pE).",
            "trap": "In a non-uniform electric field, the net force on a dipole is not zero. It experiences both a net force and a torque."
        },
        {
            "title": "Electric Flux and Gauss's Law",
            "explanation": "Electric flux Φ measures the flow of electric field through a surface and is given by the surface integral of E . dA. Gauss's Law states that the net electric flux through any closed Gaussian surface is equal to the total net charge enclosed divided by ε0: Φ = ∮ E . dA = q_encl / ε0.",
            "example": "A charge q placed at the corner of a cube is shared by 8 adjacent cubes. The flux through the three faces of the cube not meeting at the corner is q / (24*ε0).",
            "trap": "Gauss's law is always true for any closed surface, but it is only useful for calculating the electric field when the charge distribution possesses high symmetry (spherical, cylindrical, or planar)."
        },
        {
            "title": "Applications of Gauss's Law",
            "explanation": "Gauss's law simplifies electric field calculations for symmetric setups: (1) Infinite wire: E = λ / (2πε0*r). (2) Infinite thin sheet: E = σ / (2ε0). (3) Spherical shell: E = 0 inside, E = Q / (4πε0*r^2) outside.",
            "example": "Inside a solid, non-conducting sphere with a uniform volume charge density, the electric field increases linearly with distance from the center (E ∝ r), whereas it is zero inside a conducting sphere.",
            "trap": "The electric field just outside a charged conductor is σ/ε0, which is twice the field of a thin non-conducting sheet with the same charge density (σ/2ε0) because the conductor has two surfaces or charge on only one side with field directed outwards."
        }
    ],
    "formulas": [
        "Quantization: Q = ±n*e (e = 1.602 x 10^-19 C)",
        "Coulomb's Law: F = (1 / 4πε0) * (q1 * q2 / r^2)",
        "Effective distance in dielectric: r_eff = d - t + t*sqrt(K)",
        "Electric field of point charge: E = (1 / 4πε0) * (q / r^2)",
        "Axial field of short dipole: E_axial = (1 / 4πε0) * (2p / r^3)",
        "Equatorial field of short dipole: E_equatorial = (1 / 4πε0) * (p / r^3)",
        "Torque on dipole: τ = p x E = p*E*sin(θ)",
        "Potential energy of dipole: U = -p . E = -p*E*cos(θ)",
        "Electric flux: Φ = ∫ E . dA",
        "Gauss's Law: ∮ E . dA = q_encl / ε0",
        "Electric field of infinite line charge: E = λ / (2πε0*r)",
        "Electric field of infinite non-conducting sheet: E = σ / (2ε0)",
        "Electric field of conducting surface: E = σ / ε0",
        "Field inside solid non-conducting sphere: E = (Q * r) / (4πε0 * R^3)"
    ],
    "examTraps": [
        {
            "trap": "Superposition of forces vs field",
            "warning": "When calculating force, include the sign of charges only to determine direction, then perform vector addition. Do not insert signs directly into equations without considering geometry."
        },
        {
            "trap": "Dielectric slab of thickness t < d",
            "warning": "Do not divide the entire force formula by K. Only the portion containing the dielectric slab has its effective separation modified to t*sqrt(K)."
        },
        {
            "trap": "Gauss's law closed surfaces and flux",
            "warning": "If a charge is outside a closed surface, it does not contribute to the net flux, but it does contribute to the electric field at individual points on the surface."
        }
    ],
    "questionPattern": [
        "Determining net electrostatic force/equilibrium on charge configurations",
        "Calculating electric field along the axis of rings, line charges, and dipoles",
        "Evaluating electric flux through open or closed surfaces using symmetry/Gauss's law",
        "Finding electric fields inside cavities of charged spheres using superposition"
    ],
    "quizQuestions": [
        {
            "id": "phy_electrostatics-q1",
            "topicId": "electric-charge",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "A neutral metallic sphere is charged by rubbing it with a woolen cloth, such that it acquires a charge of -4.8 nC. What is the change in the mass of the sphere during this process? (Take mass of an electron m_e = 9.1 x 10^-31 kg, elementary charge e = 1.6 x 10^-19 C)",
            "options": [
                "Increase of 2.73 x 10^-20 kg",
                "Decrease of 2.73 x 10^-20 kg",
                "Increase of 1.73 x 10^-20 kg",
                "Decrease of 1.73 x 10^-20 kg"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The sphere acquires a negative charge of -4.8 nC = -4.8 x 10^-9 C, which means it gains electrons. Number of electrons gained n = |Q| / e = (4.8 x 10^-9) / (1.6 x 10^-19) = 3 x 10^10. The mass of the sphere increases by Δm = n * m_e = 3 x 10^10 * 9.1 x 10^-31 kg = 2.73 x 10^-20 kg."
        },
        {
            "id": "phy_electrostatics-q2",
            "topicId": "coulombs-law",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "Two identical small metal spheres are placed at a distance r from each other. They carry charges +2q and -6q, and exert an attractive electrostatic force F on each other. If the spheres are brought into contact and then separated to their original distance r, what is the new electrostatic force between them?",
            "options": [
                "F/3 (attractive)",
                "F/3 (repulsive)",
                "F/12 (repulsive)",
                "F/12 (attractive)"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Initial force F = k * |2q * -6q| / r^2 = 12 * k*q^2 / r^2 (attractive). After contact, charges redistribute equally due to identical sizes. Net charge is +2q - 6q = -4q, so each sphere gets -2q. New force F' = k * (-2q) * (-2q) / r^2 = 4 * k*q^2 / r^2. Since both spheres now have charges of the same sign (-2q), the force is repulsive. In terms of F, F' = F / 3 (repulsive)."
        },
        {
            "id": "phy_electrostatics-q3",
            "topicId": "electric-field",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "Which of the following statements about electric field lines is INCORRECT?",
            "options": [
                "Electric field lines start from positive charges and terminate at negative charges.",
                "The tangent to a field line at any point gives the direction of the electric field at that point.",
                "Electric field lines can form closed loops in an electrostatic field.",
                "Two electric field lines can never intersect each other."
            ],
            "correctAnswerIndex": 2,
            "explanation": "In electrostatics, electric field lines represent conservative electric fields and always start from positive charges (or infinity) and end on negative charges (or infinity). They cannot form closed loops, as that would violate the conservative nature of the electrostatic field (line integral of E around a closed path must be zero)."
        },
        {
            "id": "phy_electrostatics-q4",
            "topicId": "coulombs-law",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Two point charges q1 and q2 are placed at a distance d apart in vacuum. When a dielectric slab of thickness t (t < d) and dielectric constant K is introduced between them, the electrostatic force between the charges is found to be the same as if they were placed at a distance r in vacuum. What is the relation between r and t?",
            "options": [
                "r = d - t + t*sqrt(K)",
                "r = d - t + t/K",
                "r = d - t + t/sqrt(K)",
                "r = d - t*sqrt(K)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The presence of a dielectric slab of thickness t and dielectric constant K increases the effective electrical path. The slab of thickness t is equivalent to a vacuum path of thickness t*sqrt(K). Thus, the total effective distance between the charges in vacuum is r = (d - t) + t*sqrt(K). For the force to remain the same, this effective distance r must equal the distance in vacuum."
        },
        {
            "id": "phy_electrostatics-q5",
            "topicId": "forces-multiple-charges",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Two small, identical spheres of mass m and charge q are suspended from a common point by two light insulating strings of length L. In equilibrium, the strings make an angle θ with the vertical. The entire setup is now immersed in a liquid of density ρ0 and dielectric constant K. If the angle θ remains unchanged, what is the density of the material of the spheres (ρ)?",
            "options": [
                "ρ = K*ρ0 / (K - 1)",
                "ρ = (K - 1)*ρ0 / K",
                "ρ = K*ρ0",
                "ρ = ρ0 / (K - 1)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "In air, tan(θ) = Fe / (m*g). In the liquid, the electrostatic force is reduced to Fe' = Fe / K. The effective weight becomes m'*g = m*g*(1 - ρ0/ρ) due to buoyancy. For the angle θ to remain unchanged, we must have Fe' / (m'*g) = Fe / (m*g) => (Fe / K) / (m*g*(1 - ρ0/ρ)) = Fe / (m*g) => K*(1 - ρ0/ρ) = 1 => 1 - ρ0/ρ = 1/K => ρ0/ρ = (K-1)/K => ρ = K*ρ0 / (K - 1)."
        },
        {
            "id": "phy_electrostatics-q6",
            "topicId": "forces-multiple-charges",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Two equal positive point charges Q are fixed at positions (0, a) and (0, -a) on the y-axis. A particle of mass m and negative charge -q is released from rest at (x0, 0) on the x-axis, where 0 < x0 << a. Which of the following statements best describes the subsequent motion of the particle?",
            "options": [
                "The particle moves to the origin and stays there in stable equilibrium.",
                "The particle executes simple harmonic motion about the origin with angular frequency ω = sqrt(q*Q / (2*π*ε0 * m * a^3)).",
                "The particle executes simple harmonic motion about the origin with angular frequency ω = sqrt(q*Q / (4*π*ε0 * m * a^3)).",
                "The particle moves away to infinity along the positive x-axis."
            ],
            "correctAnswerIndex": 1,
            "explanation": "At distance x on the x-axis, the net electrostatic force on -q is attractive and directed toward the origin: Fx = -2 * k * q * Q * x / (x^2 + a^2)^(3/2). Since x0 << a, we can approximate x^2 + a^2 ≈ a^2, which gives Fx ≈ -2 * k * q * Q * x / a^3. Substituting k = 1/(4πε0) gives Fx = -[q * Q / (2 * π * ε0 * a^3)] * x. This is a linear restoring force (Fx = -c*x), which causes simple harmonic motion with angular frequency ω = sqrt(c/m) = sqrt(q*Q / (2*π*ε0 * m * a^3))."
        },
        {
            "id": "phy_electrostatics-q7",
            "topicId": "electric-field",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A thin ring of radius R is placed in the xy-plane with its center at the origin. It carries a uniform linear charge density λ. At what distance z along the axis of the ring (z-axis) is the magnitude of the electric field maximum?",
            "options": [
                "z = R",
                "z = R / sqrt(2)",
                "z = R / 2",
                "z = sqrt(2) * R"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The electric field on the axis of a uniformly charged ring of radius R at a distance z is E(z) = Q*z / (4*π*ε0 * (R^2 + z^2)^(3/2)). To find the maximum field, we set dE/dz = 0. Using the quotient rule: dE/dz = (Q / 4πε0) * [(R^2 + z^2)^(3/2) - z * (3/2)*(R^2 + z^2)^(1/2)*2z] / (R^2 + z^2)^3 = 0 => (R^2 + z^2) - 3z^2 = 0 => R^2 = 2z^2 => z = ± R / sqrt(2)."
        },
        {
            "id": "phy_electrostatics-q8",
            "topicId": "electric-flux",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A point charge +q is placed at the center of the open circular mouth of a hemispherical surface of radius R. What is the electric flux through the hemispherical surface?",
            "options": [
                "q / ε0",
                "q / (2*ε0)",
                "q / (4*ε0)",
                "Zero"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Imagine completing the hemisphere into a full closed sphere of radius R by adding another identical hemisphere on top. The charge +q is now enclosed at the center of this sphere. By Gauss's Law, the total flux through the closed sphere is q / ε0. Since the configuration is perfectly symmetrical, the flux is distributed equally between the two hemispheres. Hence, the flux through the single hemisphere is q / (2*ε0)."
        },
        {
            "id": "phy_electrostatics-q9",
            "topicId": "electric-dipole",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "An electric dipole of dipole moment p is placed in a uniform electric field E. The dipole is initially aligned parallel to the field (θ = 0). What is the work done by an external agent in rotating the dipole slowly by an angle of 180 degrees?",
            "options": [
                "p*E",
                "2*p*E",
                "Zero",
                "-2*p*E"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The potential energy of a dipole in an electric field is U(θ) = -p*E*cos(θ). The initial potential energy is Ui = U(0) = -p*E. The final potential energy is Uf = U(180) = -p*E*cos(180) = p*E. The work done by an external agent to rotate the dipole slowly is W_ext = Uf - Ui = p*E - (-p*E) = 2*p*E."
        },
        {
            "id": "phy_electrostatics-q10",
            "topicId": "gausss-law",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A solid, non-conducting sphere of radius R carries a uniform volume charge density ρ. Which of the following graphs correctly represents the variation of the magnitude of the electric field E with distance r from the center of the sphere?",
            "options": [
                "E ∝ r for r < R, and E ∝ 1/r^2 for r > R",
                "E = 0 for r < R, and E ∝ 1/r^2 for r > R",
                "E ∝ 1/r for r < R, and E ∝ 1/r^2 for r > R",
                "E ∝ r^2 for r < R, and E ∝ 1/r^2 for r > R"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Inside the sphere (r < R), we construct a concentric spherical Gaussian surface of radius r. The enclosed charge is q_encl = ρ * (4/3)*π*r^3. Gauss's Law gives: E * 4*π*r^2 = ρ * (4/3)*π*r^3 / ε0 => E = ρ*r / (3*ε0), so E ∝ r. Outside the sphere (r > R), the entire charge Q is enclosed, so Gauss's Law gives E = Q / (4*π*ε0 * r^2), so E ∝ 1/r^2."
        },
        {
            "id": "phy_electrostatics-q11",
            "topicId": "gausss-law",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "An infinitely long, thin-walled cylindrical shell of radius R has a uniform surface charge density σ. Find the electric field at a radial distance r from the cylinder axis, both inside (r < R) and outside (r > R).",
            "options": [
                "Ein = 0, Eout = σ*R / (ε0 * r)",
                "Ein = 0, Eout = σ / ε0",
                "Ein = σ*r / (ε0 * R), Eout = σ*R / (ε0 * r)",
                "Ein = 0, Eout = σ*R^2 / (ε0 * r^2)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Construct a coaxial cylindrical Gaussian surface of radius r and length L. (1) Inside (r < R): The enclosed charge is zero. Thus, by Gauss's Law, Ein = 0. (2) Outside (r > R): The enclosed charge is q_encl = σ * 2*π*R*L. Gauss's Law gives Eout * 2*π*r*L = σ * 2*π*R*L / ε0 => Eout = σ*R / (ε0 * r)."
        },
        {
            "id": "phy_electrostatics-q12",
            "topicId": "electric-dipole",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Two short electric dipoles with dipole moments p1 and p2 are placed along the x-axis, separated by a distance r, with their axes aligned parallel to the x-axis. What is the magnitude of the force between these two dipoles?",
            "options": [
                "(1 / 4πε0) * (6 * p1 * p2 / r^4)",
                "(1 / 4πε0) * (3 * p1 * p2 / r^3)",
                "(1 / 4πε0) * (2 * p1 * p2 / r^4)",
                "(1 / 4πε0) * (p1 * p2 / r^5)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The electric field produced by dipole 1 (at the origin, pointing along x) at a distance r along its axis is E1 = 2*p1 / (4*π*ε0 * r^3). Dipole 2 (moment p2) is in this non-uniform electric field. The force on a dipole in a non-uniform field is given by F = p * dE/dx. Here, F = p2 * d(E1)/dr = p2 * (2*p1 / 4πε0) * (-3 / r^4) = - (1 / 4πε0) * (6 * p1 * p2 / r^4). The magnitude of the force is (1 / 4πε0) * (6 * p1 * p2 / r^4)."
        },
        {
            "id": "phy_electrostatics-q13",
            "topicId": "gausss-law",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A solid, non-conducting sphere of radius R has a volume charge density that varies with radial distance r from the center as ρ(r) = ρ0 * (1 - r/R) for r <= R, and ρ(r) = 0 for r > R. At what distance r_m from the center is the electric field magnitude maximum?",
            "options": [
                "r_m = 2*R/3",
                "r_m = R/2",
                "r_m = 3*R/4",
                "r_m = R/sqrt(2)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "For any distance r <= R, the charge enclosed is q_encl = ∫[0 to r] ρ(r') * 4*π*r'^2 dr' = 4*π*ρ0 * ∫[0 to r] (r'^2 - r'^3/R) dr' = 4*π*ρ0 * [r^3/3 - r^4/(4*R)]. By Gauss's Law, E(r) = q_encl / (4*π*ε0 * r^2) = (ρ0 / ε0) * [r/3 - r^2/(4*R)]. To find the maximum field, set dE/dr = 0 => d/dr [r/3 - r^2/(4*R)] = 0 => 1/3 - 2*r / (4*R) = 0 => r / (2*R) = 1/3 => r_m = 2*R/3."
        },
        {
            "id": "phy_electrostatics-q14",
            "topicId": "electric-field",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A thin plastic rod is bent into a semicircle of radius R. The top half is uniformly charged with a linear charge density +λ, and the bottom half is uniformly charged with a linear charge density -λ. What is the magnitude of the net electric field at the center of the semicircle?",
            "options": [
                "λ / (2 * π * ε0 * R)",
                "λ / (4 * π * ε0 * R)",
                "2*λ / (π * ε0 * R)",
                "Zero"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Let the semicircle lie in the right half-plane from θ = -π/2 to π/2. The top half (0 to π/2) has linear charge density +λ and bottom half (-π/2 to 0) has -λ. An element of charge dq = λ*R*dθ on the top half creates a field dE at the center pointing down and left. By symmetry, the x-components of the field due to the positive and negative halves cancel out. The y-components reinforcement: the positive half creates field pointing downwards (y-component = -k*λ*dθ*sinθ/R), and the negative half also creates field pointing downwards (y-component = -k*λ*dθ*sin|θ|/R). Integrating over the semicircle, we get: Ey = 2 * ∫[0 to π/2] (-k*λ/R)*sinθ dθ = -(2*k*λ/R) * [-cos(θ)]_0^(π/2) = -2*k*λ/R. Since k = 1/(4πε0), Ey = -2*λ / (4*π*ε0 * R) = -λ / (2*π*ε0 * R). The magnitude is λ / (2 * π * ε0 * R)."
        },
        {
            "id": "phy_electrostatics-q15",
            "topicId": "forces-multiple-charges",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "Two identical positive point charges +Q are fixed at positions (-d, 0) and (d, 0) on the x-axis. A third point charge +q of mass m is placed at the origin. If the charge q is displaced slightly by a distance y0 along the y-axis (y0 << d) and released, what is its subsequent motion?",
            "options": [
                "Simple harmonic motion along the y-axis.",
                "The particle moves away to infinity along the y-axis.",
                "The particle returns to the origin and remains in stable equilibrium.",
                "The particle executes simple harmonic motion along the x-axis."
            ],
            "correctAnswerIndex": 1,
            "explanation": "When displaced by a distance y along the y-axis, the electrostatic forces from both charges +Q point away from the x-axis. The net force is: Fy = 2 * [k * q * Q / (d^2 + y^2)] * sin(θ) where sin(θ) = y / sqrt(d^2 + y^2). Thus, Fy = 2*k*q*Q * y / (d^2 + y^2)^(3/2). For y > 0, the force is in the positive y-direction, which means it acts away from the equilibrium position. The equilibrium is unstable along the y-axis, and the particle will be repelled away to infinity."
        },
        {
            "id": "phy_electrostatics-q16",
            "topicId": "electric-flux",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A point charge +q is placed at a distance d directly above the center of a flat square plate of side length 2d. What is the electric flux through the square plate?",
            "options": [
                "q / (6*ε0)",
                "q / (24*ε0)",
                "q / (4*ε0)",
                "q / (12*ε0)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "We can construct a closed symmetrical cube of side length 2d centered on the charge +q. In this configuration, the charge is at the center of the cube, and the distance from the charge to each of the 6 square faces is exactly d. By Gauss's Law, the total flux through the cube is q / ε0. By symmetry, the flux through each of the 6 identical faces (one of which is the given square plate of side 2d) is exactly one-sixth of the total flux. Thus, the flux is q / (6*ε0)."
        },
        {
            "id": "phy_electrostatics-q17",
            "topicId": "electric-field",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "An infinite, flat non-conducting sheet carries a uniform surface charge density σ. A circular hole of radius R is cut out of the sheet. What is the magnitude of the electric field at a point P on the axis of the hole, at a distance z from the plane of the sheet?",
            "options": [
                "E = σ*z / (2*ε0 * sqrt(R^2 + z^2))",
                "E = σ / (2*ε0) * (1 - z/sqrt(R^2 + z^2))",
                "E = σ*z / (ε0 * sqrt(R^2 + z^2))",
                "E = σ / (2*ε0) * (1 - R/sqrt(R^2 + z^2))"
            ],
            "correctAnswerIndex": 0,
            "explanation": "By the principle of superposition, the electric field of the sheet with the hole is equal to the field of a complete infinite sheet minus the field of a disk of radius R. The field of a complete infinite sheet is E_sheet = σ / (2*ε0). The field of a disk of radius R on its axis is E_disk = σ / (2*ε0) * (1 - z / sqrt(R^2 + z^2)). Therefore, E = E_sheet - E_disk = σ / (2*ε0) - σ / (2*ε0) * (1 - z / sqrt(R^2 + z^2)) = σ*z / (2*ε0 * sqrt(R^2 + z^2))."
        },
        {
            "id": "phy_electrostatics-q18",
            "topicId": "gausss-law",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A solid, non-conducting sphere of radius R has a uniform volume charge density ρ. A spherical cavity of radius a is scooped out of the sphere, with the center of the cavity located at a position vector b relative to the center of the sphere (where |b| + a < R). What is the electric field vector E at any point inside the cavity?",
            "options": [
                "E = ρ * b / (3*ε0)",
                "E = ρ * r / (3*ε0)",
                "E = Zero",
                "E = ρ * (r - b) / (3*ε0)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Let r be the position vector of a point inside the cavity relative to the center of the sphere, and r' be the position vector relative to the center of the cavity. Thus, r = b + r' => r' = r - b. By superposition, the field inside the cavity is the field of a solid sphere without a cavity (E1 = ρ*r / (3*ε0)) plus the field of a sphere of radius a with charge density -ρ (E2 = -ρ*r' / (3*ε0)). Thus, E = E1 + E2 = ρ * r / (3*ε0) - ρ * (r - b) / (3*ε0) = ρ * b / (3*ε0). The field is uniform in both magnitude and direction inside the cavity."
        }
    ]
}

phy_potential_cap = {
    "id": "phy_potential_cap",
    "averageQuestions": "1-2 questions per year",
    "whatYoullLearn": [
        "Relationship between electric field and electrostatic potential",
        "Properties and configurations of equipotential surfaces",
        "Calculating electrostatic potential energy of point charge systems",
        "Behavior of conductors in electrostatic equilibrium",
        "Capacitance of parallel plate capacitors with and without dielectrics",
        "Energy storage and sharing in capacitor circuits"
    ],
    "concepts": [
        {
            "title": "Electrostatic Potential and Relation to Field",
            "explanation": "Electrostatic potential V at a point is the potential energy per unit charge. It is a scalar quantity. The electric field vector E is the negative gradient of the potential: E = -∇V. In one dimension, Ex = -dV/dx.",
            "example": "If the potential is given by V(x) = 3x^2, the electric field is Ex = -d(3x^2)/dx = -6x.",
            "trap": "The electric field can be zero at a point where the potential is non-zero (e.g., inside a charged conducting shell), and vice-versa (e.g., at the equatorial plane of an electric dipole)."
        },
        {
            "title": "Equipotential Surfaces",
            "explanation": "An equipotential surface is a surface over which the electrostatic potential is constant. Because potential is constant, no work is done in moving a charge along an equipotential surface. The electric field lines are always perpendicular to the equipotential surface at every point.",
            "example": "For a point charge, the equipotential surfaces are concentric spheres centered on the charge.",
            "trap": "Equipotential surfaces can never intersect. If they did, there would be two different values of potential at the line of intersection, which is physically impossible."
        },
        {
            "title": "Electrostatic Potential Energy",
            "explanation": "The electrostatic potential energy U of a system of charges is the work done by an external agent to assemble the charges from infinite separation without acceleration. For a pair of charges, U = (1 / 4πε0) * (q1 * q2 / r). For a system of N charges, U is the sum over all pairs: U = ∑[i<j] (1 / 4πε0) * (qi * qj / rij).",
            "example": "For four identical charges q placed at the corners of a square of side a, the potential energy is U = (k*q^2 / a) * (4 + sqrt(2)).",
            "trap": "Be sure to include the proper signs of the charges when calculating potential energy, as it is a scalar quantity and can be positive or negative."
        },
        {
            "title": "Conducting Bodies in Electrostatics",
            "explanation": "In electrostatic equilibrium: (1) The electric field inside a conductor is zero. (2) Any net charge resides entirely on the outer surface. (3) The entire conductor is at a constant potential. (4) The electric field just outside is perpendicular to the surface and has magnitude σ/ε0.",
            "example": "Electrostatic shielding: A cavity inside a conductor is completely shielded from external electric fields; the field inside the cavity is zero regardless of outside charges.",
            "trap": "If a charge is placed inside a cavity in a conductor, it induces charges on the inner and outer surfaces, and the field outside the conductor will not be zero."
        },
        {
            "title": "Capacitance",
            "explanation": "Capacitance C is the ratio of the charge Q on a conductor to its potential V relative to infinity: C = Q / V. For a parallel plate capacitor in vacuum, C = ε0 * A / d, where A is the plate area and d is the separation.",
            "example": "If a dielectric slab of dielectric constant K is inserted, the capacitance increases to C = K * C0.",
            "trap": "Capacitance is a constant property depending only on the geometry and the medium of the capacitor; it does not depend on the charge Q or voltage V."
        },
        {
            "title": "Dielectrics and Energy Storage",
            "explanation": "When a dielectric slab is inserted into a capacitor: (1) If the battery is disconnected, charge Q remains constant, voltage decreases (V = V0/K), and stored energy decreases (U = U0/K). (2) If the battery remains connected, voltage V remains constant, charge increases (Q = K*Q0), and stored energy increases (U = K*U0). The energy density in the electric field is u = (1/2)*K*ε0 * E^2.",
            "example": "A capacitor connected to a battery of voltage V stores energy U = (1/2)*C*V^2. If a dielectric of constant K is inserted with the battery connected, the new energy is (1/2)*(K*C)*V^2 = K*U.",
            "trap": "Always check whether the battery is disconnected or connected when analyzing changes in capacitance, charge, potential, and energy."
        },
        {
            "title": "Combinations and Sharing of Charge",
            "explanation": "Capacitors in parallel share the same potential: C_eq = C1 + C2. Capacitors in series share the same charge (if initially uncharged): 1/C_eq = 1/C1 + 1/C2. When a charged capacitor C1 at potential V1 is connected to an uncharged capacitor C2, charge redistribution occurs until they reach a common potential V = C1*V1 / (C1 + C2), leading to energy loss as heat.",
            "example": "The heat loss during connection in parallel is given by ΔU = (1/2) * (C1 * C2 / (C1 + C2)) * V1^2.",
            "trap": "In series, the charges are equal only if the capacitors were initially uncharged. If they had initial charges, use conservation of charge at the floating node to solve."
        }
    ],
    "formulas": [
        "Potential of point charge: V = (1 / 4πε0) * (q / r)",
        "Relation between field and potential: E = -∇V (Ex = -∂V/∂x, Ey = -∂V/∂y, Ez = -∂V/∂z)",
        "Work done: W = q * ΔV = q * (V_final - V_initial)",
        "Potential of short dipole: V = (1 / 4πε0) * (p * cos(θ) / r^2)",
        "Potential energy of charge system: U = ∑[i<j] (1 / 4πε0) * (qi * qj / rij)",
        "Capacitance of parallel plate capacitor: C = ε0 * A / d",
        "Capacitance with dielectric slab: C = ε0 * A / (d - t + t/K)",
        "Stored energy in capacitor: U = (1/2)*C*V^2 = Q^2 / (2*C) = (1/2)*Q*V",
        "Energy density: u = (1/2) * ε0 * E^2 (in vacuum) or (1/2) * K * ε0 * E^2 (in dielectric)",
        "Common potential: V_common = (C1*V1 + C2*V2) / (C1 + C2)",
        "Heat loss in charge sharing: ΔU = (1/2) * [C1*C2 / (C1 + C2)] * (V1 - V2)^2",
        "Electrostatic pressure on conducting surface: P = σ^2 / (2*ε0)"
    ],
    "examTraps": [
        {
            "trap": "Electric field and potential inside a conductor",
            "warning": "The electric field inside a conductor is zero, but the potential is constant and equal to the potential on its surface. Do not assume the potential is zero."
        },
        {
            "trap": "Work done on equipotential surfaces",
            "warning": "Work done is zero only if the starting and ending points are on the same equipotential surface. The path taken in between does not matter because the electrostatic force is conservative."
        },
        {
            "trap": "Dielectric insertion: battery connected vs disconnected",
            "warning": "If the battery remains connected, voltage V remains constant. If the battery is disconnected, charge Q remains constant. Misidentifying this state leads to incorrect energy calculations."
        }
    ],
    "questionPattern": [
        "Calculating electric field vectors from potential functions",
        "Determining work done in assembling or moving charges",
        "Finding potential of conducting shells under electrostatic induction",
        "Calculating equivalent capacitance for variable dielectric constants"
    ],
    "quizQuestions": [
        {
            "id": "phy_potential_cap-q1",
            "topicId": "electrostatic-potential",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "Two points A and B are located at distances r_A = 2 m and r_B = 4 m from a point charge q = 8 nC in vacuum. What is the potential difference V_A - V_B?",
            "options": [
                "18 V",
                "36 V",
                "9 V",
                "27 V"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The potential at distance r from a point charge q is V = k*q / r. So V_A = 9 x 10^9 * 8 x 10^-9 / 2 = 36 V, and V_B = 9 x 10^9 * 8 x 10^-9 / 4 = 18 V. The potential difference V_A - V_B = 36 - 18 = 18 V."
        },
        {
            "id": "phy_potential_cap-q2",
            "topicId": "equipotential-surfaces",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "Which of the following properties of equipotential surfaces is FALSE?",
            "options": [
                "The work done in moving a charge between any two points on an equipotential surface is zero.",
                "Electric field lines are always parallel to equipotential surfaces.",
                "Equipotential surfaces are closer together in regions of stronger electric fields.",
                "Two equipotential surfaces of different potentials can never intersect."
            ],
            "correctAnswerIndex": 1,
            "explanation": "Electric field lines are always perpendicular to equipotential surfaces, not parallel. The potential difference along an equipotential surface is zero, so the work done dW = q * E . dr = 0 => E is perpendicular to the displacement vector dr along the surface."
        },
        {
            "id": "phy_potential_cap-q3",
            "topicId": "capacitance",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "A parallel plate capacitor has a capacitance C in air. If the distance between the plates is halved and a dielectric medium of dielectric constant K = 4 is filled completely in the space between the plates, what is the new capacitance?",
            "options": [
                "8*C",
                "2*C",
                "4*C",
                "C/2"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The capacitance of a parallel plate capacitor in air is C = ε0 * A / d. When the distance is halved (d' = d/2) and dielectric constant K = 4 is filled inside, the new capacitance is C' = K * ε0 * A / d' = 4 * ε0 * A / (d/2) = 8 * (ε0 * A / d) = 8*C."
        },
        {
            "id": "phy_potential_cap-q4",
            "topicId": "electrostatic-potential",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A total charge Q is distributed non-uniformly along a thin plastic ring of radius R. What is the electrostatic potential at the center of the ring?",
            "options": [
                "Q / (4*π*ε0 * R)",
                "Zero",
                "It depends on the exact non-uniform distribution of charge",
                "Q / (2*π*ε0 * R)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Since potential is a scalar quantity, the potential at the center is the sum of potentials due to each infinitesimal charge element dq: V = ∫ dq / (4*π*ε0 * R). Since every point on the ring is at the same distance R from the center, the R term is constant and can be pulled out of the integral: V = (1 / 4πε0*R) * ∫ dq = Q / (4*π*ε0 * R). This is independent of the distribution of the charge."
        },
        {
            "id": "phy_potential_cap-q5",
            "topicId": "potential-energy",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Three point charges +q, +q, and -q are placed at the vertices of an equilateral triangle of side length a. What is the total electrostatic potential energy of this system?",
            "options": [
                "- q^2 / (4*π*ε0 * a)",
                "- 3*q^2 / (4*π*ε0 * a)",
                "q^2 / (4*π*ε0 * a)",
                "Zero"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The total potential energy is the sum of potential energies of the three pairs of charges: U = U12 + U23 + U13 = (1 / 4πε0) * [ (+q)*(+q)/a + (+q)*(-q)/a + (+q)*(-q)/a ] = (1 / 4πε0 * a) * [ q^2 - q^2 - q^2 ] = - q^2 / (4*π*ε0 * a)."
        },
        {
            "id": "phy_potential_cap-q6",
            "topicId": "conductors-electrostatics",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Two conducting spheres of radii R1 and R2 (R1 > R2) are charged to potentials V1 and V2 respectively. They are then connected by a thin conducting wire. When electrostatic equilibrium is reached, which of the following statements is true?",
            "options": [
                "The potential of both spheres is the same.",
                "The charge on both spheres is the same.",
                "The electric field at the surface of both spheres is the same.",
                "The potential of the larger sphere is greater than that of the smaller sphere."
            ],
            "correctAnswerIndex": 0,
            "explanation": "When two conducting spheres are connected by a wire, charges flow from the sphere at higher potential to the one at lower potential until their potentials become equal. In electrostatic equilibrium, the connected conductors form a single equipotential body, so they must have the same potential."
        },
        {
            "id": "phy_potential_cap-q7",
            "topicId": "capacitance",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A parallel plate capacitor has plate area A and plate separation d. A metal plate of thickness t (t < d) is inserted between the plates, parallel to them. What is the new capacitance of the system?",
            "options": [
                "ε0 * A / (d - t)",
                "ε0 * A / d",
                "ε0 * A / (d + t)",
                "t * ε0 * A / d^2"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A metal plate acts as a conductor, which has an infinite dielectric constant (K = ∞). The capacitance of a capacitor with a slab of thickness t and dielectric constant K is C = ε0 * A / (d - t + t/K). For a metal slab, as K -> ∞, the term t/K goes to 0. The capacitance becomes C = ε0 * A / (d - t)."
        },
        {
            "id": "phy_potential_cap-q8",
            "topicId": "electrostatic-potential",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A short electric dipole of dipole moment p is placed at the origin along the z-axis. What is the electrostatic potential at a point (r, θ) in polar coordinates, where r is the distance from the origin and θ is the angle with the z-axis?",
            "options": [
                "p * cos(θ) / (4*π*ε0 * r^2)",
                "p * sin(θ) / (4*π*ε0 * r^2)",
                "p * cos(θ) / (4*π*ε0 * r)",
                "p / (4*π*ε0 * r^3)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The potential due to a short dipole of moment p at a point at distance r and making an angle θ with the dipole axis (z-axis) is V = (1 / 4πε0) * (p * cos(θ) / r^2)."
        },
        {
            "id": "phy_potential_cap-q9",
            "topicId": "equipotential-surfaces",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "In a certain region of space, the equipotential surfaces are parallel planes perpendicular to the z-axis, and the potential decreases at a rate of 100 V/m in the positive z-direction. What is the electric field in this region?",
            "options": [
                "100 * k V/m",
                "-100 * k V/m",
                "100 * i V/m",
                "Zero"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The electric field is related to potential by E = -∇V. Since the potential only varies along the z-axis, E = - (dV/dz) * k. The rate of decrease of potential in the +z direction is 100 V/m, so dV/dz = -100 V/m. Therefore, E = -(-100) * k = 100 * k V/m."
        },
        {
            "id": "phy_potential_cap-q10",
            "topicId": "potential-energy",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A capacitor of capacitance C is charged to a potential V0 and then disconnected from the battery. It is then connected in parallel with an identical uncharged capacitor. What is the loss in electrostatic energy of the system during this process?",
            "options": [
                "(1/4) * C * V0^2",
                "(1/2) * C * V0^2",
                "(1/8) * C * V0^2",
                "Zero"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Initial stored energy is Ui = (1/2)*C*V0^2. The total charge Q = C*V0 is conserved. When connected to an identical uncharged capacitor, the equivalent capacitance becomes C_eq = C + C = 2C. The final stored energy is Uf = Q^2 / (2 * C_eq) = (C * V0)^2 / (4 * C) = (1/4) * C * V0^2. The energy loss is ΔU = Ui - Uf = (1/2)*C*V0^2 - (1/4)*C*V0^2 = (1/4) * C * V0^2."
        },
        {
            "id": "phy_potential_cap-q11",
            "topicId": "conductors-electrostatics",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A spherical conducting shell of inner radius a and outer radius b has a point charge +q placed at its center. The shell is uncharged. What is the electrostatic potential of the shell?",
            "options": [
                "q / (4*π*ε0 * b)",
                "q / (4*π*ε0 * a)",
                "Zero",
                "q / (4*π*ε0) * (1/a - 1/b)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A charge +q at the center induces a charge -q on the inner surface (r = a) and +q on the outer surface (r = b) of the conducting shell. The potential on the shell is uniform. Let's find the potential at the outer surface r = b. By superposition, the potential at r = b is V = k*q/b (due to the center charge) + k*(-q)/b (due to the inner surface charge) + k*(+q)/b (due to the outer surface charge) = k*q/b = q / (4*π*ε0 * b)."
        },
        {
            "id": "phy_potential_cap-q12",
            "topicId": "capacitance",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A parallel plate capacitor is connected to a battery of constant voltage V. The plates are pulled apart slowly to double their original separation. Which of the following statements is correct?",
            "options": [
                "The energy stored in the capacitor decreases by a factor of 2, and the work done by the battery is negative.",
                "The energy stored in the capacitor increases by a factor of 2, and the work done by the battery is positive.",
                "The electric field between the plates remains unchanged.",
                "The charge on the plates remains unchanged."
            ],
            "correctAnswerIndex": 0,
            "explanation": "The initial capacitance is C = ε0 * A / d. If plate separation is doubled, the capacitance becomes C' = C/2. Since the battery remains connected, the voltage V is constant. The stored energy decreases from (1/2)*C*V^2 to (1/4)*C*V^2 (decreases by a factor of 2). The charge decreases from Q = C*V to Q' = C*V / 2. A charge of ΔQ = -C*V/2 flows back into the battery. The work done by the battery is W_battery = ΔQ * V = - (1/2)*C*V^2 (negative work)."
        },
        {
            "id": "phy_potential_cap-q13",
            "topicId": "electrostatic-potential",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "The electrostatic potential in a region of space is given by V(x, y, z) = x^2 * y - y * z^2. What is the electric field vector E at the point (1, 2, 1)?",
            "options": [
                "E = -4 * i + 4 * k",
                "E = 4 * i - j - 4 * k",
                "E = -4 * i + j + 4 * k",
                "E = -2 * i + j + 2 * k"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The electric field components are given by Ex = -∂V/∂x = -2*x*y, Ey = -∂V/∂y = -(x^2 - z^2), Ez = -∂V/∂z = 2*y*z. Evaluating these at the point (1, 2, 1): Ex = -2*(1)*(2) = -4, Ey = -(1^2 - 1^2) = 0, Ez = 2*(2)*(1) = 4. Hence, the electric field vector is E = -4 * i + 4 * k."
        },
        {
            "id": "phy_potential_cap-q14",
            "topicId": "potential-energy",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "An infinite number of charges, each equal to q, are placed along the x-axis at x = 1, 2, 4, 8, ... meters. A charge of -q is placed at the origin. What is the total electrostatic potential energy of the charge at the origin due to all other charges?",
            "options": [
                "- q^2 / (2 * π * ε0)",
                "- q^2 / (4 * π * ε0)",
                "- q^2 / (8 * π * ε0)",
                "- q^2 / (π * ε0)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The potential V at the origin due to all other charges is: V = ∑[n=0 to ∞] k*q / (2^n) = k*q * [ 1 + 1/2 + 1/4 + 1/8 + ... ]. The sum of the infinite geometric series is 1 / (1 - 1/2) = 2. So V = 2*k*q = 2*q / (4*π*ε0) = q / (2*π*ε0). The potential energy of the charge -q placed at the origin is U = -q * V = - q^2 / (2 * π * ε0)."
        },
        {
            "id": "phy_potential_cap-q15",
            "topicId": "capacitance",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A parallel plate capacitor has plate area A and plate separation d. A dielectric slab of thickness d is inserted between the plates. The dielectric constant K varies linearly with distance x from the left plate (x = 0) to the right plate (x = d) according to the relation K(x) = K0 * (1 + x/d). What is the equivalent capacitance of this capacitor?",
            "options": [
                "C = K0 * ε0 * A / (d * ln(2))",
                "C = K0 * ε0 * A * ln(2) / d",
                "C = 2 * K0 * ε0 * A / d",
                "C = K0 * ε0 * A / (2 * d)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "We can model the capacitor as an infinite series combination of differential capacitors of thickness dx. The capacitance of a differential element is dC = K(x)*ε0*A / dx. Since they are in series, 1/C = ∫[0 to d] 1/dC = ∫[0 to d] dx / (K0*(1 + x/d)*ε0*A) = (1 / (K0*ε0*A)) * ∫[0 to d] dx / (1 + x/d). The integral of dx / (1 + x/d) is d * ln(1 + x/d). Evaluating from 0 to d gives d * ln(2). Thus, 1/C = d * ln(2) / (K0*ε0*A), which gives C = K0 * ε0 * A / (d * ln(2))."
        },
        {
            "id": "phy_potential_cap-q16",
            "topicId": "conductors-electrostatics",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A point charge +q is placed at a distance d from the center of an uncharged, isolated conducting solid sphere of radius R (d > R). What is the electrostatic potential of the conducting sphere?",
            "options": [
                "q / (4*π*ε0 * d)",
                "q / (4*π*ε0 * R)",
                "Zero",
                "q / (4*π*ε0 * (d - R))"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Since the sphere is conducting, its entire body is at a uniform potential. We can calculate the potential at its center. The potential at the center is the sum of the potential due to the point charge +q (which is k*q/d) and the potential due to the induced charges on the sphere. Since the sphere is uncharged and isolated, the net induced charge is zero. Because all parts of the sphere's surface are at distance R from the center, the potential at the center due to induced charge is V_induced = ∫ dqi / (4πε0*R) = (1 / 4πε0*R) * ∫ dqi = 0. Therefore, the potential at the center, and thus the entire sphere, is simply q / (4*π*ε0 * d)."
        },
        {
            "id": "phy_potential_cap-q17",
            "topicId": "potential-energy",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A particle of mass m and positive charge q is projected from infinity with an initial speed v0 directly towards the center of a fixed, uniformly charged ring of radius R and total positive charge Q. What is the minimum speed v0 required for the particle to pass through the center of the ring?",
            "options": [
                "v0 = sqrt(2*q*Q / (4*π*ε0 * m * R))",
                "v0 = sqrt(q*Q / (4*π*ε0 * m * R))",
                "v0 = sqrt(q*Q / (2*π*ε0 * m * R))",
                "v0 = sqrt(4*q*Q / (4*π*ε0 * m * R))"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The potential along the axis of a uniformly charged ring of radius R at a distance x from the center is V(x) = Q / (4*π*ε0 * sqrt(R^2 + x^2)). At the center of the ring (x = 0), the potential is V_center = Q / (4*π*ε0 * R). The potential at infinity is zero. By conservation of energy, the initial kinetic energy must be at least equal to the change in potential energy to reach the center: (1/2)*m*v0^2 >= q * V_center = q * Q / (4*π*ε0 * R) => v0 >= sqrt(2*q*Q / (4*π*ε0 * m * R))."
        },
        {
            "id": "phy_potential_cap-q18",
            "topicId": "capacitance",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A parallel plate capacitor with plate area A and separation d is connected to a battery of voltage V. A dielectric slab of dielectric constant K and thickness d is slowly inserted to fill the capacitor. What is the work done by the external agent during this slow insertion?",
            "options": [
                "- (1/2) * (K - 1) * (ε0 * A / d) * V^2",
                "(1/2) * (K - 1) * (ε0 * A / d) * V^2",
                "- (K - 1) * (ε0 * A / d) * V^2",
                "Zero"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Let C0 = ε0*A/d be the initial capacitance. The final capacitance is C = K*C0. Since the battery remains connected, voltage V is constant. The change in stored energy is ΔU = (1/2)*C*V^2 - (1/2)*C0*V^2 = (1/2)*(K - 1)*C0*V^2. The charge increases by ΔQ = (K - 1)*C0*V. The work done by the battery is W_battery = ΔQ * V = (K - 1)*C0*V^2. By conservation of energy, the work done by the external agent is W_ext = ΔU - W_battery = (1/2)*(K - 1)*C0*V^2 - (K - 1)*C0*V^2 = - (1/2)*(K - 1)*C0*V^2 = - (1/2)*(K - 1)*(ε0 * A / d)*V^2. The negative work indicates that the external agent must pull back against the attractive electrostatic force to keep the insertion slow."
        }
    ]
}

data = {
    "phy_electrostatics": phy_electrostatics,
    "phy_potential_cap": phy_potential_cap
}

target_path = r"C:\Users\human\.gemini\antigravity\brain\d45a1739-9c09-47ff-a43b-64ca3db2cf33\scratch\batch_8.json"
os.makedirs(os.path.dirname(target_path), exist_ok=True)
with open(target_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully wrote batch_8.json with all required contents.")
