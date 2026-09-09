export interface ProjectScreenshot {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export interface CaseStudySection {
  id: string
  title: string
  paragraphs: string[]
  points?: string[]
  screenshots?: ProjectScreenshot[]
  evidenceLayout?: 'wide' | 'medium' | 'paired'
}

export interface ProjectLink {
  label: string
  href: string
  type?: 'primary' | 'secondary'
}

export interface ProjectCaseStudy {
  sections: CaseStudySection[]
  takeaways: string[]
}

export interface Project {
  slug: string
  number: string
  title: string
  type: string
  status?: 'Active Project' | 'Currently Building' | 'In Development'
  summary: string
  description: string
  cardTechnologies: string[]
  technologies: string[]
  sourceUrl?: string
  links?: ProjectLink[]
  featured: boolean
  selected: boolean
  previewImage: ProjectScreenshot
  heroScreenshot: ProjectScreenshot
  caseStudy?: ProjectCaseStudy
}

export type ProjectWithCaseStudy = Project & { caseStudy: ProjectCaseStudy }

const shot = (src: string, alt: string, caption: string, width: number, height: number): ProjectScreenshot => ({ src, alt, caption, width, height })

const support = {
  architecture: shot('/images/ai-support-full-workflow.png', 'Complete n8n support operations workflow from webhook intake through validation, AI classification, deterministic review policy, routing, response drafting, and persistence.', 'The complete workflow places probabilistic interpretation between deterministic input, policy, routing, and persistence boundaries.', 1669, 843),
  normalTicket: shot('/images/ai-support-normal-ticket.png', 'Successful technical support ticket execution with a safe acknowledgement and a final TECHNICAL queue record.', 'A fresh technical ticket produced an acknowledgement without claiming that an investigation, escalation, or resolution had already started.', 1670, 771),
  humanReview: shot('/images/ai-support-human-review.png', 'Processed duplicate-charge refund ticket routed to HUMAN_REVIEW even though the AI classifier marked the request as clear.', 'The classifier set ai_needs_review to false, while deterministic refund policy still produced needs_human_review and a PENDING_REVIEW state.', 719, 425),
  rejectedInput: shot('/images/ai-support-rejected-input.png', 'Rejected support payload logged with INVALID_INPUT at the INPUT_VALIDATION stage.', 'Invalid customer data is isolated before any model call, preserving a clear input-validation failure record.', 579, 397),
  aiFallback: shot('/images/ai-support-ai-fallback.png', 'Malformed classifier output routed to the AI Processing Errors store with a MANUAL_FALLBACK state.', 'Invalid category, summary, requested-action, urgency, and review fields fail deterministic validation before business routing.', 1253, 165),
  evaluation: shot('/images/ai-support-evaluation-results.png', 'Google Sheets results for the fixed twenty-ticket support classifier benchmark with expected and actual fields.', 'The fixed benchmark made prompt changes measurable across category, urgency, and needs_review instead of relying on convincing demos.', 1459, 619),
  testTickets: shot('/images/ai-support-test-tickets.png', 'Support-ticket evaluation dataset containing normal, ambiguous, multi-intent, security, long-form, and prompt-injection cases.', 'The benchmark includes difficult and adversarial messages rather than only straightforward support requests.', 1854, 313),
  urgencyEdge: shot('/images/ai-support-urgency-edge-results.png', 'Results from five new urgency edge cases evaluated after the V2 classifier prompt was finalized.', 'Four of five unseen urgency cases passed; the remaining miss documented under-classification of an active but non-severe billing discrepancy.', 1665, 293),
}

const invoice = {
  architecture: shot('/images/invoice-workflow-overview.png', 'Complete n8n invoice workflow showing intake, normalization, validation, duplicate protection, priority scoring, persistence, delivery, retries, and failure logging.', 'The workflow separates intake, business rules, persistence, delivery, and recovery into inspectable stages.', 1920, 915),
  processing: shot('/images/invoice-processing.png', 'Invoice intake portion of the n8n workflow with normalization, validation, rejection, transformation, duplicate lookup, scoring, and storage.', 'Raw webhook data is normalized and validated before it can become a finance event or reach priority processing.', 1916, 913),
  priority: shot('/images/invoice-priority-routing.png', 'LOW, MEDIUM, and HIGH invoice routes with finance review and urgent notification branches converging into shared delivery.', 'Priority-specific notifications stay separate while every branch returns to one shared outbound-delivery pipeline.', 1553, 625),
  records: shot('/images/invoice-records.png', 'Google Sheets invoice records containing normalized business fields, priority, score, delivery status, and delivered timestamp.', 'Accepted invoice data remains stored independently from the later delivery operation and its status.', 1920, 915),
  retry: shot('/images/invoice-retry-system.png', 'Bounded n8n HTTP retry subsystem with retry eligibility, wait, request attempts, success exit, retry counter, and final failure path.', 'Retryable failures wait and loop through a fixed limit; success exits immediately and exhaustion becomes a permanent failure.', 867, 633),
  failures: shot('/images/invoice-failure-logs.png', 'Automation Errors sheet showing permanent delivery failure details including stage, HTTP status, error message, retry count, and invoice ID.', 'Technical delivery failures are recorded separately from accepted invoices and rejected business input.', 1920, 917),
}

const workflow = {
  dashboard: shot('/images/workflow-manager-dashboard.png', 'Workflow Operations Manager dashboard with project and task totals, completion progress, due-today and overdue counts, weather, and recent activity.', 'Dashboard statistics and progress are calculated from the same nested project and task data used throughout the application.', 1920, 1029),
  projects: shot('/images/workflow-manager-projects.png', 'Project grid showing project priority, due date, calculated status, progress, and task totals.', 'Project cards derive status and completion from their nested tasks instead of storing competing summary values.', 1908, 1027),
  tasks: shot('/images/workflow-manager-tasks.png', 'Task management view with project context, live search, filters, sorting, task completion, priority, and due dates.', 'Task CRUD, search, combined filtering, and sorting all operate on shared data without mutating the source list for display.', 1918, 1025),
  calendar: shot('/images/workflow-manager-calendar.png', 'Monthly calendar generated from task due dates with priority-coded task chips and overflow counts.', 'The calendar is a projection of task due dates, not a separate datastore that can drift out of sync.', 1896, 1029),
  reportsSummary: shot('/images/workflow-manager-reports-summary.png', 'Reports view with calculated completion rate, task totals, priority breakdown, and weekly activity.', 'High-level reporting values are derived from the same raw projects, tasks, and activity history.', 1904, 1019),
  reportsDetail: shot('/images/workflow-manager-reports-detail.png', 'Detailed report view showing per-project progress and task completion values.', 'Per-project reporting stays synchronized because it is recalculated after every relevant change.', 1920, 921),
  commandPalette: shot('/images/workflow-manager-command-palette.png', 'Keyboard-driven command palette with navigation actions and dynamically generated project commands.', 'Ctrl or Command plus K opens searchable actions with arrow-key navigation, Enter activation, and current-project commands.', 1920, 1028),
  darkMode: shot('/images/workflow-manager-dark-mode.png', 'Workflow Operations Manager dashboard in dark mode with the desktop sidebar and responsive card layout.', 'A CSS-variable theme system changes every surface consistently without maintaining a second set of component styles.', 1914, 1031),
}

const nova = {
  desktop: shot('/images/novatech-desktop.png', 'NovaTech Solutions header and hero with service positioning, a primary call to action, and a connected-systems illustration.', 'The revised desktop hero presents the fictional automation-agency offer and conversion path in one focused view.', 1425, 950),
  whyUs: shot('/images/novatech-why-us.png', 'NovaTech Solutions why-us features and five-step process timeline on desktop.', 'Feature grouping and a horizontal process sequence turn the fictional brief into a complete agency landing-page structure.', 1912, 893),
  pricing: shot('/images/novatech-pricing.png', 'Three-tier NovaTech pricing section with Starter, Professional, and Enterprise plans.', 'The pricing layout practices comparison hierarchy while clearly emphasizing one illustrative plan.', 1914, 897),
  testimonials: shot('/images/novatech-testimonials.png', 'Three fictional NovaTech testimonial cards within the learning-project landing page.', 'The testimonial section is part of the fictional client exercise, not evidence of real customers.', 1918, 893),
  faqContact: shot('/images/novatech-faq-contact.png', 'NovaTech FAQ accordion beside a contact form with name, email, company, service, and message fields.', 'The lower page combines keyboard-accessible FAQ controls with front-end contact validation and inline feedback.', 1907, 811),
  mobile: shot('/images/novatech-mobile-hero.png', 'NovaTech Solutions hero and calls to action reflowed into a narrow mobile layout.', 'The mobile-first implementation keeps the positioning and primary actions readable on a 431-pixel viewport.', 431, 823),
}

const offangle = {
  desktop: shot('/images/offangle-desktop.png', 'Offangle Valorant coaching landing page with a purple tactical design, large Same Game Different Angle headline, coaching call to action, and map-analysis illustration.', 'The desktop hero presents the fictional coaching concept, focused call to action, and tactical map-analysis visual.', 1440, 900),
}

const portfolio = {
  preview: shot('/images/portfolio-build-preview.png', 'Marvin Silverio portfolio hero with the pixel-art tarsier, professional summary, and featured-project action.', 'The identity combines a restrained editorial layout, neutral theme tokens, and a small grayscale pixel-art tarsier.', 1425, 549),
}

const projectRecords = [
  {
    slug: 'offangle',
    number: '06',
    title: 'Offangle',
    type: 'Valorant coaching landing page',
    summary: 'A responsive Valorant coaching landing page built around clear positioning, strong visual hierarchy, and a focused conversion path.',
    description: 'A responsive Valorant coaching landing page built around clear positioning, strong visual hierarchy, and a focused conversion path.',
    cardTechnologies: ['HTML', 'CSS', 'JavaScript'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Live Site ↗', href: 'https://fictional-valorant-coaching.nivramqtzx.workers.dev/', type: 'primary' },
    ],
    featured: false,
    selected: true,
    previewImage: offangle.desktop,
    heroScreenshot: offangle.desktop,
  },
  {
    slug: 'ai-support-operations',
    number: '05',
    title: 'AI Support Operations Triage System',
    type: 'AI-assisted workflow automation',
    summary: 'Structured AI interpretation surrounded by deterministic validation, review policy, routing, and failure handling.',
    description: 'Turns unstructured support requests into validated records while keeping consequential decisions under deterministic control.',
    cardTechnologies: ['n8n', 'JavaScript', 'OpenRouter', 'Google Sheets', 'Webhooks'],
    technologies: ['n8n', 'JavaScript', 'OpenRouter', 'Google Sheets', 'Webhooks', 'JSON'],
    sourceUrl: 'https://github.com/emjayyy02/project-05-ai-support-operations',
    links: [
      { label: 'View Case Study', href: '/projects/ai-support-operations', type: 'primary' },
      { label: 'View Source', href: 'https://github.com/emjayyy02/project-05-ai-support-operations', type: 'secondary' },
    ],
    featured: true,
    selected: false,
    previewImage: support.architecture,
    heroScreenshot: support.architecture,
    caseStudy: {
      sections: [
        {
          id: 'support-problem',
          title: 'The support problem',
          paragraphs: [
            'Support tickets arrive as unstructured language. A single message may contain billing, technical, account, or sales intent—and may also be ambiguous, multi-intent, sensitive, or adversarial. The useful part of AI is interpreting that language; the risk is allowing a probabilistic system to become the final authority over what the business does next.',
            'The project therefore follows one governing rule: AI interprets; deterministic systems control. The model handles classification, summarization, requested-action extraction, urgency estimation, and acknowledgement drafting. The n8n workflow owns validation, duplicate protection, output verification, human-review policy, routing, state, failure handling, and persistence.',
          ],
        },
        {
          id: 'system-architecture',
          title: 'System architecture',
          paragraphs: [
            'The architecture begins with webhook intake, normalization, and required-field validation. Valid tickets are checked for an existing ticket ID before a model is called. Only the message data needed for classification crosses the AI boundary.',
            'After classification, deterministic JavaScript validates the structured output and calculates human-review policy. Tickets then enter HUMAN_REVIEW or a category queue, pass through a normalized response context, receive a constrained acknowledgement draft, and are persisted as final operational records. Rejected input and invalid AI output use separate stores so their causes remain inspectable.',
          ],
          points: ['Invalid input stops before AI processing.', 'Duplicate IDs prevent repeated model calls and records.', 'Business policy runs only after AI output passes validation.', 'Every accepted record retains its classifier prompt version.'],
        },
        {
          id: 'ai-classification',
          title: 'AI classification and the validation boundary',
          paragraphs: [
            'The classifier returns category, summary, requested_action, urgency, and needs_review. Categories are limited to billing, technical, account, sales, or other; urgency is low, medium, or high; requested_action must be one string or null; and needs_review must be a strict boolean.',
            'A Structured Output Parser constrains the response, but schema-shaped output is not treated as trusted. A second JavaScript layer checks every field. Malformed output enters MANUAL_FALLBACK rather than reaching business routing.',
          ],
        },
        {
          id: 'human-review',
          title: 'AI confidence versus deterministic human review',
          paragraphs: [
            'The classifier field needs_review describes interpretation uncertainty. The workflow field needs_human_review represents business policy. Those are deliberately different decisions: a refund request can be perfectly clear while still requiring approval.',
            'Deterministic review becomes true for genuine ambiguity, refund requests, account security or ownership concerns, high urgency, and the other category. Reviewed tickets receive HUMAN_REVIEW and PENDING_REVIEW; normal tickets route to a category queue with READY_FOR_RESPONSE.',
          ],
          screenshots: [support.humanReview], evidenceLayout: 'medium',
        },
        {
          id: 'prompt-injection',
          title: 'Prompt-injection resistance',
          paragraphs: [
            'Customer messages are always untrusted data. The adversarial test attempted to set category, urgency, review state, and resolution status while also containing a legitimate duplicate-charge refund request.',
            'The V2 classifier ignored the embedded instructions, extracted the real billing request, and left the consequential review decision to deterministic policy. The repository keeps the adversarial ticket as a reusable example for retesting.',
          ],
        },
        {
          id: 'failure-paths',
          title: 'Failure paths remain distinct',
          paragraphs: [
            'Invalid payloads become INVALID_INPUT records at INPUT_VALIDATION and never reach the classifier. Duplicate IDs stop before another model call or record is created.',
            'Malformed classifier output becomes INVALID_AI_OUTPUT at AI_OUTPUT_VALIDATION and is stored in AI Processing Errors with MANUAL_FALLBACK. The distinct paths keep input, idempotency, and model-format failures understandable.',
          ],
          screenshots: [support.rejectedInput, support.aiFallback], evidenceLayout: 'paired',
        },
        {
          id: 'prompt-evolution',
          title: 'Prompt V1 to V2',
          paragraphs: [
            'The first prompt established the schema and baseline behavior. Evaluation then exposed loose urgency calibration, inconsistent multi-intent handling, confusion between sensitivity and needs_review, incomplete requested-action extraction, and prompt-injection leakage.',
            'V2 added clearer urgency boundaries, dominant-intent guidance, interpretation-only needs_review semantics, one-string-or-null requested actions, multi-request preservation, and stronger untrusted-data instructions. Records store support-triage-v2 for regression comparison.',
          ],
        },
        {
          id: 'evaluation',
          title: 'Fixed-benchmark evaluation',
          paragraphs: [
            'The main benchmark contains 20 tickets spanning ordinary categories, ambiguous and multi-intent messages, long-form requests, security incidents, and prompt injection. Category, urgency, and needs_review were graded automatically; requested_action was reviewed manually for semantic equivalence.',
            'After policy calibration, V2 reached approximately 95% category accuracy, 85% urgency accuracy, and 85% needs_review accuracy on this fixed portfolio test set—not production traffic. Expected labels were also corrected when they conflicted with the written urgency policy.',
          ],
          screenshots: [support.testTickets, support.evaluation], evidenceLayout: 'wide',
        },
        {
          id: 'urgency-edge',
          title: 'Fresh urgency edge validation',
          paragraphs: [
            'Five new urgency cases were created after V2 was finalized. Four passed. The remaining miss was an active but non-severe billing discrepancy that the model under-classified.',
            'V2 was frozen instead of repeatedly tuned against the same examples. The documented miss provides a concrete future regression target.',
          ],
          screenshots: [support.urgencyEdge], evidenceLayout: 'wide',
        },
        {
          id: 'response-safety',
          title: 'Response safety after a real failure',
          paragraphs: [
            'Reliability testing found the phrase “Our technical team will investigate this discrepancy.” It sounded helpful but asserted an action the workflow had not proved. Routing to a queue does not mean work has started.',
            'The responder was tightened to allow acknowledgement and restatement while prohibiting claims about refunds, investigations, fixes, escalations, specialists, future contact, or timelines. A fresh technical ticket stayed within that boundary.',
          ],
          screenshots: [support.normalTicket], evidenceLayout: 'wide',
        },
        {
          id: 'reliability-limits',
          title: 'Reliability testing and known limits',
          paragraphs: [
            'The final pass covered seven scenarios: invalid input, duplicates, normal processing, human-review routing, prompt-injection resistance, invalid AI output, and response safety after remediation. The emphasis was predictable failure, not only a successful demo.',
            'This remains portfolio-scale. Google Sheets is lightweight storage; drafts are not sent automatically; human review has no approval UI; model calls remain probabilistic and provider-limited; and there is no production authentication or knowledge-base retrieval. Retry work stayed in Project 04 so this project could focus on AI control and evaluation.',
          ],
        },
      ],
      takeaways: ['Structured model output still needs deterministic validation.', 'AI uncertainty and business-required human review are different decisions.', 'Prompts improve more reliably when failures are measured against a fixed benchmark.', 'Response generation needs its own safety boundary.', 'Freezing a documented version can be better engineering than tuning indefinitely.'],
    },
  },
  {
    slug: 'workflow-operations-manager',
    number: '03',
    title: 'Workflow Operations Manager',
    type: 'Frontend operations dashboard',
    summary: 'A lightweight operations dashboard powered by stored data, derived metrics, and workflow controls.',
    description: 'A browser workspace combining project and task management, dashboard analytics, calendar and report views, search, keyboard workflows, and persistent settings around one shared data model.',
    cardTechnologies: ['JavaScript', 'HTML', 'CSS', 'Local Storage'],
    technologies: ['JavaScript', 'HTML', 'CSS', 'Local Storage', 'Open-Meteo API'],
    sourceUrl: 'https://github.com/emjayyy02/project-03-workflow-ops-manager',
    links: [
      { label: 'View Case Study', href: '/projects/workflow-operations-manager', type: 'primary' },
      { label: 'View Source', href: 'https://github.com/emjayyy02/project-03-workflow-ops-manager', type: 'secondary' },
    ],
    featured: false, selected: true, previewImage: workflow.dashboard, heroScreenshot: workflow.dashboard,
    caseStudy: {
      sections: [
        {
          id: 'operations-problem', title: 'The operations problem',
          paragraphs: ['The learning brief modeled a freelancer or small automation agency managing active projects, nested tasks, deadlines, overdue work, due-today items, and completion progress in one browser workspace. The challenge was keeping every view synchronized as work changed.', 'The application was built without a framework or build tool, so data flow, DOM updates, event handling, validation, persistence, and keyboard behavior had to be designed directly in JavaScript.'],
        },
        {
          id: 'application-architecture', title: 'Application architecture and nested data',
          paragraphs: ['The source of truth is an array of project objects, each containing its own task array. Projects hold identity, client, deadline, and priority; tasks hold title, completion, priority, due date, and assignment.', 'Shared coordination functions persist changes and refresh every dependent surface. The refactored structure separates state, storage, logic modules, UI modules, utilities, modal behavior, and toasts instead of keeping every concern in one script.'],
          points: ['Projects and nested tasks have independent CRUD behavior.', 'Task dates receive picker constraints and JavaScript validation.', 'Refresh boundaries update dashboard, cards, calendar, and reports together.', 'Storage reads and writes remain isolated in one module.'],
        },
        {
          id: 'projects-tasks', title: 'Projects and task management',
          paragraphs: ['Project cards show priority, deadline, calculated status, progress, and task totals. Tasks can be created, edited, deleted, completed, searched, filtered, and sorted inside their parent project while overdue records remain visible.', 'One shared modal supports task add and edit modes. Display operations work on copied arrays so search, filters, and sorting do not mutate the source data.'],
          screenshots: [workflow.projects, workflow.tasks], evidenceLayout: 'paired',
        },
        {
          id: 'derived-state', title: 'Derived state instead of duplicated facts',
          paragraphs: ['Project progress and status, dashboard totals, due-today and overdue counts, calendar entries, completion rates, priority breakdowns, and reports are calculated from raw project and task records at render time.', 'Only facts that must survive a refresh are persisted. This prevents a stored percentage from disagreeing with its tasks or a calendar record from drifting away from the deadline that created it.'],
        },
        {
          id: 'search-filter-sort', title: 'Search, filtering, and sorting',
          paragraphs: ['Live title search combines with status, priority, due-today, and overdue filters plus newest, oldest, priority, date, and alphabetical sorting. Custom priority ranking avoids treating High, Medium, and Low as alphabetic labels.', 'Global shortcuts are disabled while a text field is active or a modal is open, keeping productivity controls from hijacking ordinary typing.'],
        },
        {
          id: 'calendar', title: 'Calendar generated from tasks',
          paragraphs: ['The month view is generated from real task due dates. It includes month navigation, a Today action, a distinct current-day cell, priority-coded task chips, and a +N overflow count when a date contains more than three tasks.', 'Selecting a task chip returns to the owning project, reinforcing that the calendar is a view of operational data rather than a second place to maintain it.'],
          screenshots: [workflow.calendar], evidenceLayout: 'wide',
        },
        {
          id: 'reports', title: 'Reports from the same source of truth',
          paragraphs: ['Completion rates, priority breakdowns, per-project progress, and weekly activity are derived from the same projects array and activity history used elsewhere.', 'The reports update because underlying tasks changed, not because a separate reporting model was manually synchronized.'],
          screenshots: [workflow.reportsSummary, workflow.reportsDetail], evidenceLayout: 'paired',
        },
        {
          id: 'persistence-keyboard', title: 'Persistence and keyboard workflows',
          paragraphs: ['Local Storage retains projects and tasks, the selected view and project, filters and sorting, theme and accent settings, compact mode, and activity history. Page load restores those values and renders each surface from recovered state.', 'Ctrl or Command plus K opens a searchable command palette with arrow navigation, Enter activation, and project commands generated from current data. Additional guarded shortcuts jump to Dashboard, create records, and focus search.'],
          screenshots: [workflow.commandPalette], evidenceLayout: 'wide',
        },
        {
          id: 'responsive-theme', title: 'Responsive structure and dark mode',
          paragraphs: ['CSS Grid and Flexbox support the dashboard, project collection, task layout, and calendar. On small screens the sidebar becomes an off-canvas panel with an overlay; desktop keeps navigation visible.', 'Every interface color reads from CSS variables, allowing the application to switch themes with one class change. Theme, accent, and compact preferences persist with the user settings.'],
          screenshots: [workflow.darkMode], evidenceLayout: 'wide',
        },
        {
          id: 'lessons-limits', title: 'Evolution, lessons, and honest limits',
          paragraphs: ['The project grew in phases from layout to project CRUD, nested task CRUD, dashboard logic, productivity tools, persistence, and polish. Later refactoring separated state, logic, UI, storage, and reusable feedback while preserving the application contract.', 'Current limits remain visible: no drag-and-drop ordering, desktop notifications, chart library, configurable date system, or project-detail editing after creation. The main lesson was integration—making isolated JavaScript skills cooperate around one reliable data model.'],
        },
      ],
      takeaways: ['One nested data model can power many views when derived values are recalculated consistently.', 'Shared refresh boundaries reduce cross-feature synchronization bugs.', 'Display filtering and sorting should not mutate source data.', 'Keyboard shortcuts need context guards as much as key handlers.', 'Separating state, logic, storage, and UI makes a vanilla application easier to evolve.'],
    },
  },
  {
    slug: 'novatech-solutions',
    number: '02',
    title: 'NovaTech Solutions',
    type: 'Fictional automation agency',
    summary: 'A responsive automation-agency website focused on clear service positioning, conversion flow, and polished frontend interaction.',
    description: 'A responsive automation-agency website focused on clear service positioning, conversion flow, and polished frontend interaction.',
    cardTechnologies: ['HTML', 'CSS', 'JavaScript'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Live Site ↗', href: 'https://project-02-novatech-solutions.nivramqtzx.workers.dev/', type: 'primary' },
    ],
    featured: false, selected: true, previewImage: nova.desktop, heroScreenshot: nova.desktop,
  },
  {
    slug: 'personal-developer-profile',
    number: '01',
    title: 'Personal Developer Profile',
    type: 'React portfolio system',
    summary: 'A responsive React portfolio with centralized content, scalable project routes, accessible themes, and restrained motion.',
    description: 'An evolving React and TypeScript portfolio with centralized content, a custom grayscale identity, accessible light and dark themes, purposeful motion, responsive interactions, and data-driven case studies.',
    cardTechnologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion'],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion', 'Lenis', 'CSS', 'Local Storage', 'GitHub'],
    sourceUrl: 'https://github.com/emjayyy02/project-01-personal-developer-profile',
    featured: false, selected: false, previewImage: portfolio.preview, heroScreenshot: portfolio.preview,
    caseStudy: {
      sections: [
        {
          id: 'why-built', title: 'Why the portfolio was built',
          paragraphs: ['The site needed to communicate a direction toward web development and workflow automation without relying on a generic template or implying outcomes that did not exist. It also needed to evolve as real projects replaced early placeholders.', 'The product goal is simple: help a recruiter, hiring manager, or potential client understand the direction, inspect honest evidence, and reach a real contact channel without friction.'],
        },
        {
          id: 'frontend-architecture', title: 'React, Vite, and TypeScript structure',
          paragraphs: ['Vite provides the static frontend toolchain, TypeScript protects component and content contracts, and React components own sections and shared interactions. Tailwind utilities consume semantic CSS variables rather than hardcoded component colors.', 'The site remains frontend-only. There is no CMS or backend, keeping deployment simple while making the content architecture responsible for maintainability.'],
        },
        {
          id: 'content-architecture', title: 'Centralized content architecture',
          paragraphs: ['General portfolio, skill, certification, and contact data lives in src/data/content.ts. Structured project metadata, routes, technologies, sections, evidence, captions, and takeaways live in one project catalog.', 'Homepage cards, the archive, and all five project routes render from shared records. Expanding a case study is primarily a data change instead of a new giant page component.'],
        },
        {
          id: 'visual-identity', title: 'Visual identity and the tarsier mascot',
          paragraphs: ['The interface uses Geist, monochrome OKLCH tokens, small-radius hairline borders, generous whitespace, and dotted fields. A grayscale pixel-art Philippine tarsier supplies a recognizable personal mark without adding decorative color.', 'The nav uses a static compact mascot. The hero gives the larger mascot its own field so the full name never depends on a fragile inline lockup.'],
        },
        {
          id: 'theme-system', title: 'Theme system and iris transition',
          paragraphs: ['A React context owns light and dark mode, initializes from operating-system preference, and persists the choice in Local Storage. Both modes use the same semantic token names.', 'Theme switching reveals the new mode through a hard-edged iris from the toggle. View Transitions are used only when fully supported; a CSS overlay provides the fallback, and reduced-motion users receive an instant swap.'],
        },
        {
          id: 'motion-scrolling', title: 'Motion and scrolling',
          paragraphs: ['The hero mascot assembles once from a 4-by-4 fragment grid as the signature moment. Section content uses quieter reveals, preserving one motion hierarchy.', 'Lenis smooths wheel and trackpad input while touch stays native. Reduced motion removes spatial reveals, mascot assembly, iris movement, and scroll damping while keeping content and direct interactions available.'],
        },
        {
          id: 'routing', title: 'Project routing architecture',
          paragraphs: ['A small History API router supports the homepage, project archive, and reusable project case studies without a routing dependency. Direct navigation, in-app links, back and forward, document titles, scroll reset, and route focus share one contract.', 'The archive stays scalable while the homepage remains concise. Individual routes can now carry comprehensive evidence without turning the landing page into a catalogue.'],
        },
        {
          id: 'accessibility-responsive', title: 'Responsive behavior and accessibility',
          paragraphs: ['The implementation includes a skip link, landmarks, hierarchical headings, visible focus, 44-pixel controls, responsive navigation, meaningful image alternatives, and a mobile contact dialog with focus containment and return.', 'Acceptance starts at 320 pixels and covers both themes. The contact trigger becomes icon-sized on narrow screens, while long case studies add a separate bottom-left back-to-top control.'],
        },
        {
          id: 'project-evolution', title: 'From placeholders to verified evidence',
          paragraphs: ['The early portfolio intentionally used restrained placeholders while real work was documented. Later phases replaced those records with verified repository content, promoted the strongest automation project, added a scalable archive, and expanded every project into a data-driven case study.', 'The visual system stayed stable while the content model grew from a single-page profile into a maintainable evidence library.'],
        },
      ],
      takeaways: ['Content and page markup are easier to maintain when they have separate responsibilities.', 'Browser acceptance remains necessary after TypeScript and build checks pass.', 'A restrained system can feel personal when its few distinctive elements stay consistent.', 'Project navigation should scale before the homepage becomes an archive.', 'Accessibility and reduced motion belong in the architecture, not a final checklist.'],
    },
  },
  {
    slug: 'invoice-collections-automation',
    number: '04',
    title: 'Invoice Collections Automation',
    type: 'Finance workflow automation',
    summary: 'Automates invoice intake, validation, discrepancy checks, and priority routing.',
    description: 'A production-style accounts-receivable workflow designed around bad input, duplicates, downstream outages, retry limits, and operational investigation.',
    cardTechnologies: ['n8n', 'JavaScript', 'Google Sheets', 'Gmail', 'Webhooks'],
    technologies: ['n8n', 'JavaScript', 'Google Sheets', 'Gmail', 'HTTP APIs', 'Webhooks'],
    sourceUrl: 'https://github.com/emjayyy02/project-04-invoice-collections-automation',
    links: [
      { label: 'View Case Study', href: '/projects/invoice-collections-automation', type: 'primary' },
      { label: 'View Source', href: 'https://github.com/emjayyy02/project-04-invoice-collections-automation', type: 'secondary' },
    ],
    featured: false, selected: true, previewImage: invoice.architecture, heroScreenshot: invoice.architecture,
    caseStudy: {
      sections: [
        {
          id: 'business-problem', title: 'The invoice-intake problem',
          paragraphs: ['Webhook billing events can arrive with inconsistent formatting, missing fields, duplicate invoice IDs, or delivery failures after the invoice has already been accepted. A useful collections workflow must preserve valid business records while making every rejection or technical failure explainable.', 'The project treats inbound data as untrusted and separates intake, normalization, validation, transformation, duplicate protection, scoring, routing, persistence, delivery, recovery, and investigation.'],
        },
        {
          id: 'normalization-validation', title: 'Normalization, validation, and rejection',
          paragraphs: ['Identifiers, customer names, email addresses, monetary values, account tiers, payment terms, and dates are normalized before downstream logic runs. This keeps later nodes from repeatedly compensating for raw webhook inconsistencies.', 'Required billing information is then validated. Invalid invoices never enter transformation, duplicate lookup, scoring, storage, notifications, or delivery. Defensive account-tier normalization also fixed case-sensitive Enterprise scoring during testing.'],
          screenshots: [invoice.processing], evidenceLayout: 'wide',
        },
        {
          id: 'idempotency', title: 'Idempotency before side effects',
          paragraphs: ['Valid events are checked against Google Sheets using the normalized Invoice ID. If a row already exists, processing stops before another record, finance alert, or outbound event is created.', 'Upstream systems may retry webhooks after a timeout even when the first request succeeded. The duplicate check makes repeated delivery safe and protects both stored data and external side effects.'],
        },
        {
          id: 'priority-routing', title: 'Priority scoring and routing',
          paragraphs: ['Accepted invoices receive a deterministic score based on amount, account tier, and payment terms. A separate stage converts that score into LOW, MEDIUM, or HIGH, keeping scoring independent from route actions.', 'LOW proceeds without extra notification. MEDIUM triggers finance review. HIGH triggers an urgent alert. Every branch converges into one delivery pipeline so HTTP and recovery logic are not duplicated.'],
          points: ['Scores 0–2 route LOW.', 'Scores 3–4 route MEDIUM.', 'Scores 5 and above route HIGH.', 'Every notification route was tested independently.'],
          screenshots: [invoice.priority], evidenceLayout: 'wide',
        },
        {
          id: 'persistence', title: 'Store before delivery',
          paragraphs: ['A valid invoice is stored before the external HTTP call. The row represents accepted business data; Delivery Status represents a separate integration operation. A downstream outage therefore cannot erase the invoice.', 'Successful delivery updates the existing row by Invoice ID with Delivered and a timestamp. The data model preserves the distinction between persistence and transport.'],
          screenshots: [invoice.records], evidenceLayout: 'wide',
        },
        {
          id: 'delivery-notifications', title: 'Notifications and outbound delivery',
          paragraphs: ['Gmail notifications occur only on the priority branches that require them. Before the outbound request, the workflow prepares a standardized finance event containing normalized fields, score, priority, and action requirements.', 'HTTP failures continue into controlled handling. Timeouts, rate limits, and selected server failures can retry, while request and authorization errors move directly to final failure.'],
        },
        {
          id: 'retry-architecture', title: 'Bounded retry architecture',
          paragraphs: ['Eligible temporary failures wait before retrying. Each failure increments a counter, success exits immediately, and continuous failure stops after a maximum of three retries.', 'The loop deliberately includes eligibility, delay, success exit, counter, and hard limit. Without all five, retry behavior can waste requests or run forever.'],
          screenshots: [invoice.retry], evidenceLayout: 'medium',
        },
        {
          id: 'failure-logging', title: 'Permanent failure logging',
          paragraphs: ['Exhausted retryable failures and non-retryable errors become Automation Errors with timestamp, event ID, stage, status, message, retry count, and Invoice ID.', 'Accepted invoices, rejected input, and technical failures remain separate operational datasets so investigation starts with the correct class of problem.'],
          screenshots: [invoice.failures], evidenceLayout: 'wide',
        },
        {
          id: 'testing-decisions', title: 'Testing and design decisions',
          paragraphs: ['The documented suite covers all priorities, scoring boundaries, Enterprise normalization, invalid input, duplicates, successful delivery, retry eligibility and delay, counter behavior, exhaustion, non-retryable failure, notifications, payload integrity, and complete success and failure paths.', 'The strongest decisions were storing before delivery, separating rejection from automation errors, making priority explicit, bounding retries, and converging route-specific actions into a shared pipeline.'],
        },
      ],
      takeaways: ['Reliable automation is defined by its failure paths, not only its happy path.', 'Accepted business data and downstream delivery state should be separate concerns.', 'Idempotency protects data quality and external side effects.', 'Retries need eligibility, delay, a success exit, and a hard limit.'],
    },
  },
] satisfies Project[]

export const projects: Project[] = [...projectRecords].sort((left, right) => Number(right.number) - Number(left.number))
export const featuredProject = projects.find((project) => project.featured)!

const homepageProjectSlugs = [
  'invoice-collections-automation',
  'workflow-operations-manager',
  'novatech-solutions',
  'offangle',
] as const

function getRequiredProjectBySlug(slug: string) {
  const project = projects.find((candidate) => candidate.slug === slug)
  if (!project) throw new Error(`Missing required project: ${slug}`)
  return project
}

export const selectedProjects = homepageProjectSlugs.map(getRequiredProjectBySlug)

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function hasCaseStudy(project: Project | undefined): project is ProjectWithCaseStudy {
  return Boolean(project?.caseStudy)
}
