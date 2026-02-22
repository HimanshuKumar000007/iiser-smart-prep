const fs = require('fs');
const path = require('path');

const newsDir = path.join(__dirname, 'frontend', 'news');

fs.readdirSync(newsDir).forEach(file => {
    if (file.endsWith('.html')) {
        const fullPath = path.join(newsDir, file);
        let content = fs.readFileSync(fullPath, 'utf8');

        const targetBlock =
            `                const link = document.createElement('a');
                link.href = '/assets/files/IISER_IAT_3_Month_Study_Plan.pdf'; // Placeholder path
                link.download = 'IISER_IAT_3_Month_Study_Plan.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);`;

        // NOTE: My fix_all_paths script changed `../assets/` to `/assets/`
        // Let's use regex to be safe

        const regex = /const link = document\.createElement\('a'\);[\s\S]*?link\.download = 'IISER_IAT_3_Month_Study_Plan\.pdf';[\s\S]*?document\.body\.appendChild\(link\);[\s\S]*?link\.click\(\);[\s\S]*?document\.body\.removeChild\(link\);/g;

        if (regex.test(content)) {
            content = content.replace(regex, `window.location.href = '/iat-planner-pro.html';`);
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Updated accessStudyPlan in ${file}`);
        } else if (content.includes('accessStudyPlan')) {
            console.log(`Warning: accessStudyPlan found in ${file} but regex did not match.`);
        }
    }
});
