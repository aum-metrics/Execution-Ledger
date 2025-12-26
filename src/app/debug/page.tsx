import { DecisionMatrix } from '@/components/DecisionMatrix';

export default function DebugPage() {
    const data = [
        { name: "Safety Criticality", weight: 5, score: 5, note: "Essential for ISO 26262/IEC 62304" },
        { name: "Hardware Integration", weight: 4, score: 5, note: "Hardware leads times dictate software gates" },
        { name: "Market Speed", weight: 3, score: 1, note: "Very slow. Do not use for consumer apps" }
    ];

    return (
        <div className="p-10">
            <h1>Debug DecisionMatrix</h1>
            <DecisionMatrix
                id="v-model"
                title="Decision: Should you use V-Model?"
                factors={data}
            />
        </div>
    );
}
