import type { Locale } from '@/i18n/routing';
import { products, findProductById, toApiProduct, type ApiProduct } from './products';

// Server Components read the catalog directly instead of fetching this app's
// own /api/products routes over HTTP. That self-referential fetch pattern is
// a well-known footgun on Vercel: it can get intercepted by Deployment
// Protection (or break on a misconfigured SITE_URL) and come back as an HTML
// challenge/error page instead of JSON, which blows up res.json(). The REST
// endpoints in app/api/products/* still exist for external clients — they
// just aren't the path Server Components take to reach their own data.
export async function fetchProducts(
  locale: Locale,
  opts: { featured?: boolean; category?: string } = {}
): Promise<ApiProduct[]> {
  let result = products;
  if (opts.featured) result = result.filter((p) => p.featured);
  if (opts.category) result = result.filter((p) => p.category === opts.category);

  return result.map((p) => toApiProduct(p, locale));
}

export async function fetchProduct(id: string, locale: Locale): Promise<ApiProduct | null> {
  const product = findProductById(id);
  return product ? toApiProduct(product, locale) : null;
}
