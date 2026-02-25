import json
import re

qs_text = open('mock14_raw_qs.txt', encoding='utf-8').read()
ans_text = open('mock14_raw_answers.txt', encoding='utf-8').read()
exp_text = open('mock14_raw_explanations.txt', encoding='utf-8').read()

questions = []

# Parse Questions
q_blocks = qs_text.split('**Question ')
for i in range(1, len(q_blocks)):
    block = q_blocks[i].strip()
    if not block:
        continue
    
    q_num_match = re.search(r'^(\d+)', block)
    if not q_num_match:
        continue
    
    q_id = int(q_num_match.group(1))
    
    if q_id <= 15:
        subject = "Physics"
    elif q_id <= 30:
        subject = "Chemistry"
    elif q_id <= 45:
        subject = "Mathematics"
    else:
        subject = "Biology"
    
    image_prompt = None
    question_text = ""
    options = []
    
    # Extract Image Prompt
    img_match = re.search(r'\*\*Image Prompt:\*\*\s*"([^"]+)"', block)
    if img_match:
        image_prompt = img_match.group(1).strip()
    
    # Extract Options
    a_match = re.search(r'\nA\.\s+(.*)', block)
    b_match = re.search(r'\nB\.\s+(.*)', block)
    c_match = re.search(r'\nC\.\s+(.*)', block)
    d_match = re.search(r'\nD\.\s+(.*)', block)
    
    opt_a = a_match.group(1).strip() if a_match else ""
    opt_b = b_match.group(1).strip() if b_match else ""
    opt_c = c_match.group(1).strip() if c_match else ""
    opt_d = d_match.group(1).strip() if d_match else ""
    
    if opt_a: options.append(opt_a)
    if opt_b: options.append(opt_b)
    if opt_c: options.append(opt_c)
    if opt_d: options.append(opt_d)
    
    # Extract Question Text
    # It is everything before "\nA. "
    q_section = block.split('\nA. ')[0] if '\nA. ' in block else block
    
    lines = q_section.split('\n')
    clean_lines = []
    for line in lines:
        line_s = line.strip()
        if line_s == '' or line_s == '---' or line_s.startswith(str(q_id)) or \
           line_s.startswith('**Image Type:**') or line_s.startswith('**Image Prompt:**') or \
           line_s.startswith('[Topic:') or 'IMAGE-BASED' in line_s or 'PASSAGE-BASED' in line_s:
            continue
        clean_lines.append(line_s)
    
    question_text = ' '.join(clean_lines).strip()
    
    questions.append({
        "questionNumber": q_id,
        "questionId": f"IAT_MOCK14_Q{q_id}",
        "subject": subject,
        "questionText": question_text,
        "options": options,
        "correctAnswerIndex": 0,
        "difficulty": "",
        "explanation": "",
        "isImageQuestion": True if image_prompt else False,
        "imagePrompt": image_prompt,
        "hasPassage": True if "PASSAGE" in block else False,
        "marks": 4,
        "negativeMark": -1
    })

# Parse Explanations
exp_blocks = exp_text.split('### Question ')
for i in range(1, len(exp_blocks)):
    block = exp_blocks[i]
    idx_match = re.search(r'^(\d+)', block)
    if not idx_match:
        continue
    idx = int(idx_match.group(1))
    
    sol_match = re.search(r'\*\*Solution:\*\*\s*([\s\S]+?)(?=\n---|### Question|\Z)', block)
    if sol_match:
        expl = sol_match.group(1).strip().replace('\n', '<br>')
        # Find the corresponding question
        for q in questions:
            if q["questionNumber"] == idx:
                q["explanation"] = expl
                break

# Parse Answers
for line in ans_text.split('\n'):
    line = line.strip()
    ans_line_match = re.search(r'^\|\s*(\d+)\s*\|\s*([A-D])\s*\|\s*\w+\s*\|\s*(Easy|Medium|Hard)\s*\|', line)
    if ans_line_match:
        idx = int(ans_line_match.group(1))
        ans_char = ans_line_match.group(2)
        diff = ans_line_match.group(3)
        
        for q in questions:
            if q["questionNumber"] == idx:
                q["correctAnswerIndex"] = ord(ans_char) - ord('A')
                q["difficulty"] = diff
                break

for q in questions:
    if q["questionNumber"] == 1:
        q["correctAnswerIndex"] = 3

mock_test = questions

with open('mock14.json', 'w', encoding='utf-8') as f:
    json.dump(mock_test, f, indent=4)
print("Finished generating mock14.json")
