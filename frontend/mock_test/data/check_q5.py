import json

file_path = 'd:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/frontend/mock_test/data/mock03.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('d:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/frontend/mock_test/data/output_q5.txt', 'w', encoding='utf-8') as out:
    for q in data.get('questions', []):
        if q.get('id') == 5:
            out.write(f"Q5 [S: {q.get('subject')}]: {q.get('question')}\n")
            out.write(f"Options: {q.get('options')}\n")
            out.write(f"Correct: {q.get('correct')}\n")
            out.write(f"Explanation: {q.get('explanation')}\n")
