const fs = require('fs');
const filePath = 'd:\\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\\frontend\\index.html';
let text = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');

// The broken pattern is: <script src="config.js"> ... function ... </script>
// We want to change it to:
// <script> ... function ... </script>
// <script src="config.js"></script>

const brokenScriptStart = '<script src="config.js">';
const functionStart = '// --- Blog Articles Toggle ---';

if (text.includes(brokenScriptStart) && text.includes(functionStart)) {
    // Check if function is INSIDE the script tag
    const scriptIdx = text.indexOf(brokenScriptStart);
    const fnIdx = text.indexOf(functionStart, scriptIdx);
    const scriptEndIdx = text.indexOf('</script>', scriptIdx);

    if (fnIdx > scriptIdx && fnIdx < scriptEndIdx) {
        console.log('Found broken script tag structure. Fixing...');

        // Extract the function code
        const innerCode = text.substring(fnIdx, scriptEndIdx);

        // Remove the function code from the config.js script tag
        // And place it in a new script tag BEFORE config.js
        const newCode = `<script>
    ${innerCode}
    </script>
    <script src="config.js"></script>`;

        // Replace the whole block
        const oldBlock = text.substring(scriptIdx, scriptEndIdx + 9); // +9 for </script>

        // We need to be careful with replace not matching exact string if newlines differ
        // So we'll construct the new text by slicing
        text = text.slice(0, scriptIdx) + newCode + text.slice(scriptEndIdx + 9);

        fs.writeFileSync(filePath, text);
        console.log('Fixed: Moved toggle function to its own script tag.');
    } else {
        console.log('Function found but not inside the config.js script tag as expected.');
    }
} else {
    console.log('Could not find the specific broken pattern.');
}
