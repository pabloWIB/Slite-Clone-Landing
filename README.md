# Slite Clone Landing

An independent rebuild of the Slite marketing page as a static site — no framework, no build step, no dependencies.

## Description

A layout study reproducing a SaaS product landing from the outside. Pages like this
one are harder to rebuild than they look: the copy is short, so the whole argument
rests on pacing, and the illustration work carries most of the visual weight.

The page leads with the product claim — *your company knowledge base, on autopilot* —
inside a collage of fifteen hand-drawn document illustrations that drift apart as you
scroll. Below it, a numbered list of the three themes the original page is built
around, then a gallery of six document types (company wiki, meeting notes, handbook,
onboarding, process, OKRs), and finally six AI writing operations.

Two decisions shape the code:

- **The gallery is CSS-only.** It is a native radio group styled with `:checked`
  sibling selectors, so it switches panels with arrow keys, needs no ARIA scaffolding
  and keeps working if the script never loads.
- **JavaScript is enhancement only.** The 178-line entry point handles the compact
  header, the "About" dropdown and the mobile menu. Nothing essential depends on it.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html` |
| Styling | CSS3, custom properties | `base.css` (tokens, reset), `layout.css`, `components.css` |
| Scripting | JavaScript (ES2015+) | One deferred classic script, no modules, no dependencies |
| Typography | System font stack | No web font is loaded, so no font request is made |
| Images | WebP + SVG | 21 WebP illustrations, 7 SVG icons, 1 SVG wordmark |

No `package.json`, no bundler, no preprocessor. First load on desktop: **181 KB across
30 local requests, with no external requests at all**.

## Project structure

```
.
├── index.html                    # The landing page
├── 404.html                      # Error page, links back to index
├── robots.txt
├── sitemap.xml
├── .gitignore
├── assets/
│   ├── css/
│   │   ├── base.css              # Design tokens, reset, base type, utilities
│   │   ├── layout.css            # Container, header, nav, sections, footer
│   │   └── components.css        # Buttons, dropdown, collage, tabs, cards
│   ├── js/
│   │   └── main.js               # Header scroll state, dropdown, mobile menu
│   └── img/
│       ├── logo/                 # Wordmark and favicon
│       ├── icons/                # Chevron and the six AI writing icons
│       └── content/              # Hero collage, gallery screenshots, OG cover
└── docs/
    ├── auditoria.md              # Inventory of the project before the rewrite
    └── cambios.md                # What changed, grouped by phase
```

## Running it locally

The site is fully static, so opening the file works:

```bash
open index.html      # macOS
start index.html     # Windows
```

To serve it over HTTP instead:

```bash
npx serve .
```

Both paths behave identically — every reference in the project is relative.

## Deployment

Deployed at [pablowib.github.io/Slite-Clone-Landing](https://pablowib.github.io/Slite-Clone-Landing) on GitHub Pages. Upload the
repository root as-is: no build command, no output directory, no environment
variables. The same applies to GitHub Pages, Netlify or any static host.

Five values hard-code that domain: the `canonical`, `og:url` and `og:image` tags in
`index.html`, the `<loc>` in `sitemap.xml` and the `Sitemap:` line in `robots.txt`.
Change them if you deploy elsewhere.

## Trademark

Slite is a trademark of its owner. This repository is an independent layout exercise
built for practice, not affiliated with, endorsed by or connected to Slite. It
reproduces marketing page design and uses no Slite service, API or data.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
