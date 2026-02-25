import json

with open('mock14.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

new_questions = []
for q in questions:
    
    section = "A"
    if q["subject"] == "Chemistry":
        section = "B"
    elif q["subject"] == "Mathematics":
        section = "C"
    elif q["subject"] == "Biology":
        section = "D"
        
    new_q = {
        "id": q["questionNumber"],
        "subject": q["subject"],
        "section": section,
        "question": q["questionText"],
        "options": q["options"],
        "correct": q["correctAnswerIndex"],
        "explanation": q["explanation"],
        "difficulty": q["difficulty"],
        "imagePrompt": q["imagePrompt"] if "imagePrompt" in q else None
    }
    
    if "marks" in q:
        new_q["marks"] = q["marks"]
    if "negativeMark" in q:
        new_q["negativeMark"] = q["negativeMark"]
        
    new_questions.append(new_q)

with open('mock14.json', 'w', encoding='utf-8') as f:
    json.dump(new_questions, f, indent=4)
    
with open('mock14_final.json', 'w', encoding='utf-8') as f:
    json.dump(new_questions, f, indent=4)

print("Schema updated successfully!")
