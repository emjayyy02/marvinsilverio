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
- Project 05 presented as the Featured Build with a verified workflow preview, concise card metadata, technology logos, and direct project routes
- Projects 04–01 presented in a two-column Selected Projects grid with verified preview images, one scanning sentence, and 3–5 representative technology logos
- A scalable `/projects` archive with four-item query-string pagination plus evidence-rich case studies for all five verified projects
- Repository screenshots placed beside the architecture, behavior, reliability, testing, and evolution claims they support
- Narrow case-study prose with wider technical evidence, lazy-loaded supporting images, and a reduced-motion-aware back-to-top control
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
