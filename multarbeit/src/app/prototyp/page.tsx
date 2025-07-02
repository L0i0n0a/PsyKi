'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from '@/utils/translation';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';

const Prototyp = () => {
  const router = useRouter();
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const [consentGiven, setConsentGiven] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  };
  const { t } = useTranslation(locale);

  if (!consentGiven) {
    return (
      <div className="max-w-3xl mx-auto p-6 min-h-screen flex flex-col justify-center space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-center w-full">{t('consentTitle')}</h1>
          <LanguageToggle locale={locale} onToggle={toggleLanguage} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border space-y-4">
          <p>{t('consentText1')}</p>
          <p>{t('consentText2')}</p>
          <p className="font-bold">{t('consentText3')}</p>

          <div className="flex items-start space-x-2 mt-4">
            <input
              type="checkbox"
              id="age"
              checked={ageConfirmed}
              onChange={() => setAgeConfirmed(!ageConfirmed)}
              className="mt-1"
            />
            <label htmlFor="age">{t('confirmAge')}</label>
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="consent"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mt-1"
            />
            <label htmlFor="consent">{t('agreeToParticipate')}</label>
          </div>

          <button
            onClick={() => setConsentGiven(true)}
            disabled={!(agreed && ageConfirmed)}
            className={`mt-6 px-6 py-2 rounded-full text-lg font-semibold transition-all duration-200 ease-in-out ${
              !(agreed && ageConfirmed)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#004346] text-white hover:bg-[#004346] cursor-pointer'
            }`}>
            {t('continue')}
          </button>
        </div>
      </div>
    );
  }

  // Ursprünglicher Inhalt nach Zustimmung
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
