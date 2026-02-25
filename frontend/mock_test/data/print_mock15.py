import json

with open('d:\\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\\frontend\\mock_test\\data\\mock15.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for q in data.get('questions', []):
    if q['id'] in [6, 20, 35]:
        print(f"--- Q{q['id']} ---")
        if q['id'] == 35:
            print(f"Options: {q['options']}")
        print(f"Explanation: {q['explanation']}\n")
