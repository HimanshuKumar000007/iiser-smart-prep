const fs = require('fs');
const path = require('path');

const base = 'https://iisersmartprep.space';
const today = new Date().toISOString().split('T')[0];

const corePages = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/news-and-announcements.html', priority: '0.95', changefreq: 'daily' },
  { loc: '/features.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/ai_tutor.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/smart_notes.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/pyqs/pyq.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/mock_test/full_mock_test_homepage.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/iiser-iat-college-predictor.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/iat-planner-pro.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/contact-us.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/privacy.html', priority: '0.5', changefreq: 'monthly' },
  { loc: '/terms.html', priority: '0.5', changefreq: 'monthly' }
];

const newsDir = path.join(__dirname, 'frontend', 'news');
const newsFiles = fs.readdirSync(newsDir).filter(f => f.endsWith('.html'));

const newsPages = newsFiles.map(f => ({
  loc: '/news/' + f,
  priority: '0.85',
  changefreq: 'weekly'
}));

const allPages = [...corePages, ...newsPages];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n';

allPages.forEach(p => {
  xml += '  <url>\n';
  xml += '    <loc>' + base + p.loc + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <priority>' + p.priority + '</priority>\n';
  xml += '    <changefreq>' + p.changefreq + '</changefreq>\n';
  xml += '  </url>\n\n';
});

xml += '</urlset>\n';

fs.writeFileSync(path.join(__dirname, 'frontend', 'sitemap.xml'), xml);
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);

console.log('Successfully generated clean sitemap with ' + allPages.length + ' total URLs!');
