import json, sys
sys.stdout.reconfigure(encoding='utf-8')
DATA_DIR = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\mock_test\data'

with open(DATA_DIR + '/mock28.json', encoding='utf-8') as f:
    data = json.load(f)

for q in data['questions']:
    qid = q['id']
    
    # Q10: De Broglie ratio
    if qid == 10:
        q['question'] = "A proton and an alpha particle are accelerated through potential differences V and V/2 respectively. What is the ratio of their de Broglie wavelengths (λ_p/λ_α)?"
        q['explanation'] = "<strong>Step 1:</strong> λ = h/√(2mqV).<br><strong>Step 2:</strong> λ_p = h/√(2m_p·e·V).<br><strong>Step 3:</strong> λ_α = h/√(2·4m_p·2e·V/2) = h/√(8m_p·e·V) = h/(2√(2m_p·e·V)).<br><strong>Step 4:</strong> Ratio λ_p/λ_α = [h/√(2m_p·e·V)] / [h/(2√(2m_p·e·V))] = <strong>2</strong>."

    # Q17: CO+ Bond order
    if qid == 17:
        q['options'] = ['2.5', '3', '3.5', '4']
        q['correct'] = 2
        q['explanation'] = "<strong>Step 1:</strong> CO has 14 electrons, bond order = 3.<br><strong>Step 2:</strong> CO⁺ has 13 electrons. The electron is removed from the 5σ molecular orbital, which is weakly antibonding in nature.<br><strong>Step 3:</strong> Removing an electron from an antibonding orbital increases the bond order.<br><strong>Step 4:</strong> The bond order of CO⁺ is <strong>3.5</strong>."

    # Q43: Binomial coefficient
    if qid == 43:
        q['question'] = "The coefficient of x⁵ in the expansion of (1 + x)⁸ is:"
        q['options'] = ['56', '70', '28', '84']
        q['correct'] = 0
        q['explanation'] = "<strong>Step 1:</strong> General term in (1+x)ⁿ is C(n,r)xʳ.<br><strong>Step 2:</strong> For x⁵, r = 5 and n = 8.<br><strong>Step 3:</strong> Coefficient = C(8,5) = 8!/(5!3!) = (8×7×6)/(3×2×1) = <strong>56</strong>."

with open(DATA_DIR + '/mock28.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Fixed mock28 Q10, Q17, Q43.")
