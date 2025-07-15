import jStat from 'jstat';

/**
 * Compute SDT metrics for a participant's set of trials
 * @param {Array} trials - Array of trial objects
 * @returns {Object} - SDT metrics and per-trial results
 *
 *
 * Also inhaltlich würde Sinn machen:

- Mittelwert/Median Sensitivität des/der Menschen (Gegenüberstellen mit KI - 93%)
- Mittelwert/Median Team-Sensitivität vs. Paper (ist das der Referenzwert, den ihr schon eingefügt habt mit 3.8?)
- Vergleich eigene Antworten Mensch (Schieberegler) vs. Antworten nach Hilfe (Button)
- Häufigkeit der Nutzung der Entscheidungshilfe (also die Antwort gewählt die vorgeschlagen wurde)
- Häufigkeit Umentscheiden nach Entscheidungshilfe
- Häufigkeit Übereinstimmung mit KI

 */
interface Trial {
  index: number;
  color: number;
  sliderValue: number;
  timestamp: string;
  buttonPressed?: string;
  aiGuessValue?: number;
}

// interface ParticipantSummary {
//   dPrimeHuman: number;
//   dPrimeTeam: number;
//   // ... add other fields if needed
// }

type AllParticipantsData = {
  [filename: string]: Trial[];
};

// function calculateMedianHumanSensitivity() {
//   //alle werte und mittelsten suchen
// }

// function calculateMittelwertHumanSensitivity() {
//   //alle werte durch anzahl
// }
export function compareSliderWithButtonDetailed(data: { [key: string]: Trial[] }) {
  let totalComparisons = 0;
  let matches = 0;
  let mismatches = 0;

  const perParticipantResults: {
    [participant: string]: {
      comparisons: number;
      matches: number;
      mismatches: number;
      matchPercentage: number;
    };
  } = {};

  let participantIndex = 1;

  for (const participant in data) {
    const records = data[participant];
    let participantMatches = 0;
    let participantComparisons = 0;

    records
      .filter((record: Trial) => typeof record.sliderValue === 'number' && (record.buttonPressed === 'blue' || record.buttonPressed === 'orange'))
      .forEach((record: Trial) => {
        const { sliderValue, buttonPressed } = record;
        const expectedButton = sliderValue > 0 ? 'blue' : 'orange';
        const match = buttonPressed === expectedButton;

        if (match) {
          matches++;
          participantMatches++;
        } else {
          mismatches++;
        }

        participantComparisons++;
        totalComparisons++;
      });

    const matchPercentage = participantComparisons > 0 ? (participantMatches / participantComparisons) * 100 : 0;

    perParticipantResults[`tN${participantIndex}`] = {
      comparisons: participantComparisons,
      matches: participantMatches,
      mismatches: participantComparisons - participantMatches,
      matchPercentage: parseFloat(matchPercentage.toFixed(2)),
    };

    participantIndex++;
  }

  const overallMatchPercentage = totalComparisons > 0 ? (matches / totalComparisons) * 100 : 0;

  return {
    overall: {
      totalComparisons,
      matches,
      mismatches,
      matchPercentage: parseFloat(overallMatchPercentage.toFixed(2)),
    },
    perParticipant: perParticipantResults,
  };
}

