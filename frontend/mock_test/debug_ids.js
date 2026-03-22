const fs = require('fs');

// Mocking window for the config file
global.window = {};
require('./quick_mocks_config.js');
const jsConfig = window.QUICK_MOCKS_CONFIG;

// Mocking the data generation logic from quick_mock_homepage.html
const html = fs.readFileSync('quick_mock_homepage.html', 'utf8');
const subjectConfigMatch = html.match(/const subjectConfig = \{([\s\S]*?)\};/);
if (!subjectConfigMatch) {
    console.error('Failed to find subjectConfig in HTML');
    process.exit(1);
}

let subjectConfig;
eval('subjectConfig = {' + subjectConfigMatch[1] + '};');

let currentId = 41;
const htmlMocks = [];
Object.entries(subjectConfig).forEach(([subject, config]) => {
    config.topics.forEach((topic, index) => {
        for (let i = 1; i <= 4; i++) {
            htmlMocks.push({
                id: currentId++,
                name: topic[0] + ' - Mock ' + i,
                subject: subject
            });
        }
    });
});

console.log('Comparing Mocks:');
console.log('JS Mocks length:', jsConfig.length);
console.log('HTML Mocks length:', 40 + htmlMocks.length); // 40 is for miscMocks

// Let's find the first mismatch
for (let i = 0; i < htmlMocks.length; i++) {
    const jsMock = jsConfig[40 + i]; // skip miscMocks
    const htmlMock = htmlMocks[i];
    
    if (!jsMock) {
        console.log(`Mismatch at index ${i}: JS mock is missing. HTML mock: ${htmlMock.name} (ID: ${htmlMock.id})`);
        break;
    }

    if (jsMock.id !== htmlMock.id) {
        console.log(`ID Mismatch at index ${i}: JS ID ${jsMock.id} vs HTML ID ${htmlMock.id}`);
        console.log(`JS label: ${jsMock.label}, HTML label: ${htmlMock.name}`);
        break;
    }
}

// Check specific chemistry topics
const chemTopicsIndices = [12, 13, 14, 15, 16, 17, 18]; // 0-indexed, so 13th topic is index 12
console.log('\nChemistry Organic Topics Audit:');
const physicsTopicsCount = 28;
chemTopicsIndices.forEach(topicIdx => {
    const startIdx = physicsTopicsCount * 4 + topicIdx * 4;
    const jsMock = jsConfig[40 + startIdx];
    const htmlMock = htmlMocks[startIdx];
    console.log(`Topic Index ${topicIdx}: JS Path: ${jsMock ? jsMock.path : 'MISSING'}, HTML Name: ${htmlMock ? htmlMock.name : 'MISSING'}, IDs: JS ${jsMock ? jsMock.id : '?'}, HTML ${htmlMock ? htmlMock.id : '?'}`);
});
