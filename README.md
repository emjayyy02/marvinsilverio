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
- Panoptes OS presented as the Featured Build with an interaction-activated film preview, representative technology logos, case study, and source action; it has no public live demo
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

Panoptes OS v1 is deployment-ready and locally verified in production mode. Always-on public hosting is intentionally not maintained for this US$0/month portfolio project. Screenshots are copied from the v1.0.0 public package and show synthetic local fixtures; the approval confirmation is captured before submission. `panoptes-dashboard-preview.png` is the top-left 1440×720 crop of the unchanged 1440×1517 dark dashboard, retained as the case-study hero and archive preview. Complete screenshots retain their source dimensions and lightbox behavior. The neutral lifecycle SVG is an explanatory diagram, not a UI screenshot. Only the homepage featured media now uses the approved product film.

Project knowledge follows `projectCatalog.ts` → `portfolio-data.ts` → `scripts/generate-portfolio-knowledge.ts` → `portfolio-generated.md`. Run `npm run generate:portfolio-knowledge`, then copy the generated output byte-identically into the separate local `m-porftfolio-assistant/docs/portfolio-generated.md` before Worker verification. Visible FAQs and optional knowledge-only FAQs share the catalog source; knowledge-only answers are not rendered by the case-study page. The generator also exports full technologies, source/case-study links, and takeaways. Never hand-edit either generated copy. Local synchronization does not update the deployed assistant.

## Panoptes film delivery — Phase 6, 2026-10-16

The creative master is user-approved and frozen. Source: `C:\DOCUMENTATION FOR EVERYTHING\TECH VA JOURNEY\Portfolio Projects\project-08-panoptes-video\film\out\panoptes-os-final-master.mp4`. The sibling video repository is read-only; every derivative and QA artifact below belongs to this portfolio.

- Master SHA-256: `097b3bb94d0dd1e29421a5a805123247f59883cb84780408a1000e89f07e7464`. Verified 11,277,914 bytes; 1920×1080, 60 fps, 2,100 frames, exactly 35.000 seconds. Both streams decode without errors; decoded stereo audio is present (RMS −17.98 dBFS, sample peak −1.29 dBFS). No creative/motion/mastering pass was performed.
- Web asset: `public/media/panoptes-os-showcase.mp4`, **5,045,809 bytes** (4.81 MiB), 55.3% smaller than the master. SHA-256: `519d2e63edf2cf4d0aa69824b4ec6602d8f094366dc7481bdecd1ced598b2872`. H.264/libx264, slow preset, CRF 23, yuv420p; explicit full-to-limited range conversion preserves correct playback from the master's full-range source. Original 1920×1080 and 60 fps; all 2,100 presentation timestamps/durations match. AAC stereo 48 kHz is stream-copied: every audio packet hash and timestamp matches. Both streams and container remain exactly 35.000 seconds. Fast-start verified: `moov` at byte 32 precedes `mdat` at byte 55,639.
- Poster: `public/media/panoptes-os-showcase-poster.webp`, **22,032 bytes**, 1280×720, WebP quality 82. Extracted at 7.500 seconds from the master; it is an actual incident-evidence frame.

Reproduction settings (FFmpeg 7.1 build supplied with the existing Remotion tooling; no video-project execution or writes):

```powershell
ffmpeg -i <frozen-master> -map 0:v:0 -map 0:a:0 -vf scale=in_range=pc:out_range=tv,format=yuv420p -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -color_range tv -fps_mode passthrough -c:a copy -movflags +faststart public/media/panoptes-os-showcase.mp4
```

