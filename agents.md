# AGENT.md — Portfolio Build Instructions

## Who this is for
You are helping build a personal portfolio site for **Marvin**, a 2nd-year BS Information Systems student targeting **web development + systems automation**, with an eventual goal of moving into **AI automation**. Background to draw on for the "About" section only (not the Work section — see below): freelance short-form video editing, document handler role at a school guidance office, comfortable with Microsoft 365 / Google Workspace. That background is useful color/context for who he is, but the Work section should stay focused on web dev + automation pieces, since that's the direction he's positioning for. The site's job is to look like a designer/developer built it — not a template.

Marvin is handing this file off and will not be babysitting the build — he wants the instructions precise enough that an agent can execute end-to-end without needing constant clarification.

## Design direction (non-negotiable)
Minimal and clean. Restrained. If in doubt, remove an element rather than add one. The personality comes from precision (spacing, type, motion timing) — not from decoration.

- **Palette:** light and dark modes only (no light-gray/third mode). No color accents beyond near-black / near-white / grays. Reference the attached Vercel-style token sheet — same idea: `oklch` neutrals, pure black primary in light mode, pure white primary in dark mode, soft gray borders/muted surfaces, tiny `0.5rem` radius, hairline `1px` borders, very soft shadows (`--shadow-opacity: 0.18`, `--shadow-blur: 2px`).
- **Typography:** a clean geometric/grotesk sans for UI and body (Geist-style stack is a good default: `Geist, sans-serif`), monospace only for small utility/data labels (`Geist Mono`). No serif, no display flourish — restraint is the point here.
- **Layout:** generous whitespace, a left-aligned editorial reading path, varied section compositions, hairline borders on `--border`, and a consistent 8px-based spacing scale. Avoid numbered markers (01/02/03) unless the content is a real sequence.
- **Theme transition:** switching between light/dark uses an **iris-in transition** (a hard-edged circular reveal expanding from the toggle button). Use the View Transitions API only when full pseudo-element animation support exists, disable every default root transition layer, and provide a CSS-overlay iris fallback elsewhere. An instant swap is reserved for reduced-motion users.

## Motion & animation
Scroll-triggered, subtle, and purposeful. Think **"object reassembly" / "particle depixelation"** as the *signature* moment — used once, not everywhere:

- Best use: the hero headline or profile image assembling itself from scattered fragments/particles as the page loads or as the user first scrolls, settling into place. This is the one bold moment.
- Everywhere else: quiet fade + a visible 28px upward translate on scroll-into-view, with the heading establishing the section before its content. Nothing bounces, nothing spins.
- Hover states: small, fast (150-200ms), and matched to meaning. Only genuinely interactive cards may elevate or scale; informational cards use static hierarchy and must not imply clickability. Shrinking is reserved for active/pressed states. Every interactive control still needs independent keyboard focus feedback.
- Scroll experience: smooth, well-damped scrolling site-wide (native `scroll-behavior: smooth` at minimum; consider a lightweight smooth-scroll library like Lenis if native easing feels too abrupt) and clearly visible scroll-reveal fades — err toward the fade being noticeable (don't make it so subtle it reads as a layout bug).
- Respect `prefers-reduced-motion` — fall back to a plain fade, no particle effect, for anyone with that setting on.
- Do not stack multiple "wow" animations — one signature effect + quiet scroll reveals elsewhere is the ceiling. More than that reads as AI-generated/templated.

## Stack (confirmed)
Frontend-only, no backend/CMS needed — this is a static portfolio.

- **React + Vite** (or Create React App-equivalent tooling) + TypeScript — no Next.js, this is a pure frontend build with no server-rendered routes needed.
- **Tailwind CSS**, using the CSS variables from the attached token sheet as the theme source of truth (wire them into `tailwind.config` as custom colors/radius/shadow tokens rather than hardcoding hex values in components).
- **Framer Motion** for scroll reveals and the particle/reassembly hero effect (fall back to a lightweight canvas setup only if Framer Motion can't achieve true particle-scatter — try DOM/CSS-based first, it's simpler to maintain).
- A simple React Context + `localStorage` for light/dark theme switching (two modes only), defaulting to the user's OS preference on first load, with the iris-in transition described above.
- **Floating contact widget** — a persistent "Contact Marvin" control (bottom-right, fixed position) that opens the centralized contact panel. It is icon-sized on mobile to avoid covering content and uses its full label on wider screens.
- **Logo/avatar** — replace the current profile image with a small 2D pixel-art icon (flat, blocky, limited palette — same style as simple pixel-art animal-head icons, not a photo-realistic or gradient-shaded avatar). Used in the Nav and/or Hero.

## Page structure (confirmed, in order)
0. **Nav** — sticky/fixed top bar: name/logo (2D pixel-art icon, see Stack section) on the left, section links (Projects, Skills, Contact) on the right, theme toggle (light/dark, two modes) at the far right. Smooth-scroll to section on click, no page reloads.
1. **Hero — quick professional summary** — **left-aligned at every breakpoint**, with the mascot in its own 128–160px visual field rather than a fragile mascot/name row. Use "Marvin Silverio," one controlled-width summary, and one truthful primary action pointing to the featured build. This is where the delayed signature reassembly animation plays once on load. No separate "About" section.
2. **Featured project** — this portfolio is the real current case study. Present its problem, approach, current state, evidence/screenshots, and lessons without a placeholder link or invented outcome.
3. **Tools & Skills** — simple grid or list, grouped by category: **Web Dev** (React, Tailwind, HTML/CSS/JS), **Automation** (editable list), **Productivity** (Microsoft 365, Google Workspace). No skill-bar/progress-bar graphics.
4. **Experience** — hide this section until a real entry is supplied. Never render placeholder résumé content publicly.
5. **Certifications** — hide this section until a real credential is supplied. Never render placeholder credentials publicly.
6. **Contact** — plain and direct: email, LinkedIn, Instagram. Use the truthful heading "Start with a real conversation," three link items, and no contact form.
7. **Footer** — minimal: name, copyright/year, and a compact stack note. Do not repeat the three contact links a third time.

### Placeholder data — single edit point
Every rendered content-driven section (Projects, Skills, and contact links) pulls from **one centralized content file** (`src/data/content.ts`). Add Experience or Certification data and components only when real evidence exists; never maintain or publish placeholder records.

## Do
- Keep every section's spacing and type scale coherent while varying layout according to the content.
- Test both light and dark mode, including the iris-in toggle transition between them.
- Keep the particle/reassembly effect capped at ~1-1.5s so it doesn't delay content.
- Feature this portfolio as the current real project. Do not expose placeholder Experience or Certification content; keep future entries centralized in `content.ts` so adding real evidence remains a data edit.
- Make Nav links smooth-scroll to each rendered section's id; keep the Contact section and floating widget links pulling from the same `content.ts` source so they never drift out of sync.

## Don't
- Don't add color accents "for interest" — the brief is strictly neutral (black/white/gray).
- Don't use warm cream + serif + terracotta, or acid-green-on-black, or dense newspaper-column layouts — these are generic AI-design defaults and explicitly not this brief.
- Don't overuse the particle effect — one signature moment, not a running theme through every section.
- Don't add numbered section markers unless content is genuinely sequential.
