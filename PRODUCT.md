# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary audience is recruiters and hiring managers considering Marvin for junior software-development and automation roles. Potential freelance clients are a secondary audience. Visitors should be able to understand Marvin's direction quickly, review his developing skills and project evidence, and choose a direct contact channel.

## Product Purpose

This portfolio presents Marvin's progress toward becoming a software developer and automation specialist. Success means a visitor understands that direction, sees honest evidence of practical learning, and can contact Marvin through email, LinkedIn, or Instagram without friction.

## Positioning

Marvin combines developing web-software skills with workflow and document-operations context. The portfolio emphasizes useful applications and reliable automation rather than presenting him as a generic student or inventing professional credibility he has not earned.

## Operating Context

The product is a responsive, static web portfolio used across desktop and mobile devices. Its homepage leads from a professional summary to a featured build, selected projects, a compact tools preview, certifications, Education, and contact. Dedicated project and skills archives let visitors browse deeper evidence without turning the homepage into a long catalogue. A floating contact panel repeats the same centralized contact channels.

## Capabilities and Constraints

- Frontend-only React, Vite, TypeScript, Tailwind CSS, Motion, and Lenis.
- Light and dark themes only, persisted locally and initialized from the operating-system preference.
- Hero, section, and panel motion remains restrained and respects reduced motion.
- General portfolio, certification, Education, contact, and footer content stays centralized in `src/data/content.ts`; the current toolkit and its categories live in `src/data/skills.ts`; structured project records are exposed through `src/data/projects.ts` and maintained in one project catalog.
- Project 05 is the featured build. Projects 04, 03, 02, and 01 appear as selected projects, while all verified projects are available through a four-per-page `/projects` archive and dedicated case-study routes. Experience remains hidden until Marvin supplies a real entry.
- A small dependency-free History API router supports the homepage, `/skills`, reload-safe project archive query pagination, and project detail URLs.
- No fabricated roles, organizations, certifications, metrics, testimonials, or project outcomes.

## Brand Commitments

- Product name: Marvin Silverio; the compact navigation mark is `MJ`.
- The Hero uses Marvin's supplied portrait in a centralized circular slot, with the neutral placeholder retained only as an image-load failure fallback.
- A small decorative blue check-style profile mark follows Marvin's name without making or announcing a verification claim.
- Professional positioning: Automation Engineer & Frontend Developer.
- Voice is direct, professional, honest about the current learning stage, and focused on software development plus workflow automation.
- The interface remains neutral except for the restrained blue profile mark; personality otherwise comes from typography, spacing, pixel craft, and motion.

## Evidence on Hand

- Existing contact details and learning-stack information in `src/data/content.ts`.
- Structured descriptions, verified card preview images, representative card technologies, full stacks, source URLs, screenshots, evidence captions, and case-study sections for Projects 01–05 in the centralized project catalog.
- Projects 01–05 have public source repositories and verified README documentation. Project 05 includes evaluation and reliability evidence for its AI-assisted support workflow.
- Project 05 uses eight verified evidence screenshots, Project 04 uses six, Project 03 uses eight, Project 02 uses six, and Project 01 uses the verified portfolio preview.
- Certification list entries supplied for this layout pass live in `src/data/content.ts`; their exact public wording and issuing organizations remain user-owned content.

## Product Principles

1. Show credible progress, never invented authority.
2. Make the software-development and automation direction immediately legible.
3. Prefer practical evidence and clear contact paths over decorative content.
4. Keep editable content simple to maintain from one source.
5. Preserve accessible, responsive behavior as part of the product quality.

## Accessibility & Inclusion

Support keyboard navigation, visible focus, responsive layouts from 320px upward, reduced-motion preferences, sufficient control target sizes, semantic section labelling, and intentional CSS-overlay theme transitions when native View Transitions are unsupported. Theme changes remain instant only for reduced-motion users.
