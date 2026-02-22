const fs = require('fs');
const path = require('path');

const newsDir = path.join(__dirname, 'frontend', 'news');

fs.readdirSync(newsDir).forEach(file => {
    if (file.endsWith('.html')) {
        const fullPath = path.join(newsDir, file);
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        // 1. Add ID to auth-buttons
        if (content.includes('class="auth-buttons"') && !content.includes('id="auth-buttons-container"')) {
            content = content.replace(/class="auth-buttons"/g, 'class="auth-buttons" id="auth-buttons-container"');
            modified = true;
        }

        // 2. Add pro-hidden to sidebar pricing/upsell cards
        // To be safe, look for any sidebar card that has a link to #pricing
        const cardRegex = /<div class="sidebar-card([^>]*?)>([\s\S]*?)href="\/#pricing"([\s\S]*?)<\/div>/g;
        content = content.replace(cardRegex, (match, classes, p2, p3) => {
            if (!classes.includes('pro-hidden')) {
                modified = true;
                return `<div class="sidebar-card pro-hidden${classes}>${p2}href="/#pricing"${p3}</div>`;
            }
            return match;
        });

        const cardRegex2 = /<div class="sidebar-card([^>]*?)>([\s\S]*?)href="\/index\.html#pricing"([\s\S]*?)<\/div>/g;
        content = content.replace(cardRegex2, (match, classes, p2, p3) => {
            if (!classes.includes('pro-hidden')) {
                modified = true;
                return `<div class="sidebar-card pro-hidden${classes}>${p2}href="/index.html#pricing"${p3}</div>`;
            }
            return match;
        });

        // 3. Inject scripts before </body>
        const scriptToInject = `
    <!-- Auth & Pro Logic -->
    <script src="/config.js"></script>
    <script>
        // --- Auth State Check ---
        const token = localStorage.getItem("IAT_TOKEN");

        function updateButtons() {
            const container = document.getElementById("auth-buttons-container");
            if (!container) return;

            if (token) {
                container.innerHTML = \`
                    <a href="/mock_test/full_mock_test_homepage.html" class="btn btn-primary" style="padding: 0.5rem 1rem;">Dashboard</a>
                    <button onclick="logout()" class="btn btn-outline" style="border:none; color: var(--text-muted);">Logout</button>
                \`;
            }
        }

        if (typeof updateButtons === 'function') {
            updateButtons();
        }

        function logout() {
            localStorage.clear();
            window.location.href = '/index.html';
        }
    </script>
</body>`;

        if (!content.includes('function updateButtons()')) {
            content = content.replace(/<\/body>/, scriptToInject);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Injected Auth logic into ${file}`);
        }
    }
});