export function evaluateAccuracyWithSliderAndButton(data: { [key: string]: Trial[] }) {
  const perParticipantResults: {
    [participant: string]: {
      buttonComparison: {
        correct: number;
        incorrect: number;
        total: number;
        accuracyPercentage: number;
      };
      sliderWhenButtonExists: {
        correct: number;
        incorrect: number;
        total: number;
        accuracyPercentage: number;
      };
      sliderOnlyTrials: {
        correct: number;
        incorrect: number;
        total: number;
        accuracyPercentage: number;
      };
    };
  } = {};

  let participantIndex = 1;

  for (const participant in data) {
    const records = data[participant];

    let buttonCorrect = 0;
    let buttonIncorrect = 0;

    let sliderInButtonTrialsCorrect = 0;
    let sliderInButtonTrialsIncorrect = 0;

    let sliderOnlyCorrect = 0;
    let sliderOnlyIncorrect = 0;

    records.forEach((record: Trial) => {
      const { sliderValue, color, buttonPressed } = record;

      if (typeof sliderValue !== 'number' || typeof color !== 'number') return;

      const expectedColor = color >= 50 ? 'blue' : 'orange';
      const sliderExpected = sliderValue > 0 ? 'blue' : 'orange';

      if (buttonPressed === 'blue' || buttonPressed === 'orange') {
        // 1. Button vs. Color
        const buttonCorrectness = buttonPressed === expectedColor;
        if (buttonCorrectness) buttonCorrect++;
        else buttonIncorrect++;

        // 2. Slider vs. Color (in same trial)
        const sliderCorrectness = sliderExpected === expectedColor;
        if (sliderCorrectness) sliderInButtonTrialsCorrect++;
        else sliderInButtonTrialsIncorrect++;
      } else {
        // 3. Slider-only trial
        const sliderCorrectness = sliderExpected === expectedColor;
        if (sliderCorrectness) sliderOnlyCorrect++;
        else sliderOnlyIncorrect++;
      }
    });

    const key = `tN${participantIndex}`;
    const sliderInButtonTotal = sliderInButtonTrialsCorrect + sliderInButtonTrialsIncorrect;
    const sliderOnlyTotal = sliderOnlyCorrect + sliderOnlyIncorrect;
    const buttonTotal = buttonCorrect + buttonIncorrect;

    perParticipantResults[key] = {
      buttonComparison: {
        correct: buttonCorrect,
        incorrect: buttonIncorrect,
        total: buttonTotal,
        accuracyPercentage: buttonTotal > 0 ? +((buttonCorrect / buttonTotal) * 100).toFixed(2) : 0,
      },
      sliderWhenButtonExists: {
        correct: sliderInButtonTrialsCorrect,
        incorrect: sliderInButtonTrialsIncorrect,
        total: sliderInButtonTotal,
        accuracyPercentage: sliderInButtonTotal > 0 ? +((sliderInButtonTrialsCorrect / sliderInButtonTotal) * 100).toFixed(2) : 0,
      },
      sliderOnlyTrials: {
        correct: sliderOnlyCorrect,
        incorrect: sliderOnlyIncorrect,
        total: sliderOnlyTotal,
        accuracyPercentage: sliderOnlyTotal > 0 ? +((sliderOnlyCorrect / sliderOnlyTotal) * 100).toFixed(2) : 0,
      },
    };

    participantIndex++;
  }

  return perParticipantResults;
}

export function compareAIGuessWithSlider(data: { [key: string]: Trial[] }) {
  const results: {
    [participant: string]: {
      comparisons: Array<{
        index: number;
        sliderValue: number;
        aiGuessValue: number;
        difference: number;
      }>;
    };
  } = {};

  for (const participant in data) {
    const records = data[participant];
    results[participant] = { comparisons: [] };

    records.forEach((record: Trial) => {
      const { index, sliderValue, aiGuessValue } = record;

      if (typeof sliderValue === 'number' && typeof aiGuessValue === 'number') {
        results[participant].comparisons.push({
          index,
          sliderValue,
          aiGuessValue,
          difference: Math.abs(sliderValue - aiGuessValue),
        });
      }
    });
  }

  return results;
}

export function compareAIGuessWithSliderSideMatch(data: { [key: string]: Trial[] }) {
  const results: {
    [participant: string]: {
      comparisons: Array<{
        index: number;
        sliderValue: number;
        aiGuessValue: number;
        sliderSide: 'orange' | 'blue';
        aiSide: 'orange' | 'blue';
        isMatch: boolean;
      }>;
      totalComparisons: number;
      matches: number;
      matchPercentage: number;
    };
  } = {};

  for (const participant in data) {
    const records = data[participant];
    let matches = 0;
    let totalComparisons = 0;

    results[participant] = { comparisons: [], totalComparisons: 0, matches: 0, matchPercentage: 0 };

    records.forEach((record: Trial) => {
      const { index, sliderValue, aiGuessValue } = record;

      if (typeof sliderValue === 'number' && typeof aiGuessValue === 'number') {
        const sliderSide = sliderValue > 0 ? 'blue' : 'orange';
        const aiSide = aiGuessValue > 0 ? 'blue' : 'orange';
        const isMatch = sliderSide === aiSide;

        if (isMatch) matches++;
        totalComparisons++;

        results[participant].comparisons.push({
          index,
          sliderValue,
          aiGuessValue,
          sliderSide,
          aiSide,
          isMatch,
        });
      }
    });

    results[participant].totalComparisons = totalComparisons;
    results[participant].matches = matches;
    results[participant].matchPercentage = totalComparisons > 0 ? parseFloat(((matches / totalComparisons) * 100).toFixed(2)) : 0;
  }

  return results;
}

