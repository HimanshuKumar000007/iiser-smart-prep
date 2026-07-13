const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, './data/learningCatalog.json');
const lessonContentPath = path.join(__dirname, '../frontend/src/data/lessonContent.ts');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const lessonsText = fs.readFileSync(lessonContentPath, 'utf8');

// Parse quizQuestions from lessonContent.ts
// E.g., we split the file by chapterId
const chapterBlocks = lessonsText.split(/chapterId:\s*['"]/);
const chapterQuestions = {};

// Simple stop words
const stopWords = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
  'through', 'during', 'before', 'after', 'above', 'below', 'from', 'up', 'down', 'in', 'out',
  'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where',
  'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just',
  'should', 'would', 'which', 'what', 'who', 'whom', 'this', 'that', 'these', 'those', 'am',
  'has', 'have', 'had', 'having', 'do', 'does', 'did', 'doing', 'its', 'their', 'our', 'your',
  'his', 'her', 'itself', 'themselves', 'ourselves', 'yourselves', 'himself', 'herself',
  'we', 'they', 'you', 'he', 'she', 'it', 'me', 'us', 'them', 'him', 'her', 'i', 'correct',
  'answer', 'option', 'statement', 'question', 'following', 'given', 'find', 'calculate',
  'value', 'determine', 'shows', 'represents', 'figure', 'diagram', 'table', 'structure',
  'process', 'molecule', 'cell', 'energy', 'rate', 'pressure', 'current', 'wave', 'dimension',
  'node', 'function', 'formula', 'called', 'known', 'due', 'hence', 'therefore', 'thus', 'equal',
  'equals', 'constant', 'coefficient', 'index', 'number', 'system', 'particles', 'state', 'gas'
]);

chapterBlocks.forEach((block, index) => {
  if (index === 0) return; // prelude
  const endIdIdx = block.indexOf("'");
  const endIdIdxDouble = block.indexOf('"');
  const endIdx = (endIdIdx !== -1 && (endIdIdxDouble === -1 || endIdIdx < endIdIdxDouble)) ? endIdIdx : endIdIdxDouble;
  if (endIdx === -1) return;
  const chapterId = block.substring(0, endIdx);
  
  // Find all question, options, and explanation text within this block before the next chapterId
  const questionMatches = block.matchAll(/question:\s*['"`]([\s\S]*?)['"`]/g);
  const explanationMatches = block.matchAll(/explanation:\s*['"`]([\s\S]*?)['"`]/g);
  const optionsMatches = block.matchAll(/options:\s*\[([\s\S]*?)\]/g);

  let text = '';
  for (const m of questionMatches) text += ' ' + m[1];
  for (const m of explanationMatches) text += ' ' + m[1];
  for (const m of optionsMatches) text += ' ' + m[1].replace(/['",]/g, ' ');

  if (!chapterQuestions[chapterId]) {
    chapterQuestions[chapterId] = '';
  }
  chapterQuestions[chapterId] += ' ' + text;
});

// For each chapter in catalog, let's extract keywords
const chapterSignatures = {};
Object.keys(catalog).forEach(chId => {
  const chText = (chapterQuestions[chId] || '') + ' ' + catalog[chId].chapterTitle + ' ' + catalog[chId].topicIds.join(' ').replace(/-/g, ' ');
  const cleanWords = chText.toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w));
  
  // Count frequencies
  const freqs = {};
  cleanWords.forEach(w => {
    freqs[w] = (freqs[w] || 0) + 1;
  });
  
  chapterSignatures[chId] = freqs;
});

// Now, let's identify unique terms (strongTerms) vs shared terms (supportingTerms)
// A word is a strongTerm for a chapter if it is in its top frequencies AND:
// - It doesn't appear in other chapters of the same subject at all, or its frequency here is at least 3 times its total frequency in other chapters.
const finalSignatures = {};

Object.keys(catalog).forEach(chId => {
  const subject = catalog[chId].subject;
  const chFreqs = chapterSignatures[chId] || {};
  
  const strongTerms = [];
  const supportingTerms = [];

  Object.keys(chFreqs).forEach(word => {
    const freqInCh = chFreqs[word];
    let freqInOthers = 0;

    Object.keys(catalog).forEach(otherChId => {
      if (otherChId === chId) return;
      if (catalog[otherChId].subject === subject) {
        freqInOthers += (chapterSignatures[otherChId]?.[word] || 0);
      }
    });

    if (freqInOthers === 0) {
      if (freqInCh >= 2) {
        strongTerms.push(word);
      } else {
        supportingTerms.push(word);
      }
    } else {
      const ratio = freqInCh / freqInOthers;
      if (ratio >= 3.0 && freqInCh >= 2) {
        strongTerms.push(word);
      } else {
        supportingTerms.push(word);
      }
    }
  });

  // Let's add some hand-coded strong terms from the chapter and topic titles
  const titleWords = catalog[chId].chapterTitle.toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w));
  
  titleWords.forEach(w => {
    if (!strongTerms.includes(w) && !supportingTerms.includes(w)) {
      strongTerms.push(w);
    }
  });

  catalog[chId].topicIds.forEach(tId => {
    const tWords = tId.replace(/-/g, ' ').split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w));
    tWords.forEach(w => {
      if (!strongTerms.includes(w) && !supportingTerms.includes(w)) {
        strongTerms.push(w);
      }
    });
  });

  finalSignatures[chId] = {
    chapterId: chId,
    chapterTitle: catalog[chId].chapterTitle,
    subject: catalog[chId].subject,
    strongTerms: strongTerms.slice(0, 40), // Top 40 strong terms
    supportingTerms: supportingTerms.slice(0, 60) // Top 60 supporting terms
  };
});

fs.writeFileSync(path.join(__dirname, 'chapterSignatures.json'), JSON.stringify(finalSignatures, null, 2));
console.log(`Generated signatures for ${Object.keys(finalSignatures).length} chapters!`);
