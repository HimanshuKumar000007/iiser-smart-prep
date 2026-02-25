import json

file_path = 'd:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/frontend/mock_test/data/mock03.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for q in data.get('questions', []):
    if q.get('id') == 5:
        q['correct'] = 0

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("Fixed mock03.json Q5")