export function summarizeAIGuessSliderSideMatch(data: { [key: string]: Trial[] }) {
  const summary: {
    [participant: string]: {
      totalComparisons: number;
      matches: number;
      mismatches: number;
      matchPercentage: number;
    };
  } = {};

  for (const participant in data) {
    const records = data[participant];
    let matches = 0;
    let totalComparisons = 0;

    records.forEach((record: Trial) => {
      // Ensure both values exist and are numbers
      if (record.hasOwnProperty('aiGuessValue') && typeof record.aiGuessValue === 'number' && typeof record.sliderValue === 'number') {
        const sliderSide = record.sliderValue > 0 ? 'blue' : 'orange';
        const aiSide = record.aiGuessValue > 0 ? 'blue' : 'orange';

        if (sliderSide === aiSide) {
          matches++;
        }

        totalComparisons++;
      }
    });

    summary[participant] = {
      totalComparisons,
      matches,
      mismatches: totalComparisons - matches,
      matchPercentage: totalComparisons > 0 ? parseFloat(((matches / totalComparisons) * 100).toFixed(2)) : 0,
    };
  }

  return summary;
}

export function compareSliderWithButton(data: { [key: string]: Trial[] }) {
  let totalComparisons = 0;
  let matches = 0;
  let mismatches = 0;

  for (const participant in data) {
    const records = data[participant];

    records.forEach((record: Trial) => {
      const { sliderValue, buttonPressed } = record;

      if (typeof sliderValue === 'number' && (buttonPressed === 'blue' || buttonPressed === 'orange')) {
        const expectedButton = sliderValue > 0 ? 'blue' : 'orange';

        const match = buttonPressed === expectedButton;
        if (match) {
          matches++;
        } else {
          mismatches++;
        }
        totalComparisons++;
      }
    });
  }

  const matchPercentage = (matches / totalComparisons) * 100;

  return {
    totalComparisons,
    matches,
    mismatches,
    matchPercentage: parseFloat(matchPercentage.toFixed(2)),
  };
}

export function computeSDTfromTrials(trials: Trial[]) {
  let hits = 0,
    misses = 0,
    falseAlarms = 0,
    correctRejects = 0;

  trials.forEach((trial) => {
    if (!('buttonPressed' in trial)) return;

    const isSignal = trial.color >= 50; // blue = signal present
    const participantSaysSignal = trial.sliderValue > 0; // participant chooses blue

    if (isSignal) {
      if (participantSaysSignal) hits++;
      else misses++;
    } else {
      if (participantSaysSignal) falseAlarms++;
      else correctRejects++;
    }
  });

  const hitRate = hits + misses > 0 ? hits / (hits + misses) : 0;
  const faRate = falseAlarms + correctRejects > 0 ? falseAlarms / (falseAlarms + correctRejects) : 0;

  const epsilon = 1e-5;
  const adjustedHR = Math.min(Math.max(hitRate, epsilon), 1 - epsilon);
  const adjustedFAR = Math.min(Math.max(faRate, epsilon), 1 - epsilon);

  const dPrimeHuman = jStat.normal.inv(adjustedHR, 0, 1) - jStat.normal.inv(adjustedFAR, 0, 1);
  const dPrimeAI = jStat.normal.inv(0.93, 0, 1) - jStat.normal.inv(0.07, 0, 1);
  const dPrimeTeam = Math.sqrt(dPrimeHuman ** 2 + dPrimeAI ** 2);
  const totalDP = dPrimeHuman + dPrimeAI;
  const aHuman = dPrimeHuman / totalDP;
  const aAid = dPrimeAI / totalDP;
  const dPrimeTeamSimple = computeDPrimeTeamSimple(hitRate, faRate);

  return {
    counts: { hits, misses, falseAlarms, correctRejects },
    rates: { hitRate: hitRate.toFixed(2), falseAlarmRate: faRate.toFixed(2) },
    dPrimes: {
      human: dPrimeHuman.toFixed(2),
      ai: dPrimeAI.toFixed(2),
      team: dPrimeTeam.toFixed(2),
      teamSimple: dPrimeTeamSimple.toFixed(2),
    },
    decisionWeights: {
      aHuman: aHuman.toFixed(2),
      aAid: aAid.toFixed(2),
    },
  };
}

