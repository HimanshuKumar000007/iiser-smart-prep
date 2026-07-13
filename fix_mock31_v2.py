import json, sys
sys.stdout.reconfigure(encoding='utf-8')
DATA_DIR = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\mock_test\data'

with open(DATA_DIR + '/mock31.json', encoding='utf-8') as f:
    data = json.load(f)

for q in data['questions']:
    qid = q['id']
    
    # Q8: Simple Harmonic Oscillator scaling
    if qid == 8:
        q['question'] = "A particle of mass m moves in a potential V(x) = ½k x², where k = V₀/a². The time period of small oscillations scales as:"
        q['options'] = ['a m^(1/2) V₀^(-1/2)', 'a^(-1) m^(1/2) V₀^(1/2)', 'a m^(-1/2) V₀^(1/2)', 'a² m V₀⁻¹']
        q['correct'] = 0
        q['explanation'] = "<strong>Step 1:</strong> For a harmonic oscillator, T = 2π√(m/k).<br><strong>Step 2:</strong> Given k = V₀/a².<br><strong>Step 3:</strong> T = 2π√(m / (V₀/a²)) = 2π√(ma²/V₀) = <strong>2π a m^(1/2) V₀^(-1/2)</strong>.<br><strong>Step 4:</strong> Thus, T scales as <strong>a m^(1/2) V₀^(-1/2)</strong>."

    # Q32: Local minima
    if qid == 32:
        q['options'] = ['x = 2', 'x = 3', 'x = 0', 'No local minima']
        q['correct'] = 1
        q['explanation'] = "<strong>Step 1:</strong> f'(x) = (x-2)(x-3)e^x.<br><strong>Step 2:</strong> f'(x) changes sign from negative to positive at <strong>x = 3</strong>.<br><strong>Step 3:</strong> Therefore, f has a local minimum at x = 3."

    # Q36: Shortest distance simplified
    if qid == 36:
        q['question'] = "The shortest distance between the lines r = (î + ĵ) + t(k̂) and r = (2î + ĵ) + s(ĵ) is:"
        q['options'] = ['1', '2', '√2', '0']
        q['correct'] = 0
        q['explanation'] = "<strong>Step 1:</strong> Line 1 is (1, 1, t), Line 2 is (2, 1+s, 0).<br><strong>Step 2:</strong> a₂ - a₁ = (1, 0, 0).<br><strong>Step 3:</strong> b₁ × b₂ = (0, 0, 1) × (0, 1, 0) = (-1, 0, 0).<br><strong>Step 4:</strong> Distance = |(a₂-a₁)·(b₁×b₂)|/|b₁×b₂| = |(1,0,0)·(-1,0,0)|/1 = <strong>1</strong>."

with open(DATA_DIR + '/mock31.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Fixed mock31 Q8, Q32, Q36.")
