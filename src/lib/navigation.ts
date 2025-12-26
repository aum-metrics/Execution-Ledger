export type NavItem = {
  title: string;
  href: string;
  items?: NavItem[];
};

export const navigation: NavItem[] = [
  {
    title: "1. Software Execution Models",
    href: "/execution-models",
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
    href: "/estimation",
    items: [
      { title: "Function Point Analysis", href: "/estimation/function-points" },
      { title: "Story Pointing", href: "/estimation/story-points" },
      { title: "T-Shirt Sizing", href: "/estimation/t-shirt" },
      { title: "AI-based Estimation", href: "/estimation/ai-based" },
      { title: "Rolling Wave Planning", href: "/estimation/rolling-wave" },
      { title: "Fixed Bid vs Capacity", href: "/estimation/fixed-vs-capacity" },
    ],
  },
  {
    title: "3. Testing & Quality",
    href: "/testing",
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
    href: "/ai-delivery",
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
    href: "/digital-transformation",
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
    href: "/observability",
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
    href: "/domains",
    items: [
      { title: "Retail", href: "/domains/retail" },
      { title: "Media", href: "/domains/media" },
      { title: "Telecom", href: "/domains/telecom" },
      { title: "Automotive", href: "/domains/automotive" },
    ],
  },
  {
    title: "8. Failure Case Library",
    href: "/failures",
    items: [
      { title: "Failed Agile Transformations", href: "/failures/agile-failure" },
      { title: "AI Rollouts Gone Wrong", href: "/failures/ai-failure" },
      { title: "DevOps Without ownership", href: "/failures/devops-failure" },
      { title: "Stalled Platform Teams", href: "/failures/platform-failure" },
      { title: "Trust-Destroying Metrics", href: "/failures/metrics-failure" },
    ],
  },
  {
    title: "9. Comparison Labs",
    href: "/comparisons",
    items: [
      { title: "Agile vs Hybrid (Telecom)", href: "/comparisons/agile-vs-hybrid-telecom" },
      { title: "AI vs Human QA", href: "/comparisons/ai-vs-human-qa" },
      { title: "Fixed Bid vs Capacity", href: "/comparisons/fixed-vs-capacity" },
      { title: "Centralized vs Product Teams", href: "/comparisons/centralized-vs-product" },
    ],
  },
  {
    title: '10. Cloud Migration',
    href: '/cloud-migration',
    items: [
      { title: 'The Lift & Shift Trap', href: '/cloud-migration/lift-and-shift' },
      { title: 'FinOps Reality', href: '/cloud-migration/finops-reality' },
      { title: 'The Multi-Cloud Myth', href: '/cloud-migration/multi-cloud' },
    ],
  },
];
