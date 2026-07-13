import json, sys, re
sys.stdout.reconfigure(encoding='utf-8')
DATA_DIR = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\mock_test\data'

confusion_markers = ['Wait,', 'Wait —', 'Hmm,', 'let me reconsider', 'let me recheck',
                    'Let me correct', 'recalculate', 'Actually', 'Note:']

for mock_num in range(1, 41):
    filename = f'mock{mock_num:02d}.json'
    try:
        with open(DATA_DIR + '/' + filename, encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        continue
    
    for q in data['questions']:
        qid = q.get('id')
        options = q.get('options', [])
        correct = q.get('correct')
        explanation = str(q.get('explanation', ''))
        subject = q.get('subject', '')
        
        if not isinstance(correct, int) or correct < 0 or correct >= len(options):
            continue
            
        for marker in confusion_markers:
            if marker.lower() in explanation.lower():
                print(f"=== mock{mock_num:02d} Q{qid} ({subject}) ===")
                print(f"Correct: {correct} -> {options[correct]}")
                print(f"Explanation: {explanation[:300]}...")
                print()
                break
