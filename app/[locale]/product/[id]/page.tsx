import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { fetchProduct } from '@/lib/api';
import type { Locale } from '@/i18n/routing';
import ProductGallery from '@/components/product/ProductGallery';
import ProductBenefits from '@/components/product/ProductBenefits';
import ProductPackage from '@/components/product/ProductPackage';
import ProductTabs from '@/components/product/ProductTabs';
import FaqSection from '@/components/FaqSection';
import { SignalIcon, CheckIcon, WhatsAppIcon } from '@/components/product/icons';
import { getCategoryByName } from '@/lib/products';

// TODO: replace with the real business number before launch.
const CONTACT_PHONE = '+919876543210';

export default async function ProductDetailsPage({
  params
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations('ProductDetails');

  // Server Component fetch → GET /api/products/{id}?locale={locale}
  // Returns null on a 404 from the API, which we turn into Next's not-found page.
  const product = await fetchProduct(id, locale);

  if (!product) notFound();

  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in the ${product.name}.`);
  const category = getCategoryByName(product.category);
  const backHref = category ? `/products/${category.slug}` : '/products';

  return (

    <div>
    <div className="bg-gray-bread">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <Link href={backHref} className="mb-4 inline-block text-sm text-gray-500 hover:text-brand-600 hover:underline">
          ← {t('backToProducts')}
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductGallery images={product.images} productName={product.name} />

          <div>
            <div className="flex flex-wrap gap-2">
              {product.badge.map((label, index) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-md bg-ink-700 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  {index === 0 && <SignalIcon className="h-3.5 w-3.5" />}
                  {label}
                </span>
              ))}
            </div>

            <h1 className="mt-4 text-2xl font-bold text-brand-600 sm:text-3xl">{product.name}</h1>

            <p className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Rs. {product.price.toLocaleString('en-IN')}.00
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  Rs. {product.originalPrice.toLocaleString('en-IN')}.00
                </span>
              )}
            </p>
            <p className="mt-1 text-sm text-gray-500">{t('shippingNote')}</p>

            <div className="mt-5 border-t border-dashed border-gray-300" />

            <h2 className="mt-5 text-sm font-bold text-gray-900">{t('description')}:</h2>
            <p className="mt-2 leading-relaxed text-gray-600">{product.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="mt-0 bg-brand-600 rounded-full border-2 border-brand-600 px-8 py-3 text-sm font-bold text-white tracking-wider text-brand-600 uppercase transition hover:bg-brand-600 hover:text-white"
              >
                {t('enquireNow')}
              </Link>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="mt-0 rounded-full border-2 border-brand-600 px-8 py-3 text-sm font-bold tracking-wider text-brand-600 uppercase transition hover:bg-brand-600 hover:text-white"
              >
                {t('callUsNow')}
              </a>
              <a
                href={`https://wa.me/${CONTACT_PHONE.replace('+', '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('whatsappAria')}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </a>
            </div>

            {product.highlights.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {product.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-brand-200 text-brand-600">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        
      </div>
    </div>
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
    <ProductTabs
          tabs={[
            {
              id: 'benefits',
              label: t('featuresAndBenefits'),
              content: (
                <ProductBenefits
                  eyebrow={product.benefitsEyebrow}
                  heading={product.benefitsHeading}
                  subheading={product.benefitsSubheading}
                  features={product.features}
                />
              )
            },
            {
              id: 'specifications',
              label: t('specifications'),
              content: product.specifications.length > 0 && (
                <div className="bg-white">
                  {product.specifications.map((section) => (
                    <div
                      key={section.title}
                      className="mb-6 overflow-hidden rounded-xl border border-gray-200 last:mb-0"
                    >
                      <div className="bg-brand-100 px-6 py-3 text-lg font-bold text-gray-900">
                        {section.title}
                      </div>
                      <table className="w-full text-base">
                        <tbody>
                          {section.rows.map((row) => (
                            <tr key={row.label} className="border-t border-gray-200">
                              <td className="w-1/3 whitespace-pre-line bg-brand-50 px-6 py-4 align-top font-semibold text-brand-700">
                                {row.label}
                              </td>
                              <td className="whitespace-pre-line px-6 py-4 align-top leading-relaxed text-gray-700">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )
            },
            {
              id: 'package',
              label: t('packageAndSubscription'),
              content: (
                <ProductPackage
                  featureLabel={t('featureColumn')}
                  detailsLabel={t('detailsColumn')}
                  rows={product.packageDetails}
                />
              )
            },
            {
              id: 'box-contents',
              label: t('whatsInTheBox'),
              content: (
                <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-8">
                  <h3 className="text-lg font-bold text-gray-900">{t('whatsInTheBox')}?</h3>
                  <ul className="mt-4 space-y-3">
                    {product.boxContents.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
          ]}
        />
        </div>

        <FaqSection />
        </div>
  );
}
