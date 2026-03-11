import re

with open('iiser-iat-formula-sheet.html', 'r', encoding='utf-8') as f:
    text = f.read()

def repl(m):
    card = m.group(1)
    inner = m.group(2)
    title = m.group(3)
    id_val = ''
    t_lower = title.lower()
    
    if 'mechanics' in t_lower: id_val = 'mechanics'
    elif 'electrostatics' in t_lower: id_val = 'electrostatics'
    elif 'optics' in t_lower: id_val = 'optics'
    elif 'organic' in t_lower: id_val = 'organic'
    elif 'calculus' in t_lower: id_val = 'calculus'
    elif 'probability' in t_lower: id_val = 'probability'
    elif 'genetics' in t_lower: id_val = 'genetics'
    elif 'physiology' in t_lower: id_val = 'physiology'
    
    if id_val and 'id=' not in card:
        card = card.replace('class=\"formula-card', f'id=\"{id_val}\" class=\"formula-card')
        
    return card + inner + '<div class=\"card-title\">' + title + '</div>'

out = re.sub(r'(<div class=\"formula-card[^\"]*\"[^>]*>)(.*?<div class=\"card-title\">)(.*?)</div>', repl, text, flags=re.DOTALL)

with open('iiser-iat-formula-sheet.html', 'w', encoding='utf-8') as f:
    f.write(out)

print("Done")
