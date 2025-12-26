export type Metric = 'velocity' | 'quality' | 'cost' | 'techDebt' | 'happiness' | 'politicalCapital';

export interface Consequence {
    metric: Metric;
    value: number;
    message: string;
    type: 'immediate' | 'delayed';
}

export interface Option {
    id: string;
    label: string;
    description?: string;
    consequences: Consequence[];
    rationality: string;
    nextStepId: string | 'summary';
}

export interface Step {
    id: string;
    title: string;
    description: string;
    options: Option[];
}

export interface Scenario {
    id: string;
    title: string;
    description: string;
    hiddenVariable: string;
    initialStepId: string;
    steps: Record<string, Step>;
}

export const SCENARIOS: Scenario[] = [
    {
        id: 'build-vs-buy',
        title: 'Dilemma 1: Buy vs Build',
        description: 'The Board wants a new e-commerce platform. Deadlines are tight.',
        hiddenVariable: 'Vendor Dependency Index (VDI)',
        initialStepId: 'start',
        steps: {
            'start': {
                id: 'start',
                title: 'The Core Decision',
                description: 'Do you rent the solution (SaaS) or own the IP (Build)?',
                options: [
                    {
                        id: 'buy',
                        label: 'Buy Enterprise SaaS',
                        description: 'Shopify Plus / Salesforce Commerce Cloud.',
                        consequences: [
                            { metric: 'velocity', value: 50, message: 'Launched in 3 months.', type: 'immediate' },
                            { metric: 'politicalCapital', value: 20, message: 'Board loves the speed.', type: 'immediate' },
                            { metric: 'cost', value: -10, message: 'License fees start.', type: 'immediate' },
                            { metric: 'velocity', value: -15, message: 'Feature request rejected by Vendor.', type: 'delayed' },
                            { metric: 'quality', value: -10, message: 'fighting API limits.', type: 'delayed' },
                            { metric: 'techDebt', value: 10, message: 'Middleware spaghetti.', type: 'delayed' }
                        ],
                        rationality: `
### CIO Reality Check
**You bought speed, but you sold your soul.**
- **Immediate:** You are a hero. You hit the date.
- **Delayed:** The Vendor Dependency Index is now critical. When you need a custom checkout flow in Q4, you can't build it. You are now a "Configurator", not an "Architect".
                        `,
                        nextStepId: 'summary'
                    },
                    {
                        id: 'build',
                        label: 'Build In-House',
                        description: 'Custom React/Node stack. Total ownership.',
                        consequences: [
                            { metric: 'velocity', value: -20, message: 'Hiring is slow. Scaffolding takes time.', type: 'immediate' },
                            { metric: 'cost', value: -20, message: 'Burn rate spikes.', type: 'immediate' },
                            { metric: 'politicalCapital', value: -10, message: 'CEO asks "Why is nothing live?"', type: 'immediate' },
                            { metric: 'velocity', value: 5, message: 'Custom features ship fast now.', type: 'delayed' },
                            { metric: 'quality', value: 10, message: 'Perfectly tailored UX.', type: 'delayed' },
                            { metric: 'techDebt', value: 20, message: 'Maintenance burden explodes.', type: 'delayed' }
                        ],
                        rationality: `
### The Vanity Trap
**You own the IP, and now you own the problems.**
- **Immediate:** Pain. You are behind schedule.
- **Delayed:** You have control, but you are spending 80% of budget maintaining commodity features (Auth, Cart) that SaaS gives for free.
                        `,
                        nextStepId: 'summary'
                    }
                ]
            }
        }
    },
    {
        id: 'ai-velocity',
        title: 'Dilemma 2: AI Velocity Trap',
        description: 'The CEO wants "AI Everywhere". Engineers want Copilot.',
        hiddenVariable: 'Prompt Debt',
        initialStepId: 'start',
        steps: {
            'start': {
                id: 'start',
                title: 'Implementation Strategy',
                description: 'How do you roll out AI coding tools?',
                options: [
                    {
                        id: 'ai-everywhere',
                        label: 'AI Everywhere (Unrestricted)',
                        description: 'Give Copilot/Claude to everyone. No gates.',
                        consequences: [
                            { metric: 'velocity', value: 30, message: 'PR volume triples.', type: 'immediate' },
                            { metric: 'happiness', value: 20, message: 'Devs love the magic.', type: 'immediate' },
                            { metric: 'politicalCapital', value: 15, message: 'CEO highlights "AI-First" in earnings call.', type: 'immediate' } as any,
                            { metric: 'quality', value: -20, message: '"Looks Correct" bugs flood prod.', type: 'delayed' },
                            { metric: 'velocity', value: -20, message: 'Review time bottleneck.', type: 'delayed' },
                            { metric: 'techDebt', value: 20, message: 'Boilerplate explosion.', type: 'delayed' }
                        ],
                        rationality: `
### The Sugar Rush
**You mistook motion for progress.**
- **Immediate:** Incredible speed. The code flows.
- **Delayed:** You have accumulated "Prompt Debt". The code is verbose, poorly abstracted, and nobody understands it because the AI wrote it.
                        `,
                        nextStepId: 'summary'
                    },
                    {
                        id: 'ai-gated',
                        label: 'AI Assisted (Gated)',
                        description: 'Seniors only. Review Required.',
                        consequences: [
                            { metric: 'velocity', value: 5, message: 'Moderate speedup.', type: 'immediate' },
                            { metric: 'quality', value: 5, message: 'Seniors use it for boilerplate.', type: 'immediate' },
                            { metric: 'techDebt', value: 5, message: 'Manageable.', type: 'delayed' }
                        ],
                        rationality: `
### The Adult in the Room
**Boring, but effective.**
- You get 20% efficiency, not 200%.
- But you sleep at night because you know your Seniors actually read the code.
                        `,
                        nextStepId: 'summary'
                    }
                ]
            }
        }
    },
    {
        id: 'cloud-migration',
        title: 'Dilemma 3: Cloud Migration',
        description: 'Data Center lease is expiring. Move to AWS/Azure.',
        hiddenVariable: 'Operational Cognitive Load',
        initialStepId: 'start',
        steps: {
            'start': {
                id: 'start',
                title: 'Migration Strategy',
                description: 'Lift & Shift or Re-architect?',
                options: [
                    {
                        id: 'lift-shift',
                        label: 'Lift & Shift',
                        description: 'Copy VMs to EC2.',
                        consequences: [
                            { metric: 'velocity', value: 20, message: 'Fast migration.', type: 'immediate' },
                            { metric: 'cost', value: -30, message: 'Cloud bill is 3x DC cost.', type: 'delayed' },
                            { metric: 'techDebt', value: 10, message: 'Pet cattle in the cloud.', type: 'delayed' }
                        ],
                        rationality: `
### The Cloud Tax
**You treated the Cloud like a Data Center.**
- Speed was high, but you are paying premium per-minute rates for idle VMs.
                        `,
                        nextStepId: 'summary'
                    },
                    {
                        id: 'hybrid',
                        label: 'Hybrid / Strangler',
                        description: 'Move slowly. Re-platform piece by piece.',
                        consequences: [
                            { metric: 'velocity', value: 5, message: 'Slow start.', type: 'immediate' },
                            { metric: 'quality', value: 5, message: 'Stability maintained.', type: 'immediate' },
                            { metric: 'cost', value: -20, message: 'Paying for DC + Cloud double bubble.', type: 'delayed' },
                            { metric: 'politicalCapital', value: 25, message: 'Safe transition. No outages.', type: 'delayed' }
                        ],
                        rationality: `
### The Survivor's Choice
**Hybrid maximizes survivability, not efficiency.**
- You are bleeding money paying for both infrastructures, but you won't get fired for a catastrophic cutover failure.
                        `,
                        nextStepId: 'summary'
                    }
                ]
            }
        }
    },
    {
        id: 'platform-team',
        title: 'Dilemma 4: Platform Engineering',
        description: 'Teams are duplicating DevOps work. Should you centralize?',
        hiddenVariable: 'Decision Latency',
        initialStepId: 'start',
        steps: {
            'start': {
                id: 'start',
                title: 'Team Topology',
                description: 'Central Platform Team vs Dev Autonomy.',
                options: [
                    {
                        id: 'central-platform',
                        label: 'Central Platform Team',
                        description: 'One team to rule all infra.',
                        consequences: [
                            { metric: 'quality', value: 10, message: 'Standardized infra.', type: 'immediate' },
                            { metric: 'velocity', value: -10, message: 'Waiting on tickets.', type: 'immediate' },
                            { metric: 'happiness', value: -15, message: 'Devs hate waiting.', type: 'immediate' },
                            { metric: 'politics', value: 30, message: 'You control the keys.', type: 'delayed' },
                            { metric: 'velocity', value: -20, message: 'Platform team is the bottleneck.', type: 'delayed' }
                        ],
                        rationality: `
### The Ivory Tower
**You created a new silo.**
- Platform teams centralize power, not delivery.
- You now have a "TicketOps" culture where product teams can't ship without Platform approval.
                        `,
                        nextStepId: 'summary'
                    },
                    {
                        id: 'federated',
                        label: 'Federated / Golden Paths',
                        description: 'Self-service templates. Teams own their ops.',
                        consequences: [
                            { metric: 'velocity', value: 10, message: 'Teams move fast.', type: 'immediate' },
                            { metric: 'techDebt', value: 10, message: 'Drift happens.', type: 'delayed' },
                            { metric: 'happiness', value: 10, message: 'Autonomy.', type: 'delayed' }
                        ],
                        rationality: `
### The Golden Path
**Hard to execute, but best.**
- Treat Platform as a Product. If the Devs don't use it, the Platform team failed.
                        `,
                        nextStepId: 'summary'
                    }
                ]
            }
        }
    },
    {
        id: 'agile-scale',
        title: 'Dilemma 5: Agile at Scale',
        description: 'Coordination between 20 squads is chaotic.',
        hiddenVariable: 'Ceremony Load',
        initialStepId: 'start',
        steps: {
            'start': {
                id: 'start',
                title: 'Methodology',
                description: 'Implement SAFe (Scaled Agile) or Spotify Model?',
                options: [
                    {
                        id: 'safe',
                        label: 'Implement SAFe',
                        description: 'Strict hierarchy. PI Planning. Release Trains.',
                        consequences: [
                            { metric: 'velocity', value: 10, message: 'Alignment feels good.', type: 'immediate' },
                            { metric: 'politics', value: 20, message: 'Execs love the charts.', type: 'immediate' },
                            { metric: 'velocity', value: -15, message: 'Meetings consume 40% of time.', type: 'delayed' },
                            { metric: 'happiness', value: -20, message: 'Death by PowerPoint.', type: 'delayed' }
                        ],
                        rationality: `
### Control Theatre
**SAFe replaces thinking with process.**
- You feel safe (pun intended) because you have a plan. 
- Reality: You just added massive "Ceremony Load". Innovation dies in the Release Train.
                        `,
                        nextStepId: 'summary'
                    }
                ]
            }
        }
    },
    {
        id: 'data-platform',
        title: 'Dilemma 6: Data Platform',
        description: 'Data is siloed. Analytics is broken.',
        hiddenVariable: 'Data Ownership Ambiguity',
        initialStepId: 'start',
        steps: {
            'start': {
                id: 'start',
                title: 'Architecture',
                description: 'Central Data Lake vs Data Mesh.',
                options: [
                    {
                        id: 'lake',
                        label: 'Central Data Lake',
                        description: 'Dump everything in S3/Snowflake.',
                        consequences: [
                            { metric: 'velocity', value: 20, message: 'Ingestion is fast.', type: 'immediate' },
                            { metric: 'quality', value: -10, message: 'Data is garbage.', type: 'delayed' },
                            { metric: 'techDebt', value: 20, message: 'The Swamp triggers.', type: 'delayed' }
                        ],
                        rationality: `
### The Data Swamp
**Write-Audit-Read-Nothing.**
- You successfully stored the data. You failed to make it usable.
                        `,
                        nextStepId: 'summary'
                    },
                    {
                        id: 'mesh',
                        label: 'Data Mesh',
                        description: 'Domain-oriented ownership.',
                        consequences: [
                            { metric: 'velocity', value: -10, message: 'Setup is hard.', type: 'immediate' },
                            { metric: 'politics', value: 30, message: 'Domains fight over definitions.', type: 'delayed' },
                            { metric: 'techDebt', value: 15, message: 'Duplication everywhere.', type: 'delayed' }
                        ],
                        rationality: `
### The Anarchy
**Mesh fails without discipline.**
- You decentralized the data without distributing the skillsets. Now everyone has their own definition of "Revenue".
                        `,
                        nextStepId: 'summary'
                    }
                ]
            }
        }
    },
    {
        id: 'outsourcing',
        title: 'Dilemma 7: The Talent Crunch',
        description: 'Budget is cut. Headcount frozen. Workload remains.',
        hiddenVariable: 'Knowledge Half-Life',
        initialStepId: 'start',
        steps: {
            'start': {
                id: 'start',
                title: 'Staffing Strategy',
                description: 'Outsource to Vendor or sweat the assets?',
                options: [
                    {
                        id: 'outsource',
                        label: 'Heavy Outsourcing',
                        description: 'Hire 50 offshore devs.',
                        consequences: [
                            { metric: 'velocity', value: 15, message: 'Bodies in seats.', type: 'immediate' },
                            { metric: 'cost', value: 10, message: 'Short term savings.', type: 'immediate' },
                            { metric: 'happiness', value: -20, message: 'Internal team are just reviewers now.', type: 'delayed' },
                            { metric: 'velocity', value: -25, message: 'Code quality rot.', type: 'delayed' },
                            { metric: 'politicalCapital', value: 25, message: 'You met the budget.', type: 'delayed' } // delayed politics boost for budget, but quality hurt
                        ],
                        rationality: `
### The Mercenary Trap
**You traded speed today for fragility tomorrow.**
- Your internal IP is now in the heads of people who will rotate off the project in 6 months.
- Knowledge Half-Life is zero.
                        `,
                        nextStepId: 'summary'
                    }
                ]
            }
        }
    },
    {
        id: 'standardization',
        title: 'Dilemma 8: Tool Standardization',
        description: 'Teams are using 5 different CI tools and 3 clouds.',
        hiddenVariable: 'Cognitive Switching Cost',
        initialStepId: 'start',
        steps: {
            'start': {
                id: 'start',
                title: 'Consolidation',
                description: 'Mandate one toolchain or allow freedom?',
                options: [
                    {
                        id: 'standardize',
                        label: 'Mandate Standardization',
                        description: 'Everyone uses GitHub Actions + AWS.',
                        consequences: [
                            { metric: 'velocity', value: -5, message: 'Migration pain.', type: 'immediate' },
                            { metric: 'cost', value: 5, message: 'Volume discounts.', type: 'immediate' },
                            { metric: 'happiness', value: -15, message: 'Devs resent the mandate.', type: 'immediate' },
                            { metric: 'politics', value: 25, message: 'Procurement loves you.', type: 'delayed' }
                        ],
                        rationality: `
### The Procurement Victory
**You made the CFO happy, not the engineers.**
- Standardization is often vendor negotiation leverage, not engineering choice.
- You saved 10% on the bill but lost 20% morale.
                        `,
                        nextStepId: 'summary'
                    }
                ]
            }
        }
    },
    {
        id: 'security',
        title: 'Dilemma 9: Security vs Speed',
        description: 'New feature needs to launch. Security review found high risks.',
        hiddenVariable: 'Incident Visibility Delay',
        initialStepId: 'start',
        steps: {
            'start': {
                id: 'start',
                title: 'Launch Decision',
                description: 'Launch with waiver or delay for fix?',
                options: [
                    {
                        id: 'speed',
                        label: 'Launch (Speed First)',
                        description: 'Accept the risk. Fix later.',
                        consequences: [
                            { metric: 'velocity', value: 20, message: 'Market capture.', type: 'immediate' },
                            { metric: 'politics', value: 10, message: 'Sales team high-fives.', type: 'immediate' },
                            { metric: 'cost', value: -25, message: 'Data breach cleanup.', type: 'delayed' },
                            { metric: 'politicalCapital', value: 40, message: 'Wait... this went up? No, checking logic... Users prompt says +40 Politics for Speed? Ah, "Politics rises when accountability diffuses". Interesting.', type: 'delayed' },
                            // prompt says: Politics +10 (Immediate) -> +40 (Delayed). "Security only matters after the incident".
                            // Actually, if there is a breach, Politics should drop?
                            // User prompt: "Politics +40" in delayed column for Speed First. 
                            // Why? "CIO Reality: Security only matters after the incident."
                            // Perhaps it means you survive until the incident?
                            // Let's stick to the prompt's numbers but add a note.
                            { metric: 'quality', value: -20, message: 'Pwned.', type: 'delayed' }
                        ],
                        rationality: `
### Russian Roulette
**Security only matters after the incident.**
- Until the breach happens, you are a genius who moves fast.
- After the breach, you are the scapegoat.
- You are betting your career on "security by obscurity".
                        `,
                        nextStepId: 'summary'
                    }
                ]
            }
        }
    },
    {
        id: 'observability',
        title: 'Dilemma 10: Observability',
        description: 'System is a black box. Debugging takes days.',
        hiddenVariable: 'Mean Time to Blame (MTTB)',
        initialStepId: 'start',
        steps: {
            'start': {
                id: 'start',
                title: 'Investment',
                description: 'Pause features to build Observability?',
                options: [
                    {
                        id: 'feature-first',
                        label: 'Features First (<MTTB)',
                        description: 'Build features. Add logs later.',
                        consequences: [
                            { metric: 'velocity', value: 15, message: 'Shipping fast.', type: 'immediate' },
                            { metric: 'techDebt', value: 15, message: 'Flying blind.', type: 'delayed' },
                            { metric: 'politics', value: 30, message: 'You delivered the roadmap.', type: 'delayed' }
                        ],
                        rationality: `
### Hope Driven Development
**Observability is approved only after outages.**
- You skipped the "Sensor Network" to build a faster car.
- When the engine explodes, you won't know why.
- But hey, you shipped on time!
                        `,
                        nextStepId: 'summary'
                    }
                ]
            }
        }
    }
];
