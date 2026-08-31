const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, '..', 'frontend');

const replacements = [
  { from: /href=["']\/contact\.html["']/g, to: 'href="/contact-us.html"' },
  { from: /href=["']\/iat-planner-pro\/index\.html["']/g, to: 'href="/iat-planner-pro.html"' },
  { from: /href=["']\/mock_test\/full_mock_test\.html["']/g, to: 'href="/mock_test/full_mock_test_homepage.html"' },
  { from: /href=["']\/mock_test\/biology_sectional\.html["']/g, to: 'href="/mock_test/quick_mock_homepage.html"' },
  { from: /href=["']\/news\/iat-vs-nest\.html["']/g, to: 'href="/news/IAT-vs-NEST-which-exam-to-target.html"' },
  { from: /href=["']\/pyqs\/full_mock_test_homepage\.html["']/g, to: 'href="/mock_test/full_mock_test_homepage.html"' },
  { from: /src=["']\/assets\/logo\.svg["']/g, to: 'src="/favicon.svg"' },
  { from: /href=["']\/rank-predictor\/?["']/g, to: 'href="/iiser-iat-college-predictor.html"' },
  { from: /href=["']\/syllabus\/?["']/g, to: 'href="/news/iat-syllabus-2026-checklist.html"' },
  { from: /href=["']\/pricing\/?["']/g, to: 'href="/#pricing"' },
  { from: /href=["']\/terms\/?["']/g, to: 'href="/terms.html"' },
  { from: /href=["']\/privacy\/?["']/g, to: 'href="/privacy.html"' },
  { from: /href=["']\/smart_notes\/subjects\/biology\/biology-homepage\.html["']/g, to: 'href="/smart_notes/smart_notes_home.html"' },
  { from: /href=["']\/smart_notes_home\.html["']/g, to: 'href="/smart_notes/smart_notes_home.html"' }
];

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
        processDir(full);
      }
    } else if (entry.name.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      let modified = false;
      for (const r of replacements) {
        if (r.from.test(content)) {
          content = content.replace(r.from, r.to);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Fixed links in:', path.relative(frontendDir, full));
      }
    }
  }
}

processDir(frontendDir);
console.log('Finished updating broken links.');
