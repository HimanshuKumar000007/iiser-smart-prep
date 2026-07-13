const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const STAGING_DIR = path.join(__dirname, "output/quick-mocks-migrated");
const PROD_DIR = path.join(__dirname, "../backend/data");
const CATALOG_FILE = path.join(__dirname, "../backend/data/learningCatalog.json");

function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function runValidation() {
  console.log("=== Quick Mock Migration Validation Script ===");

  const catalogStagedPath = path.join(STAGING_DIR, "quickMockCatalog.json");
  const questionsStagedPath = path.join(STAGING_DIR, "quickMockQuestions.json");

  if (!fs.existsSync(catalogStagedPath) || !fs.existsSync(questionsStagedPath)) {
    console.error("[FAIL] Staging files do not exist. Please run migration first.");
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(catalogStagedPath, 'utf-8'));
  const questions = JSON.parse(fs.readFileSync(questionsStagedPath, 'utf-8'));
  const learningCatalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf-8'));

  let pass = true;

  // 1. Validate every available mock has exactly 16 questions
  console.log("Rule 1: Verify question counts for available mocks...");
  Object.keys(questions).forEach(mockId => {
    const mockQs = questions[mockId];
    if (mockQs.length !== 16) {
      console.error(`[FAIL] Mock ${mockId} has ${mockQs.length} questions, expected exactly 16.`);
      pass = false;
    }
  });

  // 2. Validate question schemas (id pattern, options count, valid correct indices)
  console.log("Rule 2: Verify question schema fields...");
  Object.keys(questions).forEach(mockId => {
    const mockQs = questions[mockId];
    mockQs.forEach((q, idx) => {
      // Check ID pattern
      const expectedIdPattern = new RegExp(`^qm_[a-zA-Z0-9_]+_\\d{2}_q\\d{2}$`);
      if (!expectedIdPattern.test(q.id)) {
        console.error(`[FAIL] Question ID format mismatch for ID: ${q.id}`);
        pass = false;
      }

      // Check option count
      if (!Array.isArray(q.options) || q.options.length < 2) {
        console.error(`[FAIL] Question ${q.id} options is not a valid array.`);
        pass = false;
      }

      // Check correct answer bounds
      if (q.correct === undefined || q.correct === null || q.correct < 0 || q.correct >= q.options.length) {
        console.error(`[FAIL] Question ${q.id} correct answer index '${q.correct}' is out of bounds for options length ${q.options.length}`);
        pass = false;
      }

      // Check missing explanations are preserved as null
      if (q.explanation === undefined) {
        console.error(`[FAIL] Question ${q.id} explanation is undefined.`);
        pass = false;
      }
    });
  });

  // 3. Verify chapter IDs exist in learningCatalog.json
  console.log("Rule 3: Verify chapter mapping identifiers exist in learning catalog...");
  const subjects = ['physics', 'chemistry', 'biology', 'mathematics'];
  subjects.forEach(subject => {
    const chapterEntries = catalog[subject] || [];
    chapterEntries.forEach(chap => {
      if (!learningCatalog[chap.chapterId]) {
        console.error(`[FAIL] Chapter ID '${chap.chapterId}' does not exist in canonical learningCatalog.json`);
        pass = false;
      }
    });
  });

  // 4. Verify catalog variants structures (exactly 4 variants per chapter)
  console.log("Rule 4: Verify catalog mock variants formatting...");
  subjects.forEach(subject => {
    const chapterEntries = catalog[subject] || [];
    chapterEntries.forEach(chap => {
      if (!Array.isArray(chap.mocks) || chap.mocks.length !== 4) {
        console.error(`[FAIL] Chapter ${chap.chapterId} must contain exactly 4 mock slots.`);
        pass = false;
      }
      chap.mocks.forEach((mock, index) => {
        const expectedVariant = index + 1;
        if (mock.variant !== expectedVariant) {
          console.error(`[FAIL] Chapter ${chap.chapterId} mock index ${index} variant field is ${mock.variant}, expected ${expectedVariant}`);
          pass = false;
        }
        if (!['AVAILABLE', 'CONTENT_COMING_SOON', 'INVALID_DATA'].includes(mock.status)) {
          console.error(`[FAIL] Chapter ${chap.chapterId} mock variant ${mock.variant} status '${mock.status}' is invalid`);
          pass = false;
        }
      });
    });
  });

  // 5. Verify determinism (running twice produces identical output hashes)
  console.log("Rule 5: Verify migration determinism...");
  const hashCatalog1 = getFileHash(catalogStagedPath);
  const hashQuestions1 = getFileHash(questionsStagedPath);

  try {
    console.log(" -> Re-running migration script...");
    execSync(`node "${path.join(__dirname, 'migrateQuickMockData.js')}"`, { stdio: 'pipe' });
  } catch (err) {
    console.error(`[FAIL] Determinism check migration execution failed: ${err.message}`);
    pass = false;
  }

  const hashCatalog2 = getFileHash(catalogStagedPath);
  const hashQuestions2 = getFileHash(questionsStagedPath);

  if (hashCatalog1 !== hashCatalog2) {
    console.error("[FAIL] Catalog output is not deterministic. File hash changed on re-run.");
    pass = false;
  }
  if (hashQuestions1 !== hashQuestions2) {
    console.error("[FAIL] Questions output is not deterministic. File hash changed on re-run.");
    pass = false;
  }

  if (pass) {
    console.log("\n[SUCCESS] All migration validation checks passed!");
    
    // Promote staged outputs to production backend/data directory
    console.log("Promoting validated staging outputs to production backend/data...");
    const prodCatalogPath = path.join(PROD_DIR, "quickMockCatalog.json");
    const prodQuestionsPath = path.join(PROD_DIR, "quickMockQuestions.json");

    fs.copyFileSync(catalogStagedPath, prodCatalogPath);
    fs.copyFileSync(questionsStagedPath, prodQuestionsPath);

    console.log(` -> Promoted catalog to: ${prodCatalogPath}`);
    console.log(` -> Promoted questions to: ${prodQuestionsPath}`);
    process.exit(0);
  } else {
    console.error("\n[FAIL] One or more validation checks failed. Staging files not promoted to production.");
    process.exit(1);
  }
}

runValidation();
