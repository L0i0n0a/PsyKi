'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Image from 'next/image';
import FeedbackHintCard from '@/components/layout/FeedbackHintCard';
import FeedbackSlider from '@/components/ui/Slider/FeedbackSlider';
import FinalScreensFlow from '@/components/layout/FinalScreensFlow';
import AnimatedDataChart from '@/components/layout/AnimatedDataChart';
import AllParticipantsChart from '@/components/layout/AllParticipantsChart';
import jStat from 'jstat';
import participantData from '@/store/participants.json'; 
import { analyzeParticipant, calculateOverallMedian, calculateTimeDifferences, compareAIGuessWithSlider, compareSliderWithButton, compareSliderWithButtonDetailed, computeSDTfromTrials, evaluateAccuracyWithSliderAndButton, summarizeAIGuessSliderSideMatch } from '@/utils/analyzeParticipant';
import ParticipantsResults from '@/components/layout/ParticipantsResults';
import {
  calculateOverallMean,
  calculateMedianTeamSensitivity,
} from '@/utils/analyzeParticipant';
import SDTResults from '@/components/layout/SDTResults';





const DesignDecisionsPage4: React.FC = () => {
    const router = useRouter();

   // const meanHuman = calculateMittelwertHumanSensitivity(rawData);
//const medianHuman = calculateMedianHumanSensitivity(rawData);
const meanTeam = calculateOverallMean(participantData, "dPrimeTeam");
const medianTeam = calculateOverallMedian(participantData, "dPrimeTeam");
const timeDifference = calculateTimeDifferences(participantData);
const comparisonResult = compareSliderWithButton(participantData);
const comparisonResult2 = compareSliderWithButtonDetailed(participantData);
//const accuracyResults = evaluateParticipantAccuracyByColor(participantData);
const accuracyResults2 = evaluateAccuracyWithSliderAndButton(participantData);
const aiVsSliderResults = compareAIGuessWithSlider(participantData);
const aiSliderMatchSummary = summarizeAIGuessSliderSideMatch(participantData);


    return (
        <div className='max-w-6xl mx-auto p-6 space-y-8'>
            {/* Header */}
            <div className='header border10'>
                <h1 className='text-4xl font-bold m-4 text-center'>Finalisierung & Ergebnisse</h1>
            </div>

                       <section className='sectionBorder'>
                <h2 className='text-2xl font-semibold'>Nutzendenwege</h2>
                <p className='text-lg mt-4'>
                    Die Skala zur Entscheidungserfassung wurde so gestaltet, dass sie keine exakten Prozentzahlen oder mathematischen Begriffe wie Z-Wert erfordert. Stattdessen wird sie durch Begriffe wie{' '}
                    <strong>&quot;Tendenzwert&quot;</strong>, <strong>&quot;Entscheidungspunkt&quot;</strong> oder <strong>&quot;Assistenzpunkt&quot;</strong> ersetzt. Durch die klare farbliche Orientierung
                    (z. B. blau/orange) und dynamische Anzeige (z. B. Text-Feedback: &quot;unsicher&quot; bis &quot;sehr sicher&quot;) wird ein kontinuierliches, aber verständliches Feedback ermöglicht. Ränder
                    und harte Schwellenwerte wurden bewusst vermieden, um Nutzer*innen nicht unter Druck zu setzen.
                </p>
            </section>
<section style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px', maxWidth: '600px', margin: '1rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Erklärung zur Signalentdeckungstheorie (SDT) - Orange als Basis
      </h2>
      <p>
        In diesem Experiment gilt <strong>Orange als Basis (Nicht-Signal)</strong>, während <strong>Blau als Signal</strong> definiert ist.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
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
            <td style={{ border: '1px solid #ccc', padding: '0.5rem', color: 'green' }}>Correct Rejection ✅</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Richtig erkannt, dass kein Signal vorliegt.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Orange (&lt; 50)</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>&gt; 0 (Blau)</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem', color: 'orange' }}>False Alarm ⚠️</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Fälschlicherweise Signal erkannt.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Blau (≥ 50)</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>&gt; 0 (Blau)</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem', color: 'green' }}>Hit ✅</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Signal korrekt erkannt.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Blau (≥ 50)</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>≤ 0 (Orange)</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem', color: 'red' }}>Miss ❌</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Signal wurde nicht erkannt.</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Legende:</strong><br />
        <span style={{ color: 'green' }}>✅ Richtig</span>, <span style={{ color: 'orange' }}>⚠️ Fehler (False Alarm)</span>, <span style={{ color: 'red' }}>❌ Fehler (Miss)</span>
      </p>
    </section>
            <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Signal Detection Summary by Participant</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(participantData).map(([participantId, trials]: [string, any[]]) => {
          const result = computeSDTfromTrials(trials);
          return (
            <div key={participantId} className="bg-white shadow-md rounded-2xl p-5">
              <h2 className="text-xl font-semibold mb-3">{participantId}</h2>
              <SDTResults results={result} />
            </div>
          );
        })}
      </div>
    </div>

            <section className="sectionBorder">
  <h2 className="text-2xl font-semibold">Übereinstimmung: Menschliche Einschätzung vs. KI</h2>
  <ul className="list-disc list-inside mt-4 space-y-2">
    {Object.entries(aiSliderMatchSummary).map(([participant, stats], index) => (
      <li key={participant}>
        <strong>tN{index + 1}:</strong>{' '}
        {stats.totalComparisons > 0
          ? `${stats.matches}x Match (${stats.matchPercentage}%) / ${stats.mismatches}x Unterschied`
          : 'Keine Daten'}
      </li>
    ))}
  </ul>
