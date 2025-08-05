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
  /* ========================================
     STATE MANAGEMENT
     ======================================== */

  // Navigation and core state
  const router = useRouter();
  /** Current trial index (0-19 for 20 total trials) */
  const [index, setIndex] = useState(0);
  /** Participant's slider response value (-100 to +100) */
  const [sliderValue, setSliderValue] = useState(0);
  /** Flag indicating if test phase is completed */
  const [finished, setFinished] = useState(false);
  /** Current locale for internationalization */
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  /** Translation function for current locale */
  const { t } = useTranslation(locale);
  /** Current instruction step for post-completion phase */
  const [step, setStep] = useState(0);
  /** Total number of instruction steps available */
  const instructionStepsLength = 6;

  /* ========================================
     ZUSTAND STORE INTEGRATION
     ======================================== */

  // Participant identification and session management
  const code = useParticipantStore((state) => state.code);

  // Signal Detection Theory metrics from store
  const hits = useParticipantStore((state) => state.hits);
  const setHits = useParticipantStore((state) => state.setHits);
  const misses = useParticipantStore((state) => state.misses);
  const setMisses = useParticipantStore((state) => state.setMisses);
  const falseAlarms = useParticipantStore((state) => state.falseAlarms);
  const setFalseAlarms = useParticipantStore((state) => state.setFalseAlarms);
  const correctRejections = useParticipantStore((state) => state.correctRejections);
  const setCorrectRejections = useParticipantStore((state) => state.setCorrectRejections);

  // Accuracy tracking from store
  const incrementAccuracy = useParticipantStore((state) => state.incrementAccuracy);
  const correctCount = useParticipantStore((state) => state.correctCount);
  const totalCount = useParticipantStore((state) => state.totalCount);
  const hasHydrated = useParticipantStore((state) => state._hasHydrated);

  // Test phase response management
  const addTestphaseResponse = useParticipantStore((state) => state.addTestphaseResponse);
  const clearTestphaseResponses = useParticipantStore((state) => state.clearTestphaseResponses);
  const setFinalTestphaseResponses = useParticipantStore((state) => state.setFinalTestphaseResponses);
  const testphaseResponses = useParticipantStore((state) => state.testphaseResponses);
  const setTestphaseFinished = useParticipantStore((state) => state.setTestphaseFinished);

  // Feedback system management
  const feedbackCount = useParticipantStore((state) => state.feedbackCount);
  const setFeedbackCount = useParticipantStore((state) => state.setFeedbackCount);

  /* ========================================
     DATA AND DERIVED VALUES
     ======================================== */

  /** Current trial information from test dataset */
  const current = data[index];

  /** Current participant accuracy percentage */
  const accuracy = hasHydrated && totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(1) : '0';

  /* ========================================
     UTILITY FUNCTIONS
     ======================================== */

  /**
   * Calculate performance feedback for recent trials
   *
   * Analyzes the last 5 trials to provide participants with feedback
   * on their decision accuracy during the calibration phase.
   *
   * @param responses - Array of participant response data
   * @param currentIndex - Current trial index for windowing
   * @returns Feedback object with accuracy metrics or null if insufficient data
   */
  function getFeedback(responses: { index: number; color: number; sliderValue: number }[], currentIndex: number) {
    const start = Math.max(0, currentIndex - 5);
    const lastFive = responses.slice(start, currentIndex + 1);
    if (lastFive.length === 0) return null;

    // Calculate absolute differences between response and correct answer
    const diffs = lastFive.map((r) => Math.abs(r.sliderValue - r.color * 100));
    const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    const avgAccuracy = 100 - avgDiff;

    return {
      avgDiff: avgDiff.toFixed(1),
      avgAccuracy: avgAccuracy.toFixed(1),
      diffs,
    };
  }

  /* ========================================
     EVENT HANDLERS
     ======================================== */

  /**
   * Toggle between German and English language interface
   */
  const toggleLanguage = () => setLocale((prev) => (prev === 'de' ? 'en' : 'de'));

  /**
   * Process participant response and advance to next trial
   *
   * Records the participant's slider response, updates Signal Detection Theory
   * metrics, saves data to backend, and manages trial progression through the
   * calibration phase.
   */
  const handleClick = () => {
    if (finished) return;

    // Prepare response data with trial information
    const response = {
      index,
      color: current.color,
      sliderValue,
      timestamp: new Date().toISOString(),
    };

    // Determine participant's choice and correctness
    const userChoice = sliderValue > 0 ? 'blue' : 'orange';
    const correctChoice = current.color < 50 ? 'orange' : 'blue';
    const isCorrect = userChoice === correctChoice;

    // Update Signal Detection Theory metrics
    const isSignal = current.color > 50; // Blue stimulus (signal present)
    const choseBlue = sliderValue > 0; // Participant chose blue

    if (isSignal) {
      if (choseBlue) setHits(hits + 1); // Correct detection of signal
      else setMisses(misses + 1); // Missed signal detection
    } else {
      if (choseBlue) setFalseAlarms(falseAlarms + 1); // False alarm (chose signal when noise)
      else setCorrectRejections(correctRejections + 1); // Correct rejection of noise
    }

    // Update overall accuracy counter
    incrementAccuracy(isCorrect);

    // Store response in Zustand for immediate access
    addTestphaseResponse(response);

    // Persist data to backend API
    const TOKEN = process.env.NEXT_PUBLIC_SAVE_DATA_TOKEN ?? '';
    fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-token': TOKEN,
      },
      body: JSON.stringify({ code, responses: [response] }),
    });

    // Manage trial progression
    const nextIndex = index < data.length - 1 ? index + 1 : index;
    localStorage.setItem('testphaseIndex', String(nextIndex));

    if (index < data.length - 1) {
      // Continue to next trial
      setIndex(nextIndex);
      setSliderValue(0); // Reset slider for next trial
    } else {
      // Complete calibration phase
      setFinished(true);
      setFinalTestphaseResponses([...testphaseResponses, response]);
      setTestphaseFinished(true);
      localStorage.removeItem('testphaseIndex');
      localStorage.setItem(`testphaseFinished_${code}`, 'true');
    }
  };

  /* ========================================
     COMPONENT LIFECYCLE EFFECTS
     ======================================== */

  /**
   * Initialize component state from localStorage on mount
   *
   * Recovers participant progress if they refresh or return to the page.
   * Clears previous responses if starting fresh to ensure clean calibration data.
   */
  useEffect(() => {
    const savedIndex = localStorage.getItem('testphaseIndex');
    if (savedIndex !== null) {
      setIndex(Number(savedIndex));
    } else {
      clearTestphaseResponses();
      setFeedbackCount(0);
    }
  }, [clearTestphaseResponses, setFeedbackCount]);

  /**
   * Validate participant code and check completion status
   *
   * Ensures valid participants and recovers completion state if they
   * return after finishing the calibration phase.
   */
  useEffect(() => {
    if (!hasHydrated) return;
    if (!code) router.replace('/prototype');
    const finishedFlag = localStorage.getItem(`testphaseFinished_${code}`);
    if (finishedFlag === 'true') setFinished(true);
  }, [code, router, hasHydrated]);

  /**
   * Update feedback counter at regular intervals
   *
   * Tracks feedback presentation frequency to ensure participants
   * receive performance updates every 6 trials during calibration.
   */
  useEffect(() => {
    if (index > 0 && (index + 1) % 6 === 0) {
      const expectedFeedbackCount = Math.floor((index + 1) / 6);
      setFeedbackCount(expectedFeedbackCount);
    }
  }, [index, setFeedbackCount]);

  /* ========================================
     RENDER LOGIC
     ======================================== */

  // Render instruction screen when calibration phase is completed
  if (finished) {
    return (
      <div className='max-w-6xl mx-auto p-6 space-y-8'>
        {/* Header with language toggle */}
        <div className='header border10'>
          <div className='relative flex justify-center items-center'>
            <h1 className='md:text-4xl text-2xl font-bold m-4 text-center'>{t('title')}</h1>
            <LanguageToggle locale={locale} onToggle={toggleLanguage} />
          </div>
        </div>

        {/* Main instruction component for post-calibration guidance */}
        <div className='max-w-8xl mx-auto flex flex-col items-center justify-center '>
          <MainText locale={locale} step={step} setStep={setStep} instructionStepsLength={instructionStepsLength} />
        </div>
      </div>
    );
  }

  /* ========================================
     CALIBRATION TEST INTERFACE
     ======================================== */

  return (
    <div className='max-w-6xl lg:max-w-7xl xl:max-w-[90rem] mx-auto p-6 space-y-8 min-h-screen h-full'>
      {/* Header with title and language toggle */}
      <div className='header border10'>
        <div className='relative flex justify-center items-center'>
          <h1 className='md:text-4xl text-2xl font-bold m-4 text-center'>{t('title')}</h1>
          <LanguageToggle locale={locale} onToggle={toggleLanguage} />
        </div>
      </div>

      {/* Dynamic feedback system for performance updates */}
      <div className='sm:relative mx-auto z-10 py-4 items-center justify-center flex max-w-6xl px-8'>
        <AnimatePresence>
          {/* Performance feedback every 6 trials */}
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
                    // Alternate between two types of feedback messages
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
            /* Default instruction text when no feedback is shown */
            <div className='md:text-xl text-md flex justify-center'>{t('instructionTitle')}</div>
          )}
        </AnimatePresence>
      </div>

      {/* Main calibration content area */}
      <div className='max-w-4xl lg:max-w-6xl xl:max-w-[90rem] mx-auto h-full flex flex-col items-center justify-center'>
        {/* Trial counter and progress header */}
        <h2 className='self-start font-bold md:text-2xl text-md pb-4'>
          {t('testPhaseHeader')} {index + 1}/{data.length}
        </h2>

        {/* Progress bar showing calibration completion */}
        <div className='w-full h-8 bg-gray-100 border-2 drop-shadow-xl border-[#508991] text-center rounded-full! mb-4 overflow-hidden'>
          <div
            className='h-full bg-[#39ab52] transition-all duration-300'
            style={{
              width: `${((index + 1) / data.length) * 100}%`,
            }}></div>
        </div>

        {/* Main trial interface with stimulus and response controls */}
        <div className='items-center h-full w-full sectionBorder justify-around flex  md:flex-row flex-col drop-shadow-xl rounded-2xl bg-white p-6'>
          {/* Color stimulus display */}
          <BiColor percentage={current.color} index={current.index} />

          {/* Response interface with slider and submit button */}
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
