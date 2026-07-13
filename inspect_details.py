import json, sys
sys.stdout.reconfigure(encoding='utf-8')
DATA_DIR = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\mock_test\data'

to_inspect = [
    ('mock14.json', [9]),
    ('mock20.json', [15, 36]),
    ('mock27.json', [10, 25, 28, 30, 33]),
    ('mock28.json', [17]),
    ('mock31.json', [8, 41]),
    ('mock35.json', [39]),
    ('mock38.json', [44]),
]

for filename, ids in to_inspect:
    try:
        with open(DATA_DIR + '/' + filename, encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        continue
    
    print(f"=== {filename} ===")
    for q in data['questions']:
        if q['id'] in ids:
            print(f"Q{q['id']} ({q['subject']}): {q['question']}")
            print(f"Options: {q['options']}")
            print(f"Correct: {q['correct']} -> {q['options'][q['correct']] if q['correct'] < len(q['options']) else 'OUT OF RANGE'}")
            print(f"Explanation: {q['explanation']}")
            print("-" * 40)
