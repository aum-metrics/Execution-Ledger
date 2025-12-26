import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'src/content');

export function getPostSlugs() {
    // Recursively find all MDX files
    function getFiles(dir: string): string[] {
        const subdirs = fs.readdirSync(dir);
        const files = subdirs.map((subdir) => {
            const res = path.resolve(dir, subdir);
            return fs.statSync(res).isDirectory() ? getFiles(res) : res;
        });
        return Array.prototype.concat(...files);
    }

    try {
        const files = getFiles(contentDirectory);
        return files.filter((file) => file.endsWith('.mdx'));
    } catch (e) {
        return [];
    }
}

export function getAllSlugParams(): { slug: string[] }[] {
    const files = getPostSlugs();
    return files.map((file) => {
        const relativePath = path.relative(contentDirectory, file);
        const slug = relativePath.replace(/\.mdx$/, '').split(path.sep);
        return { slug };
    });
}

export function getPostBySlug(slug: string[]) {
    const fullPath = path.join(contentDirectory, `${slug.join('/')}.mdx`);
    console.log(`[DEBUG] getPostBySlug:`);
    console.log(` - cwd: ${process.cwd()}`);
    console.log(` - contentDir: ${contentDirectory}`);
    console.log(` - slug: ${JSON.stringify(slug)}`);
    console.log(` - fullPath: ${fullPath}`);

    if (!fs.existsSync(fullPath)) {
        console.error(`[CRITICAL] File NOT found at path: ${fullPath}`);
        // Try to list the directory to see what IS there
        const parentDir = path.dirname(fullPath);
        if (fs.existsSync(parentDir)) {
            console.log(` - Parent dir contents (${parentDir}):`, fs.readdirSync(parentDir));
        } else {
            console.log(` - Parent dir (${parentDir}) does not exist.`);
        }
        throw new Error(`Post not found: ${fullPath}`);
    }
    console.log(`[DEBUG] File found. Reading execution...`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return { slug, content: fileContents };
}

export function getAllPosts() {
    // Not strictly needed for now if we use dynamic params correctly
    return [];
}
