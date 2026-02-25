import json
from phys import physics_questions
from chem import chemistry_questions
from mathematics import math_questions
from bio import bio_questions

questions = []
questions.extend(physics_questions)
questions.extend(chemistry_questions)
questions.extend(math_questions)
questions.extend(bio_questions)

mock_data = {
    "questions": questions,
    "marks_scheme": {
        "correct": 4,
        "incorrect": -1,
        "unattempted": 0
    },
    "total_marks": 240,
    "duration_minutes": 180
}

# 1. Output JSON
with open('mock24.json', 'w', encoding='utf-8') as f:
    json.dump(mock_data, f, indent=4)

# 2. Output Student Version
with open('Mock24_Student_Version.md', 'w', encoding='utf-8') as f:
    f.write("# IISER IAT Mock Test 24 - Student Version\n\n")
    f.write("**Total Marks:** 240 | **Time:** 180 minutes\n")
    f.write("**Marking:** +4 for correct, -1 for incorrect, 0 for unattempted\n\n")
    f.write("---\n\n")
    
    current_subject = ""
    for q in questions:
        if q["subject"] != current_subject:
            current_subject = q["subject"]
            f.write(f"## {current_subject} Section\n\n")
            
        f.write(f"**Q{q['id']}.** {q['question']}\n\n")
        if q["image_based"]:
            f.write(f"*(Image Placeholder: {q['image_prompt']})*\n\n")
        
        for opt_key, opt_val in q["options"].items():
            f.write(f"**{opt_key}.** {opt_val}\n")
        f.write("\n---\n")

# 3. Output Teacher Version
with open('Mock24_Teacher_Version.md', 'w', encoding='utf-8') as f:
    f.write("# IISER IAT Mock Test 24 - Teacher Version (Solutions Key)\n\n")
    f.write("---\n\n")
    
    f.write("## Answer Key\n")
    key_lines = []
    for i in range(0, len(questions), 5):
        chunk = questions[i:i+5]
        line = " | ".join([f"Q{q['id']}: {q['answer']}" for q in chunk])
        key_lines.append(line)
    f.write("\n".join(key_lines) + "\n\n---\n\n")

    current_subject = ""
    for q in questions:
        if q["subject"] != current_subject:
            current_subject = q["subject"]
            f.write(f"## {current_subject} Section Solutions\n\n")
            
        f.write(f"### Question {q['id']} [{q['difficulty']} | {q['time_minutes']} min | {q['topic']}]\n")
        f.write(f"{q['question']}\n\n")
        if q["image_based"]:
            f.write(f"*(Image Required: {q['image_prompt']})*\n\n")
        
        for opt_key, opt_val in q["options"].items():
            correct_mark = " ✓ Correct" if opt_key == q["answer"] else ""
            f.write(f"**{opt_key}.** {opt_val}{correct_mark}\n")
        
        f.write("\n**Solution:**\n")
        f.write(q["solution"] + "\n\n---\n")

print("Generated mock24.json, Mock24_Student_Version.md, Mock24_Teacher_Version.md")
