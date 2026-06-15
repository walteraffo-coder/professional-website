# Farms & Extracts 46 — Website

Marketing site for **Farms & Extracts 46**, a Ghanaian phytochemical extraction
and natural-products manufacturer. Company-led, with founder/science credibility
(Dr Walter Affo, PhD) as a supporting section.

Built with **Vite + React + Tailwind CSS v4**. Single page, all content in
`src/App.jsx`.

## Run it

```bash
npm install      # first time only
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint     # eslint
```

## Editing content (no React knowledge needed)

Everything you'll want to change lives in the labelled constants at the **top of
`src/App.jsx`**:

| Constant | Controls |
| --- | --- |
| `COMPANY` | Name, tagline, **email, phone, location** (replace the placeholders) |
| `STATS` | The four trust metrics under the hero |
| `PIPELINE` | The farm → extract stages |
| `PRODUCTS` | Product / ingredient cards (name, source, tag, status, blurb) |
| `SERVICES` | "Work with us" offers |
| `QUALITY` | Quality & traceability commitments |
| `PUBLICATIONS` | Selected publications (title, venue, year, link) |
| `ENQUIRY_TYPES` | Options in the contact-form dropdown |
| `SOCIALS` | LinkedIn / ResearchGate / ORCID / Scholar / email links |

Items marked *"replace"* in comments are placeholders awaiting real data.

## Connecting the contact form

The enquiry form posts to [Formspree](https://formspree.io) (no backend needed):

1. Sign up at formspree.io with the inbox you want enquiries delivered to.
2. Create a form, confirm the verification email, copy its endpoint
   (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `.env.local`:
   `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz`
4. Restart `npm run dev` (Vite reads env vars at startup).

Until a real endpoint is set, the form shows an amber "not connected" notice.
EmailJS is documented as a drop-in alternative in `src/lib/contact.js`.

## Deploying

`npm run build` produces a static `dist/` folder — host it on any static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages). Set the
`VITE_FORMSPREE_ENDPOINT` environment variable in the host's dashboard too.
