'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from '@/utils/translation';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';

const Startseite = () => {
  // --- State ---
  const router = useRouter();
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const { t } = useTranslation(locale);

  // --- Handlers ---
  const toggleLanguage = () => setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  const handleStart = () => router.push('/prototype/testphase');

  // --- Render ---
  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      <div className='header border10'>
        <div className='relative flex justify-center items-center'>
          <h1 className='md:text-4xl text-2xl font-bold m-4 text-center'>{t('title')}</h1>
          <LanguageToggle locale={locale} onToggle={toggleLanguage} />
        </div>
      </div>

      <div className='max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]'>
        <h1 className='text-4xl font-bold mb-6 text-center'>{t('welcome')}</h1>
        <p className='mb-8 text-lg text-center' dangerouslySetInnerHTML={{ __html: t('instructions') }} />
        <button className='px-6 py-2 text-white bg-[#004346] hover:bg-[#004346] rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer' onClick={handleStart}>
          {t('start')}
        </button>
      </div>
    </div>
  );
};

export default Startseite;
