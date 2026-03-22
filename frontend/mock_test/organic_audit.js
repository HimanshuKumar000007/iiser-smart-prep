const fs = require('fs');
global.window = {};
require('./quick_mocks_config.js');
const jsConfig = window.QUICK_MOCKS_CONFIG;

const html = fs.readFileSync('quick_mock_homepage.html', 'utf8');
const subjectConfigMatch = html.match(/const subjectConfig = \{([\s\S]*?)\};/);
let subjectConfig;
eval('subjectConfig = {' + subjectConfigMatch[1] + '};');

let mockId = 41;
const htmlMocks = {};
Object.entries(subjectConfig).forEach(([subject, config]) => {
    config.topics.forEach((topic, index) => {
        for (let i = 1; i <= 4; i++) {
            htmlMocks[mockId++] = {
                name: topic[0] + ' - Mock ' + i,
                subject: subject
            };
        }
    });
});

const organicTopics = [
    'Organic Chemistry - Basic Principles',
    'Hydrocarbons',
    'Haloalkanes and haloarenes',
    'Alcohols, phenols, and ethers',
    'Aldehydes, ketones, and carboxylic acids',
    'Organic compounds containing nitrogen',
    'Biomolecules'
];

organicTopics.forEach(topicName => {
    console.log(`\nTopic: ${topicName}`);
    // Find in HTML generated IDs
    const htmlIds = Object.keys(htmlMocks).filter(id => htmlMocks[id].name.includes(topicName));
    console.log(`  HTML IDs: ${htmlIds.join(', ')}`);
    
    // Find in JS config
    const jsMocks = jsConfig.filter(m => m.label && m.label.includes(topicName));
    console.log(`  JS Config IDs: ${jsMocks.map(m => m.id).join(', ')}`);
    console.log(`  JS Config Paths: ${jsMocks.map(m => m.path).join(', ')}`);
});
