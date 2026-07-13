const fs = require('fs');
const path = require('path');

const mock2Path = path.join(__dirname, '../frontend/src/data/mockTests/iat_full_02.json');
const catalogPath = path.join(__dirname, 'data/learningCatalog.json');

console.log('='.repeat(60));
console.log('MOCK #2 MIGRATION VALIDATION SCRIPT');
console.log('='.repeat(60));

// 1. Load current JSON
let currentData;
try {
  currentData = JSON.parse(fs.readFileSync(mock2Path, 'utf8'));
} catch (err) {
  console.error('❌ Failed to parse migrated iat_full_02.json:', err.message);
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
  const expectedSections = {
    'Physics': 'A',
    'Chemistry': 'B',
    'Mathematics': 'C',
    'Biology': 'D'
  };
  assert(q.section === expectedSections[q.subject], `${prefix} Section "${q.section}" does not match subject "${q.subject}" (expected "${expectedSections[q.subject]}")`);

  // Check 5: Non-empty question
  assert(typeof q.question === 'string' && q.question.trim().length > 0, `${prefix} Empty question text`);

  // Check 6: Valid options array
  assert(Array.isArray(q.options) && q.options.length >= 2, `${prefix} Options must be an array of at least 2 elements`);

  // Check 7: Correct answer index is valid
  assert(
    typeof q.correct === 'number' && q.correct >= 0 && q.correct < q.options.length,
    `${prefix} Correct answer index (${q.correct}) is out of bounds for options length ${q.options.length}`
  );

  // Check 8: Valid explanation or null/string
  assert(
    q.explanation === null || (typeof q.explanation === 'string' && q.explanation.length > 0),
    `${prefix} Explanation must be null or a non-empty string`
  );

  // Check 9: Valid difficulty (allow undefined since some original questions might omit it)
  const validDifficulties = ['Easy', 'Medium', 'Hard'];
  if (q.difficulty !== undefined) {
    assert(validDifficulties.includes(q.difficulty), `${prefix} Invalid difficulty: ${q.difficulty}`);
  }

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
});

if (passed) {
  console.log('✅ ALL MOCK #2 MIGRATION INTEGRITY CHECKS PASSED SUCCESSFULLY!');
  console.log('   - Exactly 60 questions');
  console.log('   - Subject-section alignment verified');
  console.log('   - Verified chapter-subject mapping matching learningCatalog.json');
  console.log('   - Kebab-case topic IDs verified');
  process.exit(0);
} else {
  console.error(`❌ MOCK #2 MIGRATION VALIDATION FAILED with ${errors.length} error(s):`);
  errors.forEach((err, index) => {
    console.error(`   ${index + 1}. ${err}`);
  });
  process.exit(1);
}
