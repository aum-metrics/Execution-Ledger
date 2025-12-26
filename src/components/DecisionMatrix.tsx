import { cn } from "@/lib/utils";

type RatingFactor = {
    factor: string;
    rating: "Low" | "Medium" | "High" | "Extreme" | "Very Slow";
    reality: string;
};

type WeightedFactor = {
    name: string;
    weight: number;
    score: number;
    note: string;
};

type DecisionMatrixProps = {
    id?: string;
    title?: string;
    data?: RatingFactor[];    // Mode A: Simple Rating
    factors?: WeightedFactor[]; // Mode B: Weighted Scoring
};

export function DecisionMatrix({ id, title, data, factors }: DecisionMatrixProps) {
    // Mode B: Weighted Scoring Matrix
    if (factors) {
        return (
            <div className="my-8 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
                {title && (
                    <div className="bg-zinc-50 dark:bg-zinc-950 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">{title}</h3>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 font-semibold uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">Factor</th>
                                <th className="px-4 py-3 w-20 text-center">Weight</th>
                                <th className="px-4 py-3 w-20 text-center">Score</th>
                                <th className="px-4 py-3">Note</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {factors.map((item, i) => (
                                <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-200">{item.name}</td>
                                    <td className="px-4 py-3 text-center text-zinc-500">{item.weight}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={cn(
                                            "inline-block w-6 h-6 rounded-full text-center leading-6 text-xs font-bold",
                                            item.score >= 4 ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                                                item.score <= 2 ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" :
                                                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                        )}>
                                            {item.score}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{item.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // Mode A: Simple Rating Matrix (Fallback)
    if (data) {
        return (
            <div className="my-8 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
                <div className="grid grid-cols-12 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    <div className="col-span-3">Factor</div>
                    <div className="col-span-3">Rating</div>
                    <div className="col-span-6">Reality Check</div>
                </div>
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
                    {data.map((item, i) => (
                        <div key={i} className="grid grid-cols-12 py-4 px-4 items-center hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                            <div className="col-span-3 text-sm font-medium text-zinc-900 dark:text-zinc-200">{item.factor}</div>
                            <div className="col-span-3">
                                <span className={cn(
                                    "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset",
                                    item.rating === "High" || item.rating === "Extreme" ? "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20" :
                                        item.rating === "Medium" ? "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:ring-yellow-400/20" :
                                            "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/20"
                                )}>
                                    {item.rating}
                                </span>
                            </div>
                            <div className="col-span-6 text-sm text-zinc-600 dark:text-zinc-400">{item.reality}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
