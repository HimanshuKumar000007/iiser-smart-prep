const fs = require('fs');
const filePath = 'd:\\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\\frontend\\index.html';
let text = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');

// Remove CSS rules for .blog-extra-card
// We expect something like:
// .blog-extra-card {
//     display: none !important;
// }
// .blog-extra-card.show {
//     display: flex !important;
// }

// The regex needs to handle variations in whitespace
// We replace them with empty string
text = text.replace(/\.blog-extra-card\s*\{[^}]*\}\s*/g, '');
text = text.replace(/\.blog-extra-card\.show\s*\{[^}]*\}\s*/g, '');

fs.writeFileSync(filePath, text);
console.log('Removed CSS rules for .blog-extra-card');
