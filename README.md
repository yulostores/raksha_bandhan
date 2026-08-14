# Keshri Gift — Raksha Bandhan Advertisement

A lightweight, mobile-first local advertisement for the Raksha Bandhan collection at Keshri Gift, Hazaribag.

## Run locally

```bash
npm start
```

Open `http://127.0.0.1:4173`.

The server listens on all local interfaces, so IDE port previews and other devices on your network can also reach it. To use another port or restrict the listening address:

```bash
PORT=8080 HOST=127.0.0.1 npm start
```

No install or build step is required. Run `npm run check` for JavaScript syntax validation. Web-optimized images are served from `assets/*.webp`; the original PNGs are retained as source artwork and for the social sharing image.

## Production notes

- Add the Meta Pixel and GA4 snippets at the marked integration points.
- Call, WhatsApp and Google Maps actions already use the supplied Keshri Gift details.
