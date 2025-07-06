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
  const [sliderValue, setSliderValue] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showRecom, setShowRecom] = useState(false);
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const { t } = useTranslation(locale);
  const [feedbackCount, setFeedbackCount] = useState(0);

  // const getSessionId = () => {
  //   if (typeof window === 'undefined') return '';
  //   let sessionId = localStorage.getItem('sessionId');
  //   if (!sessionId) {
  //     sessionId = uuidv4();
  //     localStorage.setItem('sessionId', sessionId);
  //   }
  //   return sessionId;
  // };

  const [responses, setResponses] = useState<{ index: number; color: number; sliderValue: number }[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mainphaseResponses');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('mainphaseResponses', JSON.stringify(responses));
  }, [responses]);

  function getFeedback(responses: { index: number; color: number; sliderValue: number }[], currentIndex: number) {
    const start = Math.max(0, currentIndex - 5);
    const lastFive = responses.slice(start, currentIndex + 1);
    if (lastFive.length === 0) return null;

    const diffs = lastFive.map((r) => Math.abs(r.sliderValue - r.color * 100));
    const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    const avgAccuracy = 100 - avgDiff;

    return {
      avgDiff: avgDiff.toFixed(1),
      avgAccuracy: avgAccuracy.toFixed(1),
      diffs,
    };
  }

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

  const hasHydrated = useParticipantStore((state) => state._hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!code) {
      router.replace('/prototype');
    }
    const finishedFlag = localStorage.getItem(`mainphaseFinished_${code}`);
    if (finishedFlag === 'true') {
      setFinished(true);
    }
  }, [code, router, hasHydrated]);

  useEffect(() => {
    if (index > 0 && (index + 1) % 6 === 0) {
      setFeedbackCount((prev) => prev + 1);
    }
  }, [index]);

  const data = locale === 'de' ? dataDe : dataEn;
  const current = data[index];

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  };

  const handleClick = () => {
    if (finished) return;
    setShowRecom(true);
  };

  const incrementAccuracy = useParticipantStore((state) => state.incrementAccuracy);

  const handleChoice = (button: 'orange' | 'blue') => {
    const response = {
      index,
      color: current.color,
      sliderValue,
      timestamp: new Date().toISOString(),
      buttonPressed: button,
    };
    setResponses((prev) => [...prev, { index, color: current.color, sliderValue }]);
    //console.log('Collected response:', response);

    const userChoice = sliderValue < 0 ? 'blue' : 'orange';
    const correctChoice = current.color < 0 ? 'orange' : 'blue';
    const isCorrect = userChoice === correctChoice;

    incrementAccuracy(isCorrect);

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
      setSliderValue(0);
      setShowRecom(false);
    } else {
      setFinished(true);
      localStorage.removeItem('mainphaseIndex');
      localStorage.setItem(`mainphaseFinished_${code}`, 'true');
    }
  };

  const correctCount = useParticipantStore((state) => state.correctCount);
  const totalCount = useParticipantStore((state) => state.totalCount);
  const accuracy = totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(1) : '0';

  if (finished) {
    const feedback = getFeedback(responses, index);
    const accuracy = feedback?.avgAccuracy ?? '–';

    // TODO genauigkeit 1 & 2
    const rawMessage = t('completionMessage');
    const messageWithAccuracy = rawMessage.replaceAll('%GENAUIGKEIT%', accuracy + '%');

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
            {messageWithAccuracy}
          </p>
          <p className='text-lg'>Sie können die Seite nun schließen.</p>
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
          {index > 0 && (index + 1) % 6 === 0 ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='md:text-2xl text-md p-2 max-w-4xl font-bold w-full mx-auto bg-gradient-to-r from-[#39ab52] to-[#66ad28] text-gray-900 rounded-[10px] shadow-lg mt-8 text-center z-10 absolute top-[-120] left-1/2 -translate-x-1/2'>
              <mark style={{ background: 'none', color: '#ffffff', padding: 0 }}>
                <div className='flex flex-col items-center justify-center'>
                  {(() => {
                    const feedback = getFeedback(responses, index);
                    if (!feedback) return null;
                    if (feedbackCount % 2 === 0) {
                      return (
                        <span>
                          <div className='font-bold'> {t('feedbackNoteTitle')}</div>
                          <div>
                            {t('feedbackNoteText')} <b>{accuracy}%</b>
                          </div>
                        </span>
                      );
                    } else {
                      return (
                        <span>
                          <div className='font-bold'> {t('feedbackNoteTitle')}</div>
                          <div>{t('feedback2', { rightCount: correctCount, allCount: totalCount })}</div>
                        </span>
                      );
                    }
                  })()}
                </div>
              </mark>
            </motion.div>
          ) : null}
          {index > 0 && (index + 1) % 50 === 0 ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='md:text-2xl text-md p-2 max-w-4xl font-bold w-full mx-auto bg-gradient-to-r from-[#39ab52] to-[#66ad28] text-gray-900 rounded-[10px] shadow-lg mt-8 text-center z-10 absolute top-[-120] left-1/2 -translate-x-1/2'>
              <mark style={{ background: 'none', color: '#ffffff', padding: 0 }}>
                <div className='flex flex-col items-center justify-center'>
                  {(() => {
                    return (
                      <div>
                        <div className='font-bold'> {t('attentionCheckTitle')}</div>
                        {t('attentionCheckText')}
                      </div>
                    );
                  })()}
                </div>
              </mark>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className='max-w-4xl mx-auto h-full flex flex-col items-center justify-center'>
        <h2 className='self-start font-bold md:text-2xl text-md pb-4'>
          {t('mainPhaseHeader')} {current.header}/200
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
                  <ColorSlider initial={0} value={sliderValue} locale={locale} onChange={(val) => setSliderValue(val)} />
                </div>
                <div className='flex justify-center mt-16!'>
                  <button
                    id='buttonNext'
                    disabled={sliderValue === 0}
                    className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold ${
                      sliderValue === 0 ? 'bg-gray-300! text-gray-400 cursor-not-allowed' : 'text-white bg-[#004346] hover:bg-[#004346] cursor-pointer'
                    }`}
                    onClick={handleClick}>
                    {t('buttonNext')}
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col w-full space-y-6 '>
                <div className='w-full'>
                  <AccuracyComparison menschPercent={-1} kiPercent={1} locale={locale} decision={sliderValue} />
                </div>
                <div className='flex flex-col min-w-xs justify-center items-center w-full space-y-6 my-16'>
                  <div className='text-center'>
                    <p className='text-lg'> {t('assistantRecommendationTitle')}</p>
                    <p className='text-lg font-semibold md:max-w-full max-w-2xs text-center'>{current.recom}</p>
                  </div>
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
