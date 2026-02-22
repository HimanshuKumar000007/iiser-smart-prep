const fs = require('fs');
const path = require('path');

const newsDir = path.join(__dirname, 'frontend', 'news');

fs.readdirSync(newsDir).forEach(file => {
    if (file.endsWith('.html')) {
        const fullPath = path.join(newsDir, file);
        let content = fs.readFileSync(fullPath, 'utf8');

        // Target: href="/mock_test/biology_sectional.html"
        const regex = /href="\/mock_test\/([a-z]+)_sectional\.html"/g;

        let modified = false;
        content = content.replace(regex, (match, subject) => {
            modified = true;
            // Capitalize subject for the alert
            const Subject = subject.charAt(0).toUpperCase() + subject.slice(1);
            return `href="javascript:void(0)" onclick="alert('${Subject} Sectional Test coming soon!')"`;
        });

        if (modified) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Updated CTA in ${file}`);
        }
    }
});
