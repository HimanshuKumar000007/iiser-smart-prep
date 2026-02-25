import json

with open('mock14.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for q in data['questions']:
    # 1. Physics Q8
    if q['id'] == 8:
        q['correct'] = 0
        q['explanation'] = "The broken piece carries away angular momentum. The remaining disc is not an isolated system. Removing mass from the edge causes the moment of inertia of the remaining disc to decrease. As a result, the angular velocity of the remaining disc increases to compensate. This is a classic IISER conceptual trap."

    # 2. Physics Q9
    if q['id'] == 9:
        q['explanation'] = "Using the center of mass formula for a composite body:<br>x_cm = (A\u2081x\u2081 + A\u2082x\u2082) / (A\u2081 + A\u2082)<br>y_cm = (A\u2081y\u2081 + A\u2082y\u2082) / (A\u2081 + A\u2082)<br>By dividing the L-shape into its two standard rectangular components and substituting their individual centers of mass (x\u2081, y\u2081) and (x\u2082, y\u2082) along with their areas A\u2081 and A\u2082, we arrive at the coordinates (8a/5, 3a/5)."

    # 3. Chemistry Q26
    if q['id'] == 26:
        q['question'] = "**PASSAGE 1:** Consider the equilibrium: N\u2082(g) + 3H\u2082(g) \u21cc 2NH\u2083(g); \u0394H = -92 kJ. At a certain temperature, the equilibrium constant Kp = 1.64 \u00d7 10\u207b\u2074 atm\u207b\u00b2. The reaction mixture initially contains N\u2082 at 0.5 atm and H\u2082 at 0.8 atm.<br><br>If the temperature is increased, what happens to the equilibrium position and the value of Kp?"
        q['correct'] = 3
        q['explanation'] = "The reaction N\u2082 + 3H\u2082 \u21cc 2NH\u2083 has \u0394H = -92 kJ (exothermic).<br>According to Le Chatelier's principle, increasing the temperature provides heat, which shifts the equilibrium in the backward (endothermic) direction to absorb the excess heat.<br>Furthermore, Kp depends exclusively on temperature. For an exothermic reaction, an increase in temperature results in a decrease in the equilibrium constant Kp."

    # 4. Maths Q40
    if q['id'] == 40:
        q['options'][3] = "y = (1/2)(e^x + e^-x)"
        q['correct'] = 3
        q['explanation'] = "Given: dy/dx + y = e^x, y(0) = 1<br>This is a linear differential equation. Integrating Factor (IF) = e^x.<br>d/dx(y \u00b7 e^x) = e^(2x)<br>Integrating both sides: y \u00b7 e^x = (1/2)e^(2x) + C \u2192 y = (1/2)e^x + C \u00b7 e^(-x)<br>Using boundary condition y(0) = 1:<br>1 = 1/2 + C \u2192 C = 1/2<br>Final solution: y = (1/2)(e^x + e^(-x))"

    # 5. Biology Q54
    if q['id'] == 54:
        q['correct'] = 1

    # Minor Polish 1: Maths Q38
    if q['id'] == 38:
        q['explanation'] = "The general term of the series is T_k = (2^k - 1) / 2^(k-1) = 2 - 1/2^(k-1).<br>Summing up to n terms: S_n = \u2211(2 - (1/2)^(k-1)) = \u2211(2) - \u2211(1/2)^(k-1)<br>S_n = 2n - [1 \u00b7 (1 - (1/2)^n) / (1 - 1/2)]<br>S_n = 2n - 2(1 - 1/2^n) = 2n - 2 + 1/2^(n-1)"

    # Minor Polish 2: Physics Q2
    if q['id'] == 2:
        q['options'][2] = "4\u221a2 kQ/a\u00b2"
        q['correct'] = 2
        q['explanation'] = "Distance from corner to center is d = a/\u221a2. Electric field due to one charge is E = kQ/d\u00b2 = 2kQ/a\u00b2.<br>By symmetry, the fields from diagonally opposite +Q and -Q charges add up. Each diagonal has a net field of 2E = 4kQ/a\u00b2 pointing towards the -Q charge.<br>The two diagonals intersect at 90\u00b0, so the resultant electric field is \u221a((4kQ/a\u00b2)\u00b2 + (4kQ/a\u00b2)\u00b2) = 4\u221a2 kQ/a\u00b2."

    # Minor Polish 3: Chem Q17
    if q['id'] == 17:
        q['question'] = "When 2-methylbut-2-ene reacts with HBr in the presence of peroxide, the major product is:"

with open('mock14.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

with open('mock14_final.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

print("Applied user feedback fixes intelligently!")
