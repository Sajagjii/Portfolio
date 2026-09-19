# Sajag Makhija — Portfolio

A personal portfolio covering software, AI, automation, engineering systems and creative technology. Built with Next.js App Router, TypeScript, Tailwind CSS, Motion and Lucide. The site exports to static HTML and requires no backend or credentials.

## Development

Use Node.js 22 or newer and pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000. The Geist variable font is served locally; no external font request is needed.

## Verification

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm exec playwright install chromium
pnpm test
pnpm format:check
```

Run `pnpm build` before browser tests: the tests serve the production export. They cover 375, 430, 768, 1024 and 1440px layouts, horizontal overflow, WCAG A/AA checks with axe, mobile keyboard navigation, internal links, project metadata, reduced motion, JavaScript-free content and 404 handling. Screenshots and failure traces are saved to the ignored `.qa/` folder.

To use an installed Microsoft Edge browser instead of downloading Chromium, set `PLAYWRIGHT_CHANNEL=msedge` for the test process. On PowerShell:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
pnpm test
```

`pnpm preview` serves `out/` on localhost for production review. This helper is for local previews; deploy the contents of `out/` to a static host with directory-index and custom-404 support. Do not commit `out/` or `.next/`. The export currently targets a domain root; a subdirectory deployment needs an appropriate Next.js `basePath` and asset-path configuration before building.

## Content and structure

- `src/app/page.tsx`: homepage, in the supplied section order.
- `src/app/globals.css`: design tokens, responsive compositions, glass materials and reduced-motion styles.
- `src/app/projects/[slug]/page.tsx`: static project pages and per-project metadata.
- `src/data/projects.ts`: project content, conceptual tags, optional case-study sections and links.
- `src/data/skills.ts` and `src/data/socials.ts`: the supplied skills and social profiles.
- `src/components/`: navigation, project visuals, glass reflection, entrance motion and footer.
- `tests/portfolio.spec.ts`: browser and accessibility checks.

Content is rendered on the server. Client components are limited to navigation and interaction. Entrance effects preserve the server-rendered content when JavaScript is disabled. Pointer reflections use animation frames, apply only to mouse input, and stop under reduced motion. Diagrams are conceptual illustrations, not screenshots or claimed measurements from the projects.

## Intentionally omitted content

Sajag confirmed that **NutriFinder is not the Flutter/Firestore nutrition app in the original draft**. Its entry therefore contains only its supplied name and software/application category. No detail route or case-study link is generated until real content is added. Flutter and Dart are included in a Mobile skills group at his request.

Project algorithms, specific implementation stacks, results, metrics, repository links, lessons and improvement plans remain absent unless supplied. Add confirmed information to the typed project data. Sections render only when populated. No email address, contact form or résumé is fabricated. Contact leads with LinkedIn; general social placements lead with GitHub.

The original repository contained `README.md` and `readme.md`, which collide on Windows. They have been consolidated into this file.

## Design

Near-black surfaces and restrained periwinkle accents, large editorial type, selective glass navigation and project surfaces, and a connected-layer hero. The four projects have distinct, subtle environmental tones. The film concept's red, blue and green remain contained to its own visual narrative. There are no continuous animations, stock images, fake dashboards, skill ratings or invented achievements.

## License

See [LICENSE](LICENSE).
