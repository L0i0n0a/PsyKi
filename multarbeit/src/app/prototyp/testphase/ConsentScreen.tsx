'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from '@/utils/translation';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';

const ConsentScreen = () => {
  const router = useRouter();
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const { t } = useTranslation(locale);

  const [agreed, setAgreed] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  };

  const handleContinue = () => {
    if (agreed && ageConfirmed) {
      router.push('/prototyp');
    }
  };

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
          onClick={handleContinue}
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
};

export default ConsentScreen;
