import { MetadataRoute } from 'next';
import { getAllSlugParams } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://execution-ledger.com'; // Replace with actual domain if known, otherwise use a placeholder

    // Static pages
    const routes = [
        '',
        '/consultant',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }));

    // Dynamic content pages
    const contentRoutes = getAllSlugParams().map(({ slug }) => {
        const path = slug.join('/');
        return {
            url: `${baseUrl}/${path}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        };
    });

    return [...routes, ...contentRoutes];
}
