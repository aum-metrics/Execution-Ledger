'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

type Option = {
    label: string;
    nextStep?: string;
    outcome?: string;
    risk?: string;
};

type Step = {
    id: string;
    question: string;
    options: Option[];
};

type Outcome = {
    id: string;
    title: string;
    recommendation: string;
    risks: string[];
    mitigation: string[];
    type: 'success' | 'warning' | 'danger';
};

export function InteractiveDecisionTree({ steps, outcomes }: { steps: Step[]; outcomes: Outcome[] }) {
    const [currentStepId, setCurrentStepId] = useState<string>(steps[0].id);
    const [history, setHistory] = useState<string[]>([]);
    const [finalOutcome, setFinalOutcome] = useState<Outcome | null>(null);

    const currentStep = steps.find((s) => s.id === currentStepId);

    const handleOptionClick = (option: Option) => {
        if (option.outcome) {
            const result = outcomes.find((o) => o.id === option.outcome);
            if (result) setFinalOutcome(result);
        } else if (option.nextStep) {
            setHistory([...history, currentStepId]);
            setCurrentStepId(option.nextStep);
        }
    };

    const reset = () => {
        setCurrentStepId(steps[0].id);
        setHistory([]);
        setFinalOutcome(null);
    };

    if (finalOutcome) {
        return (
            <div className={cn(
                "my-8 p-6 rounded-lg border",
                finalOutcome.type === 'success' ? "bg-green-950/20 border-green-900" :
                    finalOutcome.type === 'warning' ? "bg-yellow-950/20 border-yellow-900" :
                        "bg-red-950/20 border-red-900"
            )}>
                <h3 className={cn(
                    "text-xl font-bold mb-4 flex items-center gap-2",
                    finalOutcome.type === 'success' ? "text-green-400" :
                        finalOutcome.type === 'warning' ? "text-yellow-400" :
                            "text-red-400"
                )}>
                    {finalOutcome.type === 'success' ? <CheckCircleIcon className="w-6 h-6" /> : <XCircleIcon className="w-6 h-6" />}
                    {finalOutcome.title}
                </h3>
                <p className="text-zinc-300 mb-6 text-lg">{finalOutcome.recommendation}</p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">Failure Risks</h4>
                        <ul className="space-y-2">
                            {finalOutcome.risks?.map((risk, i) => (
                                <li key={i} className="text-red-400 text-sm flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                                    {risk}
                                </li>
                            )) || <li className="text-zinc-500 text-sm">No specific risks listed.</li>}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">Mitigation Checklist</h4>
                        <ul className="space-y-2">
                            {finalOutcome.mitigation?.map((item, i) => (
                                <li key={i} className="text-zinc-400 text-sm flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                                    {item}
                                </li>
                            )) || <li className="text-zinc-500 text-sm">No specific mitigations listed.</li>}
                        </ul>
                    </div>
                </div>

                <button
                    onClick={reset}
                    className="mt-8 flex items-center text-sm text-zinc-500 hover:text-white transition-colors"
                >
                    <ArrowPathIcon className="w-4 h-4 mr-2" />
                    Restart Analysis
                </button>
            </div>
        );
    }

    if (!currentStep) return <div>Error: Step not found</div>;

    return (
        <div className="my-8 p-8 border border-zinc-800 rounded-lg bg-zinc-900/30">
            <div className="mb-8">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Decision Node: {currentStep.id}</span>
                <h3 className="text-2xl font-bold text-white mt-2">{currentStep.question}</h3>
            </div>
            <div className="space-y-3">
                {currentStep.options.map((option, i) => (
                    <button
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left p-4 rounded border border-zinc-700 hover:border-blue-500 hover:bg-zinc-800 transition-all group"
                    >
                        <span className="block font-medium text-zinc-200 group-hover:text-blue-400">{option.label}</span>
                    </button>
                ))}
            </div>
            {history.length > 0 && (
                <button
                    onClick={() => {
                        const prev = history[history.length - 1];
                        setHistory(history.slice(0, -1));
                        setCurrentStepId(prev);
                    }}
                    className="mt-6 text-xs text-zinc-500 hover:text-zinc-300 underline"
                >
                    Back to previous step
                </button>
            )}
        </div>
    );
}
