'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
// import Image from 'next/image';
import FeedbackHintCard from '@/components/layout/FeedbackHintCard';
// import FeedbackSlider from '@/components/ui/Slider/FeedbackSlider';
import FinalScreensFlow from '@/components/layout/FinalScreensFlow';
// import ResultsTable from "@/components/layout/ResultsTable";
// import AnimatedDataChart from "@/components/layout/AnimatedDataChart";
// import AllParticipantsChart from "@/components/layout/AllParticipantsChart";
// import jStat from "jstat";
import participantData from '@/store/participants.json';
import // analyzeParticipant,
// calculateOverallMedian,
// calculateTimeDifferences,
// compareAIGuessWithSlider,
// compareSliderWithButton,
// compareSliderWithButtonDetailed,
// computeSDTfromTrials,
// computeSDTfromTrialsButton,
//evaluateAccuracyWithSliderAndButton,
// calculateMedianTeamSimple,
// summarizeAIGuessSliderSideMatch,
// calculateMeanTeamSimple,
'@/utils/analyzeParticipant';
// calculateOverallMedian,
// calculateTimeDifferences,
// compareAIGuessWithSlider,
// compareSliderWithButton,
// compareSliderWithButtonDetailed,
// computeSDTfromTrials,
// computeSDTfromTrialsButton,
//evaluateAccuracyWithSliderAndButton,
// calculateMedianTeamSimple,
// summarizeAIGuessSliderSideMatch,
// calculateMeanTeamSimple,
// '@/utils/analyzeParticipant';
// import ParticipantsResults from "@/components/layout/ParticipantsResults";
import // calculateOverallMean,
// calculateMedianTeamSensitivity,
'@/utils/analyzeParticipant';
// import { evaluateAccuracyWithSliderAndButton } from '@/utils/analyzeParticipant';
// calculateMedianTeamSensitivity,
// '@/utils/analyzeParticipant';
import { calculateTimeDifferences } from '@/utils/analyzeParticipant';
// import { evaluateAccuracyWithSliderAndButton } from '@/utils/analyzeParticipant';
import DecisionTable from '@/components/layout/DecisionChart';
import SDTSummaryTable from '@/components/layout/SDTSummaryTable';
import SDTBoxplot from '@/components/layout/SDTBoxplot';
import WerteVergleich from '@/components/layout/ResultComparison';
import AccuracyComparison from '@/components/ui/AccuracyComponent/AccuracyComparison';
import TimeChart from '@/components/layout/TimeChart';

