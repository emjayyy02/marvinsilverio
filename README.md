# Marvin Silverio - Portfolio

A frontend-only personal portfolio focused on software development and workflow automation.

## Stack

- React, Vite, and TypeScript
- Tailwind CSS with neutral OKLCH design tokens
- Motion for the one-time tarsier mascot assembly, section reveals, and panel entrances
- Lenis for wheel and trackpad smoothing while touch scrolling stays native

## Interface features

- Light and dark themes with a hard-edged iris reveal that begins at the theme toggle
- A recognizable grayscale 64x64 pixel tarsier used as the static Nav mark and animated Hero mascot
- A frontend-only "Contact Marvin" widget that reuses the centralized contact links and becomes a focus-trapped modal on mobile
- Keyboard-friendly navigation, skip link, visible focus styles, and 44px control targets

Theme changes use the native View Transitions API when its complete pseudo-element animation support is available, with a hard-edged CSS overlay iris everywhere else. Reduced-motion users receive an intentional instant theme change. Lenis also honors reduced motion, disabling damping and making programmatic anchor jumps immediate.

## Run locally

```bash
npm install
npm run dev
```

Use `npm run typecheck`, `npm run lint`, and `npm run build` before deployment.

## Edit content

All editable portfolio information is centralized in `src/data/content.ts`. The portfolio itself is the truthful featured case study, including a real browser-rendered screenshot. Experience and certification sections are intentionally absent until real evidence is supplied. The mascot source, alternative text, contact-widget copy, and contact URLs also live in the content file.

For local visual QA only, add `?motion=full` to exercise the normal-motion path when the test browser reports reduced motion. `?mascotAsset=<unique-token>` forces a fresh Hero mascot request, while `?mascotAsset=error` exercises the visible image-failure fallback. These switches are disabled in production builds.
