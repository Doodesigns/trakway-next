import { NextRequest, NextResponse } from 'next/server';
import { hasLocale } from 'next-intl';
import { products, toApiProduct } from '@/lib/products';
import { routing, type Locale } from '@/i18n/routing';

// GET /api/products
// GET /api/products?locale=ta
// GET /api/products?featured=true
// GET /api/products?category=home-decor
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const localeParam = searchParams.get('locale');
  const locale = (
    hasLocale(routing.locales, localeParam) ? localeParam : routing.defaultLocale
  ) as Locale;

  const featuredOnly = searchParams.get('featured') === 'true';
  const category = searchParams.get('category');

  let result = products;
  if (featuredOnly) result = result.filter((p) => p.featured);
  if (category) result = result.filter((p) => p.category === category);

  const data = result.map((p) => toApiProduct(p, locale));

  return NextResponse.json({
    data,
    meta: { total: data.length, locale }
  });
}
