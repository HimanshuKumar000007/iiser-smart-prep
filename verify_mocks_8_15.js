const fs = require('fs');
const path = require('path');

const files = [
    'mock08.json', 'mock09.json', 'mock10.json', 'mock11.json',
    'mock12.json', 'mock13.json', 'mock14.json', 'mock15.json'
];

const logFile = path.join(__dirname, 'verification_report.txt');
let logContent = '';

function log(msg) {
    console.log(msg);
    logContent += msg + '\n';
}

files.forEach(fileName => {
    const filePath = path.join(__dirname, 'frontend/mock_test/data', fileName);
    if (!fs.existsSync(filePath)) {
        log(`${fileName}: NOT FOUND`);
        return;
    }

    try {
        const data = require(filePath);
        const counts = { 0: 0, 1: 0, 2: 0, 3: 0 };

        let validStructure = true;
        if (!data.questions || !Array.isArray(data.questions)) validStructure = false;

        if (validStructure) {
            data.questions.forEach(q => {
                if (q.correct !== undefined) counts[q.correct]++;
            });

            log(`\n--- ${fileName} ---`);
            log(`Distribution: ${JSON.stringify(counts)}`);

            // Check content mismatch
            let mismatchCount = 0;
            const mismatches = [];

            data.questions.forEach(q => {
                const correctOpt = q.options[q.correct];
                const expl = q.explanation;

                if (!correctOpt || !expl) return;

                const cleanOpt = correctOpt.toString().toLowerCase().replace(/[^a-z0-9]/g, '');
                const cleanExpl = expl.toString().toLowerCase().replace(/[^a-z0-9]/g, '');

                // 1. Exact match (ignoring punctuation)
                if (cleanExpl.includes(cleanOpt)) return;

                // 2. Number matching (strict)
                const numbers = correctOpt.match(/\d+(\.\d+)?/g);
                if (numbers && numbers.length > 0) {
                    // Check if ALL numbers from option are in explanation
                    const allNumsFound = numbers.every(num => expl.includes(num));
                    if (allNumsFound) return;
                }

                // 3. Ignore very short options to reduce noise
                if (cleanOpt.length < 4) return;

                mismatches.push(`Q${q.id}: Opt="${correctOpt}"`);
                mismatchCount++;
            });

            if (mismatchCount > 0) {
                log(`Potential Mismatches: ${mismatchCount}/${data.questions.length}`);
                // Log first 3 only
                mismatches.slice(0, 3).forEach(m => log(m));
            } else {
                log("Content matches perfectly (heuristic based).");
            }

        } else {
            log(`${fileName}: INVALID STRUCTURE`);
        }

    } catch (err) {
        log(`${fileName}: ERROR ${err.message}`);
    }
});

fs.writeFileSync(logFile, logContent);
console.log(`Report written to ${logFile}`);
