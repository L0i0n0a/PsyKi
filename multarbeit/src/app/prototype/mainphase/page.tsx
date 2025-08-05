'use client';
import { useEffect, useState } from 'react';
import jStat from 'jstat';
import BiColor from '@/components/canvas/BiColor';
import ColorSlider from '@/components/ui/Slider/Slider';
import dataRaw from '@/lib/dataMain.json';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/utils/translation';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';
import { AnimatePresence, motion } from 'framer-motion';
import AccuracyComparison from '@/components/ui/AccuracyComponent/AccuracyComparison';
import { useParticipantStore } from '@/store';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Interface for individual trial data in the main phase
 *
 * Represents a single experimental trial with stimulus information
 * and AI accuracy parameters for the Optimal Weighting study.
 */
type MainPhaseItem = {
  /** Color stimulus value (0-100 scale, <50=orange, >50=blue) */
  color: number;
  /** Trial sequence number for ordering */
  index: number;
  /** AI model accuracy for this specific trial (0.4 or 0.93) */
  aiAccuracy?: number;
  /** Experimental divergence parameter (unused in current implementation) */
  divergence?: number;
};

const Mainphase = () => {
  /* ========================================
     STATE MANAGEMENT
     ======================================== */

  // Navigation and core state
  const router = useRouter();
  /** Current trial index (0-199) */
  const [index, setIndex] = useState(0);
  /** Participant's slider response value (-100 to +100) */
  const [sliderValue, setSliderValue] = useState(0);
  /** Flag indicating if all trials are completed */
  const [finished, setFinished] = useState(false);
  /** Flag to show AI recommendation interface */
  const [showRecom, setShowRecom] = useState(false);
  /** Current locale for internationalization */
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  /** Translation function for current locale */
  const { t } = useTranslation(locale);

  /* ========================================
     ZUSTAND STORE INTEGRATION
     ======================================== */

  // Signal Detection Theory metrics from store
  const hits = useParticipantStore((state) => state.hits);
  const setHits = useParticipantStore((state) => state.setHits);
  const misses = useParticipantStore((state) => state.misses);
  const setMisses = useParticipantStore((state) => state.setMisses);
  const falseA = useParticipantStore((state) => state.falseAlarms);
  const setFalseA = useParticipantStore((state) => state.setFalseAlarms);
  const correctRej = useParticipantStore((state) => state.correctRejections);
  const setCorrectRe = useParticipantStore((state) => state.setCorrectRejections);

  // Accuracy tracking from store
  const correctCount = useParticipantStore((state) => state.correctCount);
  const totalCount = useParticipantStore((state) => state.totalCount);
  const incrementAccuracy = useParticipantStore((state) => state.incrementAccuracy);

  // Participant identification and session management
  const code = useParticipantStore((state) => state.code);
  const hasHydrated = useParticipantStore((state) => state._hasHydrated);

  // Response data management
  const mainphaseResponses = useParticipantStore((state) => state.mainphaseResponses);
  const addMainphaseResponse = useParticipantStore((state) => state.addMainphaseResponse);
  const clearMainphaseResponses = useParticipantStore((state) => state.clearMainphaseResponses);
  const finalTestphaseResponses = useParticipantStore((state) => state.finalTestphaseResponses);
  const testphaseFinished = useParticipantStore((state) => state.testphaseFinished);

  // Feedback system management
  const feedbackCount = useParticipantStore((state) => state.feedbackCount);
  const setFeedbackCount = useParticipantStore((state) => state.setFeedbackCount);

  /* ========================================
     DATA AND DERIVED VALUES
     ======================================== */

  /** Trial data loaded from JSON file */
  const data = dataRaw as MainPhaseItem[];
  /** Current trial information */
  const current = data[index];

  /** Current participant accuracy percentage */
  const accuracy = hasHydrated && totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(1) : '0';

  /* ========================================
     SIGNAL DETECTION THEORY CALCULATIONS
     ======================================== */

  /**
   * Calculate False Alarm Rate for Signal Detection Theory
   *
   * Computes the proportion of false alarms (incorrect "signal present" responses)
   * out of all "noise" trials. Essential for measuring decision bias in the task.
   *
   * @param falseA - Number of false alarm responses
   * @param correctR - Number of correct rejection responses
   * @returns False alarm rate (0-1), or 0 if no negative trials
   */
  function calculateFalseAlarmRate(falseA: number, correctR: number): number {
    const totalNegatives = falseA + correctR;
    if (totalNegatives === 0) return 0;
    return falseA / totalNegatives;
  }

  /**
   * Calculate Hit Rate for Signal Detection Theory
   *
   * Computes the proportion of hits (correct "signal present" responses)
   * out of all "signal" trials. Measures sensitivity to the target stimulus.
   *
   * @param hits - Number of hit responses (correct detections)
   * @param misses - Number of miss responses (failed detections)
   * @returns Hit rate (0-1), or 0 if no positive trials
   */
  function calculateHitRate(hits: number, misses: number): number {
    const totalPositives = hits + misses;
    if (totalPositives === 0) return 0;
    return hits / totalPositives;
  }

  /**
   * Calculate d-prime (d') for Signal Detection Theory
   *
   * Computes discriminability measure by taking the difference between
   * z-scores of hit rate and false alarm rate. Higher d' indicates
   * better ability to distinguish signal from noise.
   *
   * @param hr - Hit rate (0-1)
   * @param far - False alarm rate (0-1)
   * @returns d-prime value (can be negative, positive, or zero)
   */
  function calculateDPrime(hr: number, far: number): number {
    const epsilon = 1e-5; // Small value to prevent infinite z-scores
    const adjustedHR = Math.min(Math.max(hr, epsilon), 1 - epsilon);
    const adjustedFAR = Math.min(Math.max(far, epsilon), 1 - epsilon);
    const zHR = jStat.normal.inv(adjustedHR, 0, 1);
    const zFAR = jStat.normal.inv(adjustedFAR, 0, 1);
    return zHR - zFAR;
  }

  /**
   * Convert slider value to color category string
   *
   * Maps numerical slider responses to semantic color labels
   * for display and decision recording purposes.
   *
   * @param value - Slider value (-100 to +100)
   * @returns Localized color string ('Orange' or 'Blue')
   */
  function getColorString(value: number): string {
    return value < 0 ? t('buttonOrange') : t('buttonBlue');
  }

  /**
   * Calculate performance feedback for recent trials
   *
   * Analyzes the last 5 trials to provide participants with
   * feedback on their decision accuracy and performance trends.
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
     AI RECOMMENDATION SYSTEM
     ======================================== */

  /**
   * Generate random normal distribution sample using Box-Muller transform
   *
   * Creates normally distributed random values for AI confidence modeling.
   * Uses the Box-Muller algorithm for mathematical accuracy.
   *
   * @returns Random sample from standard normal distribution
   */
  function randn_bm() {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  /**
   * Generate AI recommendation value based on true color and accuracy level
   *
   * Simulates AI decision-making with different accuracy levels by sampling
   * from normal distributions centered on correct or incorrect responses.
   * Models realistic AI confidence patterns for the research study.
   *
   * @param trueColor - Correct color category ('orange' or 'blue')
   * @param aiAccuracy - AI accuracy level (0.4 for low, 0.93 for high)
   * @returns AI confidence value clamped to [-3, 3] range
   */
  function getAiGuess(trueColor: string, aiAccuracy?: number): number {
    if (aiAccuracy === 0.4) {
      // Low accuracy AI: biased toward incorrect response
      const aiMean = trueColor === 'orange' ? 1.5 : -1.5; // Opposite of correct
      const stdDev = 0.3;
      const aiGuessRaw = aiMean + randn_bm() * stdDev;
      const min = -3;
      const max = 3;
      return Math.max(min, Math.min(max, aiGuessRaw));
    }
    // High accuracy AI: biased toward correct response
    const aiMean = trueColor === 'orange' ? -1.5 : 1.5; // Matches correct answer
    const stdDev = 0.3;
    const aiGuessRaw = aiMean + randn_bm() * stdDev;
    const min = -3;
    const max = 3;
    return Math.max(min, Math.min(max, aiGuessRaw));
  }

  /* ========================================
     OPTIMAL WEIGHTING CALCULATIONS
     ======================================== */

  // Generate AI recommendation for current trial
  const aiGuessValue = getAiGuess(current.color < 50 ? 'orange' : 'blue', current.aiAccuracy);

  // Calculate current SDT metrics for real-time analysis
  const currentHitRate = calculateHitRate(hits, misses);
  const currentFaRate = calculateFalseAlarmRate(falseA, correctRej);

  // Calculate d-prime values for human, AI, and team performance
  const dPrimeHuman = calculateDPrime(currentHitRate, currentFaRate);
  const dPrimeAid = calculateDPrime(0.93, 1 - 0.93); // Fixed AI d-prime based on 93% accuracy
  const totalDP = dPrimeHuman + dPrimeAid;

  // Calculate optimal weighting parameters (alpha values)
  const aHuman = dPrimeHuman / totalDP; // Human weight in team decision
  const aAid = dPrimeAid / totalDP; // AI weight in team decision

  // Current decision values
  const XHuman = sliderValue; // Human confidence (-100 to +100)
  const XAid = aiGuessValue; // AI confidence (-3 to +3)

  // Optimal team decision using weighted combination
  const Z = aHuman * XHuman + aAid * XAid;

  // Team d-prime calculation (theoretical maximum performance)
  const dPrimeTeam = Math.sqrt(Math.pow(dPrimeHuman, 2) + Math.pow(dPrimeAid, 2));

  /* ========================================
     TEST PHASE RESULTS CALCULATION
     ======================================== */

  // Calculate test phase performance for completion screen
  const testPhaseCorrect = finalTestphaseResponses.filter((r) => {
    const userChoice = typeof r.buttonPressed === 'string' ? r.buttonPressed : r.sliderValue > 50 ? 'blue' : 'orange';
    const correctChoice = r.color < 50 ? 'orange' : 'blue';
    return userChoice === correctChoice;
  }).length;
  const testPhaseTotal = finalTestphaseResponses.length;

  /* ========================================
     COMPONENT LIFECYCLE EFFECTS
     ======================================== */

  /**
   * Initialize component state from localStorage on mount
   *
   * Recovers participant progress if they refresh or return to the page.
   * Clears previous responses if starting fresh to ensure clean data.
   */
  useEffect(() => {
    const savedIndex = localStorage.getItem('mainphaseIndex');
    if (savedIndex !== null) {
      setIndex(Number(savedIndex));
    } else {
      clearMainphaseResponses();
      setFeedbackCount(0);
    }
  }, [clearMainphaseResponses, setFeedbackCount]);

  /**
   * Redirect to test phase if not completed
   *
   * Ensures participants complete the calibration test phase before
   * starting the main experiment. Prevents invalid experimental conditions.
   */
  useEffect(() => {
    if (!hasHydrated) return;
    if (!finished && !testphaseFinished) {
      router.replace('/prototype/testphase');
    }
  }, [testphaseFinished, router, finished, hasHydrated]);

  /**
   * Validate participant code and check completion status
   *
   * Ensures valid participants and recovers completion state if they
   * return after finishing the experiment.
   */
  useEffect(() => {
    if (!hasHydrated) return;
    if (!code) router.replace('/prototype');
    const finishedFlag = localStorage.getItem(`mainphaseFinished_${code}`);
    if (finishedFlag === 'true') setFinished(true);
  }, [code, router, hasHydrated]);

  /**
   * Update feedback counter at regular intervals
   *
   * Tracks feedback presentation frequency to ensure participants
   * receive performance updates every 6 trials as designed.
   */
  useEffect(() => {
    if (index > 0 && (index + 1) % 6 === 0) {
      const expectedFeedbackCount = Math.floor((index + 1) / 6);
      setFeedbackCount(expectedFeedbackCount);
    }
  }, [index, setFeedbackCount]);

  /* ========================================
     EVENT HANDLERS
     ======================================== */

  /**
   * Toggle between German and English language interface
   *
   * Allows participants to switch language preference during the
   * experiment while maintaining their progress and data.
   */
  const toggleLanguage = () => setLocale((prev) => (prev === 'de' ? 'en' : 'de'));

  /**
   * Handle slider submission and advance to AI recommendation
   *
   * Validates participant input and transitions to the AI recommendation
   * phase where they can see the AI's suggestion before making final decision.
   */
  const handleClick = () => {
    if (finished) return;
    setShowRecom(true);
  };

  /**
   * Process final decision and advance to next trial
   *
   * Records participant's binary choice, updates SDT metrics, saves data
   * to backend, and manages trial progression through the experiment.
   *
   * @param button - Participant's final color choice ('orange' or 'blue')
   */
  const handleChoice = (button: 'orange' | 'blue') => {
    // Prepare response data with all relevant metrics
    const response = {
      index,
      color: current.color,
      sliderValue,
      aiGuessValue,
      timestamp: new Date().toISOString(),
      buttonPressed: button,
      dPrimeTeam,
    };

    // Store response in Zustand for immediate access
    addMainphaseResponse({
      index,
      color: current.color,
      sliderValue,
      buttonPressed: button,
    });

    // Determine correctness and update SDT metrics
    const userChoice = button;
    const correctChoice = current.color < 50 ? 'orange' : 'blue';
    const isCorrect = userChoice === correctChoice;

    // Update Signal Detection Theory counters
    if (correctChoice === 'blue') {
      if (userChoice === 'blue') setHits(hits + 1); // Correct detection
      else setMisses(misses + 1); // Missed detection
    } else {
      if (userChoice === 'blue') setFalseA(falseA + 1); // False alarm
      else setCorrectRe(correctRej + 1); // Correct rejection
    }

    // Update overall accuracy counter
    incrementAccuracy(isCorrect);

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
    localStorage.setItem('mainphaseIndex', String(nextIndex));

    if (index < data.length - 1) {
      // Continue to next trial
      setIndex(nextIndex);
      setSliderValue(0); // Reset slider for next trial
      setShowRecom(false); // Return to slider interface
    } else {
      // Complete experiment
      setFinished(true);
      localStorage.removeItem('mainphaseIndex');
      localStorage.setItem(`mainphaseFinished_${code}`, 'true');
    }
  };

  /* ========================================
     RENDER LOGIC
     ======================================== */

  // Render completion screen when experiment is finished
  if (finished) {
    // Calculate final performance metrics for results display
    const testPhaseAccuracyNum = testPhaseTotal > 0 ? (testPhaseCorrect / testPhaseTotal) * 100 : 0;
    const testPhaseAccuracy = testPhaseAccuracyNum.toFixed(1);

    const mainPhaseAccuracyNum = hasHydrated && totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
    const mainPhaseAccuracy = mainPhaseAccuracyNum.toFixed(1);

    // Format accuracy values with styling for display
    const formattedTestAccuracy = `<span class='font-bold text-green-600'>${testPhaseAccuracy}%</span>`;
    const formattedAvgAccuracy = `<span class='font-bold text-green-600'>${mainPhaseAccuracy}%</span>.`;

    // Generate personalized completion message with performance data
    const rawMessage = t('completionMessage');
    const messageWithAccuracy = rawMessage.replace('%GENAUIGKEIT1%', formattedTestAccuracy).replace('%GENAUIGKEIT2%', formattedAvgAccuracy);

    // Determine if participant improved with AI assistance
    const showTeamMessage = mainPhaseAccuracyNum > testPhaseAccuracyNum;
    const improvement = showTeamMessage ? (mainPhaseAccuracyNum - testPhaseAccuracyNum).toFixed(1) : null;

    // Generate improvement message in appropriate language
    const improvementMessage =
      locale === 'de'
        ? ` Sie waren mit der KI ein gutes Team!<br />Sie waren <strong>${improvement}%</strong> genauer mit ihrer Hilfe.`
        : ` You were a good team with the AI!<br />You were <strong>${improvement}%</strong> more accurate with its help.`;

    return (
      <div className='max-w-6xl mx-auto p-6 space-y-8'>
        {/* Header with language toggle */}
        <div className='header border10'>
          <div className='relative flex justify-center items-center'>
            <h1 className='md:text-4xl text-2xl font-bold m-4 text-center'>{t('title')}</h1>
            <LanguageToggle locale={locale} onToggle={toggleLanguage} />
          </div>
        </div>

        {/* Completion message with performance feedback */}
        <div className='max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]'>
          <h1 className='text-4xl font-bold mb-6 text-center'>{t('completionTitle')}</h1>
          <p className='mb-8 text-lg text-center' style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: messageWithAccuracy }} />
          {showTeamMessage && <p className='text-lg font-semibold text-center text-green-600' dangerouslySetInnerHTML={{ __html: improvementMessage }} />}

          <p className='text-lg mt-4'>Sie können die Seite nun schließen.</p>
        </div>
      </div>
    );
  }

  /* ========================================
     MAIN EXPERIMENT INTERFACE
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

      {/* Dynamic feedback and attention check system */}
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
              className='bg-gradient-to-r z-20 lg:w-[90%] sm:w-full sm:h-18 h-24 mx-auto sm:top-auto sm:left-auto sm:right-auto top-6 left-6 right-6 sm:absolute fixed from-[#39ab52] to-[#66ad28] text-gray-900 rounded-[10px] shadow-lg text-center justify-center flex items-center font-bold md:text-2xl text-md'>
              <mark style={{ background: 'none', color: '#ffffff', padding: 0 }}>
                <div className='flex flex-col items-center justify-center'>
                  {(() => {
                    const feedback = getFeedback(mainphaseResponses, index);
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

          {/* Attention check every 50 trials */}
          {index > 0 && (index + 1) % 50 === 0 && (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='bg-gradient-to-r lg:w-[90%] sm_w-full w-[90%] sm:h-18 h-24 mx-auto sm:top-auto sm:left-auto sm:right-auto top-6 left-6 right-6 sm:absolute fixed from-[#39ab52] to-[#66ad28] text-gray-900 rounded-[10px] shadow-lg text-center justify-center flex items-center font-bold md:text-2xl text-md'>
              <mark style={{ background: 'none', color: '#ffffff', padding: 0 }}>
                <div className='flex flex-col items-center justify-center'>
                  <div>
                    <div className='font-bold'> {t('attentionCheckTitle')}</div>
                    {t('attentionCheckText')}
                  </div>
                </div>
              </mark>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main experiment content area */}
      <div className='max-w-4xl lg:max-w-6xl xl:max-w-[90rem] mx-auto h-full flex flex-col items-center justify-center'>
        {/* Trial counter and progress header */}
        <h2 className='self-start font-bold md:text-2xl text-md pb-4'>
          {t('mainPhaseHeader')} {index + 1}/{data.length}
        </h2>

        {/* Progress bar with milestone markers */}
        <div className='w-full h-8 bg-gray-100 border-2 drop-shadow-xl border-[#508991] text-center rounded-full! mb-4 overflow-hidden relative'>
          {/* Progress fill based on completion percentage */}
          <div
            className='h-full bg-[#39ab52] transition-all duration-300'
            style={{
              width: `${((index + 1) / data.length) * 100}%`,
            }}></div>

          {/* Milestone circles at 25%, 50%, and 75% completion */}
          {[0.25, 0.5, 0.75].map((milestone, i) => {
            const reached = (index + 1) / data.length >= milestone;
            return (
              <div
                key={i}
                className='absolute'
                style={{
                  left: `${milestone * 100}%`,
                  top: 0,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  transform: 'translateX(-50%)',
                  zIndex: 2,
                }}>
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    background: reached ? '#508991' : '#fff',
                    border: `2px solid ${reached ? '#508991' : '#508991'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: reached ? '#fff' : '#508991',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    boxShadow: reached ? '0 0 6px #50899188' : undefined,
                    transition: 'background 0.3s, border 0.3s, color 0.3s',
                  }}
                  title={`Trial ${Math.round(milestone * data.length)}`}>
                  {Math.round(milestone * data.length)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main trial interface with stimulus and response controls */}
        <div className='items-center h-full w-full sectionBorder justify-around flex md:flex-row flex-col drop-shadow-xl rounded-2xl bg-white p-6'>
          {/* Color stimulus display */}
          <BiColor percentage={current.color} index={current.index} />

          {/* Response interface - conditional based on experiment phase */}
          <div className='flex m-4 w-full flex-col justify-center space-y-4'>
            {!showRecom ? (
              /* Initial slider response phase */
              <div>
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
            ) : (
              /* AI recommendation and final decision phase */
              <div className='flex flex-col w-full'>
                {/* AI recommendation display */}
                <div className='text-center m-0 flex justify-center'>
                  <p className='text-lg mr-2'> {t('assistantRecommendationTitle')}</p>
                  <p className='text-lg font-semibold md:max-w-full max-w-2xs text-center'> {`${getColorString(XAid)}`}</p>
                </div>

                {/* Accuracy comparison visualization with Optimal Weighting data */}
                <div className='w-full'>
                  <AccuracyComparison humanPercent={XHuman} aiPercent={XAid} locale={locale} decision={Z} aiAccuracy={93} humanAccuracy={Number(accuracy)} />
                </div>

                {/* Final decision buttons */}
                <div className='flex flex-col min-w-xs justify-center items-center w-full space-y-6 mt-2'>
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
    </div>
  );
};

export default Mainphase;
