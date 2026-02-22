const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, 'frontend');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace /index.html# with /#
            if (content.includes('/index.html#')) {
                content = content.replace(/\/index\.html#/g, '/#');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated hash links in: ${file}`);
            }
        }
    });
}

processDir(frontendDir);
