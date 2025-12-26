import { MetadataRoute } from 'next';
import { getAllSlugParams } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allRoutes = getAllSlugParams();

    // Base URL (Change this to your custom domain later)
    const baseUrl = 'https://execution-ledger.vercel.app';

    const routes = allRoutes.map((route) => ({
        url: `${baseUrl}/${route.slug.join('/')}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/consultant`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        ...routes,
    ];
}
