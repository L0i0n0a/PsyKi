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
  const [sliderValue, setSliderValue] = useState(0);
  const [finished, setFinished] = useState(false);
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const { t } = useTranslation(locale);
  const [step, setStep] = useState(0);
  const instructionStepsLength = 6;
  const isLastStep = step === instructionStepsLength - 1;
  const code = useParticipantStore((state) => state.code);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [falseAlarms, setFalseAlarms] = useState(0);
  const [correctRejections, setCorrectRejections] = useState(0);


  // const getSessionId = () => {
  //   if (typeof window === 'undefined') return '';
  //   let sessionId = localStorage.getItem('sessionId');
  //   if (!sessionId) {
  //     sessionId = uuidv4();
  //     localStorage.setItem('sessionId', sessionId);
  //   }
  //   return sessionId;
  // };
  function getFeedback(responses: { index: number; color: number; sliderValue: number }[], currentIndex: number) {
    const start = Math.max(0, currentIndex - 5);
    const lastFive = responses.slice(start, currentIndex + 1);
    if (lastFive.length === 0) return null;

    const diffs = lastFive.map((r) => Math.abs(r.sliderValue - r.color * 100));
    const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    const avgAccuracy = 100 - avgDiff;

    console.log(`[Feedback] CurrentIndex: ${currentIndex}, AvgDiff: ${avgDiff.toFixed(1)}, AvgAccuracy: ${avgAccuracy.toFixed(1)}, Diffs:`, diffs);

    return {
      avgDiff: avgDiff.toFixed(1),
      avgAccuracy: avgAccuracy.toFixed(1),
      diffs,
    };
  }

  const [responses, setResponses] = useState<{ index: number; color: number; sliderValue: number }[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('testphaseResponses');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  };

  const incrementAccuracy = useParticipantStore((state) => state.incrementAccuracy);

  const handleClick = () => {
    if (finished) return;
    const response = {
      index,
      color: current.color,
      sliderValue,
      timestamp: new Date().toISOString(),
    };

    console.log('Slider value:', sliderValue);

    const userChoice = sliderValue > 0 ? 'blue' : 'orange';
    const correctChoice = current.color < 0 ? 'orange' : 'blue';
    const isCorrect = userChoice === correctChoice;
    console.log(`[Click] Index: ${index}, Slider: ${sliderValue}, Color: ${current.color}, UserChoice: ${userChoice}, CorrectChoice: ${correctChoice}, Correct: ${isCorrect}`);

    // Definition:
    // Blau = positive class → color > 0
    // Orange = negative class → color < 0

    const isSignal = current.color > 0; // „Blau“ = Signal
    const choseBlue = sliderValue > 0;

    // Signal vorhanden (Blau)
    if (isSignal) {
      if (choseBlue) {
        setHits((prev) => prev + 1); // korrekt blau gewählt → Hit
      } else {
        setMisses((prev) => prev + 1); // falsch orange gewählt → Miss
      }
    } else {
      // Kein Signal (Orange)
      if (choseBlue) {
        setFalseAlarms((prev) => prev + 1); // falsch blau gewählt → False Alarm
      } else {
        setCorrectRejections((prev) => prev + 1); // korrekt orange gewählt → Correct Rejection
      }
    }
    console.log('--- SDT Classification ---');
    console.log('Hits:', hits + (isSignal && choseBlue ? 1 : 0));
    console.log('Misses:', misses + (isSignal && !choseBlue ? 1 : 0));
    console.log('False Alarms:', falseAlarms + (!isSignal && choseBlue ? 1 : 0));
    console.log('Correct Rejections:', correctRejections + (!isSignal && !choseBlue ? 1 : 0));



    incrementAccuracy(isCorrect);

    setResponses((prev) => [...prev, response]);
    //console.log('Collected response:', response);

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
      setSliderValue(0);
    } else {
      setFinished(true);
      localStorage.removeItem('testphaseIndex');
      localStorage.setItem(`testphaseFinished_${code}`, 'true');
    }
  };

  useEffect(() => {
    localStorage.setItem('testphaseResponses', JSON.stringify(responses));
  }, [responses]);

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

  const hasHydrated = useParticipantStore((state) => state._hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!code) {
      router.replace('/prototype');
    }
    const finishedFlag = localStorage.getItem(`testphaseFinished_${code}`);
    if (finishedFlag === 'true') {
      setFinished(true);
    }
  }, [code, router, hasHydrated]);

  useEffect(() => {
    if (index > 0 && (index + 1) % 6 === 0) {
      setFeedbackCount((prev) => prev + 1);
    }
  }, [index]);

  const correctCount = useParticipantStore((state) => state.correctCount);
  const totalCount = useParticipantStore((state) => state.totalCount);

  const current = data[index];
  const accuracy = totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(1) : '0';

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
            className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold ${!isLastStep ? 'bg-gray-300! text-gray-400 cursor-not-allowed' : 'bg-[#004346] text-white hover:bg-[#004346]! cursor-pointer'
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
        </AnimatePresence>
      </div>
      <div className='max-w-4xl mx-auto h-full flex flex-col items-center justify-center'>
        <h2 className='self-start font-bold md:text-2xl text-md pb-4'>
          {t('testPhaseHeader')} {index + 1}/{data.length}
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
          <div className='flex h-[256px] w-full m-4 flex-col items-center justify-center space-y-4'>
            <div className='text-lg mt-auto text-center mb-4 flex flex-col items-center justify-center w-full'>
              <ColorSlider initial={0} value={sliderValue} locale={locale} onChange={(val) => setSliderValue(val)} />
            </div>
            <div className='flex justify-center mt-16!'>
              <button
                id='buttonNext'
                disabled={sliderValue === 0}
                className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold ${sliderValue === 0 ? 'bg-gray-300! text-gray-400 cursor-not-allowed' : 'text-white bg-[#004346] hover:bg-[#004346] cursor-pointer'
                  }`}
                onClick={handleClick}>
                {t('buttonNext')}
              </button>
            </div>
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

export default Testphase;