The existing 2:1 frame, padding, border, card size, copy, technologies and CTAs are unchanged. `object-contain` fits the complete 16:9 film inside it without cutting off text. The initial state is paused, muted, poster-visible, with `preload="metadata"`, no `autoplay`, and a real labelled Play button. Fine mouse hover initiates one playback attempt, including when reduced motion is enabled, as explicitly requested by the user. Touch, Enter and Space can activate the same button. Playback reveals native controls and fades the overlay; keyboard focus moves to the video. Pointer exit never pauses; subsequent hover never resumes a user pause or overrides native controls. Activated playback loops. A rejected playback promise leaves explicit Play available; media-load failure retains the poster and a readable status. The existing motion preference hook removes the overlay fade under reduced motion; it does not prohibit this user-initiated hover playback. No polling or manual event listeners were added. There is one video element and source URL; the browser caches the shared poster URL. Metadata preload is a browser hint, so the browser controls range requests and buffering.

Music credit is catalog-driven in `src/data/projectCatalog.ts`, rendered beneath the Panoptes case-study source/release actions at `/projects/panoptes-os#film-music-credit`. It includes “Floating Cities” — Kevin MacLeod, the documented composer track link, CC BY 4.0 license link, and the edit/filter/fade/mix disclosure. Source material was read from the frozen project's `docs/music-license.md`. No credit overlay was added to the film.

Verification: typecheck and production build pass; lint passes with the pre-existing `ProfilePortrait.tsx:37` warning. Vite retains its existing large-bundle advisory. The Impeccable detector returns no findings for the changed UI. Chrome 152/Playwright checks pass against the production build at 320/375/768/1024/1440px in both themes: exact original card/frame/neighbor dimensions, no horizontal overflow, no page-load playback, first hover, persistent playback on exit, persistent manual pause, looping, keyboard focus/activation, OS/query reduced motion, touch-emulated tap, working case-study route/source URL, unchanged static case-study media, and poster fallback. Actual pointer clicks on native Play/Pause, Unmute, timeline and Fullscreen also pass. No unexpected console or uncaught errors; the deliberately blocked MP4 test has an expected browser network error. Physical mobile devices and hosted playback are unverified. No commit, push or deployment was performed.

Changed application/documentation files: `src/components/FeaturedBuild.tsx`, `src/components/ProjectVideoPreview.tsx` (new), `src/data/projectCatalog.ts`, `src/pages/ProjectPage.tsx`, `README.md`, `DESIGN.md`, `PRODUCT.md`; plus the two public media assets above. Local verification artifacts: `.qa/panoptes-video/{baseline.json,browser-check.cjs,browser-check.json,release-check.cjs,release-check.json,native-check.cjs,native-check.json,light-1440.png,light-375.png,dark-1440.png,dark-375.png,native-video.png}`. The baseline JSON records the pre-change measurements. Test scripts use the installed local Chrome/runtime paths; `PORTFOLIO_URL` overrides the default local dev URL and `FFMPEG_DIR` overrides release-check binary discovery.

Desktop hover UX patch: the first-start handler now belongs to the entire 2:1 preview frame, including its padding. Mouse events use fine/hover-capable device detection, including a secondary mouse on hybrid devices. The initial cue is plain, small “Hover to preview” text over the poster, without a label background or border; touch users retain an accessible “Play preview” action, and keyboard users can activate the labelled button. Per the user’s follow-up, site/OS reduced-motion preferences do not disable hover initiation; they still remove the overlay fade. The frozen master and delivery assets were not changed.

Patch verification is retained separately in `.qa/panoptes-video/hover-patch.cjs`, `hover-patch.json`, and `hover-patch-desktop.png`. The production-build check passes no-click starts at all four padded corners and the center, pointer-exit continuation, persistent native Pause, native Play/Unmute/timeline clicks, loop, keyboard focus/activation, touch-emulated tap, first-hover playback with both OS and site reduced motion enabled, no page-load autoplay, and no console errors. Exact pre-integration card/frame dimensions still match at 320/375/768/1024/1440px. Typecheck, lint and build pass with the same existing warnings. No commit or push.

The original Phase 6 browser-check script/results record the earlier reduced-motion policy. The current hover-patch script/results supersede that policy and preserve those historical artifacts.
