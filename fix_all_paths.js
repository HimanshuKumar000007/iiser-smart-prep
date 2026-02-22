const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const frontendDir = path.join(__dirname, 'frontend');
const FAKE_BASE = 'http://fake.com/';

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            const relativeToFrontend = path.relative(frontendDir, fullPath).replace(/\\/g, '/');
            const baseUrl = new URL(relativeToFrontend, FAKE_BASE).href;

            const replacePath = (match, p1, prefix) => {
                if (p1.startsWith('http') || p1.startsWith('mailto:') || p1.startsWith('tel:') || p1.startsWith('#') || p1.startsWith('javascript:') || p1.startsWith('data:')) {
                    return match;
                }
                if (p1 === '') return match;

                let cleanPath = p1;
                // Strip the `/frontend` prefix if it wrongly exists
                if (cleanPath.startsWith('/frontend/')) {
                    cleanPath = cleanPath.replace('/frontend/', '/');
                }

                try {
                    const resolvedUrl = new URL(cleanPath, baseUrl);
                    const newPath = resolvedUrl.pathname + resolvedUrl.search + resolvedUrl.hash;
                    modified = true;
                    return `${prefix}"${newPath}"`;
                } catch (e) {
                    return match;
                }
            };

            const replaceLocation = (match, prefix, p1) => {
                if (p1.startsWith('http') || p1.startsWith('mailto:') || p1.startsWith('tel:') || p1.startsWith('#') || p1.startsWith('javascript:') || p1.startsWith('data:')) {
                    return match;
                }

                let cleanPath = p1;
                if (cleanPath.startsWith('/frontend/')) {
                    cleanPath = cleanPath.replace('/frontend/', '/');
                }

                try {
                    const resolvedUrl = new URL(cleanPath, baseUrl);
                    const newPath = resolvedUrl.pathname + resolvedUrl.search + resolvedUrl.hash;
                    modified = true;
                    return `${prefix}'${newPath}'`;
                } catch (e) {
                    return match;
                }
            };

            content = content.replace(/(href=)["']([^"']+)["']/g, (m, pref, p1) => replacePath(m, p1, pref));
            content = content.replace(/(src=)["']([^"']+)["']/g, (m, pref, p1) => replacePath(m, p1, pref));
            content = content.replace(/(\.location(?:\.href)?\s*=\s*)["']([^"']+)["']/g, (m, pref, p1) => replaceLocation(m, pref, p1));

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated paths in: ${relativeToFrontend}`);
            }
        }
    });
}

processDir(frontendDir);
console.log('\n✅ All internal paths successfully standardized to domain root absolute (`/`).');
