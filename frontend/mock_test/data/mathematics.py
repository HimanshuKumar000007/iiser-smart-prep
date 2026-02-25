math_questions = [
    {
        "id": 31,
        "subject": "Mathematics",
        "topic": "Calculus - Definite Integration",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "The value of the integral $\\int_{-\\pi/2}^{\\pi/2} \\frac{\\cos x}{1 + e^x} \\,dx$ is:",
        "options": {
            "A": "$\\pi/2$",
            "B": "1",
            "C": "2",
            "D": "0"
        },
        "answer": "B",
        "solution": "1. Let $I = \\int_{-\\pi/2}^{\\pi/2} \\frac{\\cos x}{1 + e^x} \\,dx$.\n2. Using the property $\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx$, we get $I = \\int_{-\\pi/2}^{\\pi/2} \\frac{\\cos(-x)}{1 + e^{-x}} \\,dx$.\n3. Since $\\cos(-x) = \\cos x$ and $e^{-x} = 1/e^x$, $I = \\int_{-\\pi/2}^{\\pi/2} \\frac{e^x \\cos x}{e^x + 1} \\,dx$.\n4. Adding the two equations for $I$, $2I = \\int_{-\\pi/2}^{\\pi/2} \\frac{\\cos x (1 + e^x)}{1 + e^x} \\,dx = \\int_{-\\pi/2}^{\\pi/2} \\cos x \\,dx$.\n5. $2I = [\\sin x]_{-\\pi/2}^{\\pi/2} = 1 - (-1) = 2$.\n6. Thus, $I = 1$."
    },
    {
        "id": 32,
        "subject": "Mathematics",
        "topic": "Algebra - Complex Numbers",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "If $\\omega$ is a complex cube root of unity, then the value of $(1 - \\omega + \\omega^2)^5 + (1 + \\omega - \\omega^2)^5$ is:",
        "options": {
            "A": "32",
            "B": "-32",
            "C": "64",
            "D": "-64"
        },
        "answer": "A",
        "solution": "1. We know that $1 + \\omega + \\omega^2 = 0$, which gives $1 + \\omega^2 = -\\omega$ and $1 + \\omega = -\\omega^2$.\n2. Therefore, $(1 - \\omega + \\omega^2)^5 = (-\\omega - \\omega)^5 = (-2\\omega)^5 = -32\\omega^5$.\n3. And $(1 + \\omega - \\omega^2)^5 = (-\\omega^2 - \\omega^2)^5 = (-2\\omega^2)^5 = -32\\omega^{10}$.\n4. Since $\\omega^3 = 1$, we have $\\omega^5 = \\omega^2$ and $\\omega^{10} = \\omega$.\n5. The sum becomes $-32\\omega^2 - 32\\omega = -32(\\omega^2 + \\omega) = -32(-1) = 32$."
    },
    {
        "id": 33,
        "subject": "Mathematics",
        "topic": "Coordinate Geometry - Conic Sections",
        "difficulty": "Hard",
        "time_minutes": 5,
        "image_based": True,
        "image_prompt": "A graph showing an ellipse x^2/a^2 + y^2/b^2 = 1. A normal is drawn at a point P(a cos theta, b sin theta) meeting the major axis at G. The tangent at P meets the major axis at T. The distances are labeled.",
        "question": "If the normal at the point $P(\\theta)$ on the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ meets the major axis at $G$, and the tangent at $P$ meets the major axis at $T$, then $CG \\cdot CT$ is equal to: (where $C$ is the center of the ellipse, $e$ is eccentricity)",
        "options": {
            "A": "$a^2 e^2$",
            "B": "$a^2$",
            "C": "$b^2$",
            "D": "$a^2 e$"
        },
        "answer": "A",
        "solution": "1. The equation of the ellipse is $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$. Let $P = (a\\cos\\theta, b\\sin\\theta)$.\n2. The equation of the normal at $P$ is $\\frac{ax}{\\cos\\theta} - \\frac{by}{\\sin\\theta} = a^2 - b^2 = a^2 e^2$.\n3. It meets the major axis (x-axis, $y=0$) at $G$. Putting $y=0$, we get $x_G = \\frac{a^2 e^2 \\cos\\theta}{a} = a e^2 \\cos\\theta$. So $CG = a e^2 \\cos\\theta$.\n4. The equation of the tangent at $P$ is $\\frac{x \\cos\\theta}{a} + \\frac{y \\sin\\theta}{b} = 1$.\n5. It meets the major axis at $T$. Putting $y=0$, we get $x_T = \\frac{a}{\\cos\\theta}$. So $CT = \\frac{a}{\\cos\\theta}$.\n6. $CG \\cdot CT = (a e^2 \\cos\\theta) \\cdot (\\frac{a}{\\cos\\theta}) = a^2 e^2$."
    },
    {
        "id": 34,
        "subject": "Mathematics",
        "topic": "Algebra - Matrices and Determinants",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": False,
        "image_prompt": "",
        "question": "If $A$ is a square matrix of order 3 such that $|A| = 4$, then the value of $|2(\\text{adj} A)|$ is:",
        "options": {
            "A": "32",
            "B": "64",
            "C": "128",
            "D": "256"
        },
        "answer": "C",
        "solution": "1. For a square matrix of order $n$, $|kA| = k^n|A|$ and $|\\text{adj} A| = |A|^{n-1}$.\n2. Here $n=3$, so $|\\text{adj} A| = |A|^{3-1} = |A|^2 = 4^2 = 16$.\n3. Now, $|2(\\text{adj} A)| = 2^3 \\cdot |\\text{adj} A| = 8 \\cdot 16 = 128$."
    },
    {
        "id": 35,
        "subject": "Mathematics",
        "topic": "Passage 3 - Probability",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "**Passage Question 1:** An urn contains 5 red balls and 5 black balls. A ball is drawn at random, its color is noted, and it is returned to the urn. Moreover, 2 additional balls of the color drawn are put in the urn, and then a ball is drawn at random. What is the probability that the second ball drawn is red?",
        "options": {
            "A": "1/2",
            "B": "5/12",
            "C": "7/12",
            "D": "6/11"
        },
        "answer": "A",
        "solution": "1. Let $R_1$ be the event of drawing a red ball in the first draw, $B_1$ be drawing a black ball.\n2. $P(R_1) = 5/10 = 1/2$. $P(B_1) = 5/10 = 1/2$.\n3. If $R_1$ occurs, the urn now has 7 red and 5 black balls. Probability of second red is $P(R_2 | R_1) = 7/12$.\n4. If $B_1$ occurs, the urn now has 5 red and 7 black balls. Probability of second red is $P(R_2 | B_1) = 5/12$.\n5. By Total Probability Theorem, $P(R_2) = P(R_1)P(R_2 | R_1) + P(B_1)P(R_2 | B_1) = (1/2)(7/12) + (1/2)(5/12) = 12/24 = 1/2$."
    },
    {
        "id": 36,
        "subject": "Mathematics",
        "topic": "Passage 3 - Probability",
        "difficulty": "Hard",
        "time_minutes": 4,
        "image_based": False,
        "image_prompt": "",
        "question": "**Passage Question 2:** continuing from Passage 3. If it is known that the second ball drawn is red, what is the probability that the first ball drawn was also red?",
        "options": {
            "A": "7/12",
            "B": "5/12",
            "C": "1/2",
            "D": "7/24"
        },
        "answer": "A",
        "solution": "1. We need to find $P(R_1 | R_2)$.\n2. By Bayes' Theorem, $P(R_1 | R_2) = \\frac{P(R_1)P(R_2 | R_1)}{P(R_2)}$.\n3. From the previous calculation, $P(R_1) = 1/2$, $P(R_2 | R_1) = 7/12$, and $P(R_2) = 1/2$.\n4. $P(R_1 | R_2) = \\frac{(1/2)(7/12)}{1/2} = 7/12$."
    },
    {
        "id": 37,
        "subject": "Mathematics",
        "topic": "Algebra - Sequence and Series",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "The sum of the series $1 + \\frac{2}{3} + \\frac{6}{3^2} + \\frac{10}{3^3} + \\frac{14}{3^4} + \\dots$ up to infinity is:",
        "options": {
            "A": "3",
            "B": "4",
            "C": "2",
            "D": "5/2"
        },
        "answer": "A",
        "solution": "1. Let $S = 1 + \\frac{2}{3} + \\frac{6}{3^2} + \\frac{10}{3^3} + \\dots$ \\n Wait, the numerators are 2, 6, 10, 14, ... these form an AP with $a=2, d=4$. But the first term is 1. We can separate 1 from the rest.\n2. Let $S_1 = \\frac{2}{3} + \\frac{6}{3^2} + \\frac{10}{3^3} + \\frac{14}{3^4} + \\dots$. This is an Arithmetico-Geometric Series (AGP).\n3. Multiply by the common ratio $r = 1/3$: $\\frac{1}{3} S_1 = \\frac{2}{3^2} + \\frac{6}{3^3} + \\frac{10}{3^4} + \\dots$.\n4. Subtracting: $S_1 - \\frac{1}{3} S_1 = \\frac{2}{3} + \\frac{4}{3^2} + \\frac{4}{3^3} + \\frac{4}{3^4} + \\dots$.\n5. $\\frac{2}{3} S_1 = \\frac{2}{3} + \\frac{4/9}{1 - 1/3} = \\frac{2}{3} + \\frac{4/9}{2/3} = \\frac{2}{3} + \\frac{2}{3} = \\frac{4}{3}$.\n6. Therefore, $S_1 = \\frac{4}{3} \\times \\frac{3}{2} = 2$.\n7. The total sum $S = 1 + S_1 = 1 + 2 = 3$."
    },
    {
        "id": 38,
        "subject": "Mathematics",
        "topic": "Calculus - Differential Equations",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "The general solution of the differential equation $\\frac{dy}{dx} + y \\tan x = \\sec x$ is:",
        "options": {
            "A": "$y \\sin x = x + c$",
            "B": "$y \\cos x = x + c$",
            "C": "$y \\sec x = \\tan x + c$",
            "D": "$y \\tan x = \\sec x + c$"
        },
        "answer": "B",
        "solution": "1. This is a linear differential equation of the form $\\frac{dy}{dx} + Py = Q$, where $P = \\tan x$ and $Q = \\sec x$.\n2. Integrating Factor (IF) = $e^{\\int P \\,dx} = e^{\\int \\tan x \\,dx} = e^{\\ln(\\sec x)} = \\sec x$.\n3. The general solution is $y \\cdot (\\text{IF}) = \\int Q \\cdot (\\text{IF}) \\,dx + c$.\n4. $y \\sec x = \\int \\sec^2 x \\,dx + c$.\n5. $y \\sec x = \\tan x + c$.\n6. Multiplying both sides by $\\cos x$, we get $y = \\sin x + c \\cos x$, or $y \\cos x = \\tan x \\cos x + c \\cos x$ ? No wait. $y \\sec x = \\tan x + c \\Rightarrow y (1/\\cos x) = (\\sin x / \\cos x) + c \\Rightarrow y = \\sin x + c\\cos x$.\n7. Option B is $y \\cos x = x + c$, Option C is $y \\sec x = \\tan x + c$. Clearly Option C matches my step 4 exactly.\nWait, let's re-read Option C: $y \\sec x = \\tan x + c$. This matches exactly.\nOption B is just wrong.\nWait, I must double check option C.\nOh wait, wait. Does $\\int \\sec^2 x \\,dx = \\tan x$? Yes.\nSo $y \\sec x = \\tan x + c$.\nTherefore, Option C is correct."
    },
    {
        "id": 39,
        "subject": "Mathematics",
        "topic": "Vectors and 3D Geometry",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": False,
        "image_prompt": "",
        "question": "The angle between the planes $2x - y + z = 6$ and $x + y + 2z = 7$ is:",
        "options": {
            "A": "$\\pi/2$",
            "B": "$\\pi/3$",
            "C": "$\\pi/4$",
            "D": "$\\pi/6$"
        },
        "answer": "B",
        "solution": "1. The normal vectors to the planes are $\\vec{n_1} = \\langle 2, -1, 1 \\rangle$ and $\\vec{n_2} = \\langle 1, 1, 2 \\rangle$.\n2. The angle $\\theta$ between the planes is given by $\\cos\\theta = \\frac{ |\\vec{n_1} \\cdot \\vec{n_2}| }{ |\\vec{n_1}| |\\vec{n_2}| }$.\n3. $\\vec{n_1} \\cdot \\vec{n_2} = (2)(1) + (-1)(1) + (1)(2) = 2 - 1 + 2 = 3$.\n4. $|\\vec{n_1}| = \\sqrt{2^2 + (-1)^2 + 1^2} = \\sqrt{6}$.\n5. $|\\vec{n_2}| = \\sqrt{1^2 + 1^2 + 2^2} = \\sqrt{6}$.\n6. $\\cos\\theta = \\frac{3}{\\sqrt{6}\\sqrt{6}} = \\frac{3}{6} = \\frac{1}{2}$.\n7. Therefore, $\\theta = \\pi/3$."
    },
    {
        "id": 40,
        "subject": "Mathematics",
        "topic": "Trigonometry",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "The maximum value of the expression $3\\cos \\theta + 4\\sin \\theta + 5$ is:",
        "options": {
            "A": "8",
            "B": "10",
            "C": "12",
            "D": "5"
        },
        "answer": "B",
        "solution": "1. The expression $a\\cos \\theta + b\\sin \\theta$ has a maximum value of $\\sqrt{a^2 + b^2}$ and a minimum value of $-\\sqrt{a^2 + b^2}$.\n2. Here, $a=3$ and $b=4$. The maximum value of $3\\cos \\theta + 4\\sin \\theta$ is $\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.\n3. The maximum value of the entire expression $3\\cos \\theta + 4\\sin \\theta + 5$ is $5 + 5 = 10$."
    },
    {
        "id": 41,
        "subject": "Mathematics",
        "topic": "Functions and Sets",
        "difficulty": "Hard",
        "time_minutes": 4,
        "image_based": True,
        "image_prompt": "A Venn diagram showing three intersecting sets A, B, and C inside a universal set. Various regions are labeled. Set A represents students liking Math, B for Physics, C for Chemistry. Values are: n(A)=50, n(B)=40, n(C)=45. n(AnB)=20, n(BnC)=15, n(AnC)=25, n(AnBnC)=10.",
        "question": "In a class of 100 students, 50 like Mathematics, 40 like Physics, and 45 like Chemistry. If 20 like both Math and Physics, 15 like both Physics and Chemistry, 25 like both Math and Chemistry, and 10 like all three subjects, how many students like none of these three subjects?",
        "options": {
            "A": "5",
            "B": "10",
            "C": "15",
            "D": "20"
        },
        "answer": "C",
        "solution": "1. Let $M$ be the set of students who like Math, $P$ for Physics, and $C$ for Chemistry.\n2. We want to find $n(M' \\cap P' \\cap C') = n(U) - n(M \\cup P \\cup C)$, where $n(U) = 100$.\n3. By the Principle of Inclusion-Exclusion:\n   $n(M \\cup P \\cup C) = n(M) + n(P) + n(C) - n(M \\cap P) - n(P \\cap C) - n(M \\cap C) + n(M \\cap P \\cap C)$\n4. $n(M \\cup P \\cup C) = 50 + 40 + 45 - 20 - 15 - 25 + 10$.\n5. $n(M \\cup P \\cup C) = 135 - 60 + 10 = 85$.\n6. The number of students who like none of the subjects is $100 - 85 = 15$."
    },
    {
        "id": 42,
        "subject": "Mathematics",
        "topic": "Calculus - Limit and Continuity",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": False,
        "image_prompt": "",
        "question": "The value of $\\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{x^3}$ is:",
        "options": {
            "A": "0",
            "B": "1",
            "C": "1/2",
            "D": "-1/2"
        },
        "answer": "C",
        "solution": "1. We evaluate $\\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{x^3}$.\n2. Rewrite $\\tan x$ as $\\frac{\\sin x}{\\cos x}$: $\\frac{\\frac{\\sin x}{\\cos x} - \\sin x}{x^3} = \\frac{\\sin x (1 - \\cos x)}{x^3 \\cos x}$.\n3. This can be written as $\\left( \\frac{\\sin x}{x} \\right) \\left( \\frac{1 - \\cos x}{x^2} \\right) \\left( \\frac{1}{\\cos x} \\right)$.\n4. As $x \\to 0$, $\\frac{\\sin x}{x} \\to 1$.\n5. Also, $\\frac{1 - \\cos x}{x^2} = \\frac{2 \\sin^2(x/2)}{x^2} = \\frac{1}{2} \\left( \\frac{\\sin(x/2)}{x/2} \\right)^2 \\to \\frac{1}{2} (1)^2 = \\frac{1}{2}$.\n6. Lastly, $\\frac{1}{\\cos x} \\to 1$.\n7. Therefore, the limit is $1 \\cdot \\frac{1}{2} \\cdot 1 = 1/2$."
    },
    {
        "id": 43,
        "subject": "Mathematics",
        "topic": "Algebra - Binomial Theorem",
        "difficulty": "Hard",
        "time_minutes": 4,
        "image_based": False,
        "image_prompt": "",
        "question": "The coefficient of $x^7$ in the expansion of $(1 - x - x^2 + x^3)^6$ is:",
        "options": {
            "A": "-144",
            "B": "144",
            "C": "-132",
            "D": "132"
        },
        "answer": "A",
        "solution": "1. We first factor the expression inside: $1 - x - x^2 + x^3 = 1(1-x) - x^2(1-x) = (1-x)(1-x^2) = (1-x)^2(1+x)$.\n2. So, $(1 - x - x^2 + x^3)^6 = (1-x)^{12} (1+x)^6$.\n3. We need the coefficient of $x^7$ in the product of expansions $(1-x)^{12}$ and $(1+x)^6$.\n4. Expansion of $(1-x)^{12} = \\sum_{r=0}^{12} \\binom{12}{r} (-1)^r x^r$.\n   Expansion of $(1+x)^6 = \\sum_{k=0}^6 \\binom{6}{k} x^k$.\n5. We need $r + k = 7$. The possible pairs for $(r, k)$ to get $x^7$ are:\n   (7, 0), (6, 1), (5, 2), (4, 3), (3, 4), (2, 5), (1, 6).\n6. Summing the products of coefficients: $\\sum (-1)^r \\binom{12}{r} \\binom{6}{k}$.\n   $r=1, k=6: -\\binom{12}{1}\\binom{6}{6} = -12 \\cdot 1 = -12$\n   $r=2, k=5: +\\binom{12}{2}\\binom{6}{5} = +66 \\cdot 6 = +396$\n   $r=3, k=4: -\\binom{12}{3}\\binom{6}{4} = -220 \\cdot 15 = -3300$\n   $r=4, k=3: +\\binom{12}{4}\\binom{6}{3} = +495 \\cdot 20 = +9900$\n   $r=5, k=2: -\\binom{12}{5}\\binom{6}{2} = -792 \\cdot 15 = -11880$\n   $r=6, k=1: +\\binom{12}{6}\\binom{6}{1} = +924 \\cdot 6 = +5544$\n   $r=7, k=0: -\\binom{12}{7}\\binom{6}{0} = -792 \\cdot 1 = -792$\n7. Adding them up: $-12 + 396 - 3300 + 9900 - 11880 + 5544 - 792 = -144$.\n8. Therefore, the coefficient of $x^7$ is -144."
    },
    {
        "id": 44,
        "subject": "Mathematics",
        "topic": "Algebra - Mathematical Reasoning",
        "difficulty": "Easy",
        "time_minutes": 2,
        "image_based": False,
        "image_prompt": "",
        "question": "The logical statement $(p \\Rightarrow q) \\wedge (q \\Rightarrow \\sim p)$ is equivalent to:",
        "options": {
            "A": "$\\sim p$",
            "B": "$p$",
            "C": "$p \\wedge q$",
            "D": "$p \\vee q$"
        },
        "answer": "A",
        "solution": "1. Using the property $x \\Rightarrow y \\equiv \\sim x \\vee y$.\n2. $p \\Rightarrow q \\equiv \\sim p \\vee q$.\n3. $q \\Rightarrow \\sim p \\equiv \\sim q \\vee \\sim p$.\n4. Therefore, $(p \\Rightarrow q) \\wedge (q \\Rightarrow \\sim p) \\equiv (\\sim p \\vee q) \\wedge (\\sim p \\vee \\sim q)$.\n5. By distributive law in reverse: $\\sim p \\vee (q \\wedge \\sim q)$.\n6. Since $q \\wedge \\sim q$ is always False (Contradiction $F$).\n7. The statement simplifies to $\\sim p \\vee F \\equiv \\sim p$."
    },
    {
        "id": 45,
        "subject": "Mathematics",
        "topic": "Calculus - Application of Derivatives",
        "difficulty": "Medium",
        "time_minutes": 3,
        "image_based": True,
        "image_prompt": "A sketch of a parabola y^2 = 8x. The point P on it closest to point (4, -2) is marked, with a straight line connecting P and (4, -2) signifying minimum distance. Normal to parabola at P passes through (4, -2).",
        "question": "The coordinates of the point on the parabola $y^2 = 8x$ which is at a minimum distance from the circle $x^2 + (y+6)^2 = 1$ are:",
        "options": {
            "A": "(2, 4)",
            "B": "(2, -4)",
            "C": "(18, -12)",
            "D": "(8, 8)"
        },
        "answer": "B",
        "solution": "1. The circle has center $C(0, -6)$ and radius 1. The shortest distance from a parabola to a circle occurs along the common normal, which passes through the center of the circle.\n2. In other words, we need to find a point on the parabola whose normal passes through $(0, -6)$.\n3. The equation of the parabola is $y^2 = 4ax$, so $4a = 8 \\Rightarrow a = 2$.\n4. The equation of the normal in parameter form 't' is $y = -tx + 2at + at^3$. Substituting $a=2$, we have $y = -tx + 4t + 2t^3$.\n5. This normal passes through $(0, -6)$, so $-6 = -t(0) + 4t + 2t^3 \\Rightarrow 2t^3 + 4t + 6 = 0$.\n6. Dividing by 2: $t^3 + 2t + 3 = 0$.\n7. By inspection, $t = -1$ is a root $(-1 - 2 + 3 = 0)$. Factoring out $t+1$: $(t+1)(t^2 - t + 3) = 0$. The quadratic has no real roots.\n8. Thus, $t = -1$.\n9. The point on the parabola is $(at^2, 2at) = (2(-1)^2, 2(2)(-1)) = (2, -4)$."
    }
]
