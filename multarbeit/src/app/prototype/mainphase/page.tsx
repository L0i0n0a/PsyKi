'use client';
import { useEffect, useState } from 'react';
import BiColorV2 from '@/components/canvas/BiColorV2';
import ColorSlider from '@/components/ui/Slider/Slider';
import dataDe from '@/lib/dataMainDe.json';
import dataEn from '@/lib/dataMainEn.json';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/utils/translation';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';
import { AnimatePresence, motion } from 'framer-motion';
import AccuracyComparison from '@/components/AccuracyComparison';
// import { v4 as uuidv4 } from 'uuid';
import { useParticipantStore } from '@/store';

const Mainphase = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [finished, setFinished] = useState(false);
  const [showRecom, setShowRecom] = useState(false);
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const { t } = useTranslation(locale);

  // const getSessionId = () => {
  //   if (typeof window === 'undefined') return '';
  //   let sessionId = localStorage.getItem('sessionId');
  //   if (!sessionId) {
  //     sessionId = uuidv4();
  //     localStorage.setItem('sessionId', sessionId);
  //   }
  //   return sessionId;
  // };

  const [responses, setResponses] = useState<unknown[]>([]);

  const code = useParticipantStore((state) => state.code);

  useEffect(() => {
    if (finished && responses.length > 0) {
    }
  }, [finished, responses, code]);

  useEffect(() => {
    const savedIndex = localStorage.getItem('mainphaseIndex');
    if (savedIndex !== null) {
      setIndex(Number(savedIndex));
    }
  }, []);

  useEffect(() => {
    if (!code) {
      router.replace('/prototype/testphase');
      return;
    }
    const finishedFlag = localStorage.getItem(`mainphaseFinished_${code}`);
    if (finishedFlag === 'true') {
      setFinished(true);
    }
  }, [code, router]);

  const data = locale === 'de' ? dataDe : dataEn;
  const current = data[index];

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  };

  const handleClick = () => {
    if (finished) return;
    setShowRecom(true);
  };

  const handleChoice = (button: 'orange' | 'blue') => {
    const response = {
      index,
      color: current.color,
      sliderValue,
      timestamp: new Date().toISOString(),
      buttonPressed: button,
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
    localStorage.setItem('mainphaseIndex', String(nextIndex));

    if (index < data.length - 1) {
      setIndex(nextIndex);
      setSliderValue(50);
      setShowRecom(false);
    } else {
      setFinished(true);
      localStorage.removeItem('mainphaseIndex');
      localStorage.setItem(`mainphaseFinished_${code}`, 'true');
    }
  };

  if (finished) {
    return (
      <div className='max-w-6xl mx-auto p-6 space-y-8'>
        <div className='header border10'>
          <div className='relative flex justify-center items-center'>
            <h1 className='md:text-4xl text-2xl font-bold m-4 text-center'>{t('title')}</h1>
            <LanguageToggle locale={locale} onToggle={toggleLanguage} />
          </div>
        </div>
        <div className='max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]'>
          <h1 className='text-4xl font-bold mb-6 text-center'>{t('completionTitle')}</h1>
          <p className='mb-8 text-lg text-center' style={{ whiteSpace: 'pre-line' }}>
            {t('completionMessage')}
          </p>
          <button className='px-6 py-2 text-white hover:bg-[#004346]! rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer' onClick={() => router.push('/')}>
            {t('buttonHome')}
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
      <div className='max-w-4xl mx-auto h-full flex flex-col items-center justify-center'>
        <h2 className='self-start font-bold md:text-2xl text-md pb-4'>
          {t('mainPhaseHeader')} {current.header}/50
        </h2>
        <div className='w-full h-8 bg-gray-100 border-2 drop-shadow-xl border-[#508991] text-center rounded-full! mb-4 overflow-hidden'>
          <div
            className='h-full bg-[#39ab52] transition-all duration-300'
            style={{
              width: `${((index + 1) / data.length) * 100}%`,
            }}></div>
        </div>
        <div className='items-center h-full w-full sectionBorder justify-around flex md:flex-row flex-col drop-shadow-xl rounded-2xl bg-white p-6'>
          <BiColorV2 percentage={current.color} />
          <div className='flex m-4 w-full flex-col justify-center space-y-4'>
            {!showRecom ? (
              <div>
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
            ) : (
              <div className='flex flex-col w-full space-y-1'>
                <div className='w-full'>
                  <AccuracyComparison menschPercent={60} kiPercent={93} locale={locale} decision={sliderValue} />
                </div>
                <div className='flex flex-col min-w-xs justify-center items-center w-full space-y-1'>
                  <div> {t('assistantRecommendationTitle')}</div>
                  <div className='text-lg font-semibold md:max-w-full max-w-2xs text-center'>{current.recom}</div>
                  <div className='flex w-full justify-center space-x-4'>
                    <button className='px-6 py-2 bg-orange-500! text-white rounded-full text-lg font-semibold transition hover:bg-orange-800! cursor-pointer' onClick={() => handleChoice('orange')}>
                      {t('buttonOrange')}
                    </button>
                    <button className='px-6 py-2 bg-blue-600! text-white rounded-full text-lg font-semibold transition hover:bg-blue-800! cursor-pointer' onClick={() => handleChoice('blue')}>
                      {t('buttonBlue')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div style={{ position: 'fixed', bottom: 20, left: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
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
      </div> */}
    </div>
  );
};

export default Mainphase;
