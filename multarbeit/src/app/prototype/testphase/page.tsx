'use client';
import { useEffect, useState } from 'react';
import BiColorV2 from '@/components/canvas/BiColorV2';
import ColorSlider from '@/components/ui/Slider/Slider';
import data from '@/lib/dataTest.json';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/utils/translation';
import { AnimatePresence, motion } from 'framer-motion';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';
import MainText from '@/components/MainText';
// import { v4 as uuidv4 } from 'uuid';
import { useParticipantStore } from '@/store';

const Testphase = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [finished, setFinished] = useState(false);
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const { t } = useTranslation(locale);
  const [step, setStep] = useState(0);
  const instructionStepsLength = 6;
  const isLastStep = step === instructionStepsLength - 1;
  const [responses, setResponses] = useState<unknown[]>([]);
  const code = useParticipantStore((state) => state.code);

  useEffect(() => {
    if (!code) {
      router.replace('/prototype');
    }
  }, [code, router]);

  // const getSessionId = () => {
  //   if (typeof window === 'undefined') return '';
  //   let sessionId = localStorage.getItem('sessionId');
  //   if (!sessionId) {
  //     sessionId = uuidv4();
  //     localStorage.setItem('sessionId', sessionId);
  //   }
  //   return sessionId;
  // };

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  };

  const handleClick = () => {
    if (finished) return;
    const response = {
      index,
      color: current.color,
      sliderValue,
      timestamp: new Date().toISOString(),
    };
    setResponses((prev) => [...prev, response]);
    console.log('Collected response:', response);

    const TOKEN = process.env.NEXT_PUBLIC_SAVE_DATA_TOKEN ?? '';
    fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-token': TOKEN,
      },
      body: JSON.stringify({ code, responses: [response] }),
    });

    const nextIndex = index < data.length - 1 ? index + 1 : index;
    localStorage.setItem('testphaseIndex', String(nextIndex));

    if (index < data.length - 1) {
      setIndex(nextIndex);
      setSliderValue(50);
    } else {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished && responses.length > 0) {
    }
  }, [finished, responses, code]);

  useEffect(() => {
    const savedIndex = localStorage.getItem('testphaseIndex');
    if (savedIndex !== null) {
      setIndex(Number(savedIndex));
    }
  }, []);

  useEffect(() => {
    if (!code) {
      router.replace('/prototype');
      return;
    }
    const finishedFlag = localStorage.getItem(`testphaseFinished_${code}`);
    if (finishedFlag === 'true') {
      setFinished(true);
    }
  }, [code, router]);

  useEffect(() => {
    if (!code) {
      router.replace('/prototype');
      return;
    }
  }, [code, router]);

  const current = data[index];

  if (finished) {
    return (
      <div className='max-w-6xl mx-auto p-6 space-y-8'>
        <div className='header border10'>
          <div className='relative flex justify-center items-center'>
            <h1 className='md:text-4xl text-2xl font-bold m-4 text-center'>{t('title')}</h1>
            <LanguageToggle locale={locale} onToggle={toggleLanguage} />
          </div>
        </div>
        <div className='max-w-4xl mx-auto p-8 flex flex-col items-center justify-center '>
          {/* <h1 className='text-4xl font-bold mb-6 text-center'>{t('finalPhaseTitle')}</h1>
          <p className='mb-8 text-lg text-center'>{t('finalPhaseDescription')}</p> */}
          <MainText locale={locale} step={step} setStep={setStep} instructionStepsLength={instructionStepsLength} />
          <button
            disabled={!isLastStep}
            className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold ${
              !isLastStep ? 'bg-gray-300! text-gray-400 cursor-not-allowed' : 'bg-[#004346] text-white hover:bg-[#004346]! cursor-pointer'
            }`}
            onClick={() => router.push('/prototype/mainphase')}>
            Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8 min-h-screen h-full'>
      <div className='header border10'>
        <div className='relative flex justify-center items-center'>
          <h1 className='md:text-4xl text-2xl font-bold m-4 text-center'>{t('title')}</h1>
          <LanguageToggle locale={locale} onToggle={toggleLanguage} />
        </div>
      </div>
      <div className='md:text-2xl text-md flex justify-center'>{t('instructionTitle')}</div>
      <div className='relative max-w-6xl px-8'>
        <AnimatePresence>
          {index > 0 && (index + 1) % 5 === 0 ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='md:text-2xl text-md p-2 max-w-4xl font-bold w-full mx-auto bg-gradient-to-r from-[#39ab52] to-[#66ad28] text-gray-900 rounded-[10px] shadow-lg mt-8 text-center z-10 absolute top-[-120] left-1/2 -translate-x-1/2'>
              <mark style={{ background: 'none', color: '#ffffff', padding: 0 }}>
                <div className='flex items-center justify-center space-x-1'>
                  <div className='font-bold'> {t('feedbackNoteTitle')}</div>
                  <div>{t('feedbackNoteText')}</div>
                </div>
                <div className='text-sm text-gray-300'>{t('feedbackNotePlaceholder')}</div>
              </mark>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className=' max-w-4xl mx-auto h-full flex flex-col items-center justify-center'>
        <h2 className='self-start font-bold md:text-2xl text-md pb-4'>
          {t('testPhaseHeader')} {current.header}/20
        </h2>
        <div className='w-full h-8 bg-gray-100 border-2 drop-shadow-xl border-[#508991] text-center rounded-full! mb-4 overflow-hidden'>
          <div
            className='h-full bg-[#39ab52] transition-all duration-300'
            style={{
              width: `${((index + 1) / data.length) * 100}%`,
            }}></div>
        </div>
        <div className='items-center h-full w-full sectionBorder justify-around flex  md:flex-row flex-col drop-shadow-xl rounded-2xl bg-white p-6'>
          <BiColorV2 percentage={current.color} />
          <div className='flex h-[256px] w-full max-w-xs m-4 flex-col items-center justify-center space-y-4'>
            <div className='text-lg mt-auto text-center mb-4 flex flex-col items-center justify-center w-full'>
              <ColorSlider initial={50} value={sliderValue} locale={locale} onChange={(val) => setSliderValue(val)} />
            </div>
            <div className='flex justify-center mt-16!'>
              <button
                id='buttonNext'
                disabled={sliderValue === 50}
                className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold ${
                  sliderValue === 50 ? 'bg-gray-300! text-gray-400 cursor-not-allowed' : 'text-white bg-[#004346] hover:bg-[#004346] cursor-pointer'
                }`}
                onClick={handleClick}>
                {t('buttonNext')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: 20, left: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => setFinished(true)}
          style={{
            padding: '10px 20px',
            background: '#b7b7b7',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
          Debug Button
        </button>
      </div>
    </div>
  );
};

export default Testphase;
