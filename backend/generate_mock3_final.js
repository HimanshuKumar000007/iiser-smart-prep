const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, 'raw_mock3_final.txt');
const rawText = fs.readFileSync(rawPath, 'utf8');

const output = {
    testId: "IAT_FULL_03",
    duration: 180,
    totalMarks: 240,
    questions: []
};

// Helper: Map Letter to Index
const letterToIndex = (L) => {
    const map = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    if (!L) return 0;
    return map[L.trim().toUpperCase()[0]] || 0;
};

// 1. SPLIT INTO PART 1 (Questions) and PART 2 (Teacher Version)
const splitMarker = "TEACHER VERSION";
const parts = rawText.split(splitMarker);
const part1 = parts[0];
const part2 = parts[1] || "";

// 2. PARSE PART 1: QUESTIONS & OPTIONS
const qBlocks = [];
const lines1 = part1.split('\n');
let currentBlock = null;

lines1.forEach(line => {
    line = line.trim();
    if (!line) return;

    // Detect start of new question
    // Pattern: "[Medium..." or "[Hard..." or "Q1."
    if (line.match(/^\[(Medium|Hard|Easy)/i) || line.match(/^Q\d+\.?/)) {
        if (currentBlock) qBlocks.push(currentBlock);
        currentBlock = { text: line, options: [] };
    } else if (currentBlock) {
        // Detect option: "A. some text"
        const optMatch = line.match(/^([A-D])\.\s+(.*)/);
        if (optMatch) {
            currentBlock.options.push({ label: optMatch[1], text: optMatch[2] });
        } else {
            // Append to question text if not a section header
            if (!line.startsWith("SECTION") && !line.startsWith("(Advanced")) {
                currentBlock.text += "\n" + line;
            }
        }
    }
});
if (currentBlock) qBlocks.push(currentBlock);


// 3. PARSE PART 2: SOLUTIONS
const solBlocks = {};
if (part2) {
    const lines2 = part2.split('\n');
    let curSolQ = 0;

    lines2.forEach(line => {
        line = line.trim();
        if (!line) return;

        // Detect Q header in solutions: "Q1." or "Q1" or "1."
        // Often "Q1. [Medium..."
        const qMatch = line.match(/^Q?(\d+)\.\s/);
        if (qMatch) {
            curSolQ = parseInt(qMatch[1]);
            if (!solBlocks[curSolQ]) solBlocks[curSolQ] = { answer: '', solution: '' };
        }

        if (curSolQ > 0) {
            if (line.startsWith("Answer:")) {
                solBlocks[curSolQ].answer = line.replace("Answer:", "").trim();
            } else if (line.startsWith("Solution") || line.startsWith("Solution:")) {
                solBlocks[curSolQ].solution = line.replace(/^Solution:?/, "").trim();
            } else {
                // Append to solution text
                if (solBlocks[curSolQ].solution && !line.startsWith("Q") && !line.startsWith("Answer")) {
                    solBlocks[curSolQ].solution += "\n" + line;
                }
            }
        }
    });
}

// 4. MERGE DATA
qBlocks.forEach((b, i) => {
    const id = i + 1;

    // Clean Question Text (remove [Medium] prefix)
    let cleanText = b.text.replace(/^\[.*?\]\s*/, '').replace(/^Q\d+\.?\s*/, '');

    // Options
    let finalOptions = ["", "", "", ""];
    b.options.forEach(o => {
        const idx = letterToIndex(o.label);
        finalOptions[idx] = o.text;
    });
    // Fallback if options missing
    if (finalOptions[0] === "") finalOptions = ["Option A", "Option B", "Option C", "Option D"];

    // Solution Data
    const solData = solBlocks[id] || { answer: 'A', solution: 'Detailed solution available in analysis.' };

    // Parse Correct Answer Index
    let correctIdx = 0;
    // Format "A (Text)" or just "A"
    const ansMatch = solData.answer ? solData.answer.match(/^([A-D])/) : null;
    if (ansMatch) correctIdx = letterToIndex(ansMatch[1]);

    // Image Prompt
    let imgPrompt = null;
    // Search in raw text around Q{id} or in solution
    // Simple logic: if text says "Image-based" check solution line "Image Prompt:"
    const pMatch = solData.solution.match(/Image Prompt:\s*"(.*?)"/);
    if (pMatch) imgPrompt = pMatch[1];

    // Clean Solution Text (remove prompt from it)
    let cleanSol = solData.solution.replace(/Image Prompt:.*$/, '').trim();

    // Subject & Section logic
    let subject = "Physics";
    let section = "A";
    if (id > 15 && id <= 30) { subject = "Chemistry"; section = "B"; }
    else if (id > 30 && id <= 45) { subject = "Mathematics"; section = "C"; }
    else if (id > 45) { subject = "Biology"; section = "D"; }

    // Difficulty
    let difficulty = "Medium";
    if (b.text.toLowerCase().includes("hard")) difficulty = "Hard";

    output.questions.push({
        id: id,
        subject: subject,
        section: section,
        question: cleanText,
        options: finalOptions,
        correct: correctIdx,
        explanation: cleanSol,
        difficulty: difficulty,
        imagePrompt: imgPrompt
    });
});

const outPath = path.join(__dirname, '../frontend/mock_test/data/mock03.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 4));
console.log(`Generated ${output.questions.length} questions to ${outPath}`);
