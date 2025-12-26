'use client';

import React, { useState } from 'react';
import { Scenario, Step, Metric, Consequence } from '@/data/scenarios';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import {
    ChartBarIcon,
    CurrencyDollarIcon,
    BoltIcon,
    HeartIcon,
    ExclamationTriangleIcon,
    ArrowPathIcon,
    ScaleIcon,
    EyeSlashIcon,
    ClockIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

interface ScenarioEngineProps {
    scenario: Scenario;
    onExit: () => void;
}

type MetricsState = Record<Metric, number>;

const INITIAL_METRICS: MetricsState = {
    velocity: 50,
    quality: 50,
    cost: 50,
    techDebt: 10,
    happiness: 50,
    politicalCapital: 50
};

const METRIC_ICONS: Record<Metric, React.ElementType> = {
    velocity: BoltIcon,
    cost: CurrencyDollarIcon,
    quality: ChartBarIcon,
    techDebt: ExclamationTriangleIcon,
    happiness: HeartIcon,
    politicalCapital: ScaleIcon
};

const METRIC_LABELS: Record<Metric, string> = {
    velocity: 'Velocity',
    cost: 'Budget',
    quality: 'Quality',
    techDebt: 'Tech Debt',
    happiness: 'Morale',
    politicalCapital: 'Politics'
};

export function ScenarioEngine({ scenario, onExit }: ScenarioEngineProps) {
    const [currentStepId, setCurrentStepId] = useState<string>(scenario.initialStepId);
    const [metrics, setMetrics] = useState<MetricsState>(INITIAL_METRICS);
    const [metricDelta, setMetricDelta] = useState<Partial<MetricsState>>({}); // For showing +10/-10 animations
    const [lastAnalysis, setLastAnalysis] = useState<string | null>(null);
    const [delayedConsequences, setDelayedConsequences] = useState<Consequence[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [showDelayedResult, setShowDelayedResult] = useState(false);

    const currentStep = scenario.steps[currentStepId];

    const handleOptionSelect = (option: typeof currentStep.options[0]) => {
        // Separate consequences
        const immediate = option.consequences.filter(c => c.type === 'immediate');
        const delayed = option.consequences.filter(c => c.type === 'delayed');

        // Apply Immediate
        const newMetrics = { ...metrics };
        const delta: Partial<MetricsState> = {};

        immediate.forEach(c => {
            const currentVal = newMetrics[c.metric] ?? 50;
            const newVal = Math.max(0, Math.min(100, currentVal + c.value));
            newMetrics[c.metric] = newVal;
            delta[c.metric] = c.value;
        });

        setMetrics(newMetrics);
        setMetricDelta(delta);
        setDelayedConsequences(prev => [...prev, ...delayed]);
        setLastAnalysis(option.rationality);

        // Navigate
        if (option.nextStepId === 'summary') {
            setIsFinished(true);
        } else {
            setCurrentStepId(option.nextStepId);
        }
    };

    const revealDelayed = () => {
        const newMetrics = { ...metrics };
        const delta: Partial<MetricsState> = {};

        delayedConsequences.forEach(c => {
            const currentVal = newMetrics[c.metric] ?? 50;
            const newVal = Math.max(0, Math.min(100, currentVal + c.value));
            newMetrics[c.metric] = newVal;
            delta[c.metric] = (delta[c.metric] || 0) + c.value;
        });

        setMetrics(newMetrics);
        setMetricDelta(delta);
        setShowDelayedResult(true);
    };

    const reset = () => {
        setMetrics(INITIAL_METRICS);
        setMetricDelta({});
        setCurrentStepId(scenario.initialStepId);
        setLastAnalysis(null);
        setDelayedConsequences([]);
        setIsFinished(false);
        setShowDelayedResult(false);
    };

    if (isFinished) {
        return (
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl border border-zinc-200 shadow-2xl animate-fade-in">
                <h2 className="text-3xl font-bold text-zinc-900 mb-6">Simulation Complete</h2>

                {/* Initial Analysis */}
                {!showDelayedResult && lastAnalysis && (
                    <div className="mb-8 p-6 bg-indigo-50 border border-indigo-100 rounded-lg">
                        <h4 className="text-indigo-600 font-bold mb-4 uppercase text-xs tracking-wider">Initial Assessment</h4>
                        <div className="prose prose-zinc max-w-none text-zinc-700">
                            <ReactMarkdown>{lastAnalysis}</ReactMarkdown>
                        </div>
                    </div>
                )}

                {/* Delayed Reveal Button */}
                {!showDelayedResult ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">⏳</div>
                        <h3 className="text-2xl font-bold text-zinc-900 mb-4">6 Months Later...</h3>
                        <p className="text-zinc-600 mb-8 max-w-md mx-auto">
                            The immediate dust has settled. But did your architecture survive the real world?
                            <br />
                            <span className="text-sm font-mono text-zinc-400 mt-2 block">Hidden Variable: {scenario.hiddenVariable}</span>
                        </p>
                        <button
                            onClick={revealDelayed}
                            className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-xl shadow-orange-500/20"
                        >
                            Reveal Long-Term Impact
                        </button>
                    </div>
                ) : (
                    <div className="animate-slide-up">
                        <div className="mb-8 p-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
                            <h4 className="text-orange-600 font-bold mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                                <ClockIcon className="w-4 h-4" />
                                6 Months Later: The Reality
                            </h4>
                            <div className="space-y-4">
                                {delayedConsequences.map((c, i) => (
                                    <div key={i} className="flex justify-between items-center text-zinc-700 border-b border-zinc-200 pb-2 last:border-0">
                                        <span>{c.message}</span>
                                        <span className={c.value > 0 ? "text-green-600 font-mono" : "text-red-600 font-mono"}>
                                            {c.value > 0 ? '+' : ''}{c.value} {METRIC_LABELS[c.metric]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-zinc-50 p-6 rounded-lg flex flex-col justify-center items-center text-center mb-8 border border-zinc-200">
                            <div className="text-6xl mb-4">
                                {metrics.politicalCapital < 20 ? '🫵' : metrics.techDebt > 80 ? '🔥' : metrics.velocity < 20 ? '🐌' : '🏆'}
                            </div>
                            <p className="text-lg text-zinc-700">
                                {metrics.politicalCapital < 20
                                    ? "You were fired. The Board lost confidence."
                                    : metrics.techDebt > 80
                                        ? "The system collapsed under its own weight. Total rewrite needed."
                                        : metrics.velocity < 20
                                            ? "You built a castle, but nobody can live in it. Too slow."
                                            : "You survived. The trade-offs were managed. For now."}
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={reset}
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-900 rounded-lg transition-colors font-medium"
                            >
                                <ArrowPathIcon className="w-5 h-5" />
                                Replay Scenario
                            </button>
                            <button
                                onClick={onExit}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                )}

                {/* Metrics Always Visible, but show delta if meaningful */}
                <div className="mt-12 pt-8 border-t border-zinc-100">
                    <h3 className="text-xl font-semibold text-zinc-900 mb-6">Current Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(Object.keys(metrics) as Metric[]).map((key) => (
                            <MetricBar key={key} metric={key} value={metrics[key]} delta={metricDelta[key]} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Interaction Area */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-xl min-h-[400px] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-indigo-600 text-sm font-tracking-wider uppercase font-bold block">
                                {scenario.title}
                            </span>
                            <span className="flex items-center gap-2 text-zinc-500 text-xs font-mono border border-zinc-200 px-2 py-1 rounded-full">
                                <EyeSlashIcon className="w-3 h-3" />
                                Hidden: {scenario.hiddenVariable}
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold text-zinc-900 mb-4">{currentStep.title}</h2>
                        <p className="text-xl text-zinc-600 leading-relaxed mb-8">
                            {currentStep.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {currentStep.options.map(option => (
                            <button
                                key={option.id}
                                onClick={() => handleOptionSelect(option)}
                                className="text-left group relative p-6 bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-indigo-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                                    {option.label}
                                </h3>
                                {option.description && (
                                    <p className="text-zinc-500 mt-1">{option.description}</p>
                                )}

                                {/* Peek at immediate consequences for UX transparency (optional) */}
                                <div className="mt-4 flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {option.consequences.filter(c => c.type === 'immediate').map((c, i) => (
                                        <span key={i} className={clsx("text-xs px-2 py-0.5 rounded border", c.value > 0 ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200")}>
                                            {c.value > 0 ? '+' : ''}{c.value} {METRIC_LABELS[c.metric]}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* HUD / Metrics Sidebar */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-lg sticky top-8">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 border-b border-zinc-100 pb-2">
                        Project Health
                    </h3>
                    <div className="space-y-6">
                        {(Object.keys(metrics) as Metric[]).map((key) => (
                            <MetricBar key={key} metric={key} value={metrics[key]} delta={metricDelta[key]} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricBar({ metric, value, delta }: { metric: Metric, value: number, delta?: number }) {
    const Icon = METRIC_ICONS[metric] || QuestionMarkCircleIcon;

    // Color logic
    let colorClass = 'bg-blue-500';
    if (metric === 'techDebt') {
        colorClass = value > 50 ? 'bg-red-500' : 'bg-green-500'; // High debt is bad
    } else {
        // High is good usually
        colorClass = value < 30 ? 'bg-red-500' : value > 70 ? 'bg-green-500' : 'bg-yellow-500';
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2 text-zinc-600">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{METRIC_LABELS[metric]}</span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Delta Indicator */}
                    {delta !== undefined && delta !== 0 && (
                        <span className={clsx("text-xs font-bold animate-pulse", delta > 0 ? "text-green-600" : "text-red-600")}>
                            {delta > 0 ? '+' : ''}{delta}
                        </span>
                    )}
                    <span className="text-xs font-mono text-zinc-400">{value}%</span>
                </div>
            </div>
            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-100">
                <div
                    className={clsx("h-full transition-all duration-500 ease-out", colorClass)}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
