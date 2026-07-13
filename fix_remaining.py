import json, sys
sys.stdout.reconfigure(encoding='utf-8')
DATA_DIR = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\mock_test\data'

def load_json(fn):
    with open(DATA_DIR + '/' + fn, encoding='utf-8') as f:
        return json.load(f)

def save_json(fn, data):
    with open(DATA_DIR + '/' + fn, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"  Saved: {fn}")

fixes = {
    # mock31: Q32 - local minima of f(x)=∫(t²-5t+6)e^t dt
    # f'(x) = (x-2)(x-3)e^x. At x=2: f''(2) < 0 -> LOCAL MAX. At x=3: f''(3) > 0 -> LOCAL MIN.
    # Local minima at x=3 only. Correct should be 1 (index of 'x = 3 only')
    'mock31.json': {32: 1},
    
    # mock31 Q3: LCR circuit resonance.
    # LC = 0.5 × 20×10^-6 = 10^-5. sqrt(LC) = 10^-2.5 = 3.162×10^-3.
    # f0 = 1/(2π × 3.162×10^-3) = 1/0.01987 = 50.3 Hz (NOT 159 Hz).
    # Q factor = ω0L/R = 2π×50.3×0.5/10 = 15.8.
    # Correct should be index 1 ('50.3 Hz, 15.8')
    # Actually: LC = 0.5 × 20µF = 0.5 × 20×10^-6 = 10^-5. 
    # sqrt(10^-5) = 10^-2.5 = 3.162×10^-3. 2π√LC = 0.01987.
    # f0 = 1/0.01987 = 50.33 Hz. Q = ω0L/R = (2π×50.33×0.5)/10 = 15.8
    # -> Correct is index 1 ('50.3 Hz, 15.8')
    # Wait: options are [0='50 Hz, 5', 1='50.3 Hz, 15.8', 2='159 Hz, 5', 3='159 Hz, 15.8']
    # Current correct = 3 ('159 Hz, 15.8') which is wrong.
    # 'mock31.json' already in dict, need to update
    
    # mock39 Q38: lim x->0 x²/(e^x-1-x) = lim x²/(x²/2) = 2. 
    # Options: 0='0', 1='1/2', 2='1', 3='Does not exist'. The correct answer 2 is NOT in options!
    # Explanation acknowledges this and says "typographical inversion, select 1/2". 
    # The actual correct answer is 2 but it's not an option. This is a broken question.
    # The closest "wrong but closest" would be none of these. Leave as is.
    
    # mock09 Q23: Spectrochemical series
    # Correct order: I⁻ < Cl⁻ < F⁻ < H₂O < NH₃ < CO = Option A (index 0). current correct=0. OK!
    
    # mock17 Q41: α^2023 + β^2023. Explanation concludes = 1. correct=0 ('1'). OK!
    
    # mock28 Q17: CO+ bond order. CO has BO=3. CO+ removes one e- from HOMO (5σ, weakly bonding).
    # BO decreases slightly, but commonly considered 2.5. correct=0 ('2.5'). OK but debatable.
    
    # mock20 Q15: Satellite minimum energy. Need to check if explanation gives mgRh/(R+h).
    # E_required = GMm/R - GMm/2(R+h) = GMm[(2R+2h-R)/(2R(R+h))] = GMm(R+2h)/(2R(R+h))
    # ≈ mgh×R/(R+h) for h<<R. Standard formula: minimum energy = mghR/(R+h).
    # Option D = 'mgR(h/(R+h))' = mgRh/(R+h). This is correct. current correct=3. OK!
}

# Special: mock31 has both Q3 and Q32 fixes
mock31_fixes = {3: 1, 32: 1}

# Apply mock31 fixes
print("Applying mock31 fixes...")
data = load_json('mock31.json')
for q in data['questions']:
    qid = q.get('id')
    if qid in mock31_fixes:
        old = q['correct']
        new = mock31_fixes[qid]
        opts = q.get('options', [])
        q['correct'] = new
        print(f"  Q{qid}: {old}('{opts[old] if isinstance(old,int) and old<len(opts) else 'N/A'}') -> {new}('{opts[new]}')")
save_json('mock31.json', data)

# Now apply other single fixes
print()
for fn, qfixes in fixes.items():
    if fn == 'mock31.json':
        continue  # already done
    print(f"Applying {fn} fixes...")
    data = load_json(fn)
    for q in data['questions']:
        qid = q.get('id')
        if qid in qfixes:
            old = q['correct']
            new = qfixes[qid]
            opts = q.get('options', [])
            q['correct'] = new
            print(f"  Q{qid}: {old}('{opts[old] if isinstance(old,int) and old<len(opts) else 'N/A'}') -> {new}('{opts[new]}')")
    save_json(fn, data)

print()
print("Done! All confirmed fixes applied.")
