const fs = require('fs');
const path = require('path');

const files = [
    'mock08.json', 'mock09.json', 'mock10.json', 'mock11.json',
    'mock12.json', 'mock13.json', 'mock14.json', 'mock15.json'
];

files.forEach(fileName => {
    const filePath = path.join(__dirname, 'frontend/mock_test/data', fileName);
    if (!fs.existsSync(filePath)) {
        console.log(`${fileName}: NOT FOUND`);
        return;
    }

    try {
        const data = require(filePath);
        const counts = { 0: 0, 1: 0, 2: 0, 3: 0 };
        data.questions.forEach(q => counts[q.correct]++);

        let status = 'BALANCED';
        if (counts[0] > 50) status = 'SKEWED (All A?)';

        console.log(`${fileName}:`, JSON.stringify(counts), status);
    } catch (err) {
        console.error(`${fileName}: ERROR`, err.message);
    }
});
