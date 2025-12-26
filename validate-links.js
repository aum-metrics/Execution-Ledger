
const fs = require('fs');
const path = require('path');

// Mock navigation data since we can't import TS directly easily without build
// I will verify the paths I see in the grep output manually against this logic
// Actually, better to read the file and parse it with regex

const navFile = fs.readFileSync('src/lib/navigation.ts', 'utf8');
const regex = /href:\s*['"]([^'"]+)['"]/g;
let match;
const mistakes = [];

while ((match = regex.exec(navFile)) !== null) {
    const href = match[1];
    if (href === '/') continue;

    // Construct filesystem path
    // href: /execution-models/v-model -> src/content/execution-models/v-model.mdx
    // href: /execution-models -> src/content/execution-models.mdx

    let filePath = path.join('src/content', href + '.mdx');

    if (!fs.existsSync(filePath)) {
        // Try checking if it is a folder? (Not how our logic works, but maybe index?)
        // Our logic in content.ts is: path + .mdx
        mistakes.push({ href: href, expectedPath: filePath });
    }
}

if (mistakes.length > 0) {
    console.log("Found broken links:");
    mistakes.forEach(m => console.log(`${m.href} -> MISSING: ${m.expectedPath}`));
} else {
    console.log("All links valid!");
}
