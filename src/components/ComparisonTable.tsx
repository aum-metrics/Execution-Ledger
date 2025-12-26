export function ComparisonTable({ title, headers, rows }: { title?: string, headers: string[]; rows: string[][] }) {
    return (
        <div className="overflow-x-auto my-8 border border-zinc-200 bg-white rounded-lg shadow-sm">
            {title && (
                <div className="px-6 py-3 border-b border-zinc-200 bg-zinc-50">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-black">{title}</h4>
                </div>
            )}
            <table className="w-full text-left text-sm text-zinc-800">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} className="px-6 py-3 font-bold text-black uppercase text-xs tracking-wider">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                    {rows.map((row, i) => (
                        <tr key={i} className="hover:bg-zinc-50 transition-colors">
                            {row.map((cell, j) => (
                                <td key={j} className="px-6 py-4 font-medium">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
