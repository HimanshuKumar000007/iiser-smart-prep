import json
import os

phy_gravitation_data = {
    "id": "phy_gravitation",
    "averageQuestions": "1-2 questions per year",
    "whatYoullLearn": [
        "Apply Kepler's three laws of planetary motion to describe elliptical orbits and orbital periods",
        "Calculate the gravitational force using Newton's law of universal gravitation for point masses and spherical shells",
        "Analyze the variation of acceleration due to gravity $g$ with altitude, depth, and Earth's rotation (latitude)",
        "Evaluate gravitational potential and potential energy for continuous and point-mass systems",
        "Calculate escape velocity and understand its independence from the mass of the projectile and projection angle",
        "Determine orbital speed, time period, and energy distributions (kinetic, potential, total) for satellites"
    ],
    "concepts": [
        {
            "title": "Kepler's Second Law and Angular Momentum",
            "explanation": "Kepler's second law states that the areal velocity of a planet (rate of area swept out by the radius vector) is constant: $\\frac{dA}{dt} = \\frac{L}{2m} = \\text{const}$. This is a direct consequence of the conservation of angular momentum because gravity is a central force, meaning the torque on the planet about the Sun is always zero.",
            "example": "A planet moves fastest at perihelion (closest to the Sun) and slowest at aphelion (farthest from the Sun), satisfying $r_p v_p = r_a v_a$.",
            "trap": "Although the linear speed and kinetic energy of the planet vary continuously along the orbit, its angular momentum and total mechanical energy remain strictly constant."
        },
        {
            "title": "Variation of $g$ due to Rotation (Latitude)",
            "explanation": "Earth's rotation about its axis creates a centrifugal effect that reduces the effective acceleration due to gravity. The effective gravity $g'$ at a latitude $\\theta$ is given by $g'(\\theta) = g - R_E \\omega^2 \\cos^2\\theta$, where $\\omega$ is Earth's angular velocity and $R_E$ is the Earth's radius.",
            "example": "An object weighs slightly less at the equator (latitude $0^\\circ$, where $\\cos 0^\\circ = 1$) than at the poles (latitude $90^\\circ$, where $\\cos 90^\\circ = 0$).",
            "trap": "The Earth's rotation has zero effect on the acceleration due to gravity at the poles, and the maximum reduction occurs at the equator."
        },
        {
            "title": "Gravitational Self-Energy",
            "explanation": "The gravitational self-energy of a body is the work done by an external agent to assemble the body's mass by bringing infinitesimal mass elements from infinity. For a uniform solid sphere of mass $M$ and radius $R$, the self-energy is $U_s = -\\frac{3 G M^2}{5 R}$.",
            "example": "The energy required to completely break up a planet of uniform density and disperse its pieces to infinity is $\\frac{3 G M^2}{5 R}$.",
            "trap": "For a thin uniform spherical shell, the self-energy is $-\\frac{G M^2}{2 R}$ because there is no internal mass distribution to account for."
        }
    ],
    "formulas": [
        "$F = G \\frac{m_1 m_2}{r^2}$",
        "$g_h = g\\left(1 - \\frac{2h}{R_E}\\right)$ (for $h \\ll R_E$)",
        "$g_h = g \\frac{R_E^2}{(R_E + h)^2}$ (exact formula for any height)",
        "$g_d = g\\left(1 - \\frac{d}{R_E}\\right)$ (variation with depth)",
        "$g'_\\theta = g - R_E \\omega^2 \\cos^2\\theta$ (variation with latitude $\\theta$)",
        "$V = -\\frac{GM}{r}$ (gravitational potential of a point mass)",
        "$U_g = -\\frac{G M m}{r}$ (gravitational potential energy)",
        "$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}$ (escape velocity)",
        "$v_o = \\sqrt{\\frac{GM}{r}}$ (orbital velocity of a satellite)",
        "$T^2 = \\frac{4\\pi^2}{GM} a^3$ (Kepler's Third Law for semi-major axis $a$)",
        "$E_{total} = -\\frac{GMm}{2r} = \\frac{1}{2} U_g = -K_e$ (satellite energy relations)"
    ],
    "examTraps": [
        {
            "trap": "Approximation of $g$ at height $h$",
            "warning": "Do not use the linear approximation $g_h = g(1 - 2h/R_E)$ if the height $h$ is comparable to the Earth's radius $R_E$. For height $h \\ge 0.1 R_E$, always use the exact formula $g_h = g \\frac{R_E^2}{(R_E + h)^2}$."
        },
        {
            "trap": "Escape Velocity Angle",
            "warning": "Escape velocity is independent of the angle of projection (as long as it does not hit the planet itself) because it is derived from energy conservation, which is a scalar relation."
        }
    ],
    "questionPattern": [
        "Analyzing orbital changes under small impulses or perturbations",
        "Calculating potential and field inside cavities of solid spheres",
        "Using Kepler's 3rd Law for binary systems or non-standard potentials",
        "Deducing variation of weight with depth, altitude, and rotation"
    ],
    "quizQuestions": [
        {
            "id": "phy_gravitation-q1",
            "topicId": "keplers-laws",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "The distance of two planets $A$ and $B$ from the Sun are in the ratio $1 : 4$. What is the ratio of their periods of revolution around the Sun?",
            "options": ["$1 : 2$", "$1 : 4$", "$1 : 8$", "$1 : 16$"],
            "correctAnswerIndex": 2,
            "explanation": "According to Kepler's Third Law, the square of the orbital period $T$ is proportional to the cube of the semi-major axis $r$ of the orbit ($T^2 \\propto r^3$). Therefore, we can write $(T_A / T_B)^2 = (r_A / r_B)^3$. Substituting the given ratio $r_A / r_B = 1/4$, we get $(T_A / T_B)^2 = (1/4)^3 = 1/64$. Taking the square root of both sides gives $T_A / T_B = 1/8$, which is the ratio $1 : 8$."
        },
        {
            "id": "phy_gravitation-q2",
            "topicId": "acceleration-due-to-gravity",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "At what depth $d$ below the Earth's surface will the acceleration due to gravity become half of its value on the surface? (Assume Earth to be a uniform sphere of radius $R_E$)",
            "options": ["$d = R_E / 4$", "$d = R_E / 2$", "$d = 3R_E / 4$", "$d = R_E / 3$"],
            "correctAnswerIndex": 1,
            "explanation": "The variation of acceleration due to gravity with depth $d$ below the surface is given by the formula $g_d = g\\left(1 - \\frac{d}{R_E}\\right)$, where $g$ is the acceleration due to gravity at the surface. Setting $g_d = g/2$, we get $\\frac{g}{2} = g\\left(1 - \\frac{d}{R_E}\\right) \\implies \\frac{1}{2} = 1 - \\frac{d}{R_E} \\implies \\frac{d}{R_E} = \\frac{1}{2} \\implies d = \\frac{R_E}{2}$."
        },
        {
            "id": "phy_gravitation-q3",
            "topicId": "escape-velocity",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "The escape velocity from the surface of Earth is $v_e$. If the radius of a planet is double that of Earth and its mean density is the same as that of Earth, the escape velocity from the surface of this planet will be:",
            "options": ["$v_e$", "$2v_e$", "$4v_e$", "$v_e / 2$"],
            "correctAnswerIndex": 1,
            "explanation": "The escape velocity from a planet is given by $v_e = \\sqrt{\\frac{2GM}{R}}$. The mass of a spherical planet of density $\\rho$ and radius $R$ is $M = \\frac{4}{3}\\pi R^3 \\rho$. Substituting this into the formula gives $v_e = \\sqrt{\\frac{2G}{R} \\left(\\frac{4}{3}\\pi R^3 \\rho\\right)} = R \\sqrt{\\frac{8}{3} \\pi G \\rho}$. Since the mean density $\\rho$ is the same for both Earth and the planet, the escape velocity is directly proportional to the radius: $v_e \\propto R$. If the radius is doubled, the escape velocity will also be doubled, i.e., $2v_e$."
        },
        {
            "id": "phy_gravitation-q4",
            "topicId": "keplers-laws",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "A satellite is moving in an elliptical orbit around a planet. If $v_p$ and $v_a$ are the linear velocities of the satellite at the perihelion and aphelion respectively, and $r_p$ and $r_a$ are the corresponding distances, which of the following is true?",
            "options": [
                "$v_p r_p^2 = v_a r_a^2$",
                "$v_p r_p = v_a r_a$",
                "$v_p^2 r_p = v_a^2 r_a$",
                "$v_p / r_p = v_a / r_a$"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Since the gravitational force acting on the satellite is a central force directed towards the center of the planet, the net torque acting on the satellite about the planet's center is zero. Therefore, the angular momentum $\\vec{L} = m (\\vec{r} \\times \\vec{v})$ is conserved. At perihelion and aphelion, the velocity vector is perpendicular to the position vector, so the angle $\\theta = 90^\\circ$. The magnitude of the angular momentum at these points is $L = m v_p r_p = m v_a r_a$. Since $m$ is constant, this simplifies to $v_p r_p = v_a r_a$."
        },
        {
            "id": "phy_gravitation-q5",
            "topicId": "universal-gravitation",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Consider a thin uniform spherical shell of mass $M$ and radius $R$. A point mass $m$ is placed at a distance $r$ from the center of the shell. Which of the following statements correctly depicts the gravitational force $F(r)$ exerted by the shell on the point mass?",
            "options": [
                "$F(r) = 0$ for $r < R$ and $F(r) \\propto 1/r^2$ for $r \\ge R$",
                "$F(r) \\propto r$ for $r < R$ and $F(r) \\propto 1/r^2$ for $r \\ge R$",
                "$F(r) = 0$ for $r \\le R$ and $F(r) \\propto 1/r$ for $r > R$",
                "$F(r)$ is constant for $r < R$ and decreases as $1/r^2$ for $r \\ge R$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "According to Newton's Shell Theorem: 1. A uniform spherical shell of mass exerts no gravitational force on a particle located inside it ($r < R$). Hence, $F(r) = 0$ inside. 2. Outside the shell ($r \\ge R$), the shell exerts a gravitational force on an external particle as if all its mass were concentrated at its center. Thus, $F(r) = \\frac{GMm}{r^2} \\propto \\frac{1}{r^2}$. This corresponds to option 1."
        },
        {
            "id": "phy_gravitation-q6",
            "topicId": "acceleration-due-to-gravity",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "At what height $h$ above the Earth's surface does the acceleration due to gravity decrease by $36\\%$ from its value at the surface? (Let $R_E$ be the radius of the Earth)",
            "options": ["$h = R_E / 2$", "$h = R_E / 4$", "$h = R_E / 3$", "$h = 2R_E / 3$"],
            "correctAnswerIndex": 1,
            "explanation": "If the acceleration due to gravity decreases by $36\\%$, its new value is $g_h = 100\\% - 36\\% = 64\\%$ of the surface value $g$. That is, $g_h = 0.64 g$. Since this decrease is very large, the linear approximation $g_h \\approx g(1 - 2h/R_E)$ cannot be used. We must use the exact relation: $g_h = g \\frac{R_E^2}{(R_E + h)^2}$. Substituting $g_h = 0.64 g$, we get $0.64 = \\frac{R_E^2}{(R_E + h)^2}$. Taking the square root of both sides gives $0.8 = \\frac{R_E}{R_E + h} \\implies 0.8 R_E + 0.8 h = R_E \\implies 0.8 h = 0.2 R_E \\implies h = \\frac{0.2}{0.8} R_E = \\frac{R_E}{4}$."
        },
        {
            "id": "phy_gravitation-q7",
            "topicId": "acceleration-due-to-gravity",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Due to the Earth's rotation about its polar axis, the weight of a body at the equator becomes $3/5$ of its weight at the poles. If the angular velocity of the Earth is doubled, what will be the ratio of the weight of the same body at the equator to its weight at the poles? (Assume the shape of the Earth remains spherical)",
            "options": ["$1/5$", "$2/5$", "$3/10$", "$0$ (the body becomes weightless and flies off the surface)"],
            "correctAnswerIndex": 3,
            "explanation": "The effective acceleration due to gravity at latitude $\\theta$ is given by $g'_\\theta = g - R_E \\omega^2 \\cos^2\\theta$. At the poles ($\\theta = 90^\\circ$), $g_{pole} = g$. At the equator ($\\theta = 0^\\circ$), $g_{eq} = g - R_E \\omega^2$. We are given that $g_{eq} = \\frac{3}{5} g \\implies g - R_E \\omega^2 = 0.6 g \\implies R_E \\omega^2 = 0.4 g$. If the angular velocity of the Earth is doubled to $2\\omega$, the new effective gravity at the equator becomes: $g'_{eq} = g - R_E (2\\omega)^2 = g - 4 R_E \\omega^2 = g - 4(0.4 g) = g - 1.6 g = -0.6 g$. Since the effective gravity becomes negative, it acts outwards. An object on the surface cannot be held by gravity and would fly off the surface (its normal force from the ground becomes zero). Hence, its weight (the force it exerts on the surface) becomes $0$."
        },
        {
            "id": "phy_gravitation-q8",
            "topicId": "gravitational-potential",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "An object of mass $m$ is raised from the surface of the Earth to a height equal to the radius of the Earth $R_E$. The change in its gravitational potential energy is:",
            "options": ["$mgR_E$", "$\\frac{1}{2} mgR_E$", "$\\frac{1}{3} mgR_E$", "$2mgR_E$"],
            "correctAnswerIndex": 1,
            "explanation": "The gravitational potential energy of a mass $m$ at a distance $r$ from the center of Earth of mass $M$ is $U = -\\frac{GMm}{r}$. Initially, at the surface of Earth ($r = R_E$), the energy is $U_i = -\\frac{GMm}{R_E}$. Finally, at a height $h = R_E$ above the surface, its distance from the center is $r = 2R_E$, so the energy is $U_f = -\\frac{GMm}{2R_E}$. The change in potential energy is $\\Delta U = U_f - U_i = -\\frac{GMm}{2R_E} - \\left(-\\frac{GMm}{R_E}\\right) = \\frac{GMm}{2R_E}$. Using the relation $g = \\frac{GM}{R_E^2}$, we can write $\\frac{GM}{R_E} = g R_E$. Thus, $\\Delta U = \\frac{1}{2} m \\left(\\frac{GM}{R_E}\\right) = \\frac{1}{2} mgR_E$."
        },
        {
            "id": "phy_gravitation-q9",
            "topicId": "escape-velocity",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A particle is projected vertically upwards from the surface of Earth with a speed equal to half the escape velocity $v_e$. What is the maximum height $h$ reached by the particle above the surface of Earth?",
            "options": ["$R_E / 2$", "$R_E / 3$", "$R_E$", "$2R_E$"],
            "correctAnswerIndex": 1,
            "explanation": "Let $v$ be the launch speed. By conservation of mechanical energy between the surface and the maximum height $h$: $E_i = E_f \\implies \\frac{1}{2} m v^2 - \\frac{GMm}{R_E} = -\\frac{GMm}{R_E + h}$. The escape velocity is $v_e = \\sqrt{\\frac{2GM}{R_E}}$, so the launch speed is $v = \\frac{1}{2} v_e = \\frac{1}{2} \\sqrt{\\frac{2GM}{R_E}}$. Squaring this, $v^2 = \\frac{GM}{2R_E}$. Substituting $v^2$ into the energy equation: $\\frac{1}{2} m \\left(\\frac{GM}{2R_E}\\right) - \\frac{GMm}{R_E} = -\\frac{GMm}{R_E + h} \\implies \\frac{GMm}{4R_E} - \\frac{GMm}{R_E} = -\\frac{GMm}{R_E + h} \\implies -\\frac{3}{4 R_E} = -\\frac{1}{R_E + h} \\implies 3(R_E + h) = 4 R_E \\implies 3h = R_E \\implies h = \\frac{R_E}{3}$."
        },
        {
            "id": "phy_gravitation-q10",
            "topicId": "satellite-orbits",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A satellite of mass $m$ is orbiting Earth in a circular orbit of radius $r$. If it is transferred to another circular orbit of radius $4r$, what are the changes in its kinetic energy (KE) and gravitational potential energy (PE)?",
            "options": [
                "KE decreases by $\\frac{3GMm}{8r}$, PE increases by $\\frac{3GMm}{4r}$",
                "KE increases by $\\frac{3GMm}{8r}$, PE decreases by $\\frac{3GMm}{4r}$",
                "KE decreases by $\\frac{3GMm}{4r}$, PE increases by $\\frac{3GMm}{8r}$",
                "KE decreases by $\\frac{GMm}{8r}$, PE increases by $\\frac{GMm}{4r}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "For a satellite in a circular orbit of radius $r$, the kinetic energy is $K = \\frac{GMm}{2r}$ and the potential energy is $U = -\\frac{GMm}{r}$. 1. Change in KE: $\\Delta K = K_f - K_i = \\frac{GMm}{2(4r)} - \\frac{GMm}{2r} = \\frac{GMm}{8r} - \\frac{GMm}{2r} = -\\frac{3GMm}{8r}$. (Thus, KE decreases by $\\frac{3GMm}{8r}$). 2. Change in PE: $\\Delta U = U_f - U_i = -\\frac{GMm}{4r} - \\left(-\\frac{GMm}{r}\\right) = \\frac{3GMm}{4r}$. (Thus, PE increases by $\\frac{3GMm}{4r}$)."
        },
        {
            "id": "phy_gravitation-q11",
            "topicId": "keplers-laws",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "The areal velocity of a planet of mass $m$ moving in an elliptical orbit of semi-major axis $a$ and semi-minor axis $b$ around the Sun is constant. If the orbital period is $T$, the angular momentum of the planet about the Sun is:",
            "options": [
                "$\\frac{2\\pi m a b}{T}$",
                "$\\frac{\\pi m a b}{T}$",
                "$\\frac{4\\pi m a b}{T}$",
                "$\\frac{2\\pi m a^2}{T}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The total area of the elliptical orbit is $A = \\pi a b$. Since the areal velocity $\\frac{dA}{dt}$ is constant, the area swept out in one full period $T$ is $A = \\left(\\frac{dA}{dt}\\right) T \\implies \\frac{dA}{dt} = \\frac{\\pi a b}{T}$. We also know from Kepler's Second Law that the areal velocity is related to the angular momentum $L$ by $\\frac{dA}{dt} = \\frac{L}{2m}$. Equating the two expressions for the areal velocity: $\\frac{L}{2m} = \\frac{\\pi a b}{T} \\implies L = \\frac{2\\pi m a b}{T}$."
        },
        {
            "id": "phy_gravitation-q12",
            "topicId": "gravitational-potential",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Two point masses $M$ and $4M$ are separated by a distance $d$ in space. The gravitational potential at a point on the line joining them where the gravitational field is zero is:",
            "options": [
                "$-9GM/d$",
                "$-5GM/d$",
                "$-3GM/d$",
                "$-7GM/d$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Let the point of zero field be at distance $x$ from the mass $M$. The distance of this point from the mass $4M$ will be $d-x$. The gravitational field due to $M$ is $E_1 = \\frac{GM}{x^2}$ and due to $4M$ is $E_2 = \\frac{G(4M)}{(d-x)^2}$. Since the net field is zero, these fields must balance: $\\frac{GM}{x^2} = \\frac{4GM}{(d-x)^2} \\implies \\frac{1}{x} = \\frac{2}{d-x} \\implies d-x = 2x \\implies x = \\frac{d}{3}$. Thus, the point is at distance $d/3$ from $M$ and $2d/3$ from $4M$. The gravitational potential $V$ at this point is the sum of potentials: $V = -\\frac{GM}{x} - \\frac{G(4M)}{d-x} = -\\frac{GM}{d/3} - \\frac{4GM}{2d/3} = -\\frac{3GM}{d} - \\frac{6GM}{d} = -\\frac{9GM}{d}$."
        },
        {
            "id": "phy_gravitation-q13",
            "topicId": "satellite-orbits",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A satellite of mass $m$ is orbiting Earth in a circular orbit of radius $R$. A small thruster is fired, giving the satellite a sudden radial impulse such that its radial velocity becomes $v_r = \\beta v_0$, where $v_0$ is the initial orbital speed and $\\beta \\ll 1$. What is the eccentricity of the new elliptical orbit?",
            "options": ["$\\beta$", "$\\beta^2$", "$2\\beta$", "$\\sqrt{1 + \\beta^2}$"],
            "correctAnswerIndex": 0,
            "explanation": "Initially, the satellite has tangential orbital speed $v_0 = \\sqrt{GM/R}$ and radial velocity $v_r = 0$. The radial impulse changes the velocity vector to $\\vec{v} = v_0 \\hat{\\theta} + \\beta v_0 \\hat{r}$. The specific angular momentum is $h = |\\vec{r} \\times \\vec{v}| = R v_0$ (unchanged because a radial force does not change the angular momentum). The total mechanical energy per unit mass is $E = \\frac{1}{2} v^2 - \\frac{GM}{R} = \\frac{1}{2} (v_0^2 + v_r^2) - v_0^2 = \\frac{1}{2} v_0^2 (1 + \\beta^2) - v_0^2 = -\\frac{1}{2} v_0^2 (1 - \\beta^2)$. The eccentricity $e$ of an orbit is given by $e = \\sqrt{1 + \\frac{2 E h^2}{(GM)^2}}$. Substituting $h = R v_0$ and $E$: $e = \\sqrt{1 + \\frac{2 \\left(-\\frac{1}{2} v_0^2 (1 - \\beta^2)\\right) (R^2 v_0^2)}{(GM)^2}} = \\sqrt{1 - \\frac{v_0^4 R^2 (1 - \\beta^2)}{(GM)^2}}$. Since $v_0^2 = \\frac{GM}{R}$, we have $\\frac{v_0^4 R^2}{(GM)^2} = 1$. Substituting this yields $e = \\sqrt{1 - 1(1 - \\beta^2)} = \\sqrt{\\beta^2} = \\beta$."
        },
        {
            "id": "phy_gravitation-q14",
            "topicId": "acceleration-due-to-gravity",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A spherical cavity of radius $R/2$ is made inside a uniform solid sphere of radius $R$ and mass $M$ such that the center of the cavity is at a distance $R/2$ from the center of the sphere. If the gravitational field at a point $P$ inside the cavity, at a distance $r$ from the center of the cavity, is represented as $\\vec{g}$, then:",
            "options": [
                "$\\vec{g}$ is uniform and directed towards the center of the cavity.",
                "$\\vec{g}$ is uniform and parallel to the line joining the centers of the sphere and the cavity.",
                "$\\vec{g}$ is non-uniform and varies linearly with the distance from the center of the sphere.",
                "$\\vec{g}$ is zero everywhere inside the cavity."
            ],
            "correctAnswerIndex": 1,
            "explanation": "Let $\\vec{r}_c$ be the position vector of a point inside the cavity with respect to the center of the sphere, and $\\vec{r}_p$ be the position vector of the same point with respect to the center of the cavity. Let $\\vec{d}$ be the position vector of the cavity's center from the sphere's center. Then $\\vec{r}_c = \\vec{d} + \\vec{r}_p$. The gravitational field of a uniform solid sphere of density $\\rho$ inside it is $\\vec{g}_{sphere} = -\\frac{4}{3}\\pi G \\rho \\vec{r}_c$. The field due to the cavity's mass is $\\vec{g}_{cavity} = -\\frac{4}{3}\\pi G \\rho \\vec{r}_p$. By superposition, the net field inside the cavity is $\\vec{g} = \\vec{g}_{sphere} - \\vec{g}_{cavity} = -\\frac{4}{3}\\pi G \\rho (\\vec{r}_c - \\vec{r}_p) = -\\frac{4}{3}\\pi G \\rho \\vec{d}$. Since $\\vec{d}$ is a constant vector (representing the displacement of the cavity's center from the sphere's center), the field $\\vec{g}$ is uniform and parallel to the line of centers $\\vec{d}$."
        },
        {
            "id": "phy_gravitation-q15",
            "topicId": "escape-velocity",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A binary star system consists of two stars, each of mass $M$, separated by a distance $d$. They revolve in circular orbits about their common center of mass. A tiny spacecraft is launched from the center of mass of the system. What is the minimum launch speed (relative to the center of mass) required for the spacecraft to escape the gravitational pull of the binary system to infinity?",
            "options": [
                "$\\sqrt{\\frac{8GM}{d}}$",
                "$\\sqrt{\\frac{16GM}{d}}$",
                "$\\sqrt{\\frac{4GM}{d}}$",
                "$\\sqrt{\\frac{12GM}{d}}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Because the two stars have equal mass $M$ and are separated by a distance $d$, the center of mass (CM) of the system lies exactly halfway between them. The distance of the CM from each star is $r = d/2$. The gravitational potential $V$ at the CM is the sum of the potentials due to both stars: $V_{CM} = -\\frac{GM}{d/2} - \\frac{GM}{d/2} = -\\frac{4GM}{d}$. For a spacecraft of mass $m$ to escape to infinity from the CM, its total mechanical energy must be at least zero. Using energy conservation: $E = \\frac{1}{2} m v^2 + m V_{CM} \\ge 0 \\implies \\frac{1}{2} v^2 \\ge -V_{CM} = \\frac{4GM}{d} \\implies v \\ge \\sqrt{\\frac{8GM}{d}}$. Thus, the minimum launch speed required is $\\sqrt{\\frac{8GM}{d}}$."
        },
        {
            "id": "phy_gravitation-q16",
            "topicId": "gravitational-potential",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "The gravitational self-energy of a uniform solid sphere of mass $M$ and radius $R$ is $U = -\\frac{3GM^2}{5R}$. If this sphere is allowed to contract gravitationally under its own gravity to a smaller uniform sphere of radius $R/2$, the energy released in this process (which is converted into other forms like heat) is:",
            "options": [
                "$\\frac{3GM^2}{10R}$",
                "$\\frac{3GM^2}{5R}$",
                "$\\frac{6GM^2}{5R}$",
                "$\\frac{3GM^2}{2R}$"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The initial gravitational potential energy (self-energy) of the sphere of radius $R$ is $U_i = -\\frac{3GM^2}{5R}$. When the sphere contracts to a radius $R/2$, its final gravitational potential energy becomes $U_f = -\\frac{3GM^2}{5(R/2)} = -\\frac{6GM^2}{5R}$. The energy released is the decrease in potential energy: $\\Delta E = U_i - U_f = -\\frac{3GM^2}{5R} - \\left(-\\frac{6GM^2}{5R}\\right) = \\frac{3GM^2}{5R}$."
        },
        {
            "id": "phy_gravitation-q17",
            "topicId": "keplers-laws",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A satellite of mass $m$ moves in an elliptical orbit around a planet of mass $M$. Let $r_{min}$ and $r_{max}$ be the minimum and maximum distances of the satellite from the center of the planet. If the total mechanical energy of the satellite is $E$, which of the following expressions correctly gives the semi-major axis $a$ of the orbit and relates it to $E$?",
            "options": [
                "$a = \\frac{r_{min} + r_{max}}{2}$ and $E = -\\frac{GMm}{2a}$",
                "$a = \\sqrt{r_{min} r_{max}}$ and $E = -\\frac{GMm}{a}$",
                "$a = \\frac{r_{min} + r_{max}}{2}$ and $E = -\\frac{GMm}{a}$",
                "$a = \\frac{2r_{min} r_{max}}{r_{min} + r_{max}}$ and $E = -\\frac{GMm}{2a}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "In an elliptical orbit, the distance of closest approach (perihelion) is $r_{min} = a(1 - e)$ and the farthest distance (aphelion) is $r_{max} = a(1 + e)$, where $e$ is the eccentricity. Adding these gives $r_{min} + r_{max} = 2a \\implies a = \\frac{r_{min} + r_{max}}{2}$. By using the conservation of angular momentum and mechanical energy at these two extreme points, we can derive the total energy. The energy is $E = \\frac{1}{2}mv_p^2 - \\frac{GMm}{r_{min}}$. Using $v_p = \\sqrt{\\frac{GM}{a} \\frac{1+e}{1-e}}$, we get $E = -\\frac{GMm}{2a}$. Thus, the energy depends only on the semi-major axis $a$, which is the average of the minimum and maximum distances."
        },
        {
            "id": "phy_gravitation-q18",
            "topicId": "satellite-orbits",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A satellite of mass $m$ is initially in a circular orbit of radius $R$ around Earth. Due to a small constant resistive force (air drag) of magnitude $f$, the satellite gradually spirals inwards. If the orbit remains nearly circular at any instant, how does the speed $v$ of the satellite change as it spirals inwards, and what is its tangential acceleration?",
            "options": [
                "Speed decreases; tangential acceleration is $-f/m$.",
                "Speed increases; tangential acceleration is $+f/m$.",
                "Speed increases; tangential acceleration is $-f/m$.",
                "Speed remains constant; tangential acceleration is $0$."
            ],
            "correctAnswerIndex": 1,
            "explanation": "This is known as the 'satellite paradox'. For a nearly circular orbit of radius $r$, the orbital speed is $v = \\sqrt{GM/r}$. As the satellite spirals inwards (radius $r$ decreases), its speed $v$ actually increases. The total mechanical energy is $E = -\\frac{GMm}{2r}$. The rate of energy loss due to the drag force is $\\frac{dE}{dt} = \\vec{f} \\cdot \\vec{v} = -fv$. Differentiating the energy expression with respect to time: $\\frac{dE}{dt} = \\frac{d}{dt}\\left(-\\frac{GMm}{2r}\\right) = \\frac{GMm}{2r^2}\\frac{dr}{dt}$. Equating these two: $\\frac{GMm}{2r^2}\\frac{dr}{dt} = -fv$. Now, differentiating the velocity $v = \\sqrt{GM/r}$ with respect to time gives the tangential acceleration: $a_t = \\frac{dv}{dt} = -\\frac{1}{2} \\sqrt{\\frac{GM}{r^3}} \\frac{dr}{dt}$. Substituting $\\frac{dr}{dt}$ from the energy equation, we get $a_t = -\\frac{1}{2}\\sqrt{\\frac{GM}{r^3}} \\left(-\\frac{2r^2 f v}{GMm}\\right) = \\frac{rfv}{m\\sqrt{GMr}}$. Since $v = \\sqrt{GM/r}$, this simplifies to $a_t = +\\frac{f}{m}$. Thus, the satellite accelerates in the forward direction. The potential energy lost is twice the kinetic energy gained, and the difference is dissipated by air resistance."
        }
    ]
}

phy_mech_solid_data = {
    "id": "phy_mech_solid",
    "averageQuestions": "1 question per year",
    "whatYoullLearn": [
        "Understand the concepts of stress, strain, and Hooke's law in elastic bodies",
        "Analyze the characteristic regions of the stress-strain curve for ductile, brittle, and elastomeric materials",
        "Calculate and apply Young's modulus, Bulk modulus, and Shear modulus in different stress situations",
        "Define Poisson's ratio and relate it to changes in shape and volume under load",
        "Calculate the elastic potential energy and energy density stored in stretched or deformed materials"
    ],
    "concepts": [
        {
            "title": "Stress-Strain Behavior and Elastic Limits",
            "explanation": "Elasticity is the property of a body to regain its original shape and size when the deforming forces are removed. Within the proportional limit, stress is directly proportional to strain (Hooke's law). Beyond the proportional limit lies the elastic limit; if stressed beyond this, the material enters the plastic region and undergoes permanent deformation.",
            "example": "A steel wire stretches elastically under small loads, but permanently deforms (enters plastic region) if the stress exceeds its yield strength.",
            "trap": "Do not assume Hooke's law is obeyed all the way up to the elastic limit; it is strictly valid only up to the proportional limit, which is slightly lower than or equal to the elastic limit."
        },
        {
            "title": "Elastic Moduli and Material Properties",
            "explanation": "The ratio of stress to strain in the elastic region is called the elastic modulus. Young's modulus ($Y$) applies to longitudinal stress/strain, Bulk modulus ($B$) to volume stress/strain, and Shear modulus ($\\eta$) to shearing stress/strain. These moduli are intrinsic properties of the material and do not depend on the dimensions of the sample.",
            "example": "Steel has a higher Young's modulus than copper, meaning it is more difficult to stretch and is therefore more elastic than copper.",
            "trap": "In physics, elasticity is measured by the force required to produce a unit strain, not how easily a material stretches. Thus, steel is highly elastic, while rubber is easily stretched but has a very low modulus (and is less elastic)."
        },
        {
            "title": "Poisson's Ratio and Volume Change",
            "explanation": "Poisson's ratio ($\\sigma$) is the ratio of lateral strain to longitudinal strain: $\\sigma = -\\frac{\\Delta r / r}{\\Delta L / L}$. For isotropic materials, it must lie between $-1$ and $+0.5$. If $\\sigma = 0.5$, stretching the material results in zero volume change.",
            "example": "Stretching a cylinder of rubber (which has $\\sigma \\approx 0.5$) keeps its volume nearly constant as it gets thinner.",
            "trap": "A positive Poisson's ratio means that stretching a material longitudinally causes it to contract laterally (become thinner), which is the behavior of almost all common materials."
        }
    ],
    "formulas": [
        "$\\text{Stress} = \\frac{F}{A}$",
        "$\\text{Strain} = \\frac{\\Delta L}{L}$ (Longitudinal), $\\frac{\\Delta V}{V}$ (Volume), $\\theta$ (Shear)",
        "$Y = \\frac{F L}{A \\Delta L}$ (Young's Modulus)",
        "$B = -\\frac{\\Delta P}{\\Delta V / V}$ (Bulk Modulus)",
        "$\\eta = \\frac{F}{A \\theta}$ (Shear Modulus)",
        "$\\sigma = -\\frac{\\Delta r / r}{\\Delta L / L}$ (Poisson's Ratio)",
        "$U_e = \\frac{1}{2} F \\Delta L = \\frac{1}{2} \\frac{Y A (\\Delta L)^2}{L}$ (Elastic Potential Energy)",
        "$u = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain} = \\frac{1}{2} Y (\\text{Strain})^2$ (Energy Density)"
    ],
    "examTraps": [
        {
            "trap": "Interpreting Elasticity from Stretchiness",
            "warning": "In common language, 'elastic' means easily stretched. In physics, a material with a higher elastic modulus (like steel) is more elastic than one with a lower modulus (like rubber) because it resists deformation more strongly."
        },
        {
            "trap": "Poisson's Ratio sign and limits",
            "warning": "Poisson's ratio $\\sigma$ is defined with a negative sign so that its value is positive for normal materials (since lateral strain is opposite in sign to longitudinal strain)."
        }
    ],
    "questionPattern": [
        "Equivalent Young's modulus for series and parallel combinations of wires",
        "Calculating thermal stress in clamped bars under temperature change",
        "Determining the work done or heat generated in stretching materials",
        "Relating lateral dimensions, longitudinal dimensions, and volume changes using Poisson's ratio"
    ],
    "quizQuestions": [
        {
            "id": "phy_mech_solid-q1",
            "topicId": "stress-strain",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "A wire of length $L$ and cross-sectional area $A$ is stretched by a force $F$, resulting in an elongation $\\Delta L$. If the wire is cut into two equal halves, and the same force $F$ is applied to one half, what will be its elongation?",
            "options": ["$\\Delta L$", "$\\Delta L / 2$", "$2\\Delta L$", "$4\\Delta L$"],
            "correctAnswerIndex": 1,
            "explanation": "The elongation is given by $\\Delta L = \\frac{FL}{AY}$. If the wire is cut in half, its new length is $L' = L/2$. Since the material, cross-sectional area, and applied force remain the same, the new elongation will be: $\\Delta L' = \\frac{F(L/2)}{AY} = \\frac{1}{2} \\left(\\frac{FL}{AY}\\right) = \\frac{\\Delta L}{2}$."
        },
        {
            "id": "phy_mech_solid-q2",
            "topicId": "stress-strain-curve",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "On a typical stress-strain curve for a metal wire under tension, what does the region between the origin and the elastic limit represent?",
            "options": [
                "Plastic deformation region where Hooke's law is obeyed.",
                "Elastic deformation region where the material returns to its original length when the load is removed.",
                "The region where the wire is permanently deformed.",
                "The fracture region where the wire breaks."
            ],
            "correctAnswerIndex": 1,
            "explanation": "The region from the origin up to the elastic limit is the elastic region. If the applied load is removed at any point in this region, the wire will return to its original length. The proportional limit is the point up to which Hooke's law (stress $\\propto$ strain) is strictly obeyed, and it lies slightly below or at the elastic limit."
        },
        {
            "id": "phy_mech_solid-q3",
            "topicId": "elastic-moduli",
            "difficulty": "easy",
            "estimatedTimeSeconds": 45,
            "question": "Two wires $A$ and $B$ are made of the same material. Wire $A$ has length $L$ and radius $r$, and wire $B$ has length $2L$ and radius $2r$. If both are subjected to the same stretching force, what is the ratio of the elongation of wire $A$ to that of wire $B$?",
            "options": ["$1 : 1$", "$1 : 2$", "$2 : 1$", "$4 : 1$"],
            "correctAnswerIndex": 2,
            "explanation": "The elongation of a wire is given by $\\Delta L = \\frac{FL}{AY} = \\frac{FL}{\\pi r^2 Y}$. Since the force $F$ and Young's modulus $Y$ are the same for both wires: $\\Delta L \\propto \\frac{L}{r^2}$. For wire $A$, $\\Delta L_A \\propto \\frac{L}{r^2}$. For wire $B$, $\\Delta L_B \\propto \\frac{2L}{(2r)^2} = \\frac{2L}{4r^2} = \\frac{L}{2r^2}$. Taking the ratio: $\\frac{\\Delta L_A}{\\Delta L_B} = \\frac{L/r^2}{L/(2r^2)} = 2$. Thus, the ratio is $2 : 1$."
        },
        {
            "id": "phy_mech_solid-q4",
            "topicId": "stress-strain",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "A steel rod of length $1\\text{ m}$ and cross-sectional area $1\\text{ cm}^2$ is clamped tightly at both ends at a temperature of $20^\\circ\\text{C}$. The temperature is then raised to $60^\\circ\\text{C}$. Find the thermal tension developed in the rod. (For steel, Young's modulus $Y = 2 \\times 10^{11}\\text{ N/m}^2$ and coefficient of linear expansion $\\alpha = 1.2 \\times 10^{-5}/^\\circ\\text{C}$)",
            "options": ["$9600\\text{ N}$", "$4800\\text{ N}$", "$2400\\text{ N}$", "$12000\\text{ N}$"],
            "correctAnswerIndex": 0,
            "explanation": "When temperature increases by $\\Delta T = 60 - 20 = 40^\\circ\\text{C}$, the rod attempts to expand by $\\Delta L = L \\alpha \\Delta T$. Since the clamps prevent any expansion, a compressive thermal strain is set up: $\\text{Strain} = \\frac{\\Delta L}{L} = \\alpha \\Delta T$. The thermal stress is $\\text{Stress} = Y \\times \\text{Strain} = Y \\alpha \\Delta T$. The thermal tension (force) developed is $F = \\text{Stress} \\times A = Y A \\alpha \\Delta T$. Substituting the given values (with $A = 1\\text{ cm}^2 = 10^{-4}\\text{ m}^2$): $F = (2 \\times 10^{11}) \\times (10^{-4}) \\times (1.2 \\times 10^{-5}) \\times 40 = 2 \\times 10^7 \\times 1.2 \\times 10^{-5} \\times 40 = 240 \\times 40 = 9600\\text{ N}$."
        },
        {
            "id": "phy_mech_solid-q5",
            "topicId": "elastic-moduli",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "Two wires of equal length $L$ and equal cross-sectional area $A$, but made of different materials with Young's moduli $Y_1$ and $Y_2$, are joined end-to-end (in series). The equivalent Young's modulus $Y_{eq}$ of the composite wire is:",
            "options": [
                "$\\frac{Y_1 + Y_2}{2}$",
                "$\\frac{2 Y_1 Y_2}{Y_1 + Y_2}$",
                "$\\sqrt{Y_1 Y_2}$",
                "$\\frac{Y_1 Y_2}{Y_1 + Y_2}$"
            ],
            "correctAnswerIndex": 1,
            "explanation": "When two wires are connected end-to-end, the tension $F$ is the same in both wires. The total elongation $\\Delta L$ is the sum of the individual elongations: $\\Delta L = \\Delta L_1 + \\Delta L_2 = \\frac{FL}{AY_1} + \\frac{FL}{AY_2} = \\frac{FL}{A} \\left(\\frac{1}{Y_1} + \\frac{1}{Y_2}\\right)$. For the composite wire of length $2L$ and area $A$, the equivalent Young's modulus $Y_{eq}$ satisfies: $\\Delta L = \\frac{F(2L)}{A Y_{eq}}$. Equating the two expressions for $\\Delta L$: $\\frac{F(2L)}{A Y_{eq}} = \\frac{FL}{A} \\left(\\frac{1}{Y_1} + \\frac{1}{Y_2}\\right) \\implies \\frac{2}{Y_{eq}} = \\frac{Y_1 + Y_2}{Y_1 Y_2} \\implies Y_{eq} = \\frac{2 Y_1 Y_2}{Y_1 + Y_2}$."
        },
        {
            "id": "phy_mech_solid-q6",
            "topicId": "elastic-energy",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "A copper wire is stretched such that its length increases by $0.1\\%$. The energy density (elastic potential energy per unit volume) stored in the wire is: (Young's modulus of copper $Y = 1.2 \\times 10^{11}\\text{ N/m}^2$)",
            "options": [
                "$6.0 \\times 10^4\\text{ J/m}^3$",
                "$1.2 \\times 10^5\\text{ J/m}^3$",
                "$6.0 \\times 10^5\\text{ J/m}^3$",
                "$1.2 \\times 10^4\\text{ J/m}^3$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The energy density $u$ (elastic energy per unit volume) is given by: $u = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain}$. Since $\\text{Stress} = Y \\times \\text{Strain}$, we can write $u = \\frac{1}{2} Y \\times (\\text{Strain})^2$. The longitudinal strain is $\\frac{\\Delta L}{L} = 0.1\\% = 0.001 = 10^{-3}$. Substituting the values: $u = \\frac{1}{2} \\times (1.2 \\times 10^{11}\\text{ N/m}^2) \\times (10^{-3})^2 = 0.6 \\times 10^{11} \\times 10^{-6} = 6.0 \\times 10^4\\text{ J/m}^3$."
        },
        {
            "id": "phy_mech_solid-q7",
            "topicId": "stress-strain-curve",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "The stress-strain curves of two materials $X$ and $Y$ are plotted on the same scale. It is observed that the plastic deformation region (between the yield point and the fracture point) is much larger for material $X$ than for material $Y$. What can we conclude about materials $X$ and $Y$?",
            "options": [
                "$X$ is ductile and $Y$ is brittle.",
                "$X$ is brittle and $Y$ is ductile.",
                "Both $X$ and $Y$ are brittle.",
                "$X$ is an elastomer and $Y$ is ductile."
            ],
            "correctAnswerIndex": 0,
            "explanation": "Materials that undergo significant plastic deformation before breaking are classified as ductile (e.g., copper, lead). Materials that break very soon after exceeding the elastic limit with little or no plastic deformation are brittle (e.g., glass, high-carbon steel). Since material $X$ has a much larger plastic region than $Y$, $X$ is ductile and $Y$ is brittle."
        },
        {
            "id": "phy_mech_solid-q8",
            "topicId": "elastic-moduli",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A metallic wire has Poisson's ratio $\\sigma = 0.4$. If the wire is subjected to a longitudinal tension that increases its length by $0.2\\%$, what is the percentage change in the volume of the wire?",
            "options": ["$0.08\\%$", "$0.04\\%$", "$0.12\\%$", "$0.20\\%$"],
            "correctAnswerIndex": 1,
            "explanation": "For a cylindrical wire of radius $r$ and length $L$, the volume is $V = \pi r^2 L$. Taking logs and differentiating gives: $\\frac{dV}{V} = 2\\frac{dr}{r} + \\frac{dL}{L}$. Poisson's ratio $\\sigma$ is defined as $\\sigma = -\\frac{dr/r}{dL/L} \\implies \\frac{dr}{r} = -\\sigma \\frac{dL}{L}$. Substituting this: $\\frac{dV}{V} = -2\\sigma \\frac{dL}{L} + \\frac{dL}{L} = (1 - 2\\sigma) \\frac{dL}{L}$. Given $\\sigma = 0.4$ and the percentage change in length $\\frac{dL}{L} = 0.2\\%$, the percentage change in volume is: $\\frac{dV}{V} = (1 - 2(0.4)) \\times 0.2\\% = 0.2 \\times 0.2\\% = 0.04\\%$."
        },
        {
            "id": "phy_mech_solid-q9",
            "topicId": "stress-strain",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A uniform heavy metal rod of length $L$, mass $M$, and cross-sectional area $A$ is suspended vertically from a rigid ceiling. The elongation of the rod due to its own weight is:",
            "options": [
                "$\\frac{MgL}{AY}$",
                "$\\frac{MgL}{2AY}$",
                "$\\frac{MgL}{4AY}$",
                "$\\frac{2MgL}{AY}$"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Consider a small element of length $dx$ at a distance $x$ from the bottom of the rod. The tension $T(x)$ in this element is due to the weight of the portion of the rod below it: $T(x) = \\left(\\frac{M}{L} x\\right) g$. The elongation $d(\\Delta L)$ of this element is given by: $d(\\Delta L) = \\frac{T(x) dx}{AY} = \\frac{Mgx}{LAY} dx$. The total elongation $\\Delta L$ is found by integrating this expression from $x = 0$ to $x = L$: $\\Delta L = \\int_0^L \\frac{Mgx}{LAY} dx = \\frac{Mg}{LAY} \\left[\\frac{x^2}{2}\\right]_0^L = \\frac{MgL}{2AY}$."
        },
        {
            "id": "phy_mech_solid-q10",
            "topicId": "elastic-moduli",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "A solid spherical rubber ball is taken to the bottom of a lake of depth $100\\text{ m}$. What is the fractional decrease in its volume if the Bulk modulus of rubber is $2 \\times 10^9\\text{ N/m}^2$? (Density of water $\\rho = 10^3\\text{ kg/m}^3$, $g = 10\\text{ m/s}^2$)",
            "options": ["$5 \\times 10^{-4}$", "$1 \\times 10^{-3}$", "$2.5 \\times 10^{-4}$", "$5 \\times 10^{-3}$"],
            "correctAnswerIndex": 0,
            "explanation": "The gauge pressure at the bottom of the lake is $P = \\rho g h = 10^3\\text{ kg/m}^3 \\times 10\\text{ m/s}^2 \\times 100\\text{ m} = 10^6\\text{ N/m}^2$. The Bulk modulus is $B = -\\frac{\\Delta P}{\\Delta V/V}$. The fractional decrease in volume is: $\\frac{\\Delta V}{V} = \\frac{\\Delta P}{B} = \\frac{10^6\\text{ N/m}^2}{2 \\times 10^9\\text{ N/m}^2} = 0.5 \\times 10^{-3} = 5 \\times 10^{-4}$."
        },
        {
            "id": "phy_mech_solid-q11",
            "topicId": "elastic-energy",
            "difficulty": "medium",
            "estimatedTimeSeconds": 75,
            "question": "When a wire of length $L$, area of cross-section $A$, and Young's modulus $Y$ is stretched by a force $F$, the work done is $W$. If the stretching force is increased to $2F$, the work done in stretching the wire further is:",
            "options": ["$W$", "$2W$", "$3W$", "$4W$"],
            "correctAnswerIndex": 2,
            "explanation": "The elastic potential energy (which equals the work done to stretch the wire) is given by $W = \\frac{F^2 L}{2AY}$. When the force is increased to $2F$, the total work done to stretch the wire from its original unstretched length is: $W_{total} = \\frac{(2F)^2 L}{2AY} = 4 \\left(\\frac{F^2 L}{2AY}\\right) = 4W$. The work done in stretching the wire further is the difference between the final and initial work: $W_{add} = W_{total} - W = 4W - W = 3W$."
        },
        {
            "id": "phy_mech_solid-q12",
            "topicId": "stress-strain",
            "difficulty": "medium",
            "estimatedTimeSeconds": 90,
            "question": "An elevator cabin of mass $2000\\text{ kg}$ is supported by steel cables. If the ultimate tensile strength of steel is $4 \\times 10^8\\text{ N/m}^2$, and for safety, the maximum stress in the cables must not exceed $10\\%$ of the ultimate strength, what is the minimum total cross-sectional area required for the support cables? (Take $g = 10\\text{ m/s}^2$, and assume a maximum upward acceleration of $2\\text{ m/s}^2$)",
            "options": [
                "$6.0 \\times 10^{-5}\\text{ m}^2$",
                "$3.0 \\times 10^{-5}\\text{ m}^2$",
                "$1.2 \\times 10^{-4}\\text{ m}^2$",
                "$6.0 \\times 10^{-4}\\text{ m}^2$"
            ],
            "correctAnswerIndex": 3,
            "explanation": "The maximum tension $T$ in the cables occurs when the elevator accelerates upwards: $T = m(g + a) = 2000\\text{ kg} \\times (10\\text{ m/s}^2 + 2\\text{ m/s}^2) = 24000\\text{ N}$. The maximum allowable stress is $10\\%$ of the ultimate tensile strength: $\\sigma_{allow} = 0.10 \\times (4 \\times 10^8\\text{ N/m}^2) = 4 \\times 10^7\\text{ N/m}^2$. The minimum cross-sectional area $A$ is: $A = \\frac{T}{\\sigma_{allow}} = \\frac{24000\\text{ N}}{4 \\times 10^7\\text{ N/m}^2} = 6 \\times 10^{-4}\\text{ m}^2$."
        },
        {
            "id": "phy_mech_solid-q13",
            "topicId": "elastic-moduli",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A uniform wire of length $L$ and radius $r$ is made of a material of Young's modulus $Y$. The wire is shaped into a circular ring of radius $R = L/(2\\pi)$ and placed on a smooth horizontal table. It is then spun about its central vertical axis with a constant angular velocity $\\omega$. If the increase in the radius of the ring is $\\Delta R$, then $\\Delta R$ is given by: (Assume $\\Delta R \\ll R$, and let the mass of the wire be $M$)",
            "options": [
                "$\\frac{M R^2 \\omega^2}{4\\pi^2 r^2 Y}$",
                "$\\frac{M R^2 \\omega^2}{2\\pi r^2 Y}$",
                "$\\frac{M R^2 \\omega^2}{2\\pi^2 r^2 Y}$",
                "$\\frac{M R^2 \\omega^2}{\\pi r^2 Y}$"
            ],
            "correctAnswerIndex": 2,
            "explanation": "Let $T$ be the tension developed in the spinning ring. Consider a small element of the ring subtending an angle $d\\theta$ at the center. The mass of this element is $dm = M \\frac{d\\theta}{2\\pi}$. The net radial inward force on this element is provided by the components of tension at each end: $F_{radial} = 2 T \\sin(d\\theta/2) \\approx T d\\theta$. This force acts as the centripetal force: $T d\\theta = dm \\omega^2 R = \\left(M \\frac{d\\theta}{2\\pi}\\right) \\omega^2 R \\implies T = \\frac{M R \\omega^2}{2\\pi}$. The cross-sectional area of the wire is $A = \\pi r^2$. The elongation of the wire's circumference is $\\Delta L = \\frac{T L}{AY}$. Since $L = 2\\pi R$, we have $\\Delta L = 2\\pi \\Delta R$. Therefore, $2\\pi \\Delta R = \\frac{T (2\\pi R)}{A Y} \\implies \\Delta R = \\frac{T R}{A Y} = \\frac{M R^2 \\omega^2}{2\\pi A Y}$. Substituting $A = \\pi r^2$, we get $\\Delta R = \\frac{M R^2 \\omega^2}{2\\pi^2 r^2 Y}$."
        },
        {
            "id": "phy_mech_solid-q14",
            "topicId": "elastic-energy",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A weight of mass $M$ is dropped from a height $h$ onto a collar at the lower end of a vertical wire of length $L$, cross-sectional area $A$, and Young's modulus $Y$ (the upper end is fixed). What is the maximum elongation $\\Delta L_{max}$ of the wire? (Assume the mass of the wire is negligible and $\\Delta L_{max} \\ll L$)",
            "options": [
                "$\\frac{MgL}{AY} \\left(1 + \\sqrt{1 + \\frac{2hAY}{MgL}}\\right)$",
                "$\\frac{MgL}{AY} \\left(1 + \\sqrt{1 + \\frac{hAY}{MgL}}\\right)$",
                "$\\frac{MgL}{2AY} \\left(1 + \\sqrt{1 + \\frac{4hAY}{MgL}}\\right)$",
                "$\\frac{MgL}{AY} \\sqrt{\\frac{2hAY}{MgL}}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "When the mass drops onto the collar, it loses gravitational potential energy equal to $Mg(h + \\Delta L_{max})$. This is converted entirely into the elastic potential energy of the stretched wire at the moment of maximum elongation: $Mg(h + \\Delta L_{max}) = \\frac{1}{2} \\frac{A Y}{L} (\\Delta L_{max})^2$. Rearranging this as a quadratic equation in $\\Delta L_{max}$: $\\frac{AY}{2L} (\\Delta L_{max})^2 - Mg \\Delta L_{max} - Mgh = 0 \\implies (\\Delta L_{max})^2 - \\frac{2MgL}{AY} \\Delta L_{max} - \\frac{2MghL}{AY} = 0$. Using the quadratic formula, the positive root is $\\Delta L_{max} = \\frac{MgL}{AY} + \\sqrt{\\left(\\frac{MgL}{AY}\\right)^2 + \\frac{2MghL}{AY}} = \\frac{MgL}{AY} \\left(1 + \\sqrt{1 + \\frac{2hAY}{MgL}}\\right)$."
        },
        {
            "id": "phy_mech_solid-q15",
            "topicId": "stress-strain",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A uniform rod of length $L$, mass $M$, and cross-sectional area $A$ is rotated in a horizontal plane about a vertical axis passing through one of its ends with a constant angular velocity $\\omega$. The Young's modulus of the material is $Y$. The total elongation of the rod is:",
            "options": [
                "$\\frac{M\\omega^2 L^2}{2AY}$",
                "$\\frac{M\\omega^2 L^2}{3AY}$",
                "$\\frac{M\\omega^2 L^2}{6AY}$",
                "$\\frac{M\\omega^2 L^2}{8AY}$"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Consider a small element of length $dx$ at a distance $x$ from the axis of rotation. The mass of the portion of the rod from $x$ to $L$ is $m(x) = M \\frac{L-x}{L}$, and its center of mass is at distance $x + \\frac{L-x}{2} = \\frac{L+x}{2}$ from the axis. The tension $T(x)$ at distance $x$ is the centripetal force required to rotate the outer portion: $T(x) = m(x) \\omega^2 x_{cm} = M \\frac{L-x}{L} \\omega^2 \\frac{L+x}{2} = \\frac{M\\omega^2}{2L} (L^2 - x^2)$. The elongation of the element $dx$ is $d(\\Delta L) = \\frac{T(x)dx}{AY}$. The total elongation is $\\Delta L = \\int_0^L \\frac{M\\omega^2(L^2 - x^2)}{2L A Y} dx = \\frac{M\\omega^2}{2L A Y} \\left[L^2 x - \\frac{x^3}{3}\\right]_0^L = \\frac{M\\omega^2}{2L A Y} \\left(L^3 - \\frac{L^3}{3}\\right) = \\frac{M\\omega^2 L^2}{3AY}$."
        },
        {
            "id": "phy_mech_solid-q16",
            "topicId": "elastic-moduli",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "If $Y$, $K$, and $\\eta$ represent Young's modulus, Bulk modulus, and Shear modulus of a material respectively, which of the following relations is mathematically correct and physically possible (since Poisson's ratio $\\sigma$ must satisfy $-1 < \\sigma < 0.5$ for isotropic materials)?",
            "options": [
                "$Y = \\frac{9K\\eta}{3K+\\eta}$",
                "$Y = \\frac{3K\\eta}{9K+\\eta}$",
                "$Y = \\frac{9K\\eta}{K+3\\eta}$",
                "$Y = \\frac{3K+\\eta}{9K\\eta}$"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The relations between elastic constants are given by: $Y = 3K(1 - 2\\sigma)$ and $Y = 2\\eta(1 + \\sigma)$. Eliminating $\\sigma$ from these two equations yields: $\\sigma = \\frac{3K-2\\eta}{6K+2\\eta}$. Substituting this expression for $\\sigma$ back into either equation yields: $\\frac{9}{Y} = \\frac{3}{\\eta} + \\frac{1}{K} = \\frac{3K+\\eta}{K\\eta} \\implies Y = \\frac{9K\\eta}{3K+\\eta}$. This is a standard relation that is physically valid for isotropic materials."
        },
        {
            "id": "phy_mech_solid-q17",
            "topicId": "elastic-energy",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "A uniform heavy rope of mass $M$, length $L$, and cross-sectional area $A$ is suspended vertically from a rigid ceiling. If the Young's modulus of the rope is $Y$, the total elastic potential energy stored in the rope due to its own weight is:",
            "options": [
                "$\\frac{M^2 g^2 L}{2AY}$",
                "$\\frac{M^2 g^2 L}{6AY}$",
                "$\\frac{M^2 g^2 L}{3AY}$",
                "$\\frac{M^2 g^2 L}{8AY}$"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The tension at a distance $x$ from the free (bottom) end of the rope is $T(x) = \\frac{M}{L} x g$. The elastic potential energy $dU$ stored in an element of length $dx$ is $dU = \\frac{T(x)^2 dx}{2AY} = \\frac{M^2 g^2 x^2 dx}{2 L^2 A Y}$. The total potential energy stored in the rope is found by integrating from $0$ to $L$: $U = \\int_0^L \\frac{M^2 g^2 x^2}{2 L^2 A Y} dx = \\frac{M^2 g^2}{2 L^2 A Y} \\left[\\frac{x^3}{3}\\right]_0^L = \\frac{M^2 g^2 L}{6AY}$."
        },
        {
            "id": "phy_mech_solid-q18",
            "topicId": "stress-strain-curve",
            "difficulty": "hard",
            "estimatedTimeSeconds": 120,
            "question": "The stress-strain hysteresis loop of a vulcanized rubber band has an area corresponding to $1.5 \\times 10^5\\text{ J/m}^3$ per cycle. A rubber band of length $10\\text{ cm}$, width $5\\text{ mm}$, and thickness $2\\text{ mm}$ is stretched and released 50 times. If the density of the rubber is $1200\\text{ kg/m}^3$ and its specific heat capacity is $1500\\text{ J/(kg}\\cdot\\text{K)}$, and assuming no heat is lost to the environment, what is the temperature rise of the rubber band?",
            "options": ["$4.17\\text{ K}$", "$8.33\\text{ K}$", "$0.83\\text{ K}$", "$2.08\\text{ K}$"],
            "correctAnswerIndex": 0,
            "explanation": "The volume of the rubber band is $V = L \\times w \\times t = 0.1\\text{ m} \\times 0.005\\text{ m} \\times 0.002\\text{ m} = 10^{-6}\\text{ m}^3$. The energy dissipated as heat per unit volume per cycle is the area of the hysteresis loop: $1.5 \\times 10^5\\text{ J/m}^3$. In 50 cycles, the energy dissipated per unit volume is $50 \\times (1.5 \\times 10^5\\text{ J/m}^3) = 7.5 \\times 10^6\\text{ J/m}^3$. The total heat energy generated in the band is $Q = (7.5 \\times 10^6\\text{ J/m}^3) \\times 10^{-6}\\text{ m}^3 = 7.5\\text{ J}$. The mass of the rubber band is $m = \\rho V = 1200\\text{ kg/m}^3 \\times 10^{-6}\\text{ m}^3 = 1.2 \\times 10^{-3}\\text{ kg}$. The temperature rise $\\Delta T$ is given by $Q = m c \\Delta T \\implies \\Delta T = \\frac{Q}{m c} = \\frac{7.5}{1.2 \\times 10^{-3} \\times 1500} = \\frac{7.5}{1.8} \\approx 4.17\\text{ K}$."
        }
    ]
}

output_path = r"C:\Users\human\.gemini\antigravity\brain\d45a1739-9c09-47ff-a43b-64ca3db2cf33\scratch\batch_4.json"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

data = {
    "phy_gravitation": phy_gravitation_data,
    "phy_mech_solid": phy_mech_solid_data
}

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("JSON file successfully written to:", output_path)
