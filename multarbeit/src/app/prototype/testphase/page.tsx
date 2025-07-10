'use client';
import { useEffect, useState } from 'react';
import BiColor from '@/components/canvas/BiColor';
import ColorSlider from '@/components/ui/Slider/Slider';
import data from '@/lib/dataTest.json';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/utils/translation';
import { AnimatePresence, motion } from 'framer-motion';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';
import MainText from '@/components/ui/TextComponent/MainText';
import { useParticipantStore } from '@/store';

const Testphase = () => {
  // --- State and Store ---
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [finished, setFinished] = useState(false);
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const { t } = useTranslation(locale);
  const [step, setStep] = useState(0);
  const instructionStepsLength = 6;

  // Zustand store values
  const code = useParticipantStore((state) => state.code);
  const hits = useParticipantStore((state) => state.hits);
  const setHits = useParticipantStore((state) => state.setHits);
  const misses = useParticipantStore((state) => state.misses);
  const setMisses = useParticipantStore((state) => state.setMisses);
  const falseAlarms = useParticipantStore((state) => state.falseAlarms);
  const setFalseAlarms = useParticipantStore((state) => state.setFalseAlarms);
  const correctRejections = useParticipantStore((state) => state.correctRejections);
  const setCorrectRejections = useParticipantStore((state) => state.setCorrectRejections);
  const incrementAccuracy = useParticipantStore((state) => state.incrementAccuracy);
  const correctCount = useParticipantStore((state) => state.correctCount);
  const totalCount = useParticipantStore((state) => state.totalCount);
  const hasHydrated = useParticipantStore((state) => state._hasHydrated);
  const addTestphaseResponse = useParticipantStore((state) => state.addTestphaseResponse);
  const clearTestphaseResponses = useParticipantStore((state) => state.clearTestphaseResponses);
  const setFinalTestphaseResponses = useParticipantStore((state) => state.setFinalTestphaseResponses);
  const testphaseResponses = useParticipantStore((state) => state.testphaseResponses);
  const setTestphaseFinished = useParticipantStore((state) => state.setTestphaseFinished);
  const feedbackCount = useParticipantStore((state) => state.feedbackCount);
  const setFeedbackCount = useParticipantStore((state) => state.setFeedbackCount);

  // --- Data ---
  const current = data[index];

  // --- Derived values ---
  const accuracy = hasHydrated && totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(1) : '0';

  // --- Utility functions ---
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

  // --- Handlers ---
  const toggleLanguage = () => setLocale((prev) => (prev === 'de' ? 'en' : 'de'));

  const handleClick = () => {
    if (finished) return;
    const response = {
      index,
      color: current.color,
      sliderValue,
      timestamp: new Date().toISOString(),
    };

    const userChoice = sliderValue > 0 ? 'blue' : 'orange';
    const correctChoice = current.color < 50 ? 'orange' : 'blue';
    const isCorrect = userChoice === correctChoice;

    // SDT logic
    const isSignal = current.color > 50;
    const choseBlue = sliderValue > 0;

    if (isSignal) {
      if (choseBlue) setHits(hits + 1);
      else setMisses(misses + 1);
    } else {
      if (choseBlue) setFalseAlarms(falseAlarms + 1);
      else setCorrectRejections(correctRejections + 1);
    }

    incrementAccuracy(isCorrect);

    // Store response in Zustand
    addTestphaseResponse(response);

    // Save response to backend
    const TOKEN = process.env.NEXT_PUBLIC_SAVE_DATA_TOKEN ?? '';
    fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-token': TOKEN,
      },
      body: JSON.stringify({ code, responses: [response] }),
    });

    // Progress
    const nextIndex = index < data.length - 1 ? index + 1 : index;
    localStorage.setItem('testphaseIndex', String(nextIndex));

    if (index < data.length - 1) {
      setIndex(nextIndex);
      setSliderValue(0);
    } else {
      setFinished(true);
      setFinalTestphaseResponses([...testphaseResponses, response]);
      setTestphaseFinished(true);
      localStorage.removeItem('testphaseIndex');
      localStorage.setItem(`testphaseFinished_${code}`, 'true');
    }
  };

  // --- Effects ---
  useEffect(() => {
    const savedIndex = localStorage.getItem('testphaseIndex');
    if (savedIndex !== null) {
      setIndex(Number(savedIndex));
    } else {
      clearTestphaseResponses();
      setFeedbackCount(0);
    }
  }, [clearTestphaseResponses, setFeedbackCount]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!code) router.replace('/prototype');
    const finishedFlag = localStorage.getItem(`testphaseFinished_${code}`);
    if (finishedFlag === 'true') setFinished(true);
  }, [code, router, hasHydrated]);

  useEffect(() => {
    if (index > 0 && (index + 1) % 6 === 0) {
      const expectedFeedbackCount = Math.floor((index + 1) / 6);
      setFeedbackCount(expectedFeedbackCount);
    }
  }, [index, setFeedbackCount]);

  // --- Render ---
  if (finished) {
    return (
      <div className='max-w-6xl mx-auto p-6 space-y-8'>
        <div className='header border10'>
          <div className='relative flex justify-center items-center'>
            <h1 className='md:text-4xl text-2xl font-bold m-4 text-center'>{t('title')}</h1>
            <LanguageToggle locale={locale} onToggle={toggleLanguage} />
          </div>
        </div>
        <div className='max-w-8xl mx-auto flex flex-col items-center justify-center '>
          <MainText locale={locale} step={step} setStep={setStep} instructionStepsLength={instructionStepsLength} />
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl lg:max-w-7xl xl:max-w-[90rem] mx-auto p-6 space-y-8 min-h-screen h-full'>
      <div className='header border10'>
        <div className='relative flex justify-center items-center'>
          <h1 className='md:text-4xl text-2xl font-bold m-4 text-center'>{t('title')}</h1>
          <LanguageToggle locale={locale} onToggle={toggleLanguage} />
        </div>
      </div>
      <div className='sm:relative mx-auto z-10 py-4 items-center justify-center flex max-w-6xl px-8'>
        <AnimatePresence>
          {index > 0 && (index + 1) % 6 === 0 ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='bg-gradient-to-r lg:w-[90%] z-20 sm:w-full sm:h-18 h-24 mx-auto sm:top-auto sm:left-auto sm:right-auto top-6 left-6 right-6 sm:absolute fixed from-[#39ab52] to-[#66ad28] text-gray-900 rounded-[10px] shadow-lg text-center justify-center flex items-center font-bold md:text-2xl text-md'>
              <mark style={{ background: 'none', color: '#ffffff', padding: 0 }}>
                <div className='flex flex-col items-center justify-center'>
                  {(() => {
                    const feedback = getFeedback(testphaseResponses, index);
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
          ) : (
            <div className='md:text-xl text-md flex justify-center'>{t('instructionTitle')}</div>
          )}
        </AnimatePresence>
      </div>
      <div className='max-w-4xl lg:max-w-6xl xl:max-w-[90rem] mx-auto h-full flex flex-col items-center justify-center'>
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
          <BiColor percentage={current.color} index={current.index} />
          <div className='flex w-full m-4 flex-col items-center justify-center space-y-4'>
            <div className='text-lg mt-auto text-center mb-4 flex flex-col items-center justify-center w-full'>
              <ColorSlider initial={0} value={sliderValue} locale={locale} onChange={setSliderValue} />
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
        </div>
      </div>
    </div>
  );
};

export default Testphase;
