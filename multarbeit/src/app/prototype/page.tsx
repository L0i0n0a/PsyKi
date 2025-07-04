'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/utils/translation';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';
import { useParticipantStore } from '@/store';

const Prototype = () => {
  const router = useRouter();
  const [locale, setLocale] = useState<'de' | 'en'>('de');

  const [code, setCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const { t } = useTranslation(locale);

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  };

  const { setCode: setCodeStore, code: codeFromStore } = useParticipantStore();

  useEffect(() => {
    if (codeFromStore && codeFromStore.trim() !== '') {
      setCode(codeFromStore);
      setAgreed(true);
      setAgeConfirmed(true);
    }
  }, [codeFromStore]);

  const isDisabled = !!(codeFromStore && codeFromStore.trim() !== '');
  const isFormValid = code.trim() !== '' && agreed && ageConfirmed;

  const handleContinue = () => {
    if (isFormValid) {
      setCodeStore(code.trim());
      router.push('/prototype/onboarding');
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6 min-h-screen flex flex-col justify-center space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-center w-full'>{t('consentTitle')}</h1>
        <LanguageToggle locale={locale} onToggle={toggleLanguage} />
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
