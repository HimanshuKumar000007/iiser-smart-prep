import json
import re

file_path = 'd:/IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22/frontend/mock_test/data/mock05.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

print("Suspicious Mappings:")
suspicious = 0

for q in data.get('questions', []):
    correct_idx = q['correct']
    expl = q.get('explanation', '')
    expl_lower = expl.lower()
    
    # Heuristic 1: Mentions "option X" in the explanation
    matches = re.findall(r'option ([a-d])', expl_lower)
    if matches:
        last_match = matches[-1]
        expected_idx = {'a': 0, 'b': 1, 'c': 2, 'd': 3}[last_match]
        if expected_idx != correct_idx:
            print(f"Q{q['id']}: Marked={correct_idx}, Expl mentions Option {last_match.upper()}")
            suspicious += 1
            continue
            
    # Heuristic 2: The correct option text is not found in the explanation
    correct_text = str(q['options'][correct_idx])
    # strip some basic html if any
    correct_text_clean = re.sub(r'<[^>]+>', '', correct_text).strip()
    
    if len(correct_text_clean) > 2 and correct_text_clean not in expl and correct_text_clean.lower() not in expl_lower:
        # Check if another option text IS in the explanation
        found_other = False
        for i, opt in enumerate(q['options']):
            if i == correct_idx: continue
            opt_clean = re.sub(r'<[^>]+>', '', str(opt)).strip()
            if len(opt_clean) > 2 and opt_clean in expl:
                print(f"Q{q['id']}: Marked={correct_idx} ({correct_text_clean}), but explanation contains option {i} ({opt_clean})")
                suspicious += 1
                found_other = True
                break
        if not found_other:
            pass # Maybe the explanation derives it differently

print(f"Total Suspicious Questions: {suspicious}")
