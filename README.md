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
- A Featured Build spotlight with a real preview, inline case-study notes, and a source link
- A pointer- and keyboard-driven Tools & Skills globe with damped release momentum and no automatic rotation
- Lightweight project placeholders and a plain certification list, both sourced from the central content file
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

All editable portfolio information is centralized in `src/data/content.ts`. This includes the Featured Build, tool groups, labelled project placeholders, certification rows, mascot source and alternative text, contact-widget copy, and contact URLs. Experience remains absent until a real entry is supplied.

For local visual QA only, add `?motion=full` to exercise the normal-motion path when the test browser reports reduced motion. `?mascotAsset=<unique-token>` forces a fresh Hero mascot request, while `?mascotAsset=error` exercises the visible image-failure fallback. These switches are disabled in production builds.
