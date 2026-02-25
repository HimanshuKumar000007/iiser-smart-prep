import json

qs_to_check = [3, 4, 11, 17, 21, 22, 23, 24, 28, 31, 32, 33, 34, 36, 39, 45]

with open('d:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/frontend/mock_test/data/mock03.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('d:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/frontend/mock_test/data/qs_to_review.txt', 'w', encoding='utf-8') as out:
    for q in data.get('questions', []):
        if q.get('id') in qs_to_check:
            out.write(f"Q{q['id']} [S: {q['subject']}]: {q['question']}\n")
            out.write(f"Options: {q['options']}\n")
            out.write(f"Correct: {q['correct']}\n")
            out.write(f"Explanation: {q['explanation']}\n\n")

print("Done extracting")
