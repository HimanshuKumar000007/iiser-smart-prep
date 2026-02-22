const fs = require('fs');
const path = require('path');

const newsDir = path.join(__dirname, 'frontend', 'news');

fs.readdirSync(newsDir).forEach(file => {
    if (file.endsWith('.html')) {
        const fullPath = path.join(newsDir, file);
        let content = fs.readFileSync(fullPath, 'utf8');

        // Target: <a href="javascript:void(0)" class="sidebar-link" onclick="accessStudyPlan()">
        // Note: fix_all_paths.js might have changed the href.
        // It might be window.location or something, but fix_all_paths explicitly avoided javascript:

        const regex = /<a[^>]+onclick="accessStudyPlan\(\)"[^>]*>/g;

        if (regex.test(content)) {
            content = content.replace(regex, `<a href="/iat-planner-pro.html" class="sidebar-link">`);
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Updated link in ${file}`);
        }
    }
});
