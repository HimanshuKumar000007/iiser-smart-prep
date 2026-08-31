const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'frontend', 'smart_notes', 'subjects', 'short-notes');

function fixLinks(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixLinks(full);
    } else if (entry.name.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      
      const regex = /href=["']\/smart_notes\/subjects\/(?:physics|chemistry|math)\/(?:unit-\d+-homepage-(?:physics|chemistry|math)|Unit-2-homepage-physics|calculus-homepage|applied-math-homepage)\.html["']/gi;
      if (regex.test(content)) {
        content = content.replace(regex, 'href="/smart_notes/smart_notes_home.html"');
        fs.writeFileSync(full, content, 'utf8');
        console.log('Fixed link in:', path.basename(full));
      }
    }
  }
}

fixLinks(baseDir);
console.log('Finished updating short-notes links.');
