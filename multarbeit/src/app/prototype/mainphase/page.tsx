'use client';
import { useEffect, useState } from 'react';
import { jStat } from 'jstat';
import BiColorV2 from '@/components/canvas/BiColorV2';
import ColorSlider from '@/components/ui/Slider/Slider';
import dataRaw from '@/lib/dataMain.json';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/utils/translation';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';
import { AnimatePresence, motion } from 'framer-motion';
import AccuracyComparison from '@/components/AccuracyComparison';
// import { v4 as uuidv4 } from 'uuid';
import { useParticipantStore } from '@/store';

type MainPhaseItem = {
  color: number;
  recom: string;
  aiAccuracy?: number;
};

const Mainphase = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showRecom, setShowRecom] = useState(false);
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const { t } = useTranslation(locale);
  const [feedbackCount, setFeedbackCount] = useState(0);

  const [hits, setHits] = useState(0); //für blau entschieden, wenn blau richtig war
  const [misses, setMisses] = useState(0); //für orange entschieden, obwohl blau richtig wa
  const [falseA, setFalseA] = useState(0); //für blau entschieden, obwohl orange richtig war
  const [correctRej, setCorrectRe] = useState(0); //für orange entschieden, wenn orange richtig war
  const [hitRate, setHitRate] = useState(0); // hr=hits/(hits + misses)
  const [faRate, setFaRate] = useState(0); // far=falseA/(falseA + correctR)
  // Z-Funktion (Standardnormalverteilung)
  const z = (p: number) => jStat.normal.inv(p, 0, 1);



  const data = dataRaw as MainPhaseItem[];

  // const getSessionId = () => {
  //   if (typeof window === 'undefined') return '';
  //   let sessionId = localStorage.getItem('sessionId');
  //   if (!sessionId) {
  //     sessionId = uuidv4();
  //     localStorage.setItem('sessionId', sessionId);
  //   }
  //   return sessionId;
  // };

  /**
 * Calculates the False Alarm Rate (FAR).
 * @param falseA - Number of false alarms (false positives).
 * @param correctR - Number of correct rejections (true negatives).
 * @returns FAR value 
 */
  function calculateFalseAlarmRate(falseA: number, correctR: number): number {
    const totalNegatives = falseA + correctR;
    if (totalNegatives === 0) return 0; // Avoid division by zero
    return falseA / totalNegatives;
  }

  //const far = calculateFalseAlarmRate(10, 90);
  //console.log(`False Alarm Rate: ${(far * 100).toFixed(2)}%`); // Output: 10.00%

  /**
 * Calculates the Hit Rate (HR).
 * @param hits - Number of hits (true positives).
 * @param misses - Number of misses (false negatives).
 * @returns HR value as a number between 0 and 1.
 */
  function calculateHitRate(hits: number, misses: number): number {
    const totalPositives = hits + misses;
    if (totalPositives === 0) return 0; // Avoid division by zero
    return hits / totalPositives;
  }
  //const hr = calculateHitRate(45, 5);
  //console.log(`Hit Rate: ${(hr * 100).toFixed(2)}%`); // Output: 90.00%

  /**
   * Berechnet d' aus Hit Rate (HR) und False Alarm Rate (FAR)
   * @param hr Hit Rate (zwischen 0 und 1)
   * @param far False Alarm Rate (zwischen 0 und 1)
   * @returns d' Sensitivitätsmaß
   */
  function calculateDPrime(hr: number, far: number): number {
    // Extremwerte abfangen (numerisch stabilisieren)
    const epsilon = 1e-5;
    const adjustedHR = Math.min(Math.max(hr, epsilon), 1 - epsilon);
    const adjustedFAR = Math.min(Math.max(far, epsilon), 1 - epsilon);

    const zHR = jStat.normal.inv(adjustedHR, 0, 1);
    const zFAR = jStat.normal.inv(adjustedFAR, 0, 1);

    const dPrime = zHR - zFAR;
    return dPrime;
  }

  //const d = calculateDPrime(0.82, 0.14);
  //console.log('d\' =', d.toFixed(3)); // z. B. 1.99


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

  const current = data[index];

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  };

  const handleClick = () => {
    if (finished) return;
    setShowRecom(true);

    console.log('Human Calc:', HumanCalc);
    console.log('AI Calc:', AiCalc);
    console.log('Human + AI Calculation:', HuAiCalc);
    console.log('Acc:', accuracy);
    console.log('SLV:', sliderValue);
    console.log('Ai Guess', aiGuess);

    console.log('--- OW Calculation ---');
console.log('HR:', currentHitRate.toFixed(3));
console.log('FAR:', currentFaRate.toFixed(3));
console.log("d' human:", dPrimeHuman.toFixed(3));
console.log("d' aid:", dPrimeAid.toFixed(3));
console.log('aHuman:', aHuman.toFixed(3), 'aAid:', aAid.toFixed(3));
console.log('XHuman:', XHuman.toFixed(3), 'XAi:', XAid.toFixed(3));
console.log('Z (combined evidence):', Z.toFixed(3));
console.log('OW Decision:', Z > 0 ? 'Orange' : 'Blue');

  };

  const incrementAccuracy = useParticipantStore((state) => state.incrementAccuracy);

  const handleChoice = (button: 'orange' | 'blue') => {
    console.log('🧠 User made a choice:', button);


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
    console.log('✅ Is Correct:', isCorrect, '| User:', userChoice, '| Correct:', correctChoice);


    if (correctChoice === 'blue') {
      if (userChoice === 'blue') setHits(h => h + 1);
      else setMisses(m => m + 1);
    } else {
      if (userChoice === 'blue') setFalseA(f => f + 1);
      else setCorrectRe(r => r + 1);
    }


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

 // const humanSensitivity = zHitRateH - zFalseAlarmRateH;
  //const aiSensitivity = zHitRateAI - zFalseAlarmRateAI;


  const aiGuess = Math.random() < 0.5 ? Math.max(-1, current.color - 0.05) : Math.min(1, current.color + 0.05);
  const HumanCalc = (Number(accuracy) / 100 / (Number(accuracy) / 100 + current.aiAccuracy!)) * sliderValue;
  const AiCalc = (current.aiAccuracy! / (current.aiAccuracy! + Number(accuracy) / 100)) * aiGuess;
  const HuAiCalc = HumanCalc + AiCalc;

  const currentHitRate = calculateHitRate(hits, misses); // between 0–1
  const currentFaRate = calculateFalseAlarmRate(falseA, correctRej); // between 0–1
  const dPrimeHuman = calculateDPrime(currentHitRate, currentFaRate);
  const dPrimeAid = calculateDPrime(current.aiAccuracy ?? 0.93, 1 - (current.aiAccuracy ?? 0.93));

  const totalDP = dPrimeHuman + dPrimeAid;
  const aHuman = dPrimeHuman / totalDP;
  const aAid = dPrimeAid / totalDP;
  const XHuman = sliderValue / 100; // normiert zwischen -1 und 1
  const XAid = aiGuess; // ist bereits skaliert

  const Z = aHuman * XHuman + aAid * XAid;
  const dPrimeTeam = Math.sqrt(Math.pow(dPrimeHuman, 2) + Math.pow(dPrimeAid, 2));


  const getColorString = (value: number): string => {
    return value < 0 ? t('buttonOrange') : t('buttonBlue');
  };

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
          {t('mainPhaseHeader')} {index + 1}/{data.length}
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
                    className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold ${sliderValue === 0 ? 'bg-gray-300! text-gray-400 cursor-not-allowed' : 'text-white bg-[#004346] hover:bg-[#004346] cursor-pointer'
                      }`}
                    onClick={handleClick}>
                    {t('buttonNext')}
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col w-full space-y-6 '>
                <div className='text-center m-0 flex justify-center'>
                  <p className='text-lg mr-2'> {t('assistantRecommendationTitle')}</p>
                  <p className='text-lg font-semibold md:max-w-full max-w-2xs text-center'> {`${getColorString(aiGuess)} (${(aiGuess * 100).toFixed(1)}%)`}</p>
                </div>
                <div className='w-full'>
                  <AccuracyComparison menschPercent={HumanCalc} kiPercent={AiCalc} locale={locale} decision={HuAiCalc} kiAccuracy={current.aiAccuracy! * 100} menschAccuracy={Number(accuracy)} />
                </div>
                <div className='flex flex-col min-w-xs justify-center items-center w-full space-y-6 my-16'>
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
