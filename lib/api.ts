import type { Locale } from '@/i18n/routing';
import type { ApiProduct } from './products';

// Server Components can't fetch relative URLs, so we need an absolute base.
// Set SITE_URL in production (e.g. https://myshop.com). This is deliberately
// NOT prefixed with NEXT_PUBLIC_: it's only ever read here, in a server-only
// module, and NEXT_PUBLIC_ vars get inlined into the client bundle at build
// time (and require a rebuild to change) — neither of which we want.
// Falls back to localhost for local dev, and to Vercel's URL if deployed there.
function getBaseUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

type ProductsResponse = {
  data: ApiProduct[];
  meta: { total: number; locale: Locale };
};

type ProductResponse = {
  data: ApiProduct;
};

type ApiErrorResponse = {
  error: { code: string; message: string };
};

export async function fetchProducts(
  locale: Locale,
  opts: { featured?: boolean; category?: string } = {}
): Promise<ApiProduct[]> {
  const params = new URLSearchParams({ locale });
  if (opts.featured) params.set('featured', 'true');
  if (opts.category) params.set('category', opts.category);

  const res = await fetch(`${getBaseUrl()}/api/products?${params.toString()}`, {
    // Revalidate this list every 60s (ISR-style caching for a Server Component fetch).
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const json: ProductsResponse = await res.json();
  return json.data;
}

export async function fetchProduct(id: string, locale: Locale): Promise<ApiProduct | null> {
  const res = await fetch(
    `${getBaseUrl()}/api/products/${id}?${new URLSearchParams({ locale }).toString()}`,
    { next: { revalidate: 60 } }
  );

  if (res.status === 404) return null;

  if (!res.ok) {
    const json: ApiErrorResponse = await res.json().catch(() => ({
      error: { code: 'UNKNOWN', message: 'Unknown error' }
    }));
    throw new Error(`Failed to fetch product '${id}': ${json.error.message}`);
  }

  const json: ProductResponse = await res.json();
  return json.data;
}
