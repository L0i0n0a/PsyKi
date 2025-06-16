'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from '@/utils/translation';

const Prototyp = () => {
  const router = useRouter();
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  };
  const { t } = useTranslation(locale);

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      <div className='header border10'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl font-bold m-4 text-center'>{t('title')}</h1>
          <button onClick={toggleLanguage} className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-bold text-center rounded-full transition'>
            {locale === 'de' ? 'EN' : 'DE'}
          </button>
        </div>
      </div>
      <div className='max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]'>
        <h1 className='text-4xl font-bold mb-6 text-center'>{t('welcome')}</h1>
        <p className='mb-8 text-lg text-center'>{t('instructions')}</p>
        <button
          className='px-6 py-2 text-white hover:bg-[#004346]! rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer'
          onClick={() => router.push('/prototyp/testphase')}>
          {t('start')}
        </button>
      </div>
    </div>
  );
};

export default Prototyp;
