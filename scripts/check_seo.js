const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, '..', 'frontend');
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');

// Read sitemap URLs if available
let sitemapUrls = new Set();
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const matches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
  matches.forEach(m => {
    sitemapUrls.add(m.replace(/<\/?loc>/g, '').trim());
  });
}

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(frontendDir);
console.log(`\n🔍 Scanning ${htmlFiles.length} HTML files for SEO audit...\n`);

const results = [];

htmlFiles.forEach(filePath => {
  const relPath = path.relative(frontendDir, filePath).replace(/\\/g, '/');
  
  if (relPath.includes('node_modules/') || relPath.includes('dist/')) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const warnings = [];
  const passes = [];

  // 1. Title Tag
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : null;
  if (!title) {
    issues.push('Missing <title> tag');
  } else {
    if (title.length < 30) warnings.push(`Title is short (${title.length} chars, ideal: 50-60)`);
    else if (title.length > 70) warnings.push(`Title is long (${title.length} chars, ideal: 50-60)`);
    else passes.push(`Title (${title.length} chars)`);
  }

  // 2. Meta Description
  const descMatch = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
                    content.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
  const description = descMatch ? descMatch[1].trim() : null;
  const isPrivate = ['login.html', 'signup.html', 'admin.html', 'forgot-password.html', 'reset-password.html', 'onboarding.html', 'pay.html'].some(p => relPath.includes(p));

  if (!description) {
    if (isPrivate) {
      warnings.push('No meta description (Utility/Auth page)');
    } else {
      issues.push('Missing <meta name="description">');
    }
  } else {
    if (description.length < 50) warnings.push(`Meta description too short (${description.length} chars, ideal: 120-160)`);
    else if (description.length > 165) warnings.push(`Meta description too long (${description.length} chars, ideal: 120-160)`);
    else passes.push(`Meta Description (${description.length} chars)`);
  }

  // 3. Canonical Tag
  const canonicalMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["'][^>]*>/i) ||
                         content.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["'][^>]*>/i);
  if (!canonicalMatch) {
    warnings.push('Missing <link rel="canonical">');
  } else {
    passes.push('Canonical tag');
  }

  // 4. Open Graph Tags
  const ogTitle = content.match(/<meta[^>]+property=["']og:title["']/i);
  const ogDesc = content.match(/<meta[^>]+property=["']og:description["']/i);
  const ogImage = content.match(/<meta[^>]+property=["']og:image["']/i);
  if (!ogTitle || !ogDesc || !ogImage) {
    const missing = [];
    if (!ogTitle) missing.push('og:title');
    if (!ogDesc) missing.push('og:description');
    if (!ogImage) missing.push('og:image');
    warnings.push(`Missing OpenGraph tags: ${missing.join(', ')}`);
  } else {
    passes.push('Open Graph tags');
  }

  // 5. Headings (H1)
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    warnings.push('No <h1> heading found');
  } else if (h1Matches.length > 1) {
    warnings.push(`Multiple <h1> tags (${h1Matches.length})`);
  } else {
    passes.push('1 <h1> heading');
  }

  // 6. Robots Tag
  const robotsMatch = content.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : null;
  if (robots && robots.includes('noindex')) {
    passes.push('Robots: noindex');
  }

  // 7. Structured Data (Schema.org JSON-LD)
  const jsonLdMatch = content.match(/<script[^>]+type=["']application\/ld\+json["']/gi);
  if (jsonLdMatch) {
    passes.push(`Structured Data (${jsonLdMatch.length})`);
  }

  // 8. Image Alt Tags
  const imgTags = content.match(/<img[^>]*>/gi) || [];
  let missingAlt = 0;
  imgTags.forEach(img => {
    if (!img.includes('alt=') || /alt=["']\s*["']/.test(img)) {
      missingAlt++;
    }
  });
  if (missingAlt > 0) {
    warnings.push(`${missingAlt} image(s) missing alt text`);
  }

  const score = Math.max(0, 100 - (issues.length * 25) - (warnings.length * 10));

  results.push({
    file: relPath,
    title: title || 'N/A',
    issues,
    warnings,
    passes,
    score
  });
});

// Sort by score ascending (worst first)
results.sort((a, b) => a.score - b.score);

let perfect = 0, warning = 0, critical = 0;

console.log('='.repeat(85));
console.log('                       SEO AUDIT SUMMARY BY PAGE');
console.log('='.repeat(85));

results.forEach(r => {
  let badge = '🟢 [90-100]';
  if (r.score < 60) {
    badge = '🔴 [< 60] ';
    critical++;
  } else if (r.score < 90) {
    badge = '🟡 [60-89]';
    warning++;
  } else {
    perfect++;
  }

  console.log(`\n${badge} Score: ${r.score} | File: ${r.file}`);
  console.log(`   Title: ${r.title.substring(0, 75)}${r.title.length > 75 ? '...' : ''}`);
  
  if (r.issues.length > 0) {
    console.log(`   🚨 Critical: ${r.issues.join(' | ')}`);
  }
  if (r.warnings.length > 0) {
    console.log(`   ⚠️  Warnings: ${r.warnings.join(' | ')}`);
  }
  if (r.passes.length > 0) {
    console.log(`   ✅ Passed: ${r.passes.join(', ')}`);
  }
});

console.log('\n' + '='.repeat(85));
console.log(`TOTAL PAGES AUDITED: ${results.length}`);
console.log(`🟢 Good (>= 90): ${perfect} pages`);
console.log(`🟡 Needs Review (60-89): ${warning} pages`);
console.log(`🔴 Critical Issues (< 60): ${critical} pages`);
console.log('='.repeat(85));
