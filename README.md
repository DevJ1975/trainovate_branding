# Trainovate Brand Hub

A unified Next.js 14 (App Router) app that hosts the entire Trainovate brand system in one navigable place:

- **Home** — overview + quick access cards
- **Identity** — logos, marks, lockups, clearspace, animated mark
- **Brand** — colors, type, voice, motion
- **UI Kit** — 20 live components, theme switcher (light / dark / high-contrast)
- **UI Kit · Native** — React Native, SwiftUI, UIKit reference & code samples
- **Templates** — letterhead, business cards, email signature, Zoom backgrounds
- **Developers** — design tokens table, install snippets for plain CSS / Tailwind / Next.js
- **Downloads** — every artefact in one matrix

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Self-hosted webfonts** — Inter Tight + JetBrains Mono in `public/fonts/`
- **Brand assets** — logos, marks, lockups in `public/brand/`
- **Themes** — `light` / `dark` / `hc` via a `data-theme` attribute on `<html>`, persisted in localStorage

## Get started

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy

Works on any Node host (Vercel, Netlify, Render, self-hosted).

```bash
npm run build && npm run start
```

## Folder layout

```
trainovate-brandhub/
├─ app/
│  ├─ layout.tsx               # Root layout — fonts, theme provider, nav
│  ├─ globals.css              # Tailwind layers + design tokens
│  ├─ tokens.css               # CSS custom properties for theme
│  ├─ ui-kit/tokens.css        # UI-kit-scoped tokens (light/dark/hc)
│  ├─ ui-kit/components.css    # All 20 component styles
│  ├─ page.tsx                 # / — home
│  ├─ identity/page.tsx        # /identity
│  ├─ brand/page.tsx           # /brand
│  ├─ ui-kit/page.tsx          # /ui-kit  — live web components
│  ├─ ui-kit/native/page.tsx   # /ui-kit/native — RN/SwiftUI/UIKit
│  ├─ templates/page.tsx       # /templates
│  ├─ developers/page.tsx      # /developers
│  └─ downloads/page.tsx       # /downloads
├─ components/                 # Shared layout components (Nav, Hero, etc.)
├─ components/kit/             # Trainovate UI Kit React components (TButton, etc.)
├─ lib/                        # Tokens, helpers, types
├─ public/
│  ├─ brand/                   # Logos, marks, lockups
│  ├─ fonts/                   # Inter Tight + JetBrains Mono webfonts
│  └─ downloads/               # Static files exposed via /downloads/*
├─ tailwind.config.ts
├─ next.config.mjs
├─ postcss.config.js
├─ tsconfig.json
└─ package.json
```

## Customising the brand

Edit `lib/tokens.ts` — every component reads from there. The Tailwind theme and CSS custom properties are derived from the same values.

## License

© Trainovate. Internal brand assets — distribute only within the organisation.
