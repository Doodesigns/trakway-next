import { Link } from '@/i18n/navigation';
import ProductCard from '@/components/ProductCard';
import { PRODUCT_CATEGORIES, type ApiProduct } from '@/lib/products';

function chipClass(active: boolean) {
  return `cursor-pointer rounded-full border px-5 py-2.5 text-base font-semibold transition ${
    active
      ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
      : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900'
  }`;
}

export default function ProductCatalog({
  products,
  activeSlug,
  allLabel,
  emptyMessage
}: {
  products: ApiProduct[];
  activeSlug?: string;
  allLabel: string;
  emptyMessage: string;
}) {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <Link href="/products" className={chipClass(!activeSlug)}>
          {allLabel}
        </Link>
        {PRODUCT_CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/products/${category.slug}`}
            className={chipClass(activeSlug === category.slug)}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-gray-500">{emptyMessage}</p>
      )}
    </>
  );
}
