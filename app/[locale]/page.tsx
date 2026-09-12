import { getTranslations } from 'next-intl/server';
import { fetchProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import HeroVideo from '@/components/HeroVideo';
import ClientLogos from '@/components/ClientLogos';
import ServicesSection from '@/components/ServicesSection';
import BookingSection from '@/components/BookingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import type { Locale } from '@/i18n/routing';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Home');
  const featured = await fetchProducts(locale, { featured: true });

  return (
    <div>
      {/* Hero */}
      <section
        className="relative left-1/2 right-1/2 -mx-[50vw] mb-12 w-screen bg-cover bg-center py-16 text-center"
        style={{ backgroundImage: "url('/images/banner-bg.png')" }}
      >
        <h1 className="text-6xl font-extrabold text-gray-900 sm:text-5xl">
          <span className="block">{t('heroTitleLine1')}</span>
          <span className="block">{t('heroTitleLine2')}</span>
        </h1>
        <p className="mx-auto mt-3 text-gray-900 sm:text-10xl">
          {t('heroSubtitlePart1')}
          <span className="text-brand-600">{t('heroSubtitlePart2')}</span>
          {t('heroSubtitlePart3')}
        </p>

        <div className="mt-8">
          <HeroVideo />
        </div>

        <ClientLogos />
      </section>

      {/* Featured products — fetched from GET /api/products?featured=true */}
      <section>
        <div className="mb-10 text-center">
          <h2 className="text-6xl font-extrabold text-gray-900 sm:text-5xl">
            {t('productsHeadingPart1')}
            <span className="text-brand-600">{t('productsHeadingPart2')}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-900">
            <span className="block">{t('productsSubtitleLine1')}</span>
            <span className="block">{t('productsSubtitleLine2')}</span>
          </p>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        </div>
       
      </section>

      <ServicesSection />
      <BookingSection />
      <TestimonialsSection />
      <FaqSection />
    </div>
  );
}
