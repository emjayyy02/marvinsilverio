# Portfolio Design System

This file records the shipped interface rules. `PRODUCT.md` owns product intent; `src/index.css` and `tailwind.config.js` remain the implementation source of truth.

## Visual direction

- Neutral, professional, and compact. Personality comes from typography, precise composition, and motion; the small blue Hero profile mark is the only intentional color accent.
- Support light and dark themes only. Use the semantic CSS variables; do not hardcode component colors or restore a third theme.
- Geist is the interface face. Geist Mono is reserved for section eyebrows, small metadata, dates, and fallback technology marks—not primary Hero copy.
- Use the shared `max-w-6xl` page container, one-pixel neutral borders, and restrained shadows only where they clarify hierarchy. Keep section spacing responsive and the Hero natural-height.

## Hero and identity

- Keep the Hero visibly left-aligned and prioritize name, professional title, summary, then actions. The title is “Automation Engineer & Frontend Developer.”
- Pair the identity copy with a circular portrait frame. On narrow screens the portrait leads the same logical DOM order; from `md` it sits beside the copy.
- `content.person.profileImage.src` is the single portrait replacement point. Marvin's supplied local portrait fills the frame with `object-fit: cover` and the centralized alt text; `null` or a failed load renders the neutral, aria-hidden placeholder.
- Keep the check-style profile mark small, blue, visually aligned with the name, and `aria-hidden`; it is decorative personal branding and must never announce or imply external verification.
- Keep View Projects as the primary in-page action. Render View Resume as a secondary link only when `resumeUrl` exists; otherwise show an honestly disabled control.
- Nav uses a small text-only `MJ` home mark. The portrait has the only authored Hero flourish: a local SVG mask opens organically from the face area, expands through eight offset radial splash lobes, reaches the circular boundary once, and then leaves the photo completely static. Other Hero content keeps the quiet entrance language used elsewhere.

## Components and interaction

- Controls use `.interactive-control` with shared fast/normal timings and a 44px minimum target where practical. Primary actions lift 3px, secondary actions scale to 1.03, and shrinking is reserved for the active/pressed state. Navigation keeps opacity/color feedback without spatial movement.
- The three large contact-channel links use a contrast-safe internal layer that sweeps left to right on hover without moving the control; reduced motion applies the same contrast change instantly.
- Informational cards never scale or otherwise imply clickability. Interactive cards must expose a real action and a distinct focus state.
- Preserve the shared `:focus-visible` ring. Hover styling never replaces keyboard focus feedback.
- The featured project uses one bordered spotlight card with a real preview, concise build summary, representative technology logos, a case-study route, and supplied live/source links. Selected-project and archive cards use an equal-aspect contained preview followed by project number/type, one scanning sentence, a padded row of 3–5 representative logos, and bottom-aligned actions. Completed projects do not display status badges.
- `/projects` and `/projects/:slug` inherit the same container, neutral tokens, dotted field, borders, type scale, and restrained reveal behavior as the homepage. Case-study prose stays near 46rem while technical evidence may use the wider container. Screenshots sit beside the claims they support, retain their source aspect ratios, avoid unreasonable upscaling, and always include specific alternative text and captions.
- Technology marks use compact, locally stored brand-colored SVGs on neutral tiles with accessible names and native titles. Technologies without suitable brand artwork use a restrained monogram fallback.
- Long case studies expose a fixed back-to-top button after 40% scroll progress. It aligns with the footer content inset, remains clear of the bottom-right contact widget, enters with one restrained rise and fade, and removes movement plus switches to an instant jump for reduced-motion users.
- Homepage tools render as a curated DOM-based spherical preview with small brand-colored marks on neutral tiles. It rotates only from pointer or keyboard input, carries at most a short release momentum, and never auto-rotates or exposes carousel controls. Keep only the visible “Drag to rotate” cue; retain fuller keyboard instructions for assistive technology.
- `/skills` uses the established route header followed by divided category rows and concise logo/name/descriptor items. It is a technology archive, not a rating surface: do not add percentages, proficiency bars, stars, or arbitrary levels.

## Motion

