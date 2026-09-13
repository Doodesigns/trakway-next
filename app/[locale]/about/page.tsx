import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function AboutPage() {
  const t = await getTranslations('About');

  const stats = [1, 2, 3, 4].map((n) => ({
    value: t(`stat${n}Value` as 'stat1Value'),
    label: t(`stat${n}Label` as 'stat1Label')
  }));

  const chartBars = [40, 55, 48, 70, 62, 85];

  return (
    <div className="">
        <div className="bg-gray-bread mb-12 text-start py-6">
        <div className="mx-auto lg:max-w-7xl px-4">
          <h1 className="mb-0 text-2xl font-bold text-gray-900 text-white sm:text-3xl md:text-4xl">
            {t("breadcrumbCurrent")}
          </h1>
        </div>
      </div>
    <div className="mx-auto lg:max-w-7xl px-4">
      <h1 className="mx-auto mt-8 max-w-7xl text-center text-4xl font-extrabold text-gray-900 sm:text-5xl">
        <span className="block">{t('heroHeadingLine1')}</span>
        <span className="block">{t('heroHeadingLine2')}</span>
      </h1>

      <div className="relative mt-10 h-[280px] w-full overflow-hidden rounded-3xl sm:h-[420px]">
        <Image
          src="/images/services/vehicle-tracking.jpg"
          alt={t('heroImageAlt')}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-14 grid grid-cols-2 gap-y-10 text-center sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold text-brand-600">{t('missionEyebrow')}</p>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('missionHeading')}
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">{t('missionParagraph')}</p>
        </div>

        <div className="rounded-2xl bg-gray-100 p-6">
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-900">{t('chartTitle')}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-gray-300" />
                {t('chartLegend1')}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {t('chartLegend2')}
              </span>
            </div>
          </div>

          <div className="mt-6 flex h-64 items-end gap-3">
            {chartBars.map((height, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-md ${i % 2 === 0 ? 'bg-gray-300' : 'bg-brand-500'}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
