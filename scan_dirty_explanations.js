const fs = require('fs');
const path = require('path');

const mockFiles = [
    'mock08.json', 'mock09.json', 'mock10.json', 'mock11.json',
    'mock12.json', 'mock13.json', 'mock14.json', 'mock15.json'
];

const dirtyKeywords = ["Wait,", "Let's", "Maybe", "Check", "assume", "Did I", "Key says", "User Key"];

const baseDir = path.join(__dirname, 'frontend/mock_test/data');

mockFiles.forEach(file => {
    const filePath = path.join(baseDir, file);
    if (fs.existsSync(filePath)) {
        const data = require(filePath);
        const dirtyQuestions = [];
        data.questions.forEach(q => {
            const expl = q.explanation || "";
            const isDirty = dirtyKeywords.some(keyword => expl.includes(keyword));
            if (isDirty) {
                dirtyQuestions.push(q.id);
            }
        });
        if (dirtyQuestions.length > 0) {
            console.log(`${file}: ${dirtyQuestions.join(', ')}`);
        }
    }
});
