import Link from 'next/link';
import { navigation } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function Sidebar({ className }: { className?: string }) {
    return (
        <nav className={cn("w-64 border-r border-zinc-200 bg-white h-full flex-shrink-0 overflow-y-auto hidden lg:flex flex-col", className)}>
            <div className="p-6 border-b border-zinc-200 flex justify-between items-center">
                <div className="flex items-center justify-center flex-1">
                    <Link href="/">
                        <img src="/logo-v2.jpg" alt="Execution Ledger" className="w-48 h-auto cursor-pointer" />
                    </Link>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-8">
                    {navigation.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold text-xs uppercase tracking-wider text-black mb-3">
                                {section.title}
                            </h3>
                            <ul className="space-y-1">
                                {section.items?.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="block px-2 py-1.5 text-sm text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-md transition-colors font-medium"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}
