'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigation } from '@/lib/navigation';
import { Menu, X } from 'lucide-react';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between">
                <Link href="/" onClick={() => setIsOpen(false)}>
                    <img src="/logo-v2.jpg" alt="Execution Ledger" className="h-8 w-auto" />
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-black hover:bg-zinc-100 rounded-md transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <nav
                className={`lg:hidden fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-zinc-200 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 border-b border-zinc-200 flex justify-between items-center">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <img src="/logo-v2.jpg" alt="Execution Ledger" className="w-48 h-auto cursor-pointer" />
                    </Link>
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
                                                onClick={() => setIsOpen(false)}
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
        </>
    );
}
