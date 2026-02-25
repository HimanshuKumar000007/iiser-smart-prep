import json

with open('mock15.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for q in data.get('questions', []):
    if q['id'] == 9:
        q['correct'] = 0
    elif q['id'] == 35:
        q['options'][1] = "5\u221a2"
        if "10" in q['explanation']:
            q['explanation'] += "<br><br><b>Note:</b> 10/\u221a2 is equivalent to 5\u221a2 (rationalized form)."
    elif q['id'] == 6:
        if "KE per unit mass" not in q['explanation']:
            q['explanation'] = "<strong>IISER Logic Derivation:</strong> For an orbital system, KE per unit mass = GM/(2r) and PE per unit mass = -GM/r. Therefore, KE = -(1/2) PE.<br><br>" + q['explanation']
    elif q['id'] == 20:
        if "ionic (carbocation) pathway" not in q['explanation']:
            q['explanation'] = "<strong>Mechanism Reasoning:</strong> In absence of peroxide, HBr adds via ionic (carbocation) pathway &rarr; Markovnikov product.<br><br>" + q['explanation']

with open('mock15.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

print("Mock 15 patching complete.")
