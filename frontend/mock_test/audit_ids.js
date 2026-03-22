const fs = require('fs');

// Mocking window for the config file
global.window = {};
require('./quick_mocks_config.js');
const jsConfig = window.QUICK_MOCKS_CONFIG;

// Mocking the data generation logic from quick_mock_homepage.html
const html = fs.readFileSync('quick_mock_homepage.html', 'utf8');
const subjectConfigMatch = html.match(/const subjectConfig = \{([\s\S]*?)\};/);
let subjectConfig;
eval('subjectConfig = {' + subjectConfigMatch[1] + '};');

let currentId = 41;
const htmlMocks = [];
// In quick_mock_homepage.html, it iterates Object.entries(subjectConfig)
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

console.log('ID audit:');
jsConfig.forEach((jsMock, index) => {
    if (jsMock.id <= 40) return; // skip misc
    const htmlMock = htmlMocks[jsMock.id - 41];
    if (!htmlMock) {
        console.log(`ID ${jsMock.id}: JS exists (${jsMock.label}), but HTML does not!`);
    } else if (jsMock.label !== htmlMock.name && !jsMock.label.startsWith(htmlMock.name.split(' - ')[0])) {
        // Label might be "Topic - Mock 01" vs "Topic - Mock 1"
        console.log(`ID ${jsMock.id}: Mismatch! JS: "${jsMock.label}" vs HTML: "${htmlMock.name}"`);
        console.log(`   JS Path: ${jsMock.path}`);
    }
});
