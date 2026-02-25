import json

file_path = 'd:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/frontend/mock_test/data/mock05.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('d:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/frontend/mock_test/data/all_qs_mock05.txt', 'w', encoding='utf-8') as out:
    for q in data.get('questions', []):
        out.write(f"--- Q{q['id']} [{q['subject']}] ---\n")
        out.write(f"Q: {q['question']}\n")
        out.write(f"Options: {q['options']}\n")
        out.write(f"Correct Index: {q['correct']} -> |{q['options'][q['correct']]}| \n")
        out.write(f"Explanation: {q['explanation']}\n\n")

print("Dumped all questions.")
