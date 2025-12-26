'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
});

interface MermaidProps {
    chart: string;
}

export const Mermaid = ({ chart }: MermaidProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');

    useEffect(() => {
        if (ref.current) {
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
            mermaid.render(id, chart).then(({ svg }) => {
                setSvg(svg);
            }).catch((error) => {
                console.error('Mermaid rendering failed:', error);
                setSvg(`<div style="color:red">Failed to render diagram</div>`);
            });
        }
    }, [chart]);

    return (
        <div
            ref={ref}
            className="mermaid-chart flex justify-center p-4 bg-zinc-900 rounded-lg my-8"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};
