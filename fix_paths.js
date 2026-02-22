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

            // Replace href="/frontend/..." with href="/..."
            if (content.match(/href=["']\/frontend\//g)) {
                content = content.replace(/href=(["'])\/frontend\//g, 'href=$1/');
                modified = true;
            }

            // Replace src="/frontend/..." with src="/..."
            if (content.match(/src=["']\/frontend\//g)) {
                content = content.replace(/src=(["'])\/frontend\//g, 'src=$1/');
                modified = true;
            }

            // Replace window.location.href = '/frontend/...'
            if (content.match(/=\s*(["'])\/frontend\//g)) {
                content = content.replace(/=\s*(["'])\/frontend\//g, '= $1/');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed:', fullPath);
            }
        }
    });
}

processDir(frontendDir);
console.log('Done replacing /frontend/ with /');
