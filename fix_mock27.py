import json, sys
sys.stdout.reconfigure(encoding='utf-8')
DATA_DIR = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\mock_test\data'

with open(DATA_DIR + '/mock27.json', encoding='utf-8') as f:
    data = json.load(f)

for q in data['questions']:
    qid = q['id']
    
    # Q10: Proton radius
    if qid == 10:
        q['question'] = "A proton moves with velocity v = (2î) × 10⁶ m/s in a uniform magnetic field B = 0.5 k̂ T. What is the radius of its path? (Given: m_p = 1.67 × 10⁻²⁷ kg, e = 1.6 × 10⁻¹⁹ C)"
        q['explanation'] = "<strong>Step 1:</strong> Radius r = mv/(qB).<br><strong>Step 2:</strong> v = 2 × 10⁶ m/s, B = 0.5 T, q = 1.6 × 10⁻¹⁹ C, m = 1.67 × 10⁻²⁷ kg.<br><strong>Step 3:</strong> r = (1.67×10⁻²⁷ × 2×10⁶)/(1.6×10⁻¹⁹ × 0.5) = (3.34×10⁻²¹)/(0.8×10⁻¹⁹) = 0.04175 m ≈ <strong>4.2 cm</strong>."

    # Q25: Aldehyde oxidation
    if qid == 25:
        q['question'] = "A compound X (C₅H₁₀O) gives a positive Tollens' test but negative iodoform test. On oxidation with KMnO₄/H⁺, it yields pentanoic acid. What is the structure of X?"
        q['explanation'] = "<strong>Step 1:</strong> Positive Tollens' test indicates an aldehyde (-CHO).<br><strong>Step 2:</strong> Negative iodoform test means no CH₃-CO- or CH₃-CH(OH)- group.<br><strong>Step 3:</strong> Oxidation of an aldehyde with 5 carbons gives a carboxylic acid with 5 carbons (pentanoic acid).<br><strong>Step 4:</strong> Structure is CH₃CH₂CH₂CH₂CHO (pentanal)."

    # Q42: Vector angle
    if qid == 42:
        q['question'] = "The angle between the vectors a = 2î - ĵ + k̂ and b = î + ĵ + 2k̂ is:"
        q['explanation'] = "<strong>Step 1:</strong> a·b = (2)(1) + (-1)(1) + (1)(2) = 2 - 1 + 2 = 3.<br><strong>Step 2:</strong> |a| = √(2² + (-1)² + 1²) = √6. |b| = √(1² + 1² + 2²) = √6.<br><strong>Step 3:</strong> cos θ = (a·b)/(|a||b|) = 3/(√6·√6) = 3/6 = 1/2.<br><strong>Step 4:</strong> θ = cos⁻¹(1/2) = <strong>π/3</strong>."

with open(DATA_DIR + '/mock27.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Fixed mock27 Q10, Q25, Q42.")
