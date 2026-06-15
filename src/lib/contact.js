// Contact form integration handler.
// ---------------------------------------------------------------------------
// Configure this WITHOUT touching code — just set environment variables in a
// `.env.local` file at the project root (see `.env.example`). Vite only exposes
// variables prefixed with `VITE_` to the browser.
//
// DEFAULT: Formspree (no SDK, no backend required)
//   1. Create a free form at https://formspree.io and confirm your email.
//   2. Copy its endpoint, e.g. https://formspree.io/f/abcdwxyz
//   3. Put it in `.env.local`:  VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz
//   4. Restart `npm run dev` (Vite reads env vars at startup).
//
// ALTERNATIVE: EmailJS — see the commented `sendViaEmailJS` block at the bottom.
// ---------------------------------------------------------------------------

export const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() ?? ''

// True once a REAL endpoint is configured. The shipped placeholder
// (`your_form_id`) counts as not-configured so the UI shows a setup notice
// instead of silently posting to a dead endpoint.
export const isContactConfigured =
  Boolean(FORMSPREE_ENDPOINT) && !FORMSPREE_ENDPOINT.includes('your_form_id')

/**
 * Send a contact-form submission to the configured provider.
 * @param {Record<string, string>} data - field name/value pairs from the form.
 * @returns {Promise<object>} the provider's JSON response (best-effort).
 * @throws {Error} with a user-presentable message on failure.
 */
export async function sendContactMessage(data) {
  if (!isContactConfigured) {
    throw new Error(
      'The contact form is not configured yet. Set VITE_FORMSPREE_ENDPOINT in .env.local.',
    )
  }

  let response
  try {
    response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch {
    // Network-level failure (offline, DNS, CORS preflight blocked, etc.)
    throw new Error(
      'Could not reach the mail service. Please check your connection and try again.',
    )
  }

  if (!response.ok) {
    let message = 'Something went wrong sending your message. Please try again.'
    try {
      const body = await response.json()
      if (Array.isArray(body?.errors) && body.errors.length) {
        message = body.errors.map((e) => e.message).join(' ')
      }
    } catch {
      // Non-JSON error body — keep the generic message.
    }
    throw new Error(message)
  }

  return response.json().catch(() => ({}))
}

// ---------------------------------------------------------------------------
// OPTIONAL: EmailJS alternative.
// 1. npm install @emailjs/browser
// 2. Add to .env.local:
//      VITE_EMAILJS_SERVICE_ID=service_xxx
//      VITE_EMAILJS_TEMPLATE_ID=template_xxx
//      VITE_EMAILJS_PUBLIC_KEY=xxxxxxxx
// 3. Replace the import + call in App.jsx with sendViaEmailJS, and uncomment:
//
// import emailjs from '@emailjs/browser'
//
// export async function sendViaEmailJS(data) {
//   const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } =
//     import.meta.env
//   return emailjs.send(
//     VITE_EMAILJS_SERVICE_ID,
//     VITE_EMAILJS_TEMPLATE_ID,
//     data,
//     { publicKey: VITE_EMAILJS_PUBLIC_KEY },
//   )
// }
// ---------------------------------------------------------------------------
