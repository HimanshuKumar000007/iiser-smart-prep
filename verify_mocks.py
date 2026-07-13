import json
import os
import re
import sys

# Force UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = r"d:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\mock_test\data"

issues = []
summary = []

for mock_num in range(1, 41):
    filename = f"mock{mock_num:02d}.json"
    filepath = os.path.join(DATA_DIR, filename)

    if not os.path.exists(filepath):
        print(f"MISSING: {filename}")
        continue

    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    questions = data.get("questions", [])
    mock_issues = []

    for q in questions:
        qid = q.get("id")
        options = q.get("options", [])
        correct = q.get("correct")
        explanation = q.get("explanation", "") or ""
        question_text = q.get("question", "")
        subject = q.get("subject", "")

        problems = []

        # 1. Check correct field type and validity
        if correct is None:
            problems.append("MISSING correct field")
        elif isinstance(correct, list):
            problems.append(f"correct is a LIST: {correct}")
        elif not isinstance(correct, int):
            problems.append(f"correct is not int (type={type(correct).__name__}): {correct}")
        elif correct < 0 or correct >= len(options):
            problems.append(f"correct index {correct} out of range (0-{len(options)-1})")

        # 2. Check options count is 4
        if len(options) != 4:
            problems.append(f"Expected 4 options, got {len(options)}")

        # 3. Check explanation is not empty
        if not explanation or len(explanation.strip()) < 10:
            problems.append("Empty or very short explanation")

        # 4. Check explanation text for explicit letter contradictions
        letter_to_idx = {"A": 0, "B": 1, "C": 2, "D": 3}
        answer_patterns = [
            r"answer is [Oo]ption ([A-D])",
            r"correct answer is ([A-D])",
            r"matches option ([A-D])\.?\s*$",
            r"which is option ([A-D])",
        ]
        for pattern in answer_patterns:
            match = re.search(pattern, explanation)
            if match:
                letter = match.group(1).upper()
                expected_idx = letter_to_idx.get(letter)
                if expected_idx is not None and isinstance(correct, int) and correct != expected_idx:
                    problems.append(f"Explanation says Option {letter} (idx={expected_idx}) but correct={correct}")

        # Determine correct option text safely
        if isinstance(correct, int) and 0 <= correct < len(options):
            correct_text = options[correct]
        else:
            correct_text = "N/A"

        if problems:
            mock_issues.append({
                "mock": mock_num,
                "q_id": qid,
                "subject": subject,
                "question_preview": question_text[:100].replace("\n", " "),
                "correct": correct,
                "correct_option_text": correct_text,
                "problems": problems,
                "options": options,
                "explanation_snippet": explanation[:400],
            })

    total_q = len(questions)
    issue_count = len(mock_issues)
    summary.append(f"mock{mock_num:02d}: {total_q} questions, {issue_count} structural issues")
    issues.extend(mock_issues)

print("\n" + "="*75)
print("MOCK TEST STRUCTURAL AUDIT (mock01 to mock40)")
print("="*75)
for s in summary:
    print(s)

print("\n" + "="*75)
print(f"TOTAL STRUCTURAL ISSUES FOUND: {len(issues)}")
print("="*75)

for issue in issues:
    try:
        print(f"\n[MOCK {issue['mock']:02d} | Q{issue['q_id']} | {issue['subject']}]")
        print(f"  Question: {issue['question_preview']}")
        correct_val = issue['correct']
        correct_txt = issue['correct_option_text']
        print(f"  Marked correct index: {correct_val} => \"{correct_txt}\"")
        for p in issue["problems"]:
            print(f"  *** ISSUE: {p}")
        if "explanation_snippet" in issue:
            exp = issue["explanation_snippet"].replace("\n", " ").replace("<br>", " | ")
            print(f"  Explanation preview: {exp[:200]}")
    except Exception as e:
        print(f"  [Print error: {e}]")

print("\n\nDone.")
