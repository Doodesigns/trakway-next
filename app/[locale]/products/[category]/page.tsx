import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { fetchProducts } from "@/lib/api";
import { getCategoryBySlug } from "@/lib/products";
import ProductCatalog from "@/components/products/ProductCatalog";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return {};

  return {
    title: category.name,
    description: `Browse Trakway ${category.name} devices — pricing, specifications and features.`,
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}) {
  const { locale, category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const t = await getTranslations("ProductList");

  // Server Component fetch → GET /api/products?locale=en&category=...
  const products = await fetchProducts(locale, { category: category.name });

  return (
    <div className="">
      <div className="bg-gray-bread mb-12 text-start py-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-0 text-2xl font-bold text-gray-900 text-white sm:text-3xl md:text-4xl">
            {category.name}
          </h1>
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <ProductCatalog
          products={products}
          activeSlug={category.slug}
          allLabel={t("allCategories")}
          emptyMessage={t("comingSoon")}
        />
      </div>
    </div>
  );
}
