# Next.js Multi-language Mini E-commerce (English / Tamil / Hindi)

A minimal example: home, product list, product details (backed by a REST
API), and a contact page — translated via [next-intl].

**Stack (latest stable as of Aug 2026):** Next.js 16.3.1 (Turbopack, App
Router) · React 19.2.8 · next-intl 4.13.7 · Tailwind CSS 4.3.3 · TypeScript
7.0.2.

## Run it

```bash
npm install
npm run dev
```

Then open:
- http://localhost:3000/en — English
- http://localhost:3000/ta — Tamil
- http://localhost:3000/hi — Hindi

Visiting `/` redirects to a locale automatically (based on the browser's
`Accept-Language` header, falling back to `en`). This redirect is handled by
`proxy.ts` — Next.js 16's replacement for `middleware.ts`.

## Pages

| Route                     | Purpose                                              |
|----------------------------|-------------------------------------------------------|
| `/[locale]`                 | **Home** — hero banner + featured products, links to Shop |
| `/[locale]/products`        | **Product list** — full catalog grid                 |
| `/[locale]/product/[id]`    | **Product details** — single product                 |
| `/[locale]/contact`         | **Contact us** — a simple form (name/email/message)   |

e.g. in Tamil: `/ta`, `/ta/products`, `/ta/product/clay-mug`, `/ta/contact`.

## How the i18n is wired (next-intl v4)

next-intl v4 splits configuration into a small `i18n/` folder instead of one
flat file:

- **`i18n/routing.ts`** — `defineRouting({...})`: the list of supported
  locale codes and the default locale. This is the single place you edit to
  add/remove a language.
- **`i18n/navigation.ts`** — `createNavigation(routing)`: locale-aware
  `Link`, `useRouter`, `usePathname` so links automatically keep (or switch)
  the current language prefix.
- **`i18n/request.ts`** — loads the right `messages/*.json` file per
  request, using next-intl's async `requestLocale`.
- **`proxy.ts`** — Next.js 16's network-boundary file (renamed from
  `middleware.ts`). Detects/redirects to the right locale.
- **`messages/en.json`, `messages/ta.json`, `messages/hi.json`** — the UI
  string translations, grouped by namespace (`Header`, `Nav`, `Home`,
  `ProductList`, `ProductDetails`, `Contact`).
- **`components/LocaleSwitcher.tsx`** — the dropdown in the header that lets
  a visitor switch languages without losing their place.

## Product content translation

Product data (`lib/products.ts`) isn't UI copy — it's your catalog — so
instead of the JSON message files, each product stores its `name` and
`description` as an object keyed by locale:

```ts
name: {
  en: 'Handmade Clay Mug',
  ta: 'கை வேலைப்பாடு மட்பாண்ட கோப்பை',
  hi: 'हस्तनिर्मित मिट्टी का मग'
}
```

In a real store this would instead come from your database/CMS, with a
`locale` column or a JSON field per product — same idea, different source.

## Product data via REST API

Product data isn't hardcoded into the pages — it's served from real Route
Handlers and fetched over HTTP, the same way you'd call any backend:

- `GET /api/products` — list, supports `?locale=`, `?featured=true`, `?category=`
- `GET /api/products/[id]` — single product, supports `?locale=`

`lib/api.ts` is the client Server Components use to call these endpoints
(`fetchProducts`, `fetchProduct`). `lib/products.ts` is the mock "database"
— swap it for a real DB/CMS query and the API routes + rest of the app don't
need to change.

Server Components fetching the app's own API need an absolute URL. Set
`SITE_URL` (not `NEXT_PUBLIC_SITE_URL` — this is server-only and never needs
to reach the client bundle) in production; see `.env.local.example`.

Because product data (stock, price) is live rather than static, the pages
under `app/[locale]/` are rendered dynamically (`export const dynamic =
'force-dynamic'` in `app/[locale]/layout.tsx`) rather than statically
generated at build time.

## Adding another language (e.g. French)

1. Add `'fr'` to `locales` in `i18n/routing.ts`, and add an entry to
   `localeNames`.
2. Create `messages/fr.json` (copy `messages/en.json` and translate).
3. Add an `fr` entry to every product's `name`/`description` in
   `lib/products.ts` — TypeScript will actually error until you do, since
   `Record<Locale, string>` requires every locale.

That's it — `proxy.ts`, the switcher, and pages all pick it up automatically.

## Project structure

```
app/
  layout.tsx                       # minimal root layout (required by Next.js)
  [locale]/
    layout.tsx                     # provides translations + renders Header
    page.tsx                       # Home ("/")
    products/page.tsx              # Product list ("/products")
    product/[id]/page.tsx          # Product details ("/product/clay-mug")
    contact/page.tsx               # Contact us ("/contact")
  api/
    products/route.ts              # GET /api/products
    products/[id]/route.ts         # GET /api/products/[id]
components/
  Header.tsx                       # nav bar (Home/Products/Contact) + switcher
  LocaleSwitcher.tsx
  ProductCard.tsx
  ContactForm.tsx                  # client component, handles the contact form
lib/
  products.ts                      # mock "database" — only app/api/** imports this
  api.ts                           # fetch() client Server Components use to call the API
messages/
  en.json / ta.json / hi.json      # UI translations
i18n/
  routing.ts                       # locale list (defineRouting)
  navigation.ts                    # locale-aware Link/router (createNavigation)
  request.ts                       # per-request message loading
proxy.ts                           # locale detection/routing (was middleware.ts)
```

## Wiring the contact form up for real

`components/ContactForm.tsx` currently simulates a submission with a
`setTimeout`. To make it actually send messages, replace that with a call to
an API route (e.g. `app/api/contact/route.ts`) that emails you via
[Resend](https://resend.com), or point the `fetch` at a service like
[Formspree](https://formspree.io).

## Swapping in real data

Replace `lib/products.ts` with calls to your backend (REST, GraphQL,
Shopify, etc.), fetched inside the Server Components in `page.tsx` — the
rest of the i18n plumbing (translations, routing, locale switcher) doesn't
need to change.
