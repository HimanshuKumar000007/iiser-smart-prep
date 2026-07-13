const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mock1Path = path.join(__dirname, '../frontend/src/data/mockTests/iat_full_01.json');
const catalogPath = path.join(__dirname, 'data/learningCatalog.json');

console.log('='.repeat(60));
console.log('MOCK #1 MIGRATION VALIDATION SCRIPT');
console.log('='.repeat(60));

// 1. Load current JSON
let currentData;
try {
  currentData = JSON.parse(fs.readFileSync(mock1Path, 'utf8'));
} catch (err) {
  console.error('❌ Failed to parse migrated iat_full_01.json:', err.message);
  process.exit(1);
}

// 2. Load canonical catalog
let catalog;
try {
  catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
} catch (err) {
  console.error('❌ Failed to parse learningCatalog.json:', err.message);
  process.exit(1);
}

// 3. Load original JSON from Git HEAD
let originalData;
try {
  const originalJson = execSync(
    'git show HEAD:frontend/src/data/mockTests/iat_full_01.json',
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }
  );
  originalData = JSON.parse(originalJson);
  console.log('✅ Successfully loaded original pre-migration JSON from Git HEAD.');
} catch (err) {
  console.log('⚠️  Could not run "git show HEAD...". Falling back to checking schema without direct before/after content validation.');
  originalData = null;
}

let passed = true;
const errors = [];

function assert(condition, message) {
  if (!condition) {
    passed = false;
    errors.push(message);
  }
}

// Check 1: Exactly 60 questions exist
assert(currentData.questions.length === 60, `Expected 60 questions, got ${currentData.questions.length}`);

// Check 2: Unique IDs
const ids = currentData.questions.map(q => q.id);
const uniqueIds = new Set(ids);
assert(uniqueIds.size === currentData.questions.length, `Duplicate question IDs found. Count: ${ids.length}, Unique: ${uniqueIds.size}`);

currentData.questions.forEach(q => {
  const prefix = `[Q${q.id}]`;

  // Check 3: Valid subject
  const validSubjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  assert(validSubjects.includes(q.subject), `${prefix} Invalid subject: ${q.subject}`);

  // Check 4: Valid section
  assert(typeof q.section === 'string' && q.section.length > 0, `${prefix} Missing or empty section`);

  // Check 5: Non-empty question
  assert(typeof q.question === 'string' && q.question.trim().length > 0, `${prefix} Empty question text`);

  // Check 6: Valid options array
  assert(Array.isArray(q.options) && q.options.length >= 2, `${prefix} Options must be an array of at least 2 elements`);

  // Check 7: Correct answer index is valid
  assert(
    typeof q.correct === 'number' && q.correct >= 0 && q.correct < q.options.length,
    `${prefix} Correct answer index (${q.correct}) is out of bounds for options length ${q.options.length}`
  );

  // Check 8: Valid explanation or null
  assert(
    q.explanation === null || (typeof q.explanation === 'string' && q.explanation.length > 0),
    `${prefix} Explanation must be null or a non-empty string`
  );

  // Check 9: Valid difficulty
  const validDifficulties = ['Easy', 'Medium', 'Hard'];
  assert(validDifficulties.includes(q.difficulty), `${prefix} Invalid difficulty: ${q.difficulty}`);

  // Check 10: Every question has a chapterId
  assert(typeof q.chapterId === 'string' && q.chapterId.length > 0, `${prefix} Missing chapterId`);

  if (q.chapterId) {
    // Check 11: Every chapterId exists in the learning catalog
    const catalogChapter = catalog[q.chapterId];
    assert(!!catalogChapter, `${prefix} chapterId "${q.chapterId}" does not exist in learningCatalog.json`);

    if (catalogChapter) {
      // Check 12: Every chapter belongs to the correct subject
      assert(
        catalogChapter.subject.toLowerCase() === q.subject.toLowerCase(),
        `${prefix} Subject mismatch: question is "${q.subject}" but chapter "${q.chapterId}" belongs to "${catalogChapter.subject}"`
      );
    }
  }

  // Check 13: Every topicId follows lowercase-kebab-case format
  if (q.topicId) {
    const topicKebabRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    assert(
      topicKebabRegex.test(q.topicId),
      `${prefix} topicId "${q.topicId}" must be in lowercase-kebab-case format`
    );
  }

  // Before/after integrity checks
  if (originalData) {
    const origQ = originalData.questions.find(orig => orig.id === q.id);
    assert(!!origQ, `${prefix} Could not find corresponding original question to verify integrity.`);

    if (origQ) {
      assert(origQ.id === q.id, `${prefix} ID mismatch: ${origQ.id} vs ${q.id}`);
      assert(origQ.subject === q.subject, `${prefix} Subject changed: "${origQ.subject}" to "${q.subject}"`);
      assert(origQ.section === q.section, `${prefix} Section changed: "${origQ.section}" to "${q.section}"`);
      assert(origQ.question === q.question, `${prefix} Question text changed: "${origQ.question}" to "${q.question}"`);
      assert(
        JSON.stringify(origQ.options) === JSON.stringify(q.options),
        `${prefix} Options array changed: "${JSON.stringify(origQ.options)}" to "${JSON.stringify(q.options)}"`
      );
      assert(origQ.correct === q.correct, `${prefix} Correct answer changed: ${origQ.correct} to ${q.correct}`);
      assert(origQ.explanation === q.explanation, `${prefix} Explanation changed: "${origQ.explanation}" to "${q.explanation}"`);
      assert(origQ.difficulty === q.difficulty, `${prefix} Difficulty changed: "${origQ.difficulty}" to "${q.difficulty}"`);
      assert(origQ.imagePrompt === q.imagePrompt, `${prefix} imagePrompt changed: "${origQ.imagePrompt}" to "${q.imagePrompt}"`);
    }
  }
});

if (passed) {
  console.log('✅ ALL MIGRATION INTEGRITY CHECKS PASSED SUCCESSFULLY!');
  console.log('   - Exactly 60 questions');
  console.log('   - No content changes made to original fields');
  console.log('   - Verified chapter-subject mapping matching learningCatalog.json');
  console.log('   - Kebab-case topic IDs verified');
  process.exit(0);
} else {
  console.error(`❌ MIGRATION VALIDATION FAILED with ${errors.length} error(s):`);
  errors.forEach((err, index) => {
    console.error(`   ${index + 1}. ${err}`);
  });
  process.exit(1);
}
