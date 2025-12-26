const fs = require('fs');
const path = require('path');

const navigation = [
    {
        title: "1. Software Execution Models",
        items: [
            { title: "Waterfall (Legacy Reality)", href: "/execution-models/waterfall" },
            { title: "V-Model", href: "/execution-models/v-model" },
            { title: "Iterative", href: "/execution-models/iterative" },
            { title: "Incremental", href: "/execution-models/incremental" },
            { title: "Agile (Scrum, Kanban, SAFe)", href: "/execution-models/agile" },
            { title: "DevOps-driven Delivery", href: "/execution-models/devops" },
            { title: "Platform-centric Delivery", href: "/execution-models/platform-centric" },
            { title: "AI-assisted Execution", href: "/execution-models/ai-assisted" },
            { title: "Hybrid Execution Models", href: "/execution-models/hybrid" },
        ],
    },
    {
        title: "2. Estimation & Planning",
        items: [
            { title: "Function Point Analysis", href: "/estimation/function-points" },
            { title: "Story Pointing", href: "/estimation/story-points" },
            { title: "T-Shirt Sizing", href: "/estimation/t-shirt" },
            { title: "COCOMO", href: "/estimation/cocomo" },
            { title: "AI-based Estimation", href: "/estimation/ai-based" },
            { title: "Rolling Wave Planning", href: "/estimation/rolling-wave" },
            { title: "Fixed Bid vs Capacity", href: "/estimation/fixed-vs-capacity" },
        ],
    },
    {
        title: "3. Testing & Quality",
        items: [
            { title: "Shift-left Testing", href: "/testing/shift-left" },
            { title: "Test Pyramid Setup", href: "/testing/test-pyramid" },
            { title: "Automation ROI Myths", href: "/testing/automation-myths" },
            { title: "Manual Testing Reality", href: "/testing/manual-reality" },
            { title: "AI Test Generation", href: "/testing/ai-generation" },
            { title: "UAT Failures", href: "/testing/uat-failures" },
            { title: "Production Validation", href: "/testing/production-validation" },
        ],
    },
    {
        title: "4. AI-Driven Delivery",
        items: [
            { title: "Copilot Reality vs Hype", href: "/ai-delivery/copilot-reality" },
            { title: "Prompt Debt", href: "/ai-delivery/prompt-debt" },
            { title: "AI-generated Bugs", href: "/ai-delivery/ai-bugs" },
            { title: "Guardrails", href: "/ai-delivery/guardrails" },
            { title: "Human-in-the-loop", href: "/ai-delivery/human-in-loop" },
            { title: "Productivity Illusions", href: "/ai-delivery/productivity-illusions" },
        ],
    },
    {
        title: "5. Digital Transformation",
        items: [
            { title: "Why Transformations Fail", href: "/digital-transformation/failure-reasons" },
            { title: "Tool vs Outcome", href: "/digital-transformation/tool-vs-outcome" },
            { title: "Org Resistance", href: "/digital-transformation/org-resistance" },
            { title: "Legacy Gravity", href: "/digital-transformation/legacy-gravity" },
            { title: "Vendor Incentives", href: "/digital-transformation/vendor-incentives" },
        ],
    },
    {
        title: "6. Observability",
        items: [
            { title: "Logging vs Monitoring vs Tracing", href: "/observability/pillars" },
            { title: "Alert Fatigue", href: "/observability/alert-fatigue" },
            { title: "Vanity Dashboards", href: "/observability/vanity-dashboards" },
            { title: "What Leadership Needs", href: "/observability/leadership-needs" },
            { title: "What Engineers Ignore", href: "/observability/engineers-ignore" },
        ],
    },
    {
        title: "7. Domain Playbooks",
        items: [
            { title: "Retail", href: "/domains/retail" },
            { title: "Media", href: "/domains/media" },
            { title: "Telecom", href: "/domains/telecom" },
            { title: "Automotive", href: "/domains/automotive" },
        ],
    },
    {
        title: "8. Failure Case Library",
        items: [
            { title: "Failed Agile Transformations", href: "/failures/agile-failure" },
            { title: "AI Rollouts Gone Wrong", href: "/failures/ai-failure" },
            { title: "DevOps Without Ownership", href: "/failures/devops-failure" },
            { title: "Stalled Platform Teams", href: "/failures/platform-failure" },
            { title: "Trust-Destroying Metrics", href: "/failures/metrics-failure" },
        ],
    },
    {
        title: "9. Comparison Labs",
        items: [
            { title: "Agile vs Hybrid (Telecom)", href: "/comparisons/agile-vs-hybrid-telecom" },
            { title: "AI vs Human QA", href: "/comparisons/ai-vs-human-qa" },
            { title: "Fixed Bid vs Capacity", href: "/comparisons/fixed-vs-capacity" },
            { title: "Centralized vs Product Teams", href: "/comparisons/centralized-vs-product" },
        ],
    },
];

const contentDir = path.join(process.cwd(), 'src/content');

if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
}

navigation.forEach(section => {
    section.items.forEach(item => {
        // item.href is like /execution-models/waterfall
        // We want src/content/execution-models/waterfall.mdx
        const relativePath = item.href.startsWith('/') ? item.href.slice(1) : item.href;
        const fullPath = path.join(contentDir, `${relativePath}.mdx`);
        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const content = `---
title: "${item.title}"
description: "A reality-first analysis of ${item.title}."
---

# ${item.title}

## Executive Summary
This model is often misunderstood. In the real world, it functions differently than in textbooks.

## When It Works
- **Condition 1**: High organizational maturity.
- **Condition 2**: Clear regulatory constraints.

## When It Fails
- **Failure Mode A**: Lack of specialized talent.
- **Failure Mode B**: Vendor lock-in.

## Decision Matrix

| Factor | Rating | Notes |
| :--- | :--- | :--- |
| **Cost** | High | Upfront investment is significant. |
| **Speed** | Medium | Initial velocity is slow due to governance. |
| **Risk** | Low | Predictable if managed correctly. |

## The Regret Test
Companies usually regret this choice when they underestimate the **change management** required.

## Hybrid Alternatives
Most successful implementations blend this with **Iterative** approaches to mitigate risk.
`;

        fs.writeFileSync(fullPath, content);
        console.log(`Created ${fullPath}`);
    });
});
