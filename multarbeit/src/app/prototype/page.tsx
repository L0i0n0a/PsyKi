'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/utils/translation';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';
import { useParticipantStore } from '@/store';

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */
const Prototype = () => {
  /* ========================================
     STATE MANAGEMENT
     ======================================== */

  // Navigation and core state
  const router = useRouter();
  /** Current interface language ('de' for German, 'en' for English) */
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  /** Participant's chosen identification code */
  const [code, setCode] = useState('');
  /** Consent agreement checkbox state */
  const [agreed, setAgreed] = useState(false);
  /** Age verification checkbox state (18+ requirement) */
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  /** Translation function for current locale */
  const { t } = useTranslation(locale);

  /* ========================================
     ZUSTAND STORE INTEGRATION
     ======================================== */

  /** Store functions and data for participant management */
  const { setCode: setCodeStore, code: codeFromStore } = useParticipantStore();

  /* ========================================
     COMPONENT LIFECYCLE EFFECTS
     ======================================== */

  /**
   * Restore session state for returning participants
   *
   * Automatically populates form fields and consent checkboxes if the
   * participant has already registered, enabling seamless continuation
   * of their research session.
   */
  useEffect(() => {
    if (codeFromStore && codeFromStore.trim() !== '') {
      setCode(codeFromStore);
      setAgreed(true);
      setAgeConfirmed(true);
    }
  }, [codeFromStore]);

  /* ========================================
     DERIVED VALUES
     ======================================== */

  /** Disable form inputs if participant already has a registered code */
  const isDisabled = !!(codeFromStore && codeFromStore.trim() !== '');
  /** Form validation: requires code, consent, and age verification */
  const isFormValid = code.trim() !== '' && agreed && ageConfirmed;

  /* ========================================
     EVENT HANDLERS
     ======================================== */

  /**
   * Toggle between German and English language interface
   *
   * Allows participants to select their preferred language for the
   * consent process and throughout the research study.
   */
  const toggleLanguage = () => setLocale((prev) => (prev === 'de' ? 'en' : 'de'));

  /**
   * Process participant registration and advance to onboarding
   *
   * Handles the complete registration flow including:
   * - Form validation to ensure all requirements are met
   * - Unique code generation to prevent data conflicts
   * - Store integration for persistent participant tracking
   * - Navigation to the next phase of the research study
   */
  const handleContinue = async () => {
    if (!isFormValid) return;

    // Skip code generation if participant already registered
    if (codeFromStore && codeFromStore.trim() !== '') {
      router.push('/prototype/onboarding');
      return;
    }

    // Generate unique participant code to prevent data conflicts
    const baseCode = code.trim();
    let trial = 1;
    let finalCode = baseCode;
    let exists = true;

    // Check for existing codes and append trial numbers if needed
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

    // Store unique code and proceed to onboarding
    setCodeStore(finalCode);
    router.push('/prototype/onboarding');
  };

  /* ========================================
     RENDER IMPLEMENTATION
     ======================================== */

  return (
    <div className='max-w-4xl mx-auto p-6 min-h-screen flex flex-col justify-center space-y-6'>
      {/* Header with title and language toggle */}
      <div className='flex justify-left ml-6 items-center space-x-4 mb-6'>
        <h1 className='text-3xl font-bold text-left w-full'>{t('consentTitle')}</h1>
        <LanguageToggle locale={locale} onToggle={toggleLanguage} className='text-white relative' />
      </div>

      {/* Main consent and registration form */}
      <div className='bg-white p-6 rounded-xl shadow-lg border space-y-4'>
        {/* Participant code input field */}
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

        {/* Informed consent information */}
        <p>{t('consentText1')}</p>
        <p>{t('consentText2')}</p>
        <p className='font-bold'>{t('consentText3')}</p>

        {/* Age verification checkbox (18+ requirement) */}
        <div className='flex items-start space-x-2 mt-4'>
          <input type='checkbox' id='age' checked={ageConfirmed} onChange={() => setAgeConfirmed(!ageConfirmed)} className='mt-1' disabled={isDisabled} />
          <label htmlFor='age'>{t('confirmAge')}</label>
        </div>

        {/* Consent agreement checkbox */}
        <div className='flex items-start space-x-2'>
          <input type='checkbox' id='consent' checked={agreed} onChange={() => setAgreed(!agreed)} className='mt-1' disabled={isDisabled} />
          <label htmlFor='consent'>{t('agreeToParticipate')}</label>
        </div>

        {/* Continue button with form validation */}
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
