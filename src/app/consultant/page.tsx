'use client';

import React, { useState } from 'react';
import { SCENARIOS, Scenario } from '@/data/scenarios';
import { ScenarioEngine } from '@/components/simulator/ScenarioEngine';
import { PlayIcon, UserGroupIcon, CloudIcon, BeakerIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ConsultantPage() {
    const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);

    if (activeScenario) {
        return (
            <div className="min-h-screen bg-white text-zinc-900 py-12 px-6">
                <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                        Simulator: <span className="text-indigo-600">{activeScenario.title}</span>
                    </h1>
                    <button
                        onClick={() => setActiveScenario(null)}
                        className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        Exit Simulation
                    </button>
                </div>
                <ScenarioEngine
                    scenario={activeScenario}
                    onExit={() => setActiveScenario(null)}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900">
            <div className="max-w-7xl mx-auto py-24 px-6">
                <div className="mb-16">
                    <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 mb-6">
                        The Architect <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">Simulator</span>
                    </h1>
                    <p className="text-xl text-zinc-600 max-w-2xl leading-relaxed">
                        Test your decision-making skills in high-stakes software scenarios.
                        Manage budget, technical debt, and team morale while navigating complex architectural trade-offs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SCENARIOS.map((scenario) => (
                        <div
                            key={scenario.id}
                            className="group relative bg-white border border-zinc-200 rounded-2xl p-8 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                                    {getIconForScenario(scenario.id)}
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                    {scenario.title}
                                </h3>
                                <p className="text-zinc-600 leading-relaxed mb-8">
                                    {scenario.description}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setActiveScenario(scenario);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-zinc-100 hover:bg-indigo-600 hover:text-white text-zinc-900 font-semibold rounded-lg transition-all duration-200"
                            >
                                <PlayIcon className="w-5 h-5" />
                                Start Simulation
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-24 border-t border-zinc-200 pt-16">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-8">Reference Architectures</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Link href="/domains/retail" className="p-4 bg-white border border-zinc-200 rounded-lg hover:border-indigo-500 transition-colors shadow-sm">
                            <span className="block text-indigo-600 text-sm font-bold mb-1">RETAIL</span>
                            <span className="text-zinc-900 font-medium">E-Commerce & Headless</span>
                        </Link>
                        <Link href="/domains/telecom" className="p-4 bg-white border border-zinc-200 rounded-lg hover:border-indigo-500 transition-colors shadow-sm">
                            <span className="block text-indigo-600 text-sm font-bold mb-1">TELECOM</span>
                            <span className="text-zinc-900 font-medium">5G & Edge Networks</span>
                        </Link>
                        <Link href="/domains/media" className="p-4 bg-white border border-zinc-200 rounded-lg hover:border-indigo-500 transition-colors shadow-sm">
                            <span className="block text-indigo-600 text-sm font-bold mb-1">MEDIA</span>
                            <span className="text-zinc-900 font-medium">Content Supply Chain</span>
                        </Link>
                        <Link href="/domains/automotive" className="p-4 bg-white border border-zinc-200 rounded-lg hover:border-indigo-500 transition-colors shadow-sm">
                            <span className="block text-indigo-600 text-sm font-bold mb-1">AUTO</span>
                            <span className="text-zinc-900 font-medium">Connected Vehicles</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getIconForScenario(id: string) {
    switch (id) {
        case 'vendor-selection': return <UserGroupIcon className="w-6 h-6" />;
        case 'ai-adoption': return <BeakerIcon className="w-6 h-6" />;
        case 'cloud-migration': return <CloudIcon className="w-6 h-6" />;
        default: return <PlayIcon className="w-6 h-6" />;
    }
}
