import { NextRequest, NextResponse } from 'next/server';
import { hasLocale } from 'next-intl';
import { findProductById, toApiProduct } from '@/lib/products';
import { routing, type Locale } from '@/i18n/routing';

// GET /api/products/clay-mug
// GET /api/products/clay-mug?locale=ta
export async function GET(
  request: NextRequest,
  // Next.js 16: route handler params are now a Promise and must be awaited.
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);

  const localeParam = searchParams.get('locale');
  const locale = (
    hasLocale(routing.locales, localeParam) ? localeParam : routing.defaultLocale
  ) as Locale;

  const product = findProductById(id);

  if (!product) {
    return NextResponse.json(
      {
        error: {
          code: 'NOT_FOUND',
          message: `Product '${id}' does not exist.`
        }
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: toApiProduct(product, locale) });
}
