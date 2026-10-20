# BACR Public Website

Marketing / information website for **Bodija Advanced Centre for Rehabilitation (BACR)** — built from `BACR Website.docx`.

Companion to the [BACR Patient Triage System](https://wizdormer-collab.github.io/Bodija-Advanced-Centre-for-Rehabilitation/) (separate repo), sharing the same stack and brand colours.

**Stack:** React 19 + Vite 7 + react-router-dom 7 (HashRouter) · plain CSS · Vitest

## Run locally

Requires **Node.js 18+** and npm.

```sh
npm install
npm run dev      # dev server (http://localhost:5173)
npm test         # unit tests (WhatsApp message builder)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Pages

| Route | Content |
|---|---|
| `/` | Hero, trust indicators, "rehabilitation done differently" + approach principles, 5 rehabilitation areas, how BACR works, children / adults, start-your-journey CTAs |
| `/about` | About BACR, our approach (4 principles), families & caregivers, BHH ecosystem |
| `/how-it-works` | 5-step process, care coordinator, rehabilitation plan, measuring progress, safety first |
| `/services` | 5 rehabilitation areas with detail lists + multidisciplinary care |
| `/children` | For children — copy + support list |
| `/adults` | For adults — copy + support list |
| `/team` | Disciplines, multidisciplinary note, team profile placeholders |
| `/referrers` | Referrer copy + referral form / email / phone cards |
| `/book` | Assessment enquiry form → WhatsApp / copy-to-clipboard |
| `/contact` | Contact details + Google Maps embed + FAQ |
| `/who-we-help` | Legacy URL → redirects to `/children` |

## Filling in the real details

All blanks from the content doc live in **one file**: `src/lib/site.config.js`

```js
phone, email, whatsapp, whatsappNumber (digits only, e.g. '2348012345678'),
workingHours, address, referralEmail, referralPhone, referralFormUrl, mapQuery
```

- `whatsappNumber` enables the **Send via WhatsApp** button on `/book`
- Other placeholders (`XXX`, `example.com`) are detected and a notice is shown until replaced
- Team profiles: edit `src/features/team/Team.jsx` + `src/data/site.js`

## Content source

Every heading, paragraph, service, step and footer link comes from the client content doc and lives in `src/data/site.js` — edit copy there, not in the components.

## Deployment

Static build — `dist/` works on GitHub Pages, Netlify or Cloudflare Pages.

- `vite.config.js` sets `base: '/BACR-Website/'` for GitHub Pages project hosting
- Uses **HashRouter** so deep links work on any static host without server rewrites