- Theme changes use the View Transitions API only when the full pseudo-element animation path is supported. Otherwise use the hard-edged CSS overlay iris. Reveal from the theme-toggle center for 700ms with `cubic-bezier(0.45, 0, 0.55, 1)` and disable every default root transition layer. Do not add crossfades, blur, glow, or feathering.
- Section headings establish the section first, followed by content with a calm, visible stagger. Supporting motion stays quieter than the theme iris.
- Development defaults to full motion so inherited test-browser preferences do not make localhost appear static; `?motion=full` and `?motion=reduce` remain explicit QA overrides. Production without an override follows the genuine `prefers-reduced-motion` preference.
- Reduced motion bypasses the portrait mask, removes control travel and scaling, stops tool-globe momentum, disables scroll damping, and keeps short opacity or instant color-state changes where useful.
- Lenis smooths wheel and trackpad input with `lerp: 0.1`. Touch remains native (`syncTouch: false`); internal anchors stop inertia and rely on the shared 80px scroll padding.
- Reduced motion keeps direct manipulation of the tool globe available but removes release momentum, so the cluster stops with the pointer.

## Contact widget

- Reuse `content.contacts`; never duplicate contact URLs inside the component.
- Desktop uses a fixed anchored panel. Mobile uses a bottom sheet with a restrained backdrop and safe-area-aware spacing.
- Desktop may use a labelled non-modal disclosure. Mobile uses a true modal dialog while the blocking backdrop is present, contains keyboard focus, and returns focus to the trigger on close.
- Keep `aria-expanded`, `aria-controls`, `aria-haspopup="dialog"`, and the dialog heading relationship intact.
- Contact section and dialog copy stay concise and channel-focused. Do not frame either surface around chatbots, forms, funnels, or comparisons with automated contact systems.

## Education and footer

- Place Education after Certifications and before Contact. Present the verified period, degree, school, and location as one calm bordered row without badges, logos, timelines, or inferred academic details.
- Keep Education, contact section copy, contact dialog copy, and footer copy centralized in `src/data/content.ts`.
- The footer contains three understated groups: the three-line italic philosophy, Marvin's name/line/location signature, and `© 2026`. Stack these groups on narrow screens and do not restore the technology stack note.

## Responsive and accessibility rules

- Support 320px and wider with no horizontal overflow. Preserve the left-aligned reading path and keep the portrait frame large enough to remain intentional on small screens.
- Keep the sticky Nav compact; desktop links collapse behind the mobile menu below `md`.
- Every section `aria-labelledby` must resolve to its `SectionHeading` ID. Keep the skip link and the focusable `#main-content` target.
- Client-side route changes update the document title, reset the page to a sensible scroll position, and focus the route heading or main landmark after navigation. Archive pagination uses `/projects?page=N`, moves and focuses the archive heading, and retains back/forward history.
- Keep the narrow and zoomed contact trigger icon-sized so it does not cover reading content; the full label appears from `md` upward.
- Test light and dark themes, keyboard activation, reduced motion, stale or blocked theme storage, chat focus return, and sticky-header anchor clearance after material UI changes.

## Content maintenance

- General portfolio content belongs in `src/data/content.ts`, including name, professional title, Hero summary, portrait data, resume URL, Education, contact copy, and footer copy. Current capability categories and the homepage globe subset are derived from `src/data/skills.ts`; public views filter to current entries while the model can support learning and planned statuses later. `src/data/projects.ts` exposes the centralized project catalog in `src/data/projectCatalog.ts`, including route slugs, verified card previews, card stacks, complete stacks, case-study sections, screenshot evidence, and source links. Verified image files live in `public/images`; local brand artwork lives in `public/icons/tech`.
- Keep Revenue Recovery OS as the featured build. Keep Invoice Collections Automation, AI Support Operations Triage System, Workflow Operations Manager, and NovaTech Solutions—in that exact order—as the four homepage Selected Projects in a two-column desktop grid. The archive presents all projects in descending order, four entries per generated query-string page. All claims and source links must remain supported by the supplied content pack or linked repositories. Keep certifications in the plain list data and leave Experience absent until a real entry is supplied.
- Update `README.md`, this file, and visual QA expectations when a deliberate design-system rule changes.
