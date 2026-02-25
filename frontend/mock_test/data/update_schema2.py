import json

with open('mock14.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# data might be an array or an object depending on the current state.
if isinstance(data, list):
    questions = data
elif "questions" in data:
    questions = data["questions"]
else:
    questions = []

# Strip marks and negativeMarks from individual questions to match user's requested output
for q in questions:
    if "marks" in q:
        del q["marks"]
    if "negativeMark" in q:
        del q["negativeMark"]

mock_test = {
    "testId": "IAT_FULL_14",
    "duration": 180,
    "totalMarks": 240,
    "questions": questions
}

with open('mock14.json', 'w', encoding='utf-8') as f:
    json.dump(mock_test, f, indent=4)

with open('mock14_final.json', 'w', encoding='utf-8') as f:
    json.dump(mock_test, f, indent=4)

print("Schema updated successfully with root object!")
