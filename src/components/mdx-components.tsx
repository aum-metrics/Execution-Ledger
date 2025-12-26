import Link from 'next/link';
import { ComparisonTable } from './ComparisonTable';
import { DecisionMatrix } from './DecisionMatrix';
import { InteractiveDecisionTree } from './InteractiveDecisionTree';
import { Mermaid } from './Mermaid';

// Map HTML tags to custom styled components
export const components = {
    pre: (props: any) => {
        const child = props.children;
        if (child?.props?.className?.includes('language-mermaid')) {
            return <Mermaid chart={child.props.children} />;
        }
        return <pre {...props} />;
    },
    h1: (props: any) => <h1 className="text-3xl font-bold tracking-tight text-black mb-6 mt-12 first:mt-0" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-semibold tracking-tight text-black mb-4 mt-10" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-medium tracking-tight text-zinc-800 mb-3 mt-8" {...props} />,
    p: (props: any) => <p className="leading-7 text-zinc-700 mb-5" {...props} />,
    ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-zinc-700" {...props} />,
    ol: (props: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-zinc-700" {...props} />,
    li: (props: any) => <li className="" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-600" {...props} />
    ),
    a: (props: any) => <Link className="text-blue-600 hover:text-blue-800 underline underline-offset-4" {...props} />,
    table: (props: any) => (
        <div className="my-8 w-full overflow-y-auto border border-zinc-200 rounded-lg">
            <table className="w-full text-left text-sm" {...props} />
        </div>
    ),
    thead: (props: any) => <thead className="border-b border-zinc-200 bg-zinc-50" {...props} />,
    tbody: (props: any) => <tbody className="divide-y divide-zinc-200" {...props} />,
    tr: (props: any) => <tr className="hover:bg-zinc-50 transition-colors" {...props} />,
    th: (props: any) => <th className="px-4 py-3 font-bold text-black uppercase text-xs tracking-wider" {...props} />,
    td: (props: any) => <td className="px-4 py-3 text-zinc-800 font-medium" {...props} />,
    ComparisonTable: (props: any) => <ComparisonTable {...props} />,
    DecisionMatrix: (props: any) => <DecisionMatrix {...props} />,
    InteractiveDecisionTree: (props: any) => <InteractiveDecisionTree {...props} />,
};