</section>


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


<section className="sectionBorder">
  <h2 className="text-2xl font-semibold">Genauigkeit pro Teilnehmer</h2>
  <ul className="list-disc list-inside space-y-3">
    {Object.entries(accuracyResults2).map(([participant, result]) => (
      <li key={participant}>
        <strong>{participant}</strong><br />
        🎯 <u>Mit KI:</u> {result.buttonComparison.correct} ✅ / {result.buttonComparison.incorrect} ❌ ({result.buttonComparison.accuracyPercentage}% richtig)<br />
        🟦 <u>Ohne KI in Mainphase:</u> {result.sliderWhenButtonExists.correct} ✅ / {result.sliderWhenButtonExists.incorrect} ❌ ({result.sliderWhenButtonExists.accuracyPercentage}% richtig)<br />
        🟡 <u>Testphase:</u> {result.sliderOnlyTrials.correct} ✅ / {result.sliderOnlyTrials.incorrect} ❌ ({result.sliderOnlyTrials.accuracyPercentage}% richtig)
      </li>
    ))}
  </ul>
</section>

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

            <section className="sectionBorder">
  <h2 className="text-2xl font-semibold">Zeitdifferenzen zwischen Index 0 und 199</h2>
  <ul className="list-disc list-inside mt-2">
    {Object.entries(timeDifference).map(([_, diff], index) => (
      <li key={index}>
        <strong>{`tN${index + 1}`}</strong>: {' '}
        {diff !== null
          ? `${(diff / (1000 * 60)).toFixed(2)} Minuten`
          : 'Keine Daten vorhanden'}
      </li>
    ))}
  </ul>
</section>


<section className="sectionBorder">
  <h2 className="text-2xl font-semibold">Erklärung: Vergleich Mensch vs. Button</h2>
  <p className="text-lg mt-2">
    In dieser Auswertung wird geprüft, wie gut die eigene Einschätzung (über den <strong>Schieberegler</strong>) mit der Entscheidung nach Hilfe (über den <strong>Button</strong>) übereinstimmt.
  </p>
  <p className="text-lg mt-4">
    Dabei gilt:
    <ul className="list-disc list-inside mt-2 text-base">
      <li>
        <strong>Slider-Wert &gt; 0</strong> bedeutet: erwarteter Button ist <strong>blau</strong>
      </li>
      <li>
        <strong>Slider-Wert &lt; 0</strong> bedeutet: erwarteter Button ist <strong>orange</strong>
      </li>
      <li>
        Wenn der gedrückte Button mit dem erwarteten übereinstimmt, zählt es als <strong>Übereinstimmung (Match)</strong>
      </li>
    </ul>
  </p>
  <p className="text-lg mt-4">
    Die berechneten Werte zeigen an, wie häufig diese Übereinstimmungen auftreten – sowohl insgesamt als auch pro Teilnehmer:in.
  </p>