export function computeSDTfromTrialsButton(trials: Trial[]) {
  let hits = 0,
    misses = 0,
    falseAlarms = 0,
    correctRejects = 0;
  let hitsH = 0,
    missesH = 0,
    falseAlarmsH = 0,
    correctRejectsH = 0;

  trials.forEach((trial) => {
    if (!('buttonPressed' in trial)) return;

    const isSignal = trial.color >= 50; // blue = signal present
    const participantSaysSignal = trial.buttonPressed!.toLowerCase() === 'blue';
    const participantSaysSignalSlider = trial.sliderValue > 0; // participant chooses blue

    if (isSignal) {
      if (participantSaysSignal) hits++;
      else misses++;
    } else {
      if (participantSaysSignal) falseAlarms++;
      else correctRejects++;
    }
    if (isSignal) {
      if (participantSaysSignalSlider) hitsH++;
      else missesH++;
    } else {
      if (participantSaysSignalSlider) falseAlarmsH++;
      else correctRejectsH++;
    }
  });

  const hitRate = hits + misses > 0 ? hits / (hits + misses) : 0;
  const faRate = falseAlarms + correctRejects > 0 ? falseAlarms / (falseAlarms + correctRejects) : 0;
  const hitRateH = hitsH + missesH > 0 ? hitsH / (hitsH + missesH) : 0;
  const faRateH = falseAlarmsH + correctRejectsH > 0 ? falseAlarmsH / (falseAlarmsH + correctRejectsH) : 0;

  const epsilon = 1e-5;
  // const adjustedHR = Math.min(Math.max(hitRate, epsilon), 1 - epsilon);
  // const adjustedFAR = Math.min(Math.max(faRate, epsilon), 1 - epsilon);
  const adjustedHRH = Math.min(Math.max(hitRateH, epsilon), 1 - epsilon);
  const adjustedFARH = Math.min(Math.max(faRateH, epsilon), 1 - epsilon);

  const dPrimeHuman = jStat.normal.inv(adjustedHRH, 0, 1) - jStat.normal.inv(adjustedFARH, 0, 1);
  const dPrimeAI = jStat.normal.inv(0.93, 0, 1) - jStat.normal.inv(0.07, 0, 1);
  const dPrimeTeam = Math.sqrt(dPrimeHuman ** 2 + dPrimeAI ** 2);
  const totalDP = dPrimeHuman + dPrimeAI;
  const aHuman = dPrimeHuman / totalDP;
  const aAid = dPrimeAI / totalDP;
  const dPrimeTeamSimple = computeDPrimeTeamSimple(hitRate, faRate);

  return {
    counts: { hits, misses, falseAlarms, correctRejects },
    rates: { hitRate: hitRate.toFixed(2), falseAlarmRate: faRate.toFixed(2) },
    dPrimes: {
      human: dPrimeHuman.toFixed(2),
      ai: dPrimeAI.toFixed(2),
      team: dPrimeTeam.toFixed(2),
      teamSimple: dPrimeTeamSimple.toFixed(2),
    },
    decisionWeights: {
      aHuman: aHuman.toFixed(2),
      aAid: aAid.toFixed(2),
    },
  };
}

export function calculateMeanTeamSimple(results: { dPrimes: { teamSimple: string } }[]): number {
  const teamSimples = results.map((r) => parseFloat(r.dPrimes.teamSimple));
  return teamSimples.length > 0 ? jStat.mean(teamSimples) : 0;
}

export function calculateMedianTeamSimple(results: { dPrimes: { teamSimple: string } }[]): number {
  const teamSimples = results.map((r) => parseFloat(r.dPrimes.teamSimple));
  return teamSimples.length > 0 ? jStat.median(teamSimples) : 0;
}

function computeDPrimeTeamSimple(hitRate: number, faRate: number): number {
  const epsilon = 1e-5;

  const adjustedHR = Math.min(Math.max(hitRate, epsilon), 1 - epsilon);
  const adjustedFAR = Math.min(Math.max(faRate, epsilon), 1 - epsilon);

  return jStat.normal.inv(adjustedHR, 0, 1) - jStat.normal.inv(adjustedFAR, 0, 1);
}

// reference values finden aus paper
export function calculateTimeDifferences(data: { [key: string]: Trial[] }): { [key: string]: number | null } {
  const differences: { [key: string]: number | null } = {};

  for (const participant in data) {
    const records = data[participant];

    // Find records at index 0 and 199
    const recordAt0 = records.find((record) => record.index === 0);
    const recordAt199 = records.find((record) => record.index === 199);

    if (recordAt0 && recordAt199 && recordAt0.timestamp && recordAt199.timestamp) {
      const time0 = new Date(recordAt0.timestamp).getTime();
      const time199 = new Date(recordAt199.timestamp).getTime();

      // Calculate difference in milliseconds
      differences[participant] = time199 - time0;
    } else {
      // If either record is missing, assign null
      differences[participant] = null;
    }
  }

  return differences;
}

export function calculateOverallMean<K extends keyof Trial>(data: { [x: string]: Trial[] }, parameter: K) {
  const allValues: number[] = [];

  for (const participant in data) {
    const records = data[participant];

    // Find the record with index === 199
    const recordAt199 = records.find((record: { index: number }) => record.index === 199);

    if (recordAt199) {
      const value = recordAt199[parameter];
      if (typeof value === 'number' && !isNaN(value)) {
        allValues.push(value);
      }
    }
  }

  const meanValue = jStat.mean(allValues);

  return meanValue;
}

