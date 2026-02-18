const fs = require('fs');
const path = require('path');

const mockFiles = [
    'mock08.json', 'mock09.json', 'mock10.json', 'mock11.json',
    'mock12.json', 'mock13.json', 'mock14.json', 'mock15.json'
];

const dirtyKeywords = ["Wait,", "Let's", "Maybe", "Check", "assume", "Did I", "Key says", "User Key"];

const baseDir = path.join(__dirname, 'frontend/mock_test/data');
const dumpFile = path.join(__dirname, 'dirty_dump_utf8.txt');

// Clear file
fs.writeFileSync(dumpFile, '');

mockFiles.forEach(file => {
    const filePath = path.join(baseDir, file);
    if (fs.existsSync(filePath)) {
        const data = require(filePath);
        let found = false;
        data.questions.forEach(q => {
            const expl = q.explanation || "";
            const isDirty = dirtyKeywords.some(keyword => expl.includes(keyword));
            if (isDirty) {
                const output = [];
                if (!found) {
                    output.push(`\n=== FILE: ${file} ===`);
                    found = true;
                }
                output.push(`ID: ${q.id}`);
                // output.push(`Question: ${q.question}`); // Omit question text to save tokens if not critical context
                // Actually need Question to rewrite explanation.
                output.push(`Question: ${q.question}`);
                output.push(`Options: ${JSON.stringify(q.options)}`);
                output.push(`Correct Index: ${q.correct}`);
                output.push(`Current Explanation: ${expl}`);
                output.push('---');

                fs.appendFileSync(dumpFile, output.join('\n') + '\n', 'utf8');
            }
        });
    }
});
