'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/utils/translation';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';
import { useParticipantStore } from '@/store';

const Prototype = () => {
  // --- State ---
  const router = useRouter();
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const [code, setCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const { t } = useTranslation(locale);

  // Zustand store
  const { setCode: setCodeStore, code: codeFromStore } = useParticipantStore();

  // --- Effects ---
  useEffect(() => {
    if (codeFromStore && codeFromStore.trim() !== '') {
      setCode(codeFromStore);
      setAgreed(true);
      setAgeConfirmed(true);
    }
  }, [codeFromStore]);

  // --- Derived values ---
  const isDisabled = !!(codeFromStore && codeFromStore.trim() !== '');
  const isFormValid = code.trim() !== '' && agreed && ageConfirmed;

  // --- Handlers ---
  const toggleLanguage = () => setLocale((prev) => (prev === 'de' ? 'en' : 'de'));

  const handleContinue = async () => {
    if (!isFormValid) return;

    if (codeFromStore && codeFromStore.trim() !== '') {
      router.push('/prototype/onboarding');
      return;
    }

    const baseCode = code.trim();
    let trial = 1;
    let finalCode = baseCode;
    let exists = true;

    while (exists) {
      const res = await fetch('/api/check-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: finalCode }),
      });
      const data = await res.json();
      exists = data.exists;
      if (exists) {
        trial += 1;
        finalCode = `${baseCode}_trial_${trial}`;
      }
    }

    setCodeStore(finalCode);
    router.push('/prototype/onboarding');
  };

  // --- Render ---
  return (
    <div className='max-w-4xl mx-auto p-6 min-h-screen flex flex-col justify-center space-y-6'>
      <div className='flex justify-left ml-6 items-center space-x-4 mb-6'>
        <h1 className='text-3xl font-bold text-left w-full'>{t('consentTitle')}</h1>
        <LanguageToggle locale={locale} onToggle={toggleLanguage} className='text-white relative' />
      </div>

      <div className='bg-white p-6 rounded-xl shadow-lg border space-y-4'>
        <div>
          <label htmlFor='code' className='block mb-2 font-medium'>
            {t('codeTitle')}
          </label>
          <input
            id='code'
            type='text'
            placeholder={t('codePlaceholder')}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg text-lg'
            disabled={isDisabled}
          />
        </div>

        <p>{t('consentText1')}</p>
        <p>{t('consentText2')}</p>
        <p className='font-bold'>{t('consentText3')}</p>

        <div className='flex items-start space-x-2 mt-4'>
          <input type='checkbox' id='age' checked={ageConfirmed} onChange={() => setAgeConfirmed(!ageConfirmed)} className='mt-1' disabled={isDisabled} />
          <label htmlFor='age'>{t('confirmAge')}</label>
        </div>

        <div className='flex items-start space-x-2'>
          <input type='checkbox' id='consent' checked={agreed} onChange={() => setAgreed(!agreed)} className='mt-1' disabled={isDisabled} />
          <label htmlFor='consent'>{t('agreeToParticipate')}</label>
        </div>

        <button
          onClick={handleContinue}
          disabled={!isFormValid}
          className={`mt-6 px-6 py-2 rounded-full text-lg font-semibold transition-all duration-200 ease-in-out ${
            !isFormValid ? 'bg-gray-300! text-gray-500 cursor-not-allowed' : 'bg-[#004346] text-white hover:bg-[#004346] cursor-pointer'
          }`}>
          {t('continue')}
        </button>
      </div>
    </div>
  );
};

export default Prototype;
