'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FaqSection() {
  const t = useTranslations('Faq');
  const [openIndex, setOpenIndex] = useState(0);

  const items = [1, 2, 3, 4, 5].map((n) => ({
    question: t(`item${n}Question`),
    answer: t(`item${n}Answer`)
  }));

  return (
    <section id="faq" className="py-8">
      <div className="mx-auto lg:max-w-7xl px-4">

     
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-brand-600">{t('label')}</p>
          <h2 className="mt-2 max-w-sm text-3xl font-extrabold text-gray-900 sm:text-4xl">{t('heading')}</h2>
        </div>

        <div>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className="border-b border-gray-200 py-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <span className="font-bold text-gray-900 md:text-2xl text-xl">{item.question}</span>
                  <span className="mt-0.5 shrink-0 text-xl leading-none text-brand-600">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && <p className="mt-3 leading-relaxed text-gray-600 text-1xl">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
       </div>
    </section>
  );
}
