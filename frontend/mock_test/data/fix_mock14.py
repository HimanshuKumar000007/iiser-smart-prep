import json

with open('mock14.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

new_data = []

i = 0
while i < len(data):
    if i < len(data) - 1 and data[i]["questionNumber"] == data[i+1]["questionNumber"]:
        # Merge them
        q1 = data[i]
        q2 = data[i+1]
        
        q1["questionText"] = f"{q1['questionText']}\n\n{q2['questionText']}".strip()
        q1["options"] = q2["options"] if len(q2["options"]) > 0 else q1["options"]
        if not q1["difficulty"] and q2["difficulty"]:
            q1["difficulty"] = q2["difficulty"]
        if q2["difficulty"]:
             q1["difficulty"] = q2["difficulty"]
        if q2["correctAnswerIndex"] is not None:
             q1["correctAnswerIndex"] = q2["correctAnswerIndex"]
        
        new_data.append(q1)
        i += 2
    else:
        new_data.append(data[i])
        i += 1

with open('mock14.json', 'w', encoding='utf-8') as f:
    json.dump(new_data, f, indent=4)
print(f"Fixed mock14.json. Total questions: {len(new_data)}")
