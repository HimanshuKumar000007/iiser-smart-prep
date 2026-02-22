const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'frontend', 'news', 'IAT-vs-NEST-which-exam-to-target.html');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace NEST General Section Card
const generalSectionRegex = /<!-- NEST General Section -->\s*<a href="[^"]+" class="hub-card">\s*<span class="hub-badge[^>]+>[^<]+<\/span>\s*<div class="hub-icon">🧩<\/div>\s*<h3>General Section Mastery<\/h3>\s*<p>Crack the unique General Aptitude section with logical reasoning, data interpretation, and\s*comprehension strategies\.<\/p>/;

const physicsCard = `<!-- NEST General Section -->
                <a href="/news/best-book-for-physics--for-iat.html" class="hub-card">
                    <span class="hub-badge badge-new">Physics</span>
                    <div class="hub-icon">🧩</div>
                    <h3>Physics Mastery for IAT</h3>
                    <p>Crack the Physics section with the best books, strategy, and daily problem solving routines.</p>`;

content = content.replace(generalSectionRegex, physicsCard);

// Replace Institution Comparison Card
const comparisonRegex = /<!-- Institution Comparison -->\s*<a href="[^"]+" class="hub-card">\s*<span class="hub-badge[^>]+>[^<]+<\/span>\s*<div class="hub-icon">🏛️<\/div>\s*<h3>Institution Deep Dive<\/h3>\s*<p>Compare research facilities, faculty, campus life, and placement records of IISERs vs NISER\/CEBS.\s*<\/p>/;

const strategyCard = `<!-- Institution Comparison -->
                <a href="/news/how-to-crack-iat-in-3-months.html" class="hub-card">
                    <span class="hub-badge badge-free">Strategy</span>
                    <div class="hub-icon">🏛️</div>
                    <h3>3-Month Master Plan</h3>
                    <p>Get a step-by-step verified 3-month preparation strategy designed specifically to crack the IAT.</p>`;

content = content.replace(comparisonRegex, strategyCard);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated Knowledge Hub cards in IAT-vs-NEST.html');
