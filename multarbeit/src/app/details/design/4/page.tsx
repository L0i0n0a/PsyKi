'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Image from 'next/image';
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
// import ParticipantsResults from "@/components/layout/ParticipantsResults";
import // calculateOverallMean,
// calculateMedianTeamSensitivity,
'@/utils/analyzeParticipant';
import { evaluateAccuracyWithSliderAndButton } from '@/utils/analyzeParticipant';
import DecisionTable from '@/components/layout/DecisionChart';
import SDTSummaryTable from '@/components/layout/SDTSummaryTable';

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
  // const timeDifference = calculateTimeDifferences(participantData);
  // const comparisonResult = compareSliderWithButton(participantData);
  // const comparisonResult2 = compareSliderWithButtonDetailed(participantData);
  // //const accuracyResults = evaluateParticipantAccuracyByColor(participantData);
   const accuracyResults2 = evaluateAccuracyWithSliderAndButton(participantData);
  // const aiVsSliderResults = compareAIGuessWithSlider(participantData);
  // const aiSliderMatchSummary = summarizeAIGuessSliderSideMatch(participantData);

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      {/* Header */}
      <div className='header border10'>
        <h1 className='text-4xl font-bold m-4 text-center'>Finalisierung & Ergebnisse</h1>
      </div>

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
      {/* <section className="sectionBorder">
        <h2 className="text-2xl font-semibold">
          Zeitdifferenzen zwischen Index 0 und 199
        </h2>
        <ul className="list-disc list-inside mt-2">
          {Object.entries(timeDifference).map(([_, diff], index) => (
            <li key={index}>
              <strong>{`tN${index + 1}`}</strong>:{" "}
              {diff !== null
                ? `${(diff / (1000 * 60)).toFixed(2)} Minuten`
                : "Keine Daten vorhanden"}
            </li>
          ))}
        </ul>
      </section> */}

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
        <p className='text-lg mt-4'>
          Die Skala zur Entscheidungserfassung wurde so gestaltet, dass sie keine exakten Prozentzahlen oder mathematischen Begriffe wie Z-Wert erfordert. Stattdessen wird sie durch Begriffe wie{' '}
          <strong>&quot;Tendenzwert&quot;</strong>, <strong>&quot;Entscheidungspunkt&quot;</strong> oder <strong>&quot;Assistenzpunkt&quot;</strong> ersetzt. Durch die klare farbliche Orientierung
          (z. B. blau/orange) und dynamische Anzeige (z. B. Text-Feedback: &quot;unsicher&quot; bis &quot;sehr sicher&quot;) wird ein kontinuierliches, aber verständliches Feedback ermöglicht. Ränder
          und harte Schwellenwerte wurden bewusst vermieden, um Nutzer*innen nicht unter Druck zu setzen.
        </p>
      </section>

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Reflexion</h2>
        <p className='text-lg m-4'>In diesem Abschnitt werden einige Ideen und Reflexionen zur Studie genannt. Einige beschreiben unsere Überlegungen im anfänglichen Prozess und einige Ideen erschlossen sich nach der Durchführung der Studie, auf Basis weiterer Diskussionen und Überlegungen.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FeedbackHintCard title='Workflow' color='teal'>
           Man hätte mehr direktes Feedback einbauen können besonders in den ersten Trials
            <p className='font-bold'>→ Idee: Bessere Vertrauenskalibirierung in Entscheidungshilfe</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Nudging' color='yellow'>
           Eventuell stärkeres Nudging einbauen, hin zur Entscheidungshilfe. Vielleicht mit zusätzlicher Nachfrage, warum man sich gegen die Hilfe entschieden hat.
            <p className='font-bold'>→ Idee: Befolgung der Strategie eher erzwingen, Optimalzustand erzeugen</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Hinweise' color='violet'>
            Hinweise zwischendurch vielfältiger gestalten. Z.B. Du hast dich … mal gegen Entscheidungshilfe entschieden und hast eine Genauigkeit von …%. Die Entscheidungshilfe lag bisher in … Fällen richtig. Versuche sie mehr mit einzubeziehen.
            <p className='font-bold'>→ Idee: Nutzen der Entscheidungshilfe verdeutlichen</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Vortest' color='green'>
           Vor der eigentlichen Studie wären UX-UI-Tests und ein Test zur Entscheidungshilfe sinnvoll gewesen, um den Nutzen zu verstehen und die Hilfe innerhalb der eigentlichen Entscheidung zu untersuchen.
            <p className='font-bold'>→ Idee: Nutzen der Entscheidungshilfe untersuchen</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Entscheidungshilfe' color='pink'>
           Entwicklung einer individuell passenden Darstellung zur eigenen Strategie, die Nutzende unterstützt. Hierbei wurden alle wichtigen Aspekte, wie Mensch, KI und OW-Modell einbezogen.
            <p className='font-bold'>→ Learning: Darstellungsformen neu denken</p>
          </FeedbackHintCard>
          <FeedbackHintCard title='Unser Learning' color='blue'>
           Innerhalb des Prozesses der Studienerstellung haben wir als Gruppe wertvolle Informationen lernen koennen. Über Planung, Abbilden einer vorhandenen Studie, Entwicklung konkreter Strategien und Anpassung der Anwendung an konkrete Userflows sowie Datenauswertng und Vergleich.
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
        <div className='flex flex-row'>
          <div>
            <Image src={'/Figure_1.png'} width={500} height={500} alt={''}></Image>
            <p className='imageSource'></p>
          </div>
          <div>
            <Image src={'/Figure_2.png'} width={500} height={500} alt={''}></Image>
            <p className='imageSource'></p>
          </div>
        </div>
        <p className='text-lg mt-4'>
          Die Skala zur Entscheidungserfassung wurde so gestaltet, dass sie keine exakten Prozentzahlen oder mathematischen Begriffe wie Z-Wert erfordert. Stattdessen wird sie durch Begriffe wie{' '}
          <strong>&quot;Tendenzwert&quot;</strong>, <strong>&quot;Entscheidungspunkt&quot;</strong> oder <strong>&quot;Assistenzpunkt&quot;</strong> ersetzt. Durch die klare farbliche Orientierung
          (z. B. blau/orange) und dynamische Anzeige (z. B. Text-Feedback: &quot;unsicher&quot; bis &quot;sehr sicher&quot;) wird ein kontinuierliches, aber verständliches Feedback ermöglicht. Ränder
          und harte Schwellenwerte wurden bewusst vermieden, um Nutzer*innen nicht unter Druck zu setzen.
        </p>
      </section>

      <section className='sectionBorder'>
        <div className='flex flex-col justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold mb-10'>Signal Detection Zusammenfassung der Teilnehmenden</h1>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Erklärung zur Signalentdeckungstheorie (SDT) - Orange als Basis</h2>
          <p>
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
            </tbody>
          </table>

          <SDTSummaryTable participantData={participantData} />
        </div>
      </section>

      <section
        className='sectionBorder'
        style={{
          padding: '1rem',
          borderRadius: '8px',
          margin: '1rem auto',
          fontFamily: 'Arial, sans-serif',
        }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Kontingenztabelle der Entscheidungen</h2>
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
