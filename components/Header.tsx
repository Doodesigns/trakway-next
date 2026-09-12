import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const nav = useTranslations('Nav');
  const services = useTranslations('Services');

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/trakway-technologies.png"
            alt="Trak Way Technologies"
            width={1200}
            height={300}
            className="h-16 w-auto"
            priority
          />
        </Link>

        <nav className="flex flex-wrap items-center gap-8 text-[15px] font-medium text-gray-700">
          <Link href="/" className="hover:text-ink-700">
           Home
          </Link>
          <Link href="/products" className="hover:text-ink-700">
            {nav('products')}
          </Link>
         
          <div className="group relative">
            <Link href="/#vehicle-tracking" className="inline-flex items-center gap-1 hover:text-ink-700">
              {nav('services')}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-0.5 transition group-hover:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>

            <div className="invisible absolute left-0 top-full z-20 w-56 -translate-y-1 rounded-lg border border-gray-100 bg-white py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <Link
                href="/#vehicle-tracking"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-ink-700"
              >
                {services('vehicleHeading')}
              </Link>
              <Link
                href="/#personal-tracking"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-ink-700"
              >
                {services('personalHeading')}
              </Link>
            </div>
          </div>

          <Link href="/about" className="hover:text-ink-700">
            {nav('about')}
          </Link>
           <Link href="/contact" className="hover:text-ink-700">
            {nav('contact')}
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          {/* <LocaleSwitcher />

          <button type="button" aria-label="Account" className="text-gray-500 hover:text-ink-700">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
            </svg>
          </button> */}

          {/* <Link href="#" aria-label="Cart" className="relative text-gray-500 hover:text-ink-700">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-semibold text-white">
              0
            </span>
          </Link> */}

          <Link
            href="/contact"
            className="rounded-md bg-ink-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-800"
          >
            Book A Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
