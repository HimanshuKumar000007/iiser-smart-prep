const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'mock01_source.txt');
const outputPath = path.join(__dirname, '../frontend/mock_test/data/mock01.json');

const content = fs.readFileSync(sourcePath, 'utf8');
const lines = content.split(/\r?\n/);

const questions = [];
let currentSubject = 'Physics';
let currentSection = 'A';
let currentQuestion = null;
let captureMode = 'scanning'; // 'scanning', 'question', 'solution'
let solutionBuffer = [];
let questionBuffer = [];
let preQuestionBuffer = [];

// Passage Handling
let activePassage = null; // { text: "...", endId: 12 }

const sectionMap = {
    'PHYSICS': { subject: 'Physics', section: 'A' },
    'CHEMISTRY': { subject: 'Chemistry', section: 'B' },
    'MATHEMATICS': { subject: 'Mathematics', section: 'C' },
    'BIOLOGY': { subject: 'Biology', section: 'D' }
};

function saveQuestion() {
    if (currentQuestion) {
        // Finalize explanation
        if (solutionBuffer.length > 0) {
            let explanation = solutionBuffer.join('<br>').trim();
            // Bold standard headers
            explanation = explanation.replace(/(Step \d+:?)/g, '<b>$1</b>');
            explanation = explanation.replace(/(Solution:)/g, '<b>$1</b>');
            currentQuestion.explanation = explanation;
        }

        // Finalize question text
        if (questionBuffer.length > 0) {
            let qText = questionBuffer.join(' ').trim();

            // Prepend passage if active and relevant
            if (activePassage && currentQuestion.id <= activePassage.endId) {
                qText = `<b>Passage:</b><br>${activePassage.text}<br><br>${qText}`;
            }

            currentQuestion.question = qText;

            // Clear passage if expired
            // Actually, we don't clear it here because it might apply to the NEXT question too (e.g. 11 then 12).
            // We only replace it when a NEW passage is found.
            // But we should check if current question > endId to stop using it?
            // Yes, strictly speaking.
        }

        const ansMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
        if (typeof currentQuestion.correct === 'string') {
            currentQuestion.correct = ansMap[currentQuestion.correct.trim()] || 0;
        }

        questions.push(currentQuestion);
    }
}

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Detect Section
    if (line.startsWith('## SECTION')) {
        const match = line.match(/SECTION ([A-Z]): ([A-Z]+)/);
        if (match) {
            const sectionName = match[2];
            if (sectionMap[sectionName]) {
                currentSubject = sectionMap[sectionName].subject;
                currentSection = sectionMap[sectionName].section;
            }
        }
        continue;
    }

    // Detect Question Start
    if (line.startsWith('**Question')) {
        saveQuestion(); // Save previous

        // Process pre-question buffer for Passages
        const preText = preQuestionBuffer.join('\n');
        const passageMatch = preText.match(/\*\*Passage for Questions (\d+)-(\d+):\*\*\s*([\s\S]*)/);
        if (passageMatch) {
            activePassage = {
                endId: parseInt(passageMatch[2]),
                text: passageMatch[3].trim().replace(/\n/g, '<br>')
            };
        }
        preQuestionBuffer = []; // Clear buffer

        const idMatch = line.match(/\*\*Question (\d+)/);
        const id = idMatch ? parseInt(idMatch[1]) : questions.length + 1;

        let difficulty = 'Medium';
        if (line.includes('[Easy')) difficulty = 'Easy';
        if (line.includes('[Hard')) difficulty = 'Hard';

        currentQuestion = {
            id: id,
            subject: currentSubject,
            section: currentSection,
            question: '',
            options: [],
            correct: 0,
            explanation: '',
            difficulty: difficulty,
            imagePrompt: null
        };
        captureMode = 'question';
        questionBuffer = [];
        solutionBuffer = [];
        continue;
    }

    if (!currentQuestion && captureMode !== 'question' && captureMode !== 'solution') {
        // We are scanning between questions
        preQuestionBuffer.push(line);
        continue;
    }

    // Detect Answer
    if (line.startsWith('**Answer:')) {
        const match = line.match(/\*\*Answer: ([A-D])/);
        if (match) {
            currentQuestion.correct = match[1];
        }
        captureMode = 'scanning'; // Done with question body, looking for solution/next
        continue;
    }

    // Detect Solution
    if (line.startsWith('**Solution:**')) {
        captureMode = 'solution';
        continue;
    }

    // Detect Options
    // Strict A) check to avoid false positives in text
    if (line.match(/^[A-D]\) /)) {
        const optText = line.substring(3).trim();
        currentQuestion.options.push(optText);
        // Note: we stay in 'question' mode implicitly or just keep capturing until Answer
        continue;
    }

    // Capture Loop
    if (captureMode === 'question') {
        // Filter out metadata lines if they slipped in
        if (!line.startsWith('**Topic') && !line.startsWith('---')) {
            questionBuffer.push(line);
        }
    } else if (captureMode === 'solution') {
        if (!line.startsWith('---')) {
            solutionBuffer.push(line);
        }
    } else if (captureMode === 'scanning') {
        preQuestionBuffer.push(line);
    }
}

// Save last
saveQuestion();

const finalJson = {
    testId: "IAT_FULL_01",
    duration: 180,
    totalMarks: 240,
    questions: questions
};

fs.writeFileSync(outputPath, JSON.stringify(finalJson, null, 4));
console.log(`Generated ${questions.length} questions.`);
