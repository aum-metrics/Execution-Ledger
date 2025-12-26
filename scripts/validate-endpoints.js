const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..');
const NAVIGATION_FILE = path.join(PROJECT_ROOT, 'src/lib/navigation.ts');
const APP_DIR = path.join(PROJECT_ROOT, 'src/app');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src/content');

function validate() {
    console.log('🔍 Validating Endpoints...');

    // 1. Read Navigation File
    const navContent = fs.readFileSync(NAVIGATION_FILE, 'utf8');

    // 2. Extract hrefs
    // Simple regex to find href: "..." or href: '...'
    const hrefRegex = /href:\s*['"]([^'"]+)['"]/g;
    const hrefs = [];
    let match;
    while ((match = hrefRegex.exec(navContent)) !== null) {
        hrefs.push(match[1]);
    }

    console.log(`Found ${hrefs.length} links in navigation.`);

    let errors = 0;

    // 3. Check each href
    hrefs.forEach(href => {
        // Remove query params or anchors if any (though usually clean in nav)
        const cleanHref = href.split(/[?#]/)[0];

        let found = false;

        // Check Static Routes in src/app
        // e.g. /consultant -> src/app/consultant/page.tsx
        const appPagePath = path.join(APP_DIR, cleanHref, 'page.tsx');
        if (fs.existsSync(appPagePath)) {
            found = true;
        }

        // Check Content Routes in src/content
        // e.g. /domain/telecom -> src/content/domain/telecom.mdx
        // Remove leading slash for content join
        const relativeContentPath = cleanHref.replace(/^\//, '') + '.mdx';
        const contentPath = path.join(CONTENT_DIR, relativeContentPath);

        if (fs.existsSync(contentPath)) {
            found = true;
        }

        // Check "Category" pages which might be md/mdx at the folder level
        // e.g. /domains -> src/content/domains.mdx
        const categoryPath = path.join(CONTENT_DIR, cleanHref.replace(/^\//, '') + '.mdx');
        if (fs.existsSync(categoryPath)) {
            found = true;
        }

        if (!found) {
            console.error(`❌ BROKEN LINK: ${href}`);
            console.error(`   - Checked: ${appPagePath}`);
            console.error(`   - Checked: ${contentPath}`);
            errors++;
        } else {
            // console.log(`✅ OK: ${href}`);
        }
    });

    if (errors === 0) {
        console.log('✅ All endpoints validated successfully!');
    } else {
        console.error(`Found ${errors} broken links.`);
        process.exit(1);
    }
}

validate();
