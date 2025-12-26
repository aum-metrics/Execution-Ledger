import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/components/mdx-components';
import { getPostBySlug, getAllSlugParams } from '@/lib/content';

import { notFound } from 'next/navigation';

import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
    return getAllSlugParams();
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    try {
        const resolvedParams = await params;
        console.log(`[DEBUG] Page requested for slug:`, resolvedParams.slug);
        const { content: fileContent } = getPostBySlug(resolvedParams.slug);

        const { content, frontmatter } = await compileMDX<{ title: string; description: string; author?: string; version?: string }>({
            source: fileContent,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                }
            },
            components: components,
        });

        return (
            <article className="prose prose-zinc max-w-none">
                <div className="mb-8 pb-8 border-b border-zinc-200">
                    <p className="text-xl text-zinc-600 lead mb-4">{frontmatter.description}</p>
                    <div className="flex items-center gap-4 text-sm text-zinc-500 font-mono">
                        <span className="flex items-center gap-1">
                            <span className="text-zinc-400">Author:</span>
                            <span className="text-zinc-900 font-semibold">{frontmatter.author || 'Sambath Kumar Natarajan'}</span>
                            <a href="https://www.linkedin.com/in/sambathknatarajan/" target="_blank" rel="noopener noreferrer" className="ml-2 text-[#0077b5] hover:text-[#004182] font-medium transition-colors">
                                (Connect)
                            </a>
                        </span>
                        <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                        <span className="flex items-center gap-1">
                            <span className="text-zinc-400">Version:</span>
                            <span className="text-zinc-700">{frontmatter.version || '1.0'}</span>
                        </span>
                    </div>
                </div>
                {content}

            </article>
        );
    } catch (error) {
        console.error("Error rendering page:", error);
        notFound();
    }
}
