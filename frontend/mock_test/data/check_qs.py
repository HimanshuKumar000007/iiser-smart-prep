import json

files = ['d:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/frontend/mock_test/data/mock01.json',
         'd:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/frontend/mock_test/data/mock02.json']

for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            print(f'--- {file} ---')
            for q in data.get('questions', []):
                if q['id'] in [6, 9, 12]:
                    print(f"Q{q['id']}: {q['question']}")
                    print(f"Options: {q['options']}")
                    print(f"Correct: {q['correct']}")
                    print(f"Explanation: {q['explanation']}\n")
    except Exception as e:
        print(f"Error reading {file}: {e}")