export function calculateOverallMedian<K extends keyof Trial>(data: { [x: string]: Trial[] }, parameter: K) {
  const allValues: number[] = [];

  for (const participant in data) {
    const records = data[participant];

    // Find the record with index === 199
    const recordAt199 = records.find((record: { index: number }) => record.index === 199);

    if (recordAt199) {
      const value = recordAt199[parameter];
      if (typeof value === 'number' && !isNaN(value)) {
        allValues.push(value);
      }
    }
  }

  const medianValue = jStat.median(allValues);

  return medianValue;
}

// ⬇️ Median Team-Sensitivität
export function calculateMedianTeamSensitivity(data: AllParticipantsData): number {
  const values = Object.values(data).map((trials) => {
    const result = analyzeParticipant(trials);
    return parseFloat(result.summary.dPrimeTeam);
  });
  return jStat.median(values);
}

export function analyzeParticipant(trials: Trial[]) {
  const epsilon = 1e-5;

  let hits = 0;
  let misses = 0;
  let falseAlarms = 0;
  let correctRejections = 0;

  const results = [];

  // Classify each trial
  for (const trial of trials) {
    const isSignal = trial.color >= 50; // blue
    const isResponseBlue = trial.buttonPressed === 'blue';

    if (isSignal && isResponseBlue) hits++;
    else if (isSignal && !isResponseBlue) misses++;
    else if (!isSignal && isResponseBlue) falseAlarms++;
    else if (!isSignal && !isResponseBlue) correctRejections++;

    // Store classification for each trial
    results.push({
      ...trial,
      isSignal,
      isResponseBlue,
      classification: isSignal && isResponseBlue ? 'hit' : isSignal && !isResponseBlue ? 'miss' : !isSignal && isResponseBlue ? 'falseAlarm' : 'correctRejection',
    });
  }

  const total = trials.length;
  const accuracy = ((hits + correctRejections) / total) * 100;

  const hitRate = hits / (hits + misses || 1); // prevent divide-by-zero
  const faRate = falseAlarms / (falseAlarms + correctRejections || 1);

  const boundedHR = Math.min(Math.max(hitRate, epsilon), 1 - epsilon);
  const boundedFAR = Math.min(Math.max(faRate, epsilon), 1 - epsilon);

  const zHR = jStat.normal.inv(boundedHR, 0, 1);
  const zFAR = jStat.normal.inv(boundedFAR, 0, 1);

  const dPrimeHuman = zHR - zFAR;

  // AI assumed static values (could vary if dynamic model available)
  const dPrimeAid = calculateDPrime(0.93, 0.07);

  const totalDP = dPrimeHuman + dPrimeAid;
  const aHuman = dPrimeHuman / totalDP;
  const aAid = dPrimeAid / totalDP;

  const perTrialWithZ = results.map((trial) => {
    const XHuman = trial.sliderValue;
    const XAid = trial.aiGuessValue;
    const Z = aHuman * XHuman + aAid * XAid!;

    return {
      ...trial,
      XHuman,
      XAid,
      Z,
    };
  });

  const dPrimeTeam = Math.sqrt(Math.pow(dPrimeHuman, 2) + Math.pow(dPrimeAid, 2));

  return {
    summary: {
      total,
      hits,
      misses,
      falseAlarms,
      correctRejections,
      accuracy: accuracy.toFixed(1),
      hitRate: hitRate.toFixed(3),
      falseAlarmRate: faRate.toFixed(3),
      dPrimeHuman: dPrimeHuman.toFixed(3),
      dPrimeAid: dPrimeAid.toFixed(3),
      dPrimeTeam: dPrimeTeam.toFixed(3),
      aHuman: aHuman.toFixed(3),
      aAid: aAid.toFixed(3),
    },
    trials: perTrialWithZ,
  };
}

function calculateDPrime(hr: number, far: number) {
  const epsilon = 1e-5;
  const boundedHR = Math.min(Math.max(hr, epsilon), 1 - epsilon);
  const boundedFAR = Math.min(Math.max(far, epsilon), 1 - epsilon);
  const zHR = jStat.normal.inv(boundedHR, 0, 1);
  const zFAR = jStat.normal.inv(boundedFAR, 0, 1);
  return zHR - zFAR;
}

// function average(nums: number[]): number {
//   return nums.reduce((sum, val) => sum + val, 0) / nums.length;
// }
