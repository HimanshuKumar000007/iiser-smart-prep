import json, sys
sys.stdout.reconfigure(encoding='utf-8')
DATA_DIR = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\mock_test\data'

with open(DATA_DIR + '/mock30.json', encoding='utf-8') as f:
    data = json.load(f)

for q in data['questions']:
    qid = q['id']
    
    # Q25: Benzaldehyde
    if qid == 25:
        q['question'] = "Passage: Compound X (C₇H₆O) gives a positive Tollens' test but a negative Fehling's test. It forms a bisulfite addition product. Question: What is X?"
        q['explanation'] = "<strong>Step 1:</strong> Positive Tollens' test indicates an aldehyde.<br><strong>Step 2:</strong> Negative Fehling's test is characteristic of aromatic aldehydes like benzaldehyde (aliphatic aldehydes give positive Fehling's).<br><strong>Step 3:</strong> Bisulfite addition is common for aldehydes and methyl ketones.<br><strong>Step 4:</strong> C₇H₆O is the formula for benzaldehyde.<br><strong>Answer:</strong> <strong>Benzaldehyde</strong>."

    # Q36: Distance 3D
    if qid == 36:
        q['question'] = "The distance between the points (1, 2, 3) and (5, 5, 5) is:"
        q['options'] = ['7', '8', '9', '√29']
        q['correct'] = 3
        q['explanation'] = "<strong>Step 1:</strong> Distance = √((5-1)² + (5-2)² + (5-3)²).<br><strong>Step 2:</strong> = √(4² + 3² + 2²) = √(16 + 9 + 4) = <strong>√29</strong>."

with open(DATA_DIR + '/mock30.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Fixed mock30 Q25, Q36.")
