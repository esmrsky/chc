#!/usr/bin/env bash
# Builds the static GitHub Pages site into docs/.
# Vite empties docs/, so the non-bundled assets are copied in afterwards.
set -euo pipefail
cd "$(dirname "$0")"

npx vite build --config vite.static.config.ts

mkdir -p docs/media
# Only the images the Revival page actually renders.
for f in \
  church-family-cinematic.webp service-preaching-01.webp service-preaching-02.webp \
  service-worship-close.webp service-worship-wide.webp social-one-spirit-2026.webp \
  social-prayer-2026-upscaled.webp social-studio-2026.webp; do
  cp "public/media/$f" "docs/media/$f"
done

cp public/chc-logo-color.svg public/chc-logo-white.svg \
   public/chc-icon-color.svg public/chc-icon-white.svg \
   public/favicon.svg docs/

# Open Graph card (1200x630, generated from social-one-spirit-2026-source.jpg).
cp assets-og/og.jpg docs/og.jpg

touch docs/.nojekyll
echo "docs/ built: $(du -sh docs | cut -f1)"
