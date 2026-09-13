import { getTranslations } from "next-intl/server";
import { fetchProducts } from "@/lib/api";
import ProductCatalog from "@/components/products/ProductCatalog";
import type { Locale } from "@/i18n/routing";

export default async function ProductListPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("ProductList");

  // Server Component fetch → GET /api/products?locale=en
  const products = await fetchProducts(locale);

  return (
    <div className="">
      <div className="bg-gray-bread mb-12 text-start py-6">
        <div className="mx-auto lg:max-w-7xl px-4">
          <h1 className="mb-0 text-2xl font-bold text-gray-900 text-white sm:text-3xl md:text-4xl">
            {t("heading")}
          </h1>
        </div>
      </div>
      <div className="mx-auto lg:max-w-7xl px-4">
        <ProductCatalog
          products={products}
          allLabel={t("allCategories")}
          emptyMessage={t("comingSoon")}
        />
      </div>
    </div>
  );
}
