const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, "../frontend/mock_test/subject-wise-quick-mock-test");
const STAGING_DIR = path.join(__dirname, "output/quick-mocks-migrated");
const MAPPING_FILE = path.join(__dirname, "data/quickMockChapterMappings.json");
const CATALOG_FILE = path.join(__dirname, "../backend/data/learningCatalog.json");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function runMigration() {
  console.log("=== Quick Mock Data Migration Script ===");

  if (!fs.existsSync(MAPPING_FILE)) {
    console.error("Mapping registry file does not exist: " + MAPPING_FILE);
    process.exit(1);
  }
  if (!fs.existsSync(CATALOG_FILE)) {
    console.error("Learning catalog file does not exist: " + CATALOG_FILE);
    process.exit(1);
  }

  const mappings = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
  const learningCatalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf-8'));

  ensureDir(STAGING_DIR);

  const catalogOutput = {
    physics: [],
    chemistry: [],
    biology: [],
    mathematics: []
  };

  const questionsOutput = {};
  const inventoryReport = {
    totalSourceFiles: 0,
    totalSourceQuestions: 0,
    totalValidMocks: 0,
    totalInvalidMocks: 0,
    subjects: {
      physics: { totalMocks: 0, validMocks: 0, incompleteMocks: 0, questionsCount: 0 },
      chemistry: { totalMocks: 0, validMocks: 0, incompleteMocks: 0, questionsCount: 0 },
      biology: { totalMocks: 0, validMocks: 0, incompleteMocks: 0, questionsCount: 0 },
      mathematics: { totalMocks: 0, validMocks: 0, incompleteMocks: 0, questionsCount: 0 }
    },
    chaptersDetail: {}
  };

  // Group learning catalog chapters by subject for easy lookup
  const catalogChaptersBySubject = {
    physics: [],
    chemistry: [],
    biology: [],
    mathematics: []
  };

  Object.keys(learningCatalog).forEach(chapterId => {
    const chapter = learningCatalog[chapterId];
    const subKey = chapter.subject.toLowerCase();
    if (catalogChaptersBySubject[subKey]) {
      catalogChaptersBySubject[subKey].push({
        chapterId,
        chapterTitle: chapter.chapterTitle
      });
    }
  });

  // Traverse subjects
  const subjects = ['physics', 'chemistry', 'biology', 'mathematics'];
  subjects.forEach(subject => {
    const subjectMappings = mappings[subject] || {};
    const subjectDir = path.join(SOURCE_DIR, subject);

    // Get list of folders inside subject directory
    let folderNames = [];
    if (fs.existsSync(subjectDir)) {
      folderNames = fs.readdirSync(subjectDir).filter(f => 
        fs.statSync(path.join(subjectDir, f)).isDirectory()
      );
    }

    // Map of chapterId to active mock mappings resolved from files
    const chapterResolvedMocks = {};

    folderNames.forEach(folderName => {
      const chapterId = subjectMappings[folderName];
      const folderPath = path.join(subjectDir, folderName);

      if (!chapterId || chapterId === "MAPPING_REQUIRED") {
        console.warn(`[WARNING] Unresolved or missing mapping for folder: ${subject}/${folderName}`);
        return;
      }

      chapterResolvedMocks[chapterId] = [];

      // Look for mocks 1 to 4 in this folder
      for (let v = 1; v <= 4; v++) {
        const fileName = `mock-${v}.json`;
        const filePath = path.join(folderPath, fileName);
        const variantStr = String(v).padStart(2, '0');
        const mockId = `qm_${chapterId}_${variantStr}`;

        if (!fs.existsSync(filePath)) {
          // Mock not found on disk
          chapterResolvedMocks[chapterId].push({
            id: mockId,
            variant: v,
            status: "CONTENT_COMING_SOON",
            questionCount: 0,
            durationMinutes: 30
          });
          inventoryReport.subjects[subject].incompleteMocks++;
          continue;
        }

        inventoryReport.totalSourceFiles++;

        let rawContent;
        try {
          rawContent = fs.readFileSync(filePath, 'utf-8');
        } catch (e) {
          console.error(`[ERROR] Failed to read mock file: ${filePath}`);
          chapterResolvedMocks[chapterId].push({
            id: mockId,
            variant: v,
            status: "CONTENT_COMING_SOON",
            questionCount: 0,
            durationMinutes: 30
          });
          inventoryReport.subjects[subject].incompleteMocks++;
          inventoryReport.totalInvalidMocks++;
          continue;
        }

        if (!rawContent.trim()) {
          // Empty file
          chapterResolvedMocks[chapterId].push({
            id: mockId,
            variant: v,
            status: "CONTENT_COMING_SOON",
            questionCount: 0,
            durationMinutes: 30
          });
          inventoryReport.subjects[subject].incompleteMocks++;
          continue;
        }

        let parsedData;
        try {
          parsedData = JSON.parse(rawContent);
        } catch (err) {
          console.error(`[ERROR] JSON parse failed for file: ${filePath} | ${err.message}`);
          chapterResolvedMocks[chapterId].push({
            id: mockId,
            variant: v,
            status: "CONTENT_COMING_SOON",
            questionCount: 0,
            durationMinutes: 30
          });
          inventoryReport.subjects[subject].incompleteMocks++;
          inventoryReport.totalInvalidMocks++;
          continue;
        }

        const questions = parsedData.questions || [];
        inventoryReport.totalSourceQuestions += questions.length;
        inventoryReport.subjects[subject].questionsCount += questions.length;

        if (questions.length < 16) {
          // Less than 16 questions
          console.warn(`[WARNING] Mock file has fewer than 16 questions: ${filePath} (${questions.length} questions)`);
          chapterResolvedMocks[chapterId].push({
            id: mockId,
            variant: v,
            status: "CONTENT_COMING_SOON",
            questionCount: questions.length,
            durationMinutes: 30
          });
          inventoryReport.subjects[subject].incompleteMocks++;
          continue;
        }

        // Available! Slice the first 16 questions
        const slicedQuestions = questions.slice(0, 16);
        const normalizedQuestions = slicedQuestions.map((q, idx) => {
          const qNum = String(idx + 1).padStart(2, '0');
          const canonicalQId = `qm_${chapterId}_${variantStr}_q${qNum}`;

          return {
            id: canonicalQId,
            sourceId: q.id !== undefined ? q.id : (idx + 1),
            subject: q.subject || (subject.charAt(0).toUpperCase() + subject.slice(1)),
            question: q.question,
            options: q.options || [],
            correct: q.correct,
            explanation: q.explanation !== undefined ? q.explanation : null,
            difficulty: q.difficulty || null,
            imagePrompt: q.imagePrompt !== undefined ? q.imagePrompt : null
          };
        });

        // Add to questions output map
        questionsOutput[mockId] = normalizedQuestions;

        chapterResolvedMocks[chapterId].push({
          id: mockId,
          variant: v,
          status: "AVAILABLE",
          questionCount: 16,
          durationMinutes: 30
        });

        inventoryReport.subjects[subject].validMocks++;
        inventoryReport.totalValidMocks++;
      }
      
      inventoryReport.subjects[subject].totalMocks += 4;
    });

    // Populate the full catalog for this subject incorporating learningCatalog chapters
    const subjectChapters = catalogChaptersBySubject[subject];
    subjectChapters.forEach(chapter => {
      const resolved = chapterResolvedMocks[chapter.chapterId];
      let mocksList = [];

      if (resolved) {
        mocksList = resolved;
      } else {
        // Not in mappings/folders: generate default CONTENT_COMING_SOON slots
        for (let v = 1; v <= 4; v++) {
          const variantStr = String(v).padStart(2, '0');
          mocksList.push({
            id: `qm_${chapter.chapterId}_${variantStr}`,
            variant: v,
            status: "CONTENT_COMING_SOON",
            questionCount: 0,
            durationMinutes: 30
          });
        }
      }

      catalogOutput[subject].push({
        chapterId: chapter.chapterId,
        chapterTitle: chapter.chapterTitle,
        availableQuestionCount: mocksList.reduce((acc, m) => acc + (m.status === 'AVAILABLE' ? m.questionCount : 0), 0),
        mocks: mocksList
      });

      inventoryReport.chaptersDetail[chapter.chapterId] = {
        chapterTitle: chapter.chapterTitle,
        subject,
        mocks: mocksList.map(m => ({ variant: m.variant, status: m.status, questionCount: m.questionCount }))
      };
    });
  });

  // Write files
  const catalogStagedPath = path.join(STAGING_DIR, "quickMockCatalog.json");
  const questionsStagedPath = path.join(STAGING_DIR, "quickMockQuestions.json");
  const reportPath = path.join(STAGING_DIR, "quick-mock-inventory.json");

  fs.writeFileSync(catalogStagedPath, JSON.stringify(catalogOutput, null, 2));
  fs.writeFileSync(questionsStagedPath, JSON.stringify(questionsOutput, null, 2));
  fs.writeFileSync(reportPath, JSON.stringify(inventoryReport, null, 2));

  console.log(`\nMigration completed successfully!`);
  console.log(`Staged Catalog written to: ${catalogStagedPath}`);
  console.log(`Staged Questions database written to: ${questionsStagedPath}`);
  console.log(`Inventory report written to: ${reportPath}`);
}

runMigration();
