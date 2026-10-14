# Marvin Silverio - Portfolio

A frontend-only personal portfolio focused on software development and workflow automation.

## Stack

- React, Vite, and TypeScript
- Tailwind CSS with neutral OKLCH design tokens
- Motion for restrained Hero, section, and panel entrances
- Lenis for wheel and trackpad smoothing while touch scrolling stays native

## Interface features

- Light and dark themes with a hard-edged iris reveal that begins at the theme toggle
- A compact `MJ` home mark, a decorative blue profile mark, and Marvin's supplied circular portrait with a one-time center-out SVG splash reveal plus a neutral load-failure fallback
- Hero positioning as “Automation Engineer & Frontend Developer,” with selected-project and resume actions sourced from centralized identity data
- Panoptes OS presented as the Featured Build with a real landscape dashboard crop, representative technology logos, case study, and source action; it has no public live demo
- Revenue Recovery OS, RetailRAG, Invoice Collections Automation, and AI Support Operations Triage System presented—in that exact order—as the four Selected Projects; Revenue Recovery retains its case study, live demo, and source actions
- A scalable `/projects` archive with four-item query-string pagination for all nine projects, including Workflow Operations Manager and the broader project history
- Repository screenshots placed beside the architecture, behavior, reliability, testing, and evolution claims they support
- Narrow case-study prose with sequentially numbered narrative sections, optional visible FAQ rows, wider technical evidence, lazy-loaded supporting images, and a reduced-motion-aware back-to-top control
- Meaningful document titles, route scroll/focus handling, and browser back/forward support through a small dependency-free History API router
- A pointer- and keyboard-driven Tools & Capabilities preview globe with 11 current representative tools, local brand-colored marks, restrained instructions, damped release momentum, and no automatic rotation
- A dedicated `/skills` archive with concise current-tool categories and no ratings, percentages, or proficiency bars
- A plain certification list sourced from the central content file
- A factual Education section with period, degree, school, and location sourced from the central content file
- A frontend-only "Contact Marvin" widget that reuses the centralized contact links and becomes a focus-trapped modal on mobile
- A restrained personal footer with a short philosophy, identity, location, and copyright
- Keyboard-friendly navigation, skip link, visible focus styles, and 44px control targets

Normal motion is enabled without a query parameter. Theme changes use the native View Transitions API when its complete pseudo-element animation support is available, with a hard-edged CSS overlay iris everywhere else. A genuine `prefers-reduced-motion: reduce` preference switches the portrait, section, panel, control, and scrolling systems to their simplified or instant states.

## Run locally

```bash
npm install
npm run dev
```

Use `npm run typecheck`, `npm run lint`, and `npm run build` before deployment.

## Edit content

General portfolio information—including identity, Education, contact copy, contact links, and footer copy—is centralized in `src/data/content.ts`. Current capabilities and the homepage globe subset are centralized in `src/data/skills.ts`; adding or changing a tool is primarily a data edit. `src/data/projects.ts` is the project-data entry point, backed by the structured catalog in `src/data/projectCatalog.ts`; it owns metadata, card preview images, card technologies, full stacks, repository screenshots, source links, evidence sections, and takeaways. Technology artwork is stored locally in `public/icons/tech`, and verified project images live in `public/images`. Experience remains absent until a real entry is supplied.

## Routes

- `/` — portfolio home
- `/skills` — current skills and capabilities archive
- `/projects` and `/projects?page=N` — paginated project archive, four entries per page
- `/projects/:slug` — individual project case study

The repository does not currently identify a deployment provider or contain provider-specific routing configuration. Any static host used for deployment must rewrite unknown application routes to `/index.html` so direct requests to `/projects` and project case studies reach the client-side router.

Development defaults to full motion without a query string. Use `?motion=full` or `?motion=reduce` to exercise either QA path explicitly; production without an override follows the visitor's genuine reduced-motion preference.

## Panoptes evidence and assistant knowledge

Panoptes OS v1 is deployment-ready and locally verified in production mode. Always-on public hosting is intentionally not maintained for this US$0/month portfolio project. Screenshots are copied from the v1.0.0 public package and show synthetic local fixtures; the approval confirmation is captured before submission. `panoptes-dashboard-preview.png` is the top-left 1440×720 crop of the unchanged 1440×1517 dark dashboard, used on the homepage and as the case-study hero. Complete screenshots retain their source dimensions and lightbox behavior. The neutral lifecycle SVG is an explanatory diagram, not a UI screenshot. The landscape hero can later be replaced with product video; no video implementation is included.

Project knowledge follows `projectCatalog.ts` → `portfolio-data.ts` → `scripts/generate-portfolio-knowledge.ts` → `portfolio-generated.md`. Run `npm run generate:portfolio-knowledge`, then copy the generated output byte-identically into the separate local `m-porftfolio-assistant/docs/portfolio-generated.md` before Worker verification. Visible FAQs and optional knowledge-only FAQs share the catalog source; knowledge-only answers are not rendered by the case-study page. The generator also exports full technologies, source/case-study links, and takeaways. Never hand-edit either generated copy. Local synchronization does not update the deployed assistant.