const DesignDecisionsPage4: React.FC = () => {
  const router = useRouter();

  //const allResults = participantData.map((p) => computeSDTfromTrials(p.trials));
  // const allResults = Object.entries(participantData).map(
  //   ([participantId, trials]) => computeSDTfromTrialsButton(trials)
  // );

  // const participantKey = Object.keys(participantData)[0]; // or specify directly
  // const participantDataObj = participantData[participantKey];

  // const meanHuman = calculateMittelwertHumanSensitivity(rawData);
  //const medianHuman = calculateMedianHumanSensitivity(rawData);
  // const meanTeam = calculateOverallMean(participantData, "dPrimeTeam");
  // const meanTeamReal = calculateMeanTeamSimple(allResults).toFixed(2);
  // const medianTeamReal = calculateMedianTeamSimple(allResults).toFixed(2);
  // const medianTeam = calculateOverallMedian(participantData, "dPrimeTeam");
  const timeDifference = calculateTimeDifferences(participantData);
  // const comparisonResult = compareSliderWithButton(participantData);
  // const comparisonResult2 = compareSliderWithButtonDetailed(participantData);
  //const accuracyResults = evaluateParticipantAccuracyByColor(participantData);
  // const accuracyResults2 = evaluateAccuracyWithSliderAndButton(participantData);
  // //const accuracyResults = evaluateParticipantAccuracyByColor(participantData);
  // const accuracyResults2 = evaluateAccuracyWithSliderAndButton(participantData);
  // const aiVsSliderResults = compareAIGuessWithSlider(participantData);
  // const aiSliderMatchSummary = summarizeAIGuessSliderSideMatch(participantData);

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      {/* Header */}
      <div className='header border10'>
        <h1 className='text-4xl font-bold m-4 text-center'>Finalisierung & Ergebnisse</h1>
      </div>

      {/*  <section className='sectionBorder'>
      {/*  <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Nutzendenwege</h2>
        <p className='text-lg mt-4'>
          Die Skala zur Entscheidungserfassung wurde so gestaltet, dass sie keine exakten Prozentzahlen oder mathematischen Begriffe wie Z-Wert erfordert. Stattdessen wird sie durch Begriffe wie{' '}
          <strong>&quot;Tendenzwert&quot;</strong>, <strong>&quot;Entscheidungspunkt&quot;</strong> oder <strong>&quot;Assistenzpunkt&quot;</strong> ersetzt. Durch die klare farbliche Orientierung
          (z. B. blau/orange) und dynamische Anzeige (z. B. Text-Feedback: &quot;unsicher&quot; bis &quot;sehr sicher&quot;) wird ein kontinuierliches, aber verständliches Feedback ermöglicht. Ränder
          und harte Schwellenwerte wurden bewusst vermieden, um Nutzer*innen nicht unter Druck zu setzen.
        </p>
      </section> */}

      {/* <section
        style={{
          padding: '1rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          maxWidth: '600px',
          margin: '1rem auto',
          fontFamily: 'Arial, sans-serif',
        }}></section> */}

      {/* <div className="sectionBorder flex flex-col"  >
        <AnimatedDataChart />
        <AllParticipantsChart />
      </div> */}

      {/* <section className="sectionBorder">
        <h2 className="text-2xl font-semibold">
          Übereinstimmung: Menschliche Einschätzung vs. KI
        </h2>
        <ul className="list-disc list-inside mt-4 space-y-2">
          {Object.entries(aiSliderMatchSummary).map(
            ([participant, stats], index) => (
              <li key={participant}>
                <strong>tN{index + 1}:</strong>{" "}
                {stats.totalComparisons > 0
                  ? `${stats.matches}x Match (${stats.matchPercentage}%) / ${stats.mismatches}x Unterschied`
                  : "Keine Daten"}
              </li>
            )
          )}
        </ul>
      </section> */}

      {/*
<section className="sectionBorder">
        <h2 className="text-2xl font-semibold">Vergleich: KI-Schätzung vs. Eigene Sliderwerte</h2>
        {Object.entries(aiVsSliderResults).map(([participant, data]) => (
          <div key={participant} className="mb-6">
            <h3 className="text-xl font-semibold">{participant}</h3>
            <table className="w-full table-auto border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Trial Index</th>
                  <th className="border px-2 py-1">Slider Value</th>
                  <th className="border px-2 py-1">AI Guess Value</th>
                  <th className="border px-2 py-1">Difference</th>
                </tr>
              </thead>
              <tbody>
                {data.comparisons.map(({ index, sliderValue, aiGuessValue, difference }) => (
                  <tr key={index}>
                    <td className="border px-2 py-1 text-center">{index}</td>
                    <td className="border px-2 py-1 text-center">{sliderValue.toFixed(2)}</td>
                    <td className="border px-2 py-1 text-center">{aiGuessValue.toFixed(2)}</td>
                    <td className="border px-2 py-1 text-center">{difference.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section> */}

      {/*   <section className="sectionBorder">
      {/*   <section className="sectionBorder">
        <h2 className="text-2xl font-semibold">Genauigkeit pro Teilnehmer</h2>
        <ul className="list-disc list-inside space-y-3">
          {Object.entries(accuracyResults2).map(([participant, result]) => (
            <li key={participant}>
              <strong>{participant}</strong>
              <br />
              🎯 <u>Mit KI:</u> {result.buttonComparison.correct} ✅ /{" "}
              {result.buttonComparison.incorrect} ❌ (
              {result.buttonComparison.accuracyPercentage}% richtig)
              <br />
              🟦 <u>Ohne KI in Mainphase:</u>{" "}
              {result.sliderWhenButtonExists.correct} ✅ /{" "}
              {result.sliderWhenButtonExists.incorrect} ❌ (
              {result.sliderWhenButtonExists.accuracyPercentage}% richtig)
              <br />
              🟡 <u>Testphase:</u> {result.sliderOnlyTrials.correct} ✅ /{" "}
              {result.sliderOnlyTrials.incorrect} ❌ (
              {result.sliderOnlyTrials.accuracyPercentage}% richtig)
            </li>
          ))}
        </ul>
      </section> */}

      {/*
<section className="sectionBorder">
  <h2 className="text-2xl font-semibold">Richtige vs. Falsche Entscheidungen (Farbe vs. Button)</h2>
  <ul className="list-disc list-inside mt-2 space-y-1">
    {Object.entries(accuracyResults).map(([participant, result]) => (
      <li key={participant}>
        <strong>{participant}</strong>: {result.correct} ✅ richtig, {result.incorrect} ❌ falsch (
        {result.accuracyPercentage}% Genauigkeit)
      </li>
    ))}
  </ul>
</section>
 */}

      {/* Zeitdifferenz */}
      <section className='sectionBorder p-4 rounded-xl bg-gray-50 shadow-sm'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-800'>Zeitdifferenzen & Lernverhalten der Teilnehmenden</h2>
      </section>

      {/* <section className="sectionBorder">
        <h2 className="text-2xl font-semibold">
          Erklärung: Vergleich Mensch vs. Button
        </h2>
        <p className="text-lg mt-2">
          In dieser Auswertung wird geprüft, wie gut die eigene Einschätzung
          (über den <strong>Schieberegler</strong>) mit der Entscheidung nach
          Hilfe (über den <strong>Button</strong>) übereinstimmt.
        </p>
        <p className="text-lg mt-4">
          Dabei gilt:
          <ul className="list-disc list-inside mt-2 text-base">
            <li>
              <strong>Slider-Wert &gt; 0</strong> bedeutet: erwarteter Button
              ist <strong>blau</strong>
            </li>
            <li>
              <strong>Slider-Wert &lt; 0</strong> bedeutet: erwarteter Button
              ist <strong>orange</strong>
            </li>
            <li>
              Wenn der gedrückte Button mit dem erwarteten übereinstimmt, zählt
              es als <strong>Übereinstimmung (Match)</strong>
            </li>
          </ul>
        </p>
        <p className="text-lg mt-4">
          Die berechneten Werte zeigen an, wie häufig diese Übereinstimmungen
          auftreten – sowohl insgesamt als auch pro Teilnehmer:in.
        </p>
      </section> */}

      {/* <section className="sectionBorder">
        <h2 className="text-2xl font-semibold">Umentschieden?</h2>
        <p className="text-lg mt-2">
          <strong>Gesamt:</strong>
          <br />
          Vergleiche: {comparisonResult2.overall.totalComparisons}
          <br />
          Übereinstimmungen: {comparisonResult2.overall.matches}
          <br />
          Abweichungen: {comparisonResult2.overall.mismatches}
          <br />
          Übereinstimmungsrate: {comparisonResult2.overall.matchPercentage}%
        </p>

        <h3 className="text-xl font-semibold mt-6">Pro Teilnehmer</h3>
        <ul className="list-disc list-inside mt-2">
          {Object.entries(comparisonResult2.perParticipant).map(
            ([participantId, stats]) => (
              <li key={participantId}>
                <strong>{participantId}</strong>: {stats.matchPercentage}%
                Übereinstimmung ({stats.matches}/{stats.comparisons})
              </li>
            )
          )}
        </ul>
      </section> */}
      {/*
      <div>Mittelwert: {meanTeam}</div>
      <div>Median: {medianTeam}</div>
      <div>MittelwertReak: {meanTeamReal}</div>
      <div>MedianReal: {medianTeamReal}</div> */}

      {/*  <h1>All Participants Results</h1>
      {Object.entries(participantData).map(
        ([participantKey, participantData]) => (
          <div key={participantKey} style={{ marginBottom: 40 }}>
            <h2>{participantKey}</h2>
            <ResultsTable data={participantData} />
          </div>
        )
      )} */}

      <FinalScreensFlow />

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Nutzendenwege</h2>
        <p className='text-lg mt-4 mb-6'>
          Der Prototyp führt Nutzer*innen durch einen strukturierten Ablauf, der vom Onboarding bis zur finalen Entscheidungsunterstützung mit KI reicht. Der folgende Nutzendenweg zeigt alle Schritte
          des Prototyps:
        </p>
        <div className='bg-gray-50 p-6 rounded-lg'>
          <h3 className='text-xl font-semibold mb-4 text-center'>Nutzendenweg durch den Prototyp</h3>
          <div className='flex flex-col space-y-4'>
            <div className='flex items-center'>
              <div className='bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4'>1</div>
              <div className='flex-1 bg-white p-4 rounded border-l-4 border-orange-500'>
                <h4 className='font-semibold'>Registrierung & Einverständnis</h4>
                <p className='text-sm text-gray-600'>
                  Route: <code>/prototype</code>
                </p>
                <p className='text-sm'>Eingabe Teilnahme-Code, Altersbestätigung, Einverständniserklärung</p>
              </div>
            </div>
            <div className='flex justify-center'>
              <svg className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
              </svg>
            </div>
            <div className='flex items-center'>
              <div className='bg-orange-300 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4'>2</div>
              <div className='flex-1 bg-white p-4 rounded border-l-4 border-orange-300'>
                <h4 className='font-semibold'>Willkommen & Grundlagen</h4>
                <p className='text-sm text-gray-600'>
                  Route: <code>/prototype/onboarding</code>
                </p>
                <p className='text-sm'>Begrüßung, Einführung in die Aufgabe, Erklärung der Bildklassifikation</p>
              </div>
            </div>
            <div className='flex justify-center'>
              <svg className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
              </svg>
            </div>
            <div className='flex items-center'>
              <div className='bg-orange-100 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4'>3</div>
              <div className='flex-1 bg-white p-4 rounded border-l-4 border-orange-100'>
                <h4 className='font-semibold'>Testphase - Eigenständige Entscheidungen</h4>
                <p className='text-sm text-gray-600'>
                  Route: <code>/prototype/testphase</code>
                </p>
                <p className='text-sm'>20 Bilder klassifizieren nur mit Schieberegler, Feedback nach jedem 5. Trial, Aufbau der Baseline</p>
              </div>
            </div>
            <div className='flex justify-center'>
              <svg className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
              </svg>
            </div>
            <div className='flex items-center'>
              <div className='bg-blue-100 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4'>4</div>
              <div className='flex-1 bg-white p-4 rounded border-l-4 border-blue-100'>
                <h4 className='font-semibold'>Instruktionen für KI-Unterstützung</h4>
                <p className='text-sm text-gray-600'>Interaktives Carousel (6 Schritte)</p>
                <p className='text-sm'>Erklärung der KI-Hilfe, Optimal Weighing Konzept, Entscheidungsvisualisierung</p>
              </div>
            </div>
            <div className='flex justify-center'>
              <svg className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
              </svg>
            </div>
            <div className='flex items-center'>
              <div className='bg-blue-300 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4'>5</div>
              <div className='flex-1 bg-white p-4 rounded border-l-4 border-blue-300'>
                <h4 className='font-semibold'>Hauptphase - Entscheidungen mit KI-Unterstützung</h4>
                <p className='text-sm text-gray-600'>
                  Route: <code>/prototype/mainphase</code>
                </p>
                <p className='text-sm'>200 Bilder: Erst eigene Einschätzung (Slider), dann KI-Empfehlung sehen, finale Entscheidung (Button), Feedback alle 5 Trials</p>
              </div>
            </div>
            <div className='flex justify-center'>
              <svg className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
              </svg>
            </div>
            <div className='flex items-center'>
              <div className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4'>6</div>
              <div className='flex-1 bg-white p-4 rounded border-l-4 border-blue-500'>
                <h4 className='font-semibold'>Abschluss & Ergebnisse</h4>
                <p className='text-sm text-gray-600'>Completion Screen in Hauptphase</p>
                <p className='text-sm'>Anzeige der finalen Genauigkeit, Vergleich Test- vs. Hauptphase, Dankesnachricht</p>
              </div>
            </div>
          </div>
          <div className='mt-6 bg-blue-50 p-4 rounded'>
            <h4 className='font-semibold mb-2'>Zentrale Designmerkmale:</h4>
            <ul className='text-sm space-y-1'>
              <li>
                • <strong>Progressiver Aufbau:</strong> Von eigenständigen zu unterstützten Entscheidungen
              </li>
              <li>
                • <strong>Transparenz:</strong> Klare Erklärung der KI-Funktionsweise vor dem Einsatz
              </li>
              <li>
                • <strong>Vergleichbarkeit:</strong> Test- und Hauptphase ermöglichen Wirksamkeitsmessung
              </li>
              <li>
                • <strong>Kontinuierliches Feedback:</strong> Regelmäßige Genauigkeitsrückmeldungen
              </li>
              <li>
                • <strong>Benutzerzentrierung:</strong> Finale Entscheidung bleibt immer beim Menschen
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Erklärmodelle</h2>
        <p className='text-lg mt-4 mb-6'>
          Der Prototyp implementiert mehrere aufeinander aufbauende Erklärmodelle, um Transparenz und Verständnis für die KI-Unterstützung zu schaffen. Diese basieren ausschließlich auf den
          Informationen, die Nutzer*innen tatsächlich während der Nutzung präsentiert werden.
        </p>
        <div className='space-y-6'>
          <div className='rounded border-l-4 p-6 shadow-md transition-colors duration-300 bg-teal-50 hover:bg-teal-100 border-teal-300'>
            <h3 className='text-xl font-semibold mb-4 flex items-center '>
              <div className='bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3'>1</div>
              Grundlegende Aufgabenerklärung (Onboarding)
            </h3>
            <div className='grid md:grid-cols-2 gap-4 '>
              <div>
                <h4 className='font-semibold mb-2'>Aufgabenbeschreibung:</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>Bildklassifikation:</strong> &quot;Entscheiden Sie, ob mehr orange oder mehr blaue Punkte enthalten sind&quot;
                  </li>
                  <li>
                    • <strong>Testphase:</strong> 20 Bilder zum Vertrautmachen
                  </li>
                  <li>
                    • <strong>Genauigkeitsermittlung:</strong> &quot;Wie gut Sie Muster erkennen können&quot;
                  </li>
                  <li>
                    • <strong>Handlungsfreiheit:</strong> &quot;Entscheiden Sie so, wie Sie es für richtig halten&quot;
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>Schieberegler-Erklärung:</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>Farbkodierung:</strong> Orange ↔ Neutral ↔ Blau
                  </li>
                  <li>
                    • <strong>Sprachliche Labels:</strong> &quot;sicher orange&quot;, &quot;eher orange&quot;, &quot;unsicher&quot;, &quot;eher blau&quot;, &quot;sicher blau&quot;
                  </li>
                  <li>
                    • <strong>Kontinuierliche Skala</strong> statt binärer Entscheidungen
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='border-l-4 rounded p-6 shadow-md transition-colors duration-300 bg-blue-50 hover:bg-blue-100 border-blue-300'>
            <h3 className='text-xl font-semibold mb-4 flex items-center '>
              <div className='bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3'>2</div>
              Interaktives Instruktions-Carousel (6 Schritte)
            </h3>
            <div className='grid md:grid-cols-3 gap-4 '>
              <div>
                <h4 className='font-semibold mb-2'>Schritte 1-2: System-Einführung</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>Aufgabenwiederholung:</strong> Gleiches Prinzip wie Testphase
                  </li>
                  <li>
                    • <strong>Automatisiertes System:</strong> &quot;analysiert dieselben Bilder wie Sie&quot;
                  </li>
                  <li>
                    • <strong>Trainingsgrundlage:</strong> &quot;darauf trainiert, Farben im Bild zu erkennen&quot;
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>Schritte 3-4: Kombination</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>Gewichtung:</strong> &quot;berücksichtigt, wie zuverlässig beide sind&quot;
                  </li>
                  <li>
                    • <strong>Gemeinsame Empfehlung:</strong> Kombination beider Einschätzungen
                  </li>
                  <li>
                    • <strong>Anteilige Gewichtung:</strong> &quot;je zuverlässiger, desto stärker gewichtet&quot;
                  </li>
                  <li>
                    • <strong>Visuelle Marker:</strong> &quot;M&quot; für Mensch, &quot;KI&quot; für System
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>Schritte 5-6: Nutzer*innen-Autonomie</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>KI-Genauigkeit:</strong> &quot;93% durchschnittliche Genauigkeit&quot;
                  </li>
                  <li>
                    • <strong>Eigene Gewichtung:</strong> &quot;auf Basis Ihrer Testphase berechnet&quot;
                  </li>
                  <li>
                    • <strong>Entscheidungsfreiheit:</strong> &quot;frei entscheiden, ob und wie stark nutzen&quot;
                  </li>
                  <li>
                    • <strong>Transparenz-Ziel:</strong> &quot;fundierte Entscheidung ableiten können&quot;
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='border-l-4 rounded p-6 shadow-md transition-colors duration-300 bg-green-50 hover:bg-green-100 border-green-300'>
            <h3 className='text-xl font-semibold mb-4 flex items-center '>
              <div className='bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3'>3</div>
              Visuelles Erklärmodell (Hauptphase)
            </h3>
            <div className='grid md:grid-cols-2 gap-4 '>
              <div>
                <h4 className='font-semibold mb-2'>AccuracyComparison Visualisierung:</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>Farbkodierte Skala:</strong> Orange ↔ Neutral ↔ Blau
                  </li>
                  <li>
                    • <strong>Positionsmarker:</strong> &quot;Mensch&quot;, &quot;KI&quot;, &quot;Ergebnis&quot;
                  </li>
                  <li>
                    • <strong>Dynamische Kurven:</strong> Visualisierung der Gewichtung
                  </li>
                  <li>
                    • <strong>Echtzeit-Feedback:</strong> Sofortige visuelle Rückmeldung
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>KI-Empfehlung Interface:</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>Klare Kommunikation:</strong> &quot;Die KI empfiehlt: [Orange/Blau]&quot;
                  </li>
                  <li>
                    • <strong>Begrifflichkeit:</strong> &quot;Kombinierte Empfehlung&quot; (statt Z-Score)
                  </li>
                  <li>
                    • <strong>Finale Buttons:</strong> Eindeutige Orange/Blau Entscheidung
                  </li>
                </ul>
              </div>
            </div>
            <div className='bg-[#ffffff83] p-4 rounded mt-4'>
              <AccuracyComparison humanPercent={1} aiPercent={-1} locale={'de'} decision={-0.3} aiAccuracy={93} humanAccuracy={Number(0)} />
            </div>
          </div>
          <div className='border-l-4 rounded p-6 shadow-md transition-colors duration-300 bg-yellow-50 hover:bg-yellow-100 border-yellow-300'>
            <h3 className='text-xl font-semibold mb-4 flex items-center'>
              <div className='bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3'>4</div>
              Kontinuierliches Feedback-Modell
            </h3>
            <div className='grid md:grid-cols-3 gap-4'>
              <div>
                <h4 className='font-semibold mb-2'>Testphase-Feedback:</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>Regelmäßig alle 5 Trials:</strong> &quot;Ihre durchschnittliche Genauigkeit beträgt: X%&quot;
                  </li>
                  <li>
                    • <strong>Trial-Zählung:</strong> &quot;Bisher lagen Sie in X von Y Fällen richtig&quot;
                  </li>
                  <li>
                    • <strong>Motivational:</strong> Aufbau der individuellen Baseline
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>Hauptphase-Feedback:</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>Vergleichsgenauigkeit:</strong> &quot;KI lag in X% der Fälle richtig&quot;
                  </li>
                  <li>
                    • <strong>Eigene Performance:</strong> &quot;Ihre Genauigkeit liegt bei X%&quot;
                  </li>
                  <li>
                    • <strong>KI-Limits:</strong> &quot;Auch die KI kann Fehler machen&quot;
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>Abschluss-Feedback:</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>Phasenvergleich:</strong> Testphase X% vs. Hauptphase Y%
                  </li>
                  <li>
                    • <strong>Team-Konzept:</strong> &quot;Sie waren mit der KI ein gutes Team!&quot;
                  </li>
                  <li>
                    • <strong>Verbesserung:</strong> &quot;X% genauer mit ihrer Hilfe&quot;
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='border-l-4 rounded p-6 shadow-md transition-colors duration-300 bg-violet-50 hover:bg-violet-100 border-violet-300'>
            <h3 className='text-xl font-semibold mb-4 flex items-center'>
              <div className='bg-violet-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3'>5</div>
              Sprachliches Erklärmodell
            </h3>
            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <h4 className='font-semibold mb-2'>Vereinfachte Terminologie:</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>&quot;Kombinierte Empfehlung&quot;</strong> statt mathematischer Begriffe
                  </li>
                  <li>
                    • <strong>&quot;Entscheidungshilfe&quot;</strong> statt &quot;AI System&quot;
                  </li>
                  <li>
                    • <strong>&quot;Automatisiertes System&quot;</strong> als neutrale Beschreibung
                  </li>
                  <li>
                    • <strong>&quot;Gewichtet nach Zuverlässigkeit&quot;</strong> statt komplexer Formeln
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>Nutzerzentrierte Beschreibungen:</h4>
                <ul className='text-sm space-y-1 ml-4'>
                  <li>
                    • <strong>Sicherheitslabels:</strong> &quot;sicher&quot;, &quot;eher&quot;, &quot;unsicher&quot;
                  </li>
                  <li>
                    • <strong>Richtungsangaben:</strong> &quot;orange&quot; ↔ &quot;blau&quot;
                  </li>
                  <li>
                    • <strong>Prozentangaben:</strong> Klare Genauigkeitswerte
                  </li>
                  <li>
                    • <strong>Handlungsaufforderungen:</strong> &quot;Sie können frei entscheiden&quot;
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 bg-blue-50 p-4 rounded'>
          <h4 className='font-semibold mb-2'>Zentrale Prinzipien der implementierten Erklärmodelle:</h4>
          <ul className='text-sm space-y-1'>
            <li>
              • <strong>Schrittweise Einführung:</strong> Von Aufgabenverständnis zu KI-Kombination
            </li>
            <li>
              • <strong>Alltagssprache:</strong> Vermeidung technischer Fachbegriffe
            </li>
            <li>
              • <strong>Visuelle Unterstützung:</strong> Farbkodierung und interaktive Skalen
            </li>
            <li>
              • <strong>Kontinuierliches Feedback:</strong> Regelmäßige, verständliche Rückmeldungen
            </li>
            <li>
              • <strong>Nutzer*innen-Autonomie:</strong> Betonung der finalen Entscheidungsautonomie
            </li>
            <li>
              • <strong>Transparenz über Grenzen:</strong> &quot;Auch die KI kann Fehler machen&quot;
            </li>
          </ul>
        </div>
      </section>

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Reflexion</h2>
        <p className='text-lg m-4'>
          In diesem Abschnitt werden einige Ideen und Reflexionen zur Studie genannt. Einige beschreiben unsere Überlegungen im anfänglichen Prozess und einige Ideen erschlossen sich nach der
          Durchführung der Studie, auf Basis weiterer Diskussionen und Überlegungen.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FeedbackHintCard title='Entscheidungsreihenfolge' color='indigo'>
            Vielleicht hätte man erst die Entscheidung der KI zeigen können. Dann den Mensch entscheiden lassen. Und dann die Entscheidungshilfe zum Schluss anzeigen.
            <p className='font-bold'>→ Idee: Nudging hin zur KI und potntiell zur optimalen Strategie</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Workflow' color='teal'>
            Man hätte mehr direktes Feedback einbauen können besonders in den ersten Trials
            <p className='font-bold'>→ Idee: Bessere Vertrauenskalibirierung in Entscheidungshilfe</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Nudging' color='yellow'>
            Eventuell stärkeres Nudging einbauen, hin zur Entscheidungshilfe. Vielleicht mit zusätzlicher Nachfrage, warum man sich gegen die Hilfe entschieden hat.
            <p className='font-bold'>→ Idee: Befolgung der Strategie eher erzwingen, Optimalzustand erzeugen</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Hinweise' color='violet'>
            Hinweise zwischendurch vielfältiger gestalten. Z.B. Du hast dich … mal gegen Entscheidungshilfe entschieden und hast eine Genauigkeit von …%. Die Entscheidungshilfe lag bisher in … Fällen
            richtig. Versuche sie mehr mit einzubeziehen.
            <p className='font-bold'>→ Idee: Nutzen der Entscheidungshilfe verdeutlichen</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Vortest' color='green'>
            Vor der eigentlichen Studie wären UX-UI-Tests und ein Test zur Entscheidungshilfe sinnvoll gewesen, um den Nutzen zu verstehen und die Hilfe innerhalb der eigentlichen Entscheidung zu
            untersuchen.
            <p className='font-bold'>→ Idee: Nutzen der Entscheidungshilfe untersuchen</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Entscheidungshilfe' color='pink'>
            Entwicklung einer individuell passenden Darstellung zur eigenen Strategie, die Nutzende unterstützt. Hierbei wurden alle wichtigen Aspekte, wie Mensch, KI und OW-Modell einbezogen.
            <p className='font-bold'>→ Learning: Darstellungsformen neu denken</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Unser Learning' color='blue'>
            Innerhalb des Prozesses der Studienerstellung haben wir als Gruppe wertvolle Informationen lernen koennen. Über Planung, Abbilden einer vorhandenen Studie, Entwicklung konkreter Strategien
            und Anpassung der Anwendung an konkrete Userflows sowie Datenauswertng und Vergleich.
            <p className='font-bold'>→ Learning: Wissen erweitert</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Projektentwicklung' color='orange'>
            Wir haben als Gruppe ein komplettes Softwareprojekt konzipiert, realisiert und in Einsatz gebracht.
            <p className='font-bold'>→ Learning: Projekt umgesetzt</p>
          </FeedbackHintCard>
        </div>
      </section>

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Ergebnisse und Datenbewertung</h2>
        <p className='text-lg m-4'>
          In diesem Abschnitt werden die Ergebnisse der durchgeführten Studie aufgezeigt. Dabei geht es sowohl um unsere Teilnehmenden und deren Leistung, als auch um den Vergleich mit dem
          Originalpaper.
        </p>

        <div>
          <div className='flex flex-col justify-between'>
            <h2 className='text-lg font-bold mb-2'>Erklärung zur Signalentdeckungstheorie (SDT) - Orange als Basis</h2>
            <p className='text-lg ml-4'>
              In diesem Experiment gilt <strong>Orange als Basis (Nicht-Signal)</strong>, während <strong>Blau als Signal</strong> definiert ist.
            </p>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}>
              <thead>
                <tr style={{ backgroundColor: '#ddd' }}>
                  <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Stimulus (Farbe)</th>
                  <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Slider-Antwort</th>
                  <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Kategorie</th>
                  <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Erklärung</th>
                </tr>
              </thead>
              <tbody>
                {/* Hit */}
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Blau (≥ 50)</td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>&gt; 0 (Blau)</td>
                  <td
                    style={{
                      border: '1px solid #ccc',
                      padding: '0.5rem',
                      color: 'green',
                    }}>
                    Hit ✅
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Signal korrekt erkannt.</td>
                </tr>
                {/* Miss */}
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Blau (≥ 50)</td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>≤ 0 (Orange)</td>
                  <td
                    style={{
                      border: '1px solid #ccc',
                      padding: '0.5rem',
                      color: 'red',
                    }}>
                    Miss ❌
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Signal wurde nicht erkannt.</td>
                </tr>
                {/* False Alarm */}
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Orange (&lt; 50)</td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>&gt; 0 (Blau)</td>
                  <td
                    style={{
                      border: '1px solid #ccc',
                      padding: '0.5rem',
                      color: 'orange',
                    }}>
                    False Alarm ⚠️
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Fälschlicherweise Signal erkannt.</td>
                </tr>
                {/* Correct Rejection */}
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Orange (&lt; 50)</td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>≤ 0 (Orange)</td>
                  <td
                    style={{
                      border: '1px solid #ccc',
                      padding: '0.5rem',
                      color: 'green',
                    }}>
                    Correct Rejection ✅
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Richtig erkannt, dass kein Signal vorliegt.</td>
                </tr>
              </tbody>
            </table>
            <h1 className='text-xl font-bold mb-4 mt-4 text-left'>Signal Detection Zusammenfassung der Teilnehmenden</h1>

            <SDTSummaryTable participantData={participantData} />
            <div className='mt-8'>
              {/* Boxplot visualization of SDT metrics */}
              <h2 style={{ fontWeight: 'bold', fontSize: 20 }}>Boxplots</h2>
              <SDTBoxplot participantData={participantData} />
            </div>
            <p className='text-lg mt-4 mb-4'>
              Zwei Teilnehmende (TN 6 & TN21)wurden von den Analysen ausgeschlossen, da ihre d′-Werte auf eine unzureichende Sensitivität im Erkennen des Signals hinwiesen. Diese geringe Sensitivität
              ließ darauf schließen, dass keine systematische Unterscheidung zwischen Signal und Rauschen erfolgte, sodass eine valide Interpretation der Daten nicht gewährleistet war.
            </p>
          </div>
        </div>
        <div className='flex flex-row justify-center'>
          <WerteVergleich />
        </div>
        <p className='text-lg mt-4 mb-10'>
          Betrachtet man die Mittelwerte der Sensitivitätswerte über alle Teilnehmenden, ergibt sich eine Ähnlichkeit zwischen beiden Studien. In der Originalstudie (Paper) wurde ein
          durchschnittlicher Sensitivitätswert (d′) von 2.80 gemessen, während unsere eigene Studie einen sehr ähnlichen Wert von 2.94 ergab. Auch im Vergleich mit dem theoretisch optimalen Wert des
          OW-Modells zeigt sich ein vergleichbares Muster: Während im Paper ein OW-Wert von 3.80 erreicht wurde, lag dieser in unserer Studie bei 3.74. Die Abweichung (Differenz zwischen gemessenem
          Wert und OW) betrug somit 1.00 im Paper und 0.80 in unserer Studie. Diese geringen Unterschiede deuten darauf hin, dass die Teilnehmer:innen beider Studien in ähnlichem Maße unterhalb des
          optimalen Sensitivitätsniveaus agierten – ein Hinweis auf konsistente Muster in der menschlichen Nutzung automatisierter Entscheidungshilfen.
        </p>

        <TimeChart data={timeDifference} />

        <h2 className='text-xl font-bold text-left mt-12 mb-8'>Kontingenztabelle der Entscheidungen</h2>
        <DecisionTable />
      </section>

      {/* Back button */}
      <div className='flex justify-center'>
        <Button text='Zurück' onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default DesignDecisionsPage4;
