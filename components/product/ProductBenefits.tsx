import type { ProductFeature } from '@/lib/products';
import { FeatureIconGlyph } from './icons';

export default function ProductBenefits({
  eyebrow,
  heading,
  subheading,
  features
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
  features: ProductFeature[];
}) {
  return (
    <div>
      {/* <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold tracking-wider text-brand-600 uppercase">— {eyebrow}</p>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900">{heading}</h2>
        <p className="mt-3 text-gray-500">{subheading}</p>
      </div> */}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.position} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <FeatureIconGlyph icon={feature.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-bold text-gray-900">{feature.label}</h3>
            <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