</section>




<section className="sectionBorder">
  <h2 className="text-2xl font-semibold">Umentschieden?</h2>
  <p className="text-lg mt-2">
    <strong>Gesamt:</strong><br />
    Vergleiche: {comparisonResult2.overall.totalComparisons}<br />
    Übereinstimmungen: {comparisonResult2.overall.matches}<br />
    Abweichungen: {comparisonResult2.overall.mismatches}<br />
    Übereinstimmungsrate: {comparisonResult2.overall.matchPercentage}%
  </p>

  <h3 className="text-xl font-semibold mt-6">Pro Teilnehmer</h3>
  <ul className="list-disc list-inside mt-2">
    {Object.entries(comparisonResult2.perParticipant).map(([participantId, stats]) => (
      <li key={participantId}>
        <strong>{participantId}</strong>: {stats.matchPercentage}% Übereinstimmung ({stats.matches}/{stats.comparisons})
      </li>
    ))}
  </ul>
</section>



            <div>Mittelwert: {meanTeam}</div>
            <div>Median: {medianTeam}</div>


            <ParticipantsResults />

            <AnimatedDataChart/>
            <AllParticipantsChart/>

            
<FinalScreensFlow />


           4 nicht bis zum ende gemacht

 


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
                <div className='grid grid-rows-3 md:grid-rows-2 gap-4'>
                    <FeedbackHintCard title=' ' color='orange'>
                        Mensch und KI nehmen das Bild parallel wahr – visuell bzw. algorithmisch. Nutzer:innen geben ihre Einschätzung direkt mittels Schieberegler ein. Gleichzeitig analysiert die KI das Bild
                        und liefert eine eigene Einschätzung. Im Onboarding wird erklärt, welche Bildmerkmale die KI nutzt und wie zuverlässig sie dabei ist.
                        <p className='font-bold'>→ Ziel: Erklärbarkeit des Systems schaffen.</p>
                    </FeedbackHintCard>
                    <FeedbackHintCard title=' ' color='yellow'>
                        Beide Einschätzungen werden an einem Ziel- oder Referenzwert gespiegelt. Die Nutzer:innen erfahren, was das Ziel der Entscheidungshilfe ist und wie die KI zu ihrem Vorschlag kommt.
                        Zusätzlich werden Genauigkeit und Sicherheit der KI sowie Sensitivität und Sicherheit des Menschen pro Trial dargestellt.
                        <p className='font-bold'>→ Ziel: Aufbau eines mentalen Modells zur Verlässlichkeit beider Quellen und Verständnis gegenüber verschiedenen Einschätzungen.</p>
                    </FeedbackHintCard>
                    <FeedbackHintCard title=' ' color='violet'>
                        Basierend auf beiden Einschätzungen wird eine kombinierte Empfehlung visualisiert (mittels gewichteter Kombination). Die finale Entscheidung liegt jedoch bei den Nutzer:innen. Die
                        Visualisierung des kombinierten Entscheidungspunkt (kumulierte Empfehlung) wird klar auf der Skala als Ergebnis der OW-Rechnung angegeben, das hilft den Workload möglichst gering halten.
                        Feedback zu ihrer Entscheidung unterstützen die Nutzer:innen eine realistische Vertrauenskalibrierung zu erfahren und stärkt zudem die Motivation.
                        <p className='font-bold'>→ Ziel: Transparente Unterstützung statt Vorgabe – Overtrust und Undertrust vermeiden.</p>
                    </FeedbackHintCard>
                </div>
            </section>


            <section className='sectionBorder'>
                <h2 className='text-2xl font-semibold'>Ergebnisse und Datenbewertung</h2>
                <div className='flex flex-row'>
                    <div>

                        <Image src={"/Figure_1.png"} width={500} height={500} alt={''}></Image>
                        <p className='imageSource'></p>
                    </div>
                    <div>
                        <Image src={"/Figure_2.png"} width={500} height={500} alt={''}></Image>
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



            {/* Back button */}
            <div className='flex justify-center'>
                <Button text='Zurück' onClick={() => router.push('/')} />
            </div>
        </div>
    );
};

export default DesignDecisionsPage4;
