const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, '..', 'frontend');
const htmlFiles = [];

function findHtml(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') findHtml(full);
    } else if (f.endsWith('.html')) {
      htmlFiles.push(full);
    }
  });
}
findHtml(frontendDir);

const broken = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);

  const regex = /(?:href|src)=["']([^"'#?]+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const link = match[1].trim();
    if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('data:') || link.startsWith('javascript:')) {
      continue;
    }
    let resolved;
    if (link.startsWith('/')) {
      resolved = path.join(frontendDir, link.substring(1));
    } else {
      resolved = path.join(dir, link);
    }
    if (!fs.existsSync(resolved) && !fs.existsSync(resolved + '.html') && !fs.existsSync(path.join(resolved, 'index.html'))) {
      if (!link.startsWith('/api/') && !link.includes('${')) {
        broken.push({
          file: path.relative(frontendDir, file).replace(/\\/g, '/'),
          link: link
        });
      }
    }
  }
});

const grouped = {};
broken.forEach(b => {
  if (!grouped[b.link]) grouped[b.link] = [];
  grouped[b.link].push(b.file);
});

console.log('=== BROKEN LINKS AUDIT ===');
console.log('Total HTML files scanned:', htmlFiles.length);
console.log('Unique broken link targets:', Object.keys(grouped).length);
console.log('Total broken link instances:', broken.length);
console.log('\nBroken Target Breakdown:');
for (const [target, files] of Object.entries(grouped)) {
  console.log(`\n❌ Target: "${target}" (found in ${files.length} files)`);
  files.slice(0, 3).forEach(f => console.log(`   - ${f}`));
  if (files.length > 3) console.log(`   ...and ${files.length - 3} more`);
}
