import json, sys
sys.stdout.reconfigure(encoding='utf-8')
DATA_DIR = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\mock_test\data'

def load_json(filename):
    with open(DATA_DIR + '/' + filename, encoding='utf-8') as f:
        return json.load(f)

def save_json(filename, data):
    with open(DATA_DIR + '/' + filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

# Fix mock20 Q36
data20 = load_json('mock20.json')
for q in data20['questions']:
    if q['id'] == 36:
        q['options'][3] = 'x² + y² - 4x - 2y + 4 = 0'
        q['explanation'] = "The circle passing through (1,1), (2,2), and (3,1) has its center at the intersection of the perpendicular bisectors. The bisector of (1,1) and (3,1) is x=2. The bisector of (1,1) and (2,2) is y = -x + 3. Intersection is at (2,1). Radius = dist((2,1), (1,1)) = 1. Equation: (x-2)² + (y-1)² = 1 → x² + y² - 4x - 2y + 4 = 0."
save_json('mock20.json', data20)

# Fix mock38 Q44
data38 = load_json('mock38.json')
for q in data38['questions']:
    if q['id'] == 44:
        q['question'] = "The image of the point (1, 2, 3) in the plane x + 2y + 3z + 14 = 0 is:"
        q['explanation'] = "Using the image formula: (x-1)/1 = (y-2)/2 = (z-3)/3 = -2(1 + 4 + 9 + 14)/(1 + 4 + 9) = -2(28)/14 = -4. <br>x - 1 = -4 → x = -3; <br>y - 2 = -8 → y = -6; <br>z - 3 = -12 → z = -9. <br>Image is (-3, -6, -9)."
save_json('mock38.json', data38)

# Fix mock39 Q38
data39 = load_json('mock39.json')
for q in data39['questions']:
    if q['id'] == 38:
        q['options'] = ['1', '2', '1/2', '0']
        q['correct'] = 1
        q['explanation'] = "Using Maclaurin series: e^x = 1 + x + x²/2! + x³/3! + ... <br>e^x - 1 - x = x²/2 + x³/6 + ... <br>Limit as x→0: x² / (x²/2) = 2."
save_json('mock39.json', data39)

# Fix mock31 Q41
data31 = load_json('mock31.json')
for q in data31['questions']:
    if q['id'] == 41:
        q['correct'] = 1
        q['explanation'] = "By Rolle's Theorem, if f(0)=f(1)=f(2)=0, then f'(x) has at least one zero in (0,1) and at least one zero in (1,2). Let these be c1 and c2. Then applying Rolle's Theorem to f'(x) on [c1, c2], there is at least one point c in (c1, c2) such that f''(c) = 0. So the minimum number of points is 1."
save_json('mock31.json', data31)

# Fix mock35 Q39
data35 = load_json('mock35.json')
for q in data35['questions']:
    if q['id'] == 39:
        q['options'][0] = 'x² + y² − 2xy − 10x − 2y − 5 = 0'
        q['explanation'] = "Using the definition of a parabola: Distance from focus = Distance from directrix. <br>SP² = PM² → (x-1)² + (y+1)² = (x+y+3)² / 2. <br>2(x² - 2x + 1 + y² + 2y + 1) = x² + y² + 9 + 2xy + 6x + 6y. <br>2x² - 4x + 4 + 2y² + 4y = x² + y² + 2xy + 6x + 6y + 9. <br>x² + y² - 2xy - 10x - 2y - 5 = 0."
save_json('mock35.json', data35)

print("Applied fixes to mock20, mock31, mock35, mock38, mock39.")
