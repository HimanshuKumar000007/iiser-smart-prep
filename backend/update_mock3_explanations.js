const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../frontend/mock_test/data/mock03.json');
const rawPath = path.join(__dirname, 'raw_mock3_solutions.txt');

const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const rawText = fs.readFileSync(rawPath, 'utf8');

// Parse solutions from raw text
const solutionMap = {};
const lines = rawText.split('\n');
let currentQ = 0;

lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    // Detect Question Header "Q1." or "Q1" or "Q1. [..."
    const qMatch = line.match(/^Q(\d+)\./);
    if (qMatch) {
        currentQ = parseInt(qMatch[1]);
        if (!solutionMap[currentQ]) solutionMap[currentQ] = "";
    } else if (line.startsWith("Solution:") || line.startsWith("Solution")) {
        if (currentQ > 0) {
            let sol = line.replace(/^Solution:?/, "").trim();
            solutionMap[currentQ] = sol;
        }
    } else if (currentQ > 0 && solutionMap[currentQ] !== undefined && !line.startsWith("Answer:") && !line.startsWith("SECTION")) {
        // Append continuation lines to solution
        solutionMap[currentQ] += " " + line;
    }
});

// Update JSON
let updatedCount = 0;
jsonData.questions.forEach(q => {
    if (solutionMap[q.id]) {
        // Only update if existing is generic or we want to overwrite
        // We'll just overwrite to be sure, and clean up extra spaces
        let detailedSol = solutionMap[q.id].replace(/\s+/g, ' ').trim();
        q.explanation = detailedSol;
        updatedCount++;
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 4));
console.log(`Updated explanations for ${updatedCount} questions.`);
