# Portfolio Design System

This file records the shipped interface rules. `PRODUCT.md` owns product intent; `src/index.css` and `tailwind.config.js` remain the implementation source of truth.

## Visual direction

- Neutral, professional, and compact. Personality comes from the pixel tarsier, typography, and motion rather than accent colors.
- Support light and dark themes only. Use the semantic CSS variables; do not hardcode component colors or restore a third theme.
- Geist is the interface face. Geist Mono is reserved for section eyebrows, small metadata, dates, and technology labels—not primary Hero copy.
- Use the shared `max-w-6xl` page container, one-pixel neutral borders, and restrained shadows only where they clarify hierarchy. Keep section spacing responsive and the Hero natural-height.

## Hero and mascot

- Keep the complete Hero visibly left-aligned at every breakpoint. Use one truthful primary action only.
- Give the mascot its own 128–160px field and stack it separately from the name on small screens; never squeeze the full name into a fragile inline lockup.
- `/public/images/tarsier-pixel-v2.png` is the canonical transparent sprite. Always render it with `image-rendering: pixelated`.
- Nav uses a static 32px mascot. Only the Hero uses the delayed 4x4 fragment assembly, completing once in about 1.55 seconds. Do not reuse this signature effect elsewhere.

## Components and interaction

- Controls use `.interactive-control`: restrained pointer feedback with a 44px minimum target where practical. Shrinking is reserved for the active/pressed state.
- Informational cards never scale or otherwise imply clickability. Interactive cards must expose a real action and a distinct focus state.
- Preserve the shared `:focus-visible` ring. Hover styling never replaces keyboard focus feedback.
- The featured project uses one bordered spotlight card with a preview, concise build summary, inline case-study disclosure, and real source link. Informational regions do not scale or imply clickability.
- Tools render as a DOM-based spherical cluster. It rotates only from pointer or keyboard input, carries at most a short release momentum, and never auto-rotates or exposes carousel controls.

## Motion

- Theme changes use the View Transitions API only when the full pseudo-element animation path is supported. Otherwise use the hard-edged CSS overlay iris. Reveal from the theme-toggle center for 700ms with `cubic-bezier(0.45, 0, 0.55, 1)` and disable every default root transition layer. Do not add crossfades, blur, glow, or feathering.
- Section headings establish the section first, followed by content with a calm, visible stagger. Supporting motion stays quieter than the mascot and iris.
- Lenis smooths wheel and trackpad input with `lerp: 0.1`. Touch remains native (`syncTouch: false`); internal anchors stop inertia and rely on the shared 80px scroll padding.
- Reduced motion disables the iris and scroll damping, removes movement from the mascot and interaction transforms, and retains only short opacity fades where useful.
- Reduced motion keeps direct manipulation of the tool globe available but removes release momentum, so the cluster stops with the pointer.

## Contact widget

- Reuse `content.contacts`; never duplicate contact URLs inside the component.
- Desktop uses a fixed anchored panel. Mobile uses a bottom sheet with a restrained backdrop and safe-area-aware spacing.
- Desktop may use a labelled non-modal disclosure. Mobile uses a true modal dialog while the blocking backdrop is present, contains keyboard focus, and returns focus to the trigger on close.
- Keep `aria-expanded`, `aria-controls`, `aria-haspopup="dialog"`, and the dialog heading relationship intact.

## Responsive and accessibility rules

- Support 320px and wider with no horizontal overflow. Preserve the left-aligned reading path and keep the mascot separate from the full name on small screens.
- Keep the sticky Nav compact; desktop links collapse behind the mobile menu below `md`.
- Every section `aria-labelledby` must resolve to its `SectionHeading` ID. Keep the skip link and the focusable `#main-content` target.
- Keep the narrow and zoomed contact trigger icon-sized so it does not cover reading content; the full label appears from `md` upward.
- Test light and dark themes, keyboard activation, reduced motion, stale or blocked theme storage, chat focus return, and sticky-header anchor clearance after material UI changes.

## Content maintenance

- Editable rendered portfolio content belongs in `src/data/content.ts`; the featured-build screenshot lives in `public/images`.
- Keep this portfolio as the truthful featured project. Label temporary project cards as placeholders, keep certifications in the plain list data, and leave Experience absent until a real entry is supplied.
- Update `README.md`, this file, and visual QA expectations when a deliberate design-system rule changes.
