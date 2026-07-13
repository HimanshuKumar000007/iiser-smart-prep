const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, '../../frontend/src/data/lessons.ts');
const contentPath = path.join(__dirname, '../../frontend/src/data/lessonContent.ts');
const outputPath = path.join(__dirname, '../data/learningCatalog.json');

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Parse lessons.ts using simple regex
const lessonsContent = fs.readFileSync(lessonsPath, 'utf8');
const chapters = {};

// Match block contents of each lesson item in LESSONS_DATA
const lessonItemRegex = /id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*subject:\s*'([^']+)'/g;
let match;
while ((match = lessonItemRegex.exec(lessonsContent)) !== null) {
  const [_, id, title, subject] = match;
  chapters[id] = {
    chapterId: id,
    chapterTitle: title,
    subject: subject,
    topicIds: []
  };
}

// 2. Parse lessonContent.ts using simple regex to get topicIds
const contentText = fs.readFileSync(contentPath, 'utf8');

// We can split the file by chapter blocks:
// e.g. "  bio_cell: {"
const chapterBlocks = contentText.split(/^\s*([a-zA-Z0-9_]+):\s*\{/m);

for (let i = 1; i < chapterBlocks.length; i += 2) {
  const chapterId = chapterBlocks[i];
  const blockContent = chapterBlocks[i + 1] || "";
  
  if (chapters[chapterId]) {
    // Find all topicId lines: topicId: '...'
    const topicRegex = /topicId:\s*'([^']+)'/g;
    let tMatch;
    const topicIds = new Set();
    while ((tMatch = topicRegex.exec(blockContent)) !== null) {
      topicIds.add(tMatch[1]);
    }
    chapters[chapterId].topicIds = Array.from(topicIds);
  }
}

fs.writeFileSync(outputPath, JSON.stringify(chapters, null, 2), 'utf8');
console.log(`Catalog generated successfully with ${Object.keys(chapters).length} chapters at ${outputPath}`);
