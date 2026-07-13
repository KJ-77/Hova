# HOVA Website v2 — hovalb.com

Redesigned luxury chocolate site: React 18 + Vite + Tailwind CSS + Framer Motion + Three.js (react-three-fiber).

## Run locally

```bash
npm install
npm run dev        # dev server
npm run build      # production build → dist/
npm run preview    # serve the production build
```

## Deploy (Vercel)

The old site is already on Vercel. From this folder: `npx vercel --prod`
(or push to a GitHub repo and import it in the Vercel dashboard).
Because it's a SPA with the `/product/:slug` route, add a rewrite — create `vercel.json`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## Key facts

- **WhatsApp ordering**: all CTAs use `wa.me/96179088963` (the old site was missing
  the 961 country code — orders were going nowhere). Number lives in
  `src/data/products.js` (`WHATSAPP_NUMBER`).
- **Contact form** opens WhatsApp with the composed message (the old EmailJS
  integration had placeholder credentials and never sent anything).
- **3D**: `src/components/GiftBox3D.jsx` is the procedural gift box used by the
  hero (`Hero3D.jsx`) and the per-product 360° viewer (`ProductViewer3D.jsx`).
  Box colors per product come from `boxStyle` in `src/data/products.js`.
- **Higgsfield slot**: `HERO_VIDEO` in `src/pages/Home.jsx` — set it to a
  generated cinematic loop to replace the static hero backdrop.
- Products, prices, specs: `src/data/products.js`. Images: `public/assets/`.
- Analytics: the original Google Analytics tag + Meta Pixel are kept in `index.html`.
