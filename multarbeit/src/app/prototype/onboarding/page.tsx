'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from '@/utils/translation';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';

const Startseite = () => {
  /* ========================================
     STATE MANAGEMENT
     ======================================== */

  /** Next.js router for navigation between experiment phases */
  const router = useRouter();
  /** Current interface language ('de' for German, 'en' for English) */
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  /** Translation function for current locale */
  const { t } = useTranslation(locale);

  /* ========================================
     EVENT HANDLERS
     ======================================== */

  /**
   * Toggle between German and English interface language
   *
   * Allows participants to select their preferred language for the
   * experiment interface, ensuring comprehension of instructions.
   */
  const toggleLanguage = () => setLocale((prev) => (prev === 'de' ? 'en' : 'de'));

  /**
   * Navigate to test phase to begin experiment
   *
   * Initiates the research study by directing participants to the
   * calibration test phase, which precedes the main experiment.
   */
  const handleStart = () => router.push('/prototype/testphase');

  /* ========================================
     RENDER IMPLEMENTATION
     ======================================== */

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      {/* Header section with title and language toggle */}
      <div className='header border10'>
        <div className='relative flex justify-center items-center'>
          <h1 className='md:text-4xl text-2xl font-bold m-4 text-center'>{t('title')}</h1>
          <LanguageToggle locale={locale} onToggle={toggleLanguage} />
        </div>
      </div>

      {/* Main content area with welcome message and instructions */}
      <div className='max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]'>
        {/* Welcome title */}
        <h1 className='text-4xl font-bold mb-6 text-center'>{t('welcome')}</h1>

        {/* Detailed experiment instructions with HTML formatting support */}
        <p className='mb-8 text-lg text-center' dangerouslySetInnerHTML={{ __html: t('instructions') }} />

        {/* Start button to begin the experiment */}
        <button className='px-6 py-2 text-white bg-[#004346] hover:bg-[#004346] rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer' onClick={handleStart}>
          {t('start')}
        </button>
      </div>
    </div>
  );
};

export default Startseite;
