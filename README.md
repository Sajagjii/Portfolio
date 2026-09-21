# Sajag Makhija — Portfolio

A local design preview of Sajag’s portfolio, built with Next.js App Router, TypeScript, and plain CSS. Warm paper, near-black typography, a single orange accent, and distinct editorial project layouts. The site exports to static HTML without a backend.

## Run locally

Use Node.js 22 or newer and pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000. To review the production export:

```sh
pnpm build
pnpm preview
```

The Geist font is served locally. The only client component is the navigation menu; content and page links also work without JavaScript. Native page links avoid relying on server rewrites for Next.js segment prefetch requests.

## Verification

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm exec playwright install chromium
pnpm test
pnpm format:check
```

The browser tests serve the production export. They cover 320, 375, 430, 768, 1024, and 1440px homepage layouts; all section and project routes; overflow; axe WCAG A/AA checks; keyboard navigation; active navigation states; missing content; metadata; internal links; duplicate IDs; reduced motion; JavaScript-free mobile navigation; and 404s. Screenshots and traces go to the ignored `.qa/` folder.

To test with installed Microsoft Edge instead of downloading Chromium:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
pnpm test
```

## Routes and content

- `/`: introduction, selected work, lab, about, tools, and contact.
- `/work/`: selected software and engineering projects.
- `/lab/`: AI workflow experiments and a generative film concept.
- `/about/`: background, interests, and tools.
- `/contact/`: LinkedIn and GitHub.
- `/projects/[slug]/`: project notes for entries with supplied detail.

`src/data/projects.ts` stores content separately from layout. The reusable project component supports editorial, full, technical, and split compositions. Optional year, stack, links, and case-study sections render only when populated. The diagrams are conceptual illustrations, not product screenshots or measured results.

The owner requested a design preview before supplying further details. Existing verified content remains in use. No project repository URLs, results, email address, dates, or implementation stacks have been invented. The original correction about NutriFinder remains: it is not the Flutter nutrition app from an earlier draft. Its name and category are shown without a fabricated case study. Flutter and Dart remain in the supplied skills list.

## Design and accessibility

Design tokens, responsive rules, contrast, focus states, and mechanical motion timings live in `src/app/globals.css`. Reduced-motion preferences are respected. Brand links have accessible names; decorative visuals are hidden from assistive technology where appropriate. Mobile navigation supports Escape, outside clicks, focus departure, and a no-JavaScript fallback.

No animation library, utility CSS framework, remote font, or image dependency is needed.

## Hosting

The `out/` directory can be hosted at a domain root with directory-index and custom-404 support. A subdirectory deployment needs a Next.js base path before building. Do not commit `out/`, `.next/`, or `.qa/`.

## License

See [LICENSE](LICENSE).
