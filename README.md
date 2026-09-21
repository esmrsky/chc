# Christian Hope Church

Website for Christian Hope Church — a multilingual (English / Українська / Русский)
church family in North Port, Florida.

**Live:** https://esmrsky.github.io/chc/

## What this is

A single-page site built as a React client component. The page and all of its
copy live in [`app/revival-page.tsx`](app/revival-page.tsx); styling is in
[`app/revival.css`](app/revival.css). Copy for all three languages is held in
the `revivalCopy` object and swapped client-side by the language picker in the
header.

## Builds

There are two build targets against the same source.

**Static (GitHub Pages)** — what the live URL serves.

```bash
npm install
./scripts-build-static.sh
```

⚠️ **Run the script, not `vite build` on its own.** Vite empties `docs/`, and
only the script copies the non-bundled files back in afterwards: `public/media`,
the logos, `favicon.svg`, `apple-touch-icon.png`, `og.jpg` and `.nojekyll`.
Running the bare `npx vite build --config vite.static.config.ts` deletes all of
them, so every image, the logo and the OG card break on the live site.

`.nojekyll` is a safeguard rather than load-bearing today: Pages deploys this
repo through the Actions workflow in `.github/workflows/pages.yml`
(`build_type: workflow`), so Jekyll never sees the files. It matters only if
Pages is ever switched back to building from the branch, where Jekyll chokes on
`{{` and fails **silently** — the URL keeps serving the last good build while
every push is discarded. Keep the file.

Note that `gh api repos/esmrsky/chc/pages/builds/latest` reports the *legacy*
build record, which is stale and still reads `errored` from before the switch to
workflow deploys. Check `gh run list` instead, and confirm the live URL's asset
hash changed.

Outputs to `docs/`, which GitHub Pages serves from the `main` branch. Base path
is `/chc/`, and the built `index.html` references its assets under that prefix
absolutely — so serving `docs/` at a domain root 404s everything. To preview the
build locally, symlink it under the expected prefix:

```bash
mkdir -p /tmp/chc-preview && ln -sfn "$PWD/docs" /tmp/chc-preview/chc && (cd /tmp/chc-preview && python3 -m http.server 8732)
```

Then open http://localhost:8732/chc/.

**Cloudflare Workers (vinext RSC)** — the original target.

```bash
npm run dev     # local
npm run build   # -> dist/
```

This target additionally needs `.openai/hosting.json`, which is not tracked here.

## Notes

- Only the eight images the page actually renders are tracked in `public/media/`.
- The hero is sized to share the first screen with the marquee below it at
  widths of 981px and up. Its height comes from the viewport, and the collage
  stretches into whatever is left — the media carry no `aspect-ratio` in that
  range and cover-crop instead. The hero and the marquee both derive from
  `--lr-marquee-h` so they stay in step. Below 981px the layout stacks, the hero
  runs tall, and the marquee arrives on scroll. That block sits last in
  `revival.css` deliberately: media queries add no specificity, so it has to
  come after the base rules it overrides.
