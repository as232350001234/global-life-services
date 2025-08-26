# Global Life Services (Vue 2 Static Site)

A static, bilingual (Chinese/English) navigator for global life services:
- Overseas shopping (excluding Mainland China; Hong Kong allowed)
- Mobile SIM/eSIM and data
- Visa cards and financial services
- Apple gift cards
- Site-wide search, region/country filters, country flags
- Apple-style simple, elegant design
- All links open in a new tab

Tech:
- Vue 2 via CDN (no build framework needed)
- Pure static assets (HTML/CSS/JS)

Folder structure:
- index.html
- assets/styles.css
- assets/data.js

Getting started
- Option A: Open index.html directly in a browser (recommended Chrome/Edge/Safari/Firefox).
- Option B: Serve locally with Node:

  1) Install Node.js (>= 16)
  2) Install dependencies (none needed)
  3) Use npm scripts:

     - npm run dev: starts a static server (serve)
     - npm run build: copies files to dist/

Commands
- npm run dev
  Starts a local static server at http://localhost:5000 (or next available port)

- npm run build
  Creates a dist/ folder with static assets ready to deploy

Deployment
- Any static hosting (GitHub Pages, Netlify, Vercel static, S3 + CloudFront, etc.)
- Upload the dist/ folder after running npm run build
- Or deploy index.html and assets/ as-is

i18n behavior
- Auto-detects browser language:
  - zh* -> Chinese
  - en* -> English
  - Otherwise -> English
- Manual language toggle in the top-right; persisted to localStorage

Notes
- All external URLs are https and open with target="_blank" and rel="noopener".
- Mainland China shopping sites are excluded; Hong Kong is allowed.
