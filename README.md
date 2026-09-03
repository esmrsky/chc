# Christian Hope Church

Website for Christian Hope Church — a multilingual (English / Українська / Русский)
church family in North Port, Florida.

**Live:** https://esmrsky.github.io/chc/

## What this is

A single-page site built as a React client component. The page and all of its
copy live in [`app/legacy/page.tsx`](app/legacy/page.tsx); styling is in
[`app/legacy/legacy.css`](app/legacy/legacy.css). Copy for all three languages
is held in the `revivalCopy` object and swapped client-side by the language
picker in the header.

## Builds

There are two build targets against the same source.

**Static (GitHub Pages)** — what the live URL serves.

```bash
npm install
npx vite build --config vite.static.config.ts
```

Outputs to `docs/`, which GitHub Pages serves from the `main` branch. Base path
is `/chc/`; asset references in the source are relative so they resolve both
under that sub-path and at a domain root.

**Cloudflare Workers (vinext RSC)** — the original target.

```bash
npm run dev     # local
npm run build   # -> dist/
```

This target additionally needs `.openai/hosting.json`, which is not tracked here.

## Notes

- `components/ui/` is an unused shadcn scaffold; nothing imports it.
- `app/legacy/page.tsx` also contains four earlier design concepts
  (`Homecoming`, `Signal`, `Table`, `Presence`) that are no longer rendered.
  They are tree-shaken out of the static bundle.
- Only the eight images the page actually renders are tracked in
  `public/media/`.
