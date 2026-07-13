import json, sys
sys.stdout.reconfigure(encoding='utf-8')
DATA_DIR = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\mock_test\data'

with open(DATA_DIR + '/mock32.json', encoding='utf-8') as f:
    data = json.load(f)

for q in data['questions']:
    qid = q['id']
    
    # Q34: Multinomial coefficient
    if qid == 34:
        q['question'] = "The coefficient of x³ in the expansion of (1 + x + x²)⁴ is:"
        q['options'] = ['12', '16', '20', '24']
        q['correct'] = 1
        q['explanation'] = "<strong>Step 1:</strong> Use multinomial theorem: General term is [4! / (a!b!c!)] 1ᵃ xᵇ (x²)ᶜ where a+b+c=4 and b+2c=3. <br><strong>Step 2:</strong> Possible (b, c) pairs: <br>1. c=0, b=3: a=1. Term = 4!/(1!3!0!) = 4. <br>2. c=1, b=1: a=2. Term = 4!/(2!1!1!) = 12. <br><strong>Step 3:</strong> Total coefficient = 4 + 12 = <strong>16</strong>."

with open(DATA_DIR + '/mock32.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Fixed mock32 Q34.")
