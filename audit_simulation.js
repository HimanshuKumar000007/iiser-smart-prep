const fs = require('fs');
const path = require('path');

// Mock window for the config
global.window = {};
require('./frontend/mock_test/quick_mocks_config.js');
const chemMocks = window.QUICK_MOCKS_CONFIG.filter(m => m.category === 'chemistry');

console.log(`Auditing ${chemMocks.length} chemistry mocks...`);

chemMocks.forEach(mock => {
    // 1. Resolve path (relative to frontend/mock_test/subject-wise-quick-mock-test/)
    // In start_test.html, it does fetch('../' + mock.path)
    // mock.path as 'subject-wise-quick-mock-test/chemistry/topic/mock-n.json'
    // Since start_test.html is in subject-wise-quick-mock-test/, 
    // .. goes to mock_test/.
    // So the file should be in frontend/mock_test/subject-wise-quick-mock-test/chemistry/...
    
    // BUT! Look at mock.path again:
    // 'subject-wise-quick-mock-test/chemistry/1. some-basic-concepts-of-chemistry/mock-1.json'
    
    // If we are in frontend/mock_test/subject-wise-quick-mock-test/start_test.html
    // fetch('../subject-wise-quick-mock-test/chemistry/...')
    // resolves to frontend/mock_test/subject-wise-quick-mock-test/chemistry/...
    
    const absolutePath = path.join('frontend', 'mock_test', mock.path);
    
    if (!fs.existsSync(absolutePath)) {
        console.error(`[FAIL] ID ${mock.id}: File missing at ${absolutePath}`);
        return;
    }
    
    try {
        const content = fs.readFileSync(absolutePath, 'utf8');
        const data = JSON.parse(content);
        if (!data.questions || !Array.isArray(data.questions)) {
            console.error(`[FAIL] ID ${mock.id}: 'questions' array missing or not an array`);
        } else if (data.questions.length === 0) {
            console.error(`[FAIL] ID ${mock.id}: 'questions' array is empty`);
        } else {
            // Check first question format
            const q = data.questions[0];
            if (!q.question && !q.text) {
                console.error(`[FAIL] ID ${mock.id}: First question has no 'question' or 'text' field`);
            }
        }
    } catch (e) {
        console.error(`[FAIL] ID ${mock.id}: JSON Parse Error - ${e.message}`);
    }
});
console.log('Audit complete.');
