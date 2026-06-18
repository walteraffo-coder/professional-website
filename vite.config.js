import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { PRODUCTS } from './src/lib/catalogue.js'

const SITE = 'https://farmsandextracts.com'

// Decode the few HTML entities that appear in the catalogue copy so the
// JSON-LD carries clean text (the data is authored for JSX rendering).
const clean = (s) =>
  String(s).replace(/&amp;/g, '&').replace(/&mdash;/g, '—').trim()

const slug = (name) =>
  clean(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// First human-readable description from a product's `body` (string, or an
// array of strings / { heading, text } sections).
function description(body) {
  if (!body) return ''
  if (typeof body === 'string') return clean(body)
  if (Array.isArray(body)) {
    for (const el of body) {
      if (typeof el === 'string') return clean(el)
      if (el && el.text) return clean(el.text)
    }
  }
  return ''
}

// Absolute URLs for every image a product references.
function images(p) {
  const out = []
  const push = (src) => src && out.push(SITE + src)
  if (Array.isArray(p.photos)) p.photos.forEach((im) => push(im.src))
  if (Array.isArray(p.sideImages)) p.sideImages.forEach((im) => push(im.src))
  if (p.photo) push(p.photo)
  return out
}

// Build-time injection of one schema.org Product JSON-LD block per catalogue
// item. No offers/ratings — the catalogue has no prices or reviews, so these
// are plain Product entities (brand → the Organization).
function productJsonLd() {
  return {
    name: 'product-jsonld',
    transformIndexHtml() {
      return PRODUCTS.map((p) => {
        const node = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          '@id': `${SITE}/#product-${slug(p.name)}`,
          name: clean(p.name),
          category: clean(p.tag),
          brand: { '@id': `${SITE}/#organization` },
        }
        const desc = description(p.body)
        if (desc) node.description = desc
        const imgs = images(p)
        if (imgs.length) node.image = imgs
        return {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(node),
          injectTo: 'head',
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), productJsonLd()],
})
