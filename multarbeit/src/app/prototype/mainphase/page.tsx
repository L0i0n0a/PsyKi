"use client";
import { useEffect, useState } from "react";
import jStat from "jstat";
import BiColor from "@/components/canvas/BiColor";
import ColorSlider from "@/components/ui/Slider/Slider";
import dataRaw from "@/lib/dataMain.json";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/utils/translation";
import LanguageToggle from "@/components/ui/LanguageToggle/LanguageToggle";
import { AnimatePresence, motion } from "framer-motion";
import AccuracyComparison from "@/components/ui/AccuracyComponent/AccuracyComparison";
import { useParticipantStore } from "@/store";

type MainPhaseItem = {
  color: number;
  aiAccuracy?: number;
  divergence?: number;
};

const Mainphase = () => {
  // --- State and Store ---
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showRecom, setShowRecom] = useState(false);
  const [locale, setLocale] = useState<"de" | "en">("de");
  const { t } = useTranslation(locale);
  const [feedbackCount, setFeedbackCount] = useState(0);

  // Zustand store values
  const hits = useParticipantStore((state) => state.hits);
  const setHits = useParticipantStore((state) => state.setHits);
  const misses = useParticipantStore((state) => state.misses);
  const setMisses = useParticipantStore((state) => state.setMisses);
  const falseA = useParticipantStore((state) => state.falseAlarms);
  const setFalseA = useParticipantStore((state) => state.setFalseAlarms);
  const correctRej = useParticipantStore((state) => state.correctRejections);
  const setCorrectRe = useParticipantStore(
    (state) => state.setCorrectRejections
  );
  const correctCount = useParticipantStore((state) => state.correctCount);
  const totalCount = useParticipantStore((state) => state.totalCount);
  const incrementAccuracy = useParticipantStore(
    (state) => state.incrementAccuracy
  );
  const code = useParticipantStore((state) => state.code);
  const hasHydrated = useParticipantStore((state) => state._hasHydrated);
  const mainphaseResponses = useParticipantStore(
    (state) => state.mainphaseResponses
  );
  const addMainphaseResponse = useParticipantStore(
    (state) => state.addMainphaseResponse
  );
  const clearMainphaseResponses = useParticipantStore(
    (state) => state.clearMainphaseResponses
  );
  const finalTestphaseResponses = useParticipantStore(
    (state) => state.finalTestphaseResponses
  );
  const testphaseFinished = useParticipantStore(
    (state) => state.testphaseFinished
  );

  // Data
  const data = dataRaw as MainPhaseItem[];
  const current = data[index];

  // --- Derived values ---
  const accuracy =
    totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(1) : "0";

  // SDT calculations
  function calculateFalseAlarmRate(falseA: number, correctR: number): number {
    const totalNegatives = falseA + correctR;
    if (totalNegatives === 0) return 0;
    return falseA / totalNegatives;
  }

  function calculateHitRate(hits: number, misses: number): number {
    const totalPositives = hits + misses;
    if (totalPositives === 0) return 0;
    return hits / totalPositives;
  }

  function calculateDPrime(hr: number, far: number): number {
    const epsilon = 1e-5;
    const adjustedHR = Math.min(Math.max(hr, epsilon), 1 - epsilon);
    const adjustedFAR = Math.min(Math.max(far, epsilon), 1 - epsilon);
    const zHR = jStat.normal.inv(adjustedHR, 0, 1);
    const zFAR = jStat.normal.inv(adjustedFAR, 0, 1);
    return zHR - zFAR;
  }

  function getColorString(value: number): string {
    return value < 0 ? t("buttonOrange") : t("buttonBlue");
  }

  function getFeedback(
    responses: { index: number; color: number; sliderValue: number }[],
    currentIndex: number
  ) {
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

  function randn_bm() {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  function getAiGuess(trueColor: string, aiAccuracy?: number): number {
    // If AI accuracy is 0.4, always guess the opposite color
    if (aiAccuracy === 0.4) {
      // Flip the mean: if true is orange, guess blue; if true is blue, guess orange
      const aiMean = trueColor === "orange" ? 1.5 : -1.5;
      const stdDev = 0.3;
      const aiGuessRaw = aiMean + randn_bm() * stdDev;
      const min = -3;
      const max = 3;
      return Math.max(min, Math.min(max, aiGuessRaw));
    }
    // Normal behavior
    const aiMean = trueColor === "orange" ? -1.5 : 1.5;
    const stdDev = 0.3;
    const aiGuessRaw = aiMean + randn_bm() * stdDev;
    const min = -3;
    const max = 3;
    return Math.max(min, Math.min(max, aiGuessRaw));
  }

  const aiGuessValue = getAiGuess(
    current.color < 0 ? "orange" : "blue",
    current.aiAccuracy
  );
  const currentHitRate = calculateHitRate(hits, misses);
  const currentFaRate = calculateFalseAlarmRate(falseA, correctRej);
  const dPrimeHuman = calculateDPrime(currentHitRate, currentFaRate);
  const dPrimeAid = calculateDPrime(0.93, 1 - 0.93);
  const totalDP = dPrimeHuman + dPrimeAid;
  const aHuman = dPrimeHuman / totalDP;
  const aAid = dPrimeAid / totalDP;
  const XHuman = sliderValue;
  const XAid = aiGuessValue;
  const Z = aHuman * XHuman + aAid * XAid;
  const dPrimeTeam = Math.sqrt(
    Math.pow(dPrimeHuman, 2) + Math.pow(dPrimeAid, 2)
  );

  const testPhaseCorrect = finalTestphaseResponses.filter((r) => {
    const userChoice =
      typeof r.buttonPressed === "string"
        ? r.buttonPressed
        : r.sliderValue > 0
        ? "blue"
        : "orange";
    const correctChoice = r.color < 0 ? "orange" : "blue";
    return userChoice === correctChoice;
  }).length;
  const testPhaseTotal = finalTestphaseResponses.length;

  // --- Effects ---
  useEffect(() => {
    if (index === 0) clearMainphaseResponses();
  }, [index, clearMainphaseResponses]);

  useEffect(() => {
    const savedIndex = localStorage.getItem("mainphaseIndex");
    if (savedIndex !== null) setIndex(Number(savedIndex));
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!finished && !testphaseFinished) {
      router.replace("/prototype/testphase");
    }
  }, [testphaseFinished, router, finished, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!code) router.replace("/prototype");
    const finishedFlag = localStorage.getItem(`mainphaseFinished_${code}`);
    if (finishedFlag === "true") setFinished(true);
  }, [code, router, hasHydrated]);

  useEffect(() => {
    if (index > 0 && (index + 1) % 6 === 0)
      setFeedbackCount((prev) => prev + 1);
  }, [index]);

  // --- Handlers ---
  const toggleLanguage = () =>
    setLocale((prev) => (prev === "de" ? "en" : "de"));

  const handleClick = () => {
    if (finished) return;
    setShowRecom(true);
  };

  const handleChoice = (button: "orange" | "blue") => {
    const response = {
      index,
      color: current.color,
      sliderValue,
      timestamp: new Date().toISOString(),
      buttonPressed: button,
      dPrimeTeam,
    };
    addMainphaseResponse({
      index,
      color: current.color,
      sliderValue,
      buttonPressed: button,
    });

    const userChoice = button;
    const correctChoice = current.color < 0 ? "orange" : "blue";
    const isCorrect = userChoice === correctChoice;

    if (correctChoice === "blue") {
      if (userChoice === "blue") setHits(hits + 1);
      else setMisses(misses + 1);
    } else {
      if (userChoice === "blue") setFalseA(falseA + 1);
      else setCorrectRe(correctRej + 1);
    }

    incrementAccuracy(isCorrect);

    const TOKEN = process.env.NEXT_PUBLIC_SAVE_DATA_TOKEN ?? "";
    fetch("/api/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-token": TOKEN,
      },
      body: JSON.stringify({ code, responses: [response] }),
    });

    const nextIndex = index < data.length - 1 ? index + 1 : index;
    localStorage.setItem("mainphaseIndex", String(nextIndex));

    if (index < data.length - 1) {
      setIndex(nextIndex);
      setSliderValue(0);
      setShowRecom(false);
    } else {
      setFinished(true);
      localStorage.removeItem("mainphaseIndex");
      localStorage.setItem(`mainphaseFinished_${code}`, "true");
    }
  };

  // --- Render ---
  if (finished) {
    const feedback = getFeedback(mainphaseResponses, index);
    const avgAccuracy = feedback?.avgAccuracy ?? "–";
    const avgAccuracyNum = avgAccuracy === "–" ? NaN : parseFloat(avgAccuracy);

    const testPhaseAccuracyNum =
      testPhaseTotal > 0 ? (testPhaseCorrect / testPhaseTotal) * 100 : 0;
    const testPhaseAccuracy = testPhaseAccuracyNum.toFixed(1);

    const formattedTestAccuracy = `<span class='font-bold text-green-600'>${testPhaseAccuracy}%</span>`;
    const formattedAvgAccuracy = avgAccuracyNum
      ? `<span class='font-bold text-green-600'>${avgAccuracy}%</span>.`
      : avgAccuracy;

    const rawMessage = t("completionMessage");
    const messageWithAccuracy = rawMessage
      .replace("%GENAUIGKEIT1%", formattedTestAccuracy)
      .replace("%GENAUIGKEIT2%", formattedAvgAccuracy);

    const showTeamMessage =
      !isNaN(avgAccuracyNum) &&
      !isNaN(testPhaseAccuracyNum) &&
      avgAccuracyNum >= testPhaseAccuracyNum;

    const improvement = showTeamMessage
      ? (avgAccuracyNum - testPhaseAccuracyNum).toFixed(1)
      : null;

    const improvementMessage =
      locale === "de"
        ? ` Sie waren mit der KI ein gutes Team!<br />Sie waren <strong>${improvement}%</strong> genauer mit ihrer Hilfe.`
        : ` You were a good team with the AI!<br />You were <strong>${improvement}%</strong> more accurate with its help.`;

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="header border10">
          <div className="relative flex justify-center items-center">
            <h1 className="md:text-4xl text-2xl font-bold m-4 text-center">
              {t("title")}
            </h1>
            <LanguageToggle locale={locale} onToggle={toggleLanguage} />
          </div>
        </div>
        <div className="max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-4xl font-bold mb-6 text-center">
            {t("completionTitle")}
          </h1>
          <p
            className="mb-8 text-lg text-center"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: messageWithAccuracy }}
          />
          {showTeamMessage && (
            <p
              className="text-lg font-semibold text-center text-green-600"
              dangerouslySetInnerHTML={{ __html: improvementMessage }}
            />
          )}

          <p className="text-lg mt-4">Sie können die Seite nun schließen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 min-h-screen h-full">
      <div className="header border10">
        <div className="relative flex justify-center items-center">
          <h1 className="md:text-4xl text-2xl font-bold m-4 text-center">
            {t("title")}
          </h1>
          <LanguageToggle locale={locale} onToggle={toggleLanguage} />
        </div>
      </div>
      <div className="md:text-2xl text-md flex justify-center">
        {t("instructionTitle")}
      </div>
      <div className="relative max-w-6xl px-8">
        <AnimatePresence>
          {index > 0 && (index + 1) % 6 === 0 && (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="md:text-2xl text-md p-2 max-w-4xl font-bold w-full mx-auto bg-gradient-to-r from-[#39ab52] to-[#66ad28] text-gray-900 rounded-[10px] shadow-lg mt-8 text-center z-10 absolute top-[-120] left-1/2 -translate-x-1/2"
            >
              <mark
                style={{ background: "none", color: "#ffffff", padding: 0 }}
              >
                <div className="flex flex-col items-center justify-center">
                  {(() => {
                    const feedback = getFeedback(mainphaseResponses, index);
                    if (!feedback) return null;
                    if (feedbackCount % 2 === 0) {
                      return (
                        <span>
                          <div className="font-bold">
                            {" "}
                            {t("feedbackNoteTitle")}
                          </div>
                          <div>
                            {t("feedbackNoteText")} <b>{accuracy}%</b>
                          </div>
                        </span>
                      );
                    } else {
                      return (
                        <span>
                          <div className="font-bold">
                            {" "}
                            {t("feedbackNoteTitle")}
                          </div>
                          <div>
                            {t("feedback2", {
                              rightCount: correctCount,
                              allCount: totalCount,
                            })}
                          </div>
                        </span>
                      );
                    }
                  })()}
                </div>
              </mark>
            </motion.div>
          )}
          {index > 0 && (index + 1) % 50 === 0 && (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="md:text-2xl text-md p-2 max-w-4xl font-bold w-full mx-auto bg-gradient-to-r from-[#39ab52] to-[#66ad28] text-gray-900 rounded-[10px] shadow-lg mt-8 text-center z-10 absolute top-[-120] left-1/2 -translate-x-1/2"
            >
              <mark
                style={{ background: "none", color: "#ffffff", padding: 0 }}
              >
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <div className="font-bold"> {t("attentionCheckTitle")}</div>
                    {t("attentionCheckText")}
                  </div>
                </div>
              </mark>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
        <h2 className="self-start font-bold md:text-2xl text-md pb-4">
          {t("mainPhaseHeader")} {index + 1}/{data.length}
        </h2>
<div className='w-full h-8 bg-gray-100 border-2 drop-shadow-xl border-[#508991] text-center rounded-full! mb-4 overflow-hidden relative'>
  <div
    className='h-full bg-[#39ab52] transition-all duration-300'
    style={{
      width: `${((index + 1) / data.length) * 100}%`,
    }}
  ></div>
  {/* Milestone Circles */}
  { [0.25, 0.5, 0.75].map((milestone, i) => {
      const reached = ((index + 1) / data.length) >= milestone;
      return (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${milestone * 100}%`,
            top: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
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
            title={`Trial ${Math.round(milestone * data.length)}`}
          >
            {Math.round(milestone * data.length)}
          </div>
        </div>
      );
    })
  }
</div>
        <div className="items-center h-full max-h-[65svh] w-full sectionBorder justify-around flex md:flex-row flex-col drop-shadow-xl rounded-2xl bg-white p-6">
          <BiColor percentage={current.color} />
          <div className="flex m-4 w-full flex-col justify-center space-y-4">
            {!showRecom ? (
              <div>
                <div className="text-lg mt-auto text-center mb-4 flex flex-col items-center justify-center w-full">
                  <ColorSlider
                    initial={0}
                    value={sliderValue}
                    locale={locale}
                    onChange={setSliderValue}
                  />
                </div>
                <div className="flex justify-center mt-16!">
                  <button
                    id="buttonNext"
                    disabled={sliderValue === 0}
                    className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold ${
                      sliderValue === 0
                        ? "bg-gray-300! text-gray-400 cursor-not-allowed"
                        : "text-white bg-[#004346] hover:bg-[#004346] cursor-pointer"
                    }`}
                    onClick={handleClick}
                  >
                    {t("buttonNext")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <div className="text-center m-0 flex justify-center">
                  <p className="text-lg mr-2">
                    {" "}
                    {t("assistantRecommendationTitle")}
                  </p>
                  <p className="text-lg font-semibold md:max-w-full max-w-2xs text-center">
                    {" "}
                    {`${getColorString(XAid)}`}
                  </p>
                </div>
                <div className="w-full">
                  <AccuracyComparison
                    humanPercent={XHuman}
                    aiPercent={XAid}
                    locale={locale}
                    decision={Z}
                    aiAccuracy={93}
                    humanAccuracy={Number(accuracy)}
                  />
                </div>
                <div className="flex flex-col min-w-xs justify-center items-center w-full space-y-6 mt-16">
                  <div className="flex w-full justify-center space-x-4">
                    <button
                      className="px-6 py-2 bg-orange-500! text-white rounded-full text-lg font-semibold transition hover:bg-orange-800! cursor-pointer"
                      onClick={() => handleChoice("orange")}
                    >
                      {t("buttonOrange")}
                    </button>
                    <button
                      className="px-6 py-2 bg-blue-600! text-white rounded-full text-lg font-semibold transition hover:bg-blue-800! cursor-pointer"
                      onClick={() => handleChoice("blue")}
                    >
                      {t("buttonBlue")}
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
