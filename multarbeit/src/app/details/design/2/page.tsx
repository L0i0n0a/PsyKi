'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Image from 'next/image';
import BiColor from '@/components/canvas/BiColor';

const DesignDecisionsPage2: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [stepD, setStepD] = useState(0);

  // --- Instruction Steps ---
  const instructionSteps = [
    {
      title: 'Herzlich Willkommen zu unserer Studie!',
      content: (
        <>
          <p className='mb-4'>In dieser Studie sehen Sie in jedem Durchgang ein Bild mit Farbpunkten.</p>
          <p className='mb-4'>
            Ihre Aufgabe ist es zu entscheiden, ob mehr <span className='text-orange-500 font-semibold'>orange</span> oder mehr <span className='text-blue-500 font-semibold'>blaue</span> Punkte
            enthalten sind.
          </p>
          <p className='mb-4'>
            In dieser ersten Phase (ca. 20 Bilder) machen Sie sich mit der Aufgabe vertraut. Gleichzeitig ermitteln wir anhand Ihrer Entscheidungen, wie gut Sie Muster erkennen können – also Ihre
            individuelle <strong>Sensitivität</strong>.
          </p>
          <p className='mb-6'>Entscheiden Sie einfach so, wie Sie es für richtig halten.</p>
        </>
      ),
    },
    {
      title: 'Instruktion vor der Hauptphase (mit Entscheidungsassistenz)',
      content: (
        <>
          <p className='mb-4'>
            <strong>Start der Hauptphase – Unterstützung durch ein Assistenzsystem</strong>
            <br />
            Ab jetzt erhalten Sie zusätzlich zu Ihrer eigenen Einschätzung eine Entscheidungshilfe durch ein automatisiertes System. Dieses analysiert dieselben Bilder wie Sie und gibt seine
            Einschätzung ab.
          </p>
          <p className='mb-4'>
            Um beide Informationen zu nutzen, können Sie das sogenannte <strong>Entscheidungskriterium 𝑍</strong> verwenden. Dieses kombiniert Ihre Einschätzung und die der Hilfe – gewichtet nach
            Ihrer Zuverlässigkeit.
          </p>
          <p className='mb-4'>
            Ihre Einschätzung und die des Systems gehen also anteilig in die Entscheidung ein. Je nachdem, wie zuverlässig jede Quelle ist, wird sie stärker oder schwächer gewichtet.
          </p>
          <p className='mb-6'>
            💡 <strong>Hinweis:</strong> Die automatisierte Hilfe hat eine durchschnittliche Genauigkeit von <strong>93 %</strong>, und Ihre eigene Gewichtung wurde auf Basis Ihrer Leistung in der
            Testphase berechnet.
          </p>
          <p className='mb-6'>
            Sie können frei entscheiden, ob und wie stark Sie das System nutzen möchten – unser Ziel ist es nur, transparent zu machen, wie man aus beiden Einschätzungen eine fundierte Entscheidung
            ableiten könnte.
          </p>
        </>
      ),
    },
    {
      title: 'Kurzer Erinnerungshinweis auf Z vor jedem Hauptblock',
      content: (
        <>
          <p className='mb-4'>Denken Sie daran: Ihre Entscheidung kann auf Basis einer Kombination aus Ihrer Einschätzung und der automatisierten Hilfe getroffen werden.</p>
          <p className='mb-4'>Die Z-Anzeige hilft Ihnen dabei einzuschätzen, wie stark die kombinierte Evidenz in Richtung „Orange“ oder „Blau“ spricht.</p>
        </>
      ),
    },
    {
      title: 'Feedback (Blockweise)',
      content: (
        <>
          <p className='mb-4'>Nach jedem Block (zB. 10 Bilder): Rückmeldung zu eigener Leistung und zur Teamleistung</p>
          <p className='mb-2'>
            <strong>Beispiele: </strong>
          </p>
          <p className='mb-4'>
            „In den letzten 10 Bildern lag Ihre eigene Entscheidung in 70% der Fälle richtig.“ „Wenn Sie den Z-Wert berücksichtigt haben, wäre die korrekte Entscheidung in 86% der Fälle getroffen
            worden.“
          </p>
          <p className='mb-4'>Optional: ein Hinweis, ob die automatische Hilfe in den letzten Bildern häufiger richtig lag als der Teilnehmende.</p>
          <p className='mb-2'>
            <strong>Aufmerksamkeitsintervention:</strong>
          </p>
          <p className='mb-4'>Kurze Reminder: „Achten Sie auf die Gewichtung, nicht alle Hinweise sind gleich zuverlässig.“</p>
        </>
      ),
    },
  ];

  // --- Decision Help Steps ---
  const decisionHelpSteps = [
    {
      title: 'Z-Kriterium als Skala anzeigen',
      content: (
        <>
          <Image src='/scale-scribble.png' width={400} height={400} alt='Beispielhafte Skala-Auswertung' className='my-6 mx-auto max-w-sm rounded shadow' />
          <p className='mb-4'>Für die Eingabe der Entscheidung und für die Ausgabe als Entscheidungshilfe.</p>
          <p className='mb-4'>
            <strong>Offene Fragen:</strong>
          </p>
          <p className='mb-4'>Wie können wir die Einschätzung des KI-System auf der Z-Skala realistisch variieren lassen?</p>
          <p className='mb-6'>Was machen wir wenn die Antworten sehr mittig (unsicher) sind?</p>
        </>
      ),
    },
    {
      title: 'Entscheidungskombination visualisieren',
      content: (
        <>
          <p className='mb-4'>
            <strong>Textuell:</strong>
          </p>
          <p className='mb-4'>
            Ihre Einschätzung: 40% Einfluss <br />
            Automatisierte Hilfe: 60% Einfluss
          </p>
          <p className='mb-4'>
            <strong>Visuell:</strong>
          </p>
          <Image src='/combined-scribble.png' alt='Beispielhafte Kombinations-Darstellung' className='my-6 mx-auto max-w-sm rounded shadow' width={400} height={400} />
          <p className='mb-4'>2 Ströme von Mensch und KI, die unterschiedlich dick sind und zu Z-Wert konvergieren</p>
        </>
      ),
    },
    {
      title: 'Optionaler Tooltip oder Klickfeld',
      content: (
        <>
          <p className='mb-4'>Wie setzt sich die Auswertung zusammen? - Kurze Information zum mathematischen Prinzip, auf Wunsch ausklappbar.</p>
          <p className='mb-4'>
            <strong>Potentielle Information:</strong> Anhand Ihrer Sensitivität (Genauigkeit) wurde Ihre Einschätzung mit einem Gewicht von 0.4, die der Hilfe mit 0.6 berücksichtigt. Beide
            Evidenzwerte wurden auf einer Z-Skala kombiniert.
          </p>
        </>
      ),
    },
  ];

  // --- Step Navigation ---
  const isLastStep = step === instructionSteps.length - 1;
  const isFirstStep = step === 0;
  const isLastStepD = stepD === decisionHelpSteps.length - 1;
  const isFirstStepD = stepD === 0;

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      {/* Header */}
      <div className='header border10'>
        <h1 className='text-4xl font-bold m-4 text-center'>Prototyp-Entwurf & Userflows</h1>
      </div>

      {/* Target audience */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Zielgruppe</h2>
        <h2 className='text-2xl mb-4'>Welche Zielgruppe soll die Anwendung testen und evaluieren?</h2>
        <div>
          <p className='mt-6 text-lg'>Zentrale Anforderungen:</p>
          <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
            <li>
              <strong>Sprache:</strong> Gute Deutschkenntnisse oder Englisch-Kenntnisse (Verständnis der Anweisungen & Feedbacktexte)
            </li>
            <li>
              <strong>ATI-Score:</strong> {'>= 3'}
            </li>
            <li>Vertraut mit interaktiven Anwendungen, Web-UIs, Slidern</li>
            <li>Normales oder korrigiertes Sehvermögen (Farbunterscheidung Blau–Orange muss gewährleistet sein)</li>
            <li>Bereitschaft, sich auf strukturierte Entscheidungsaufgaben einzulassen</li>
            <li>Geübter im Umgang mit Entscheidungen unter Unsicherheit</li>
          </ul>
        </div>
      </section>

      {/* User flows */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>User Flows</h2>
        <h2 className='text-2xl mb-4'>Wie navigieren Nutzende durch die Anwendung?</h2>
        <div className='sectionBased'>
          <div>
            <p className='mt-6 text-lg'>Erklärung durch den Userflow:</p>
            <ul className='ml-6 list-decimal mt-2 space-y-1'>
              <li className='textColourGreen font-bold'>Einführungstext</li>
              <li className='textColourGreen font-bold'>Testphase (20 Bilder)</li>
              <ul className='list-disc pl-6 mt-1 space-y-1'>
                <li>Entscheidung auf Z-Skala angeben (von “sehr sicher blau” bis “sehr sicher orange” - z.B. mit Schieberegler von -3 bis +3)</li>
                <li>Feedback alle 5 oder 10 Bilder? (zu …% richtig)</li>
                <li>Feedback zum Abschluss der Phase (Sensitivität / Genauigkeit)</li>
              </ul>
              <li className='textColourGreen font-bold'>Instruktionstext vor der Hauptphase</li>
              <li className='textColourGreen font-bold'>Hauptphase (50 Bilder)</li>
              <ul className='list-disc pl-6 mt-1 space-y-1'>
                <li>Entscheidung auf Z-Skala angeben</li>
                <li>Kumulierter Z-Wert auf Skala als Entscheidungshilfe</li>
                <li>Anzeige, wie sehr Entscheidung Mensch & KI jeweils eingeflossen sind</li>
                <li>Optional ausklappbare Infos, wie die Berechnung vorgenommen wurde</li>
                <li>Bestätigungsfeld mit Antwortempfehlung annehmen?</li>
              </ul>
              <li className='textColourGreen font-bold'>Abschluss</li>
              <ul className='list-disc pl-6 mt-1 space-y-1'>
                <li>Selbstreflexion des Menschen (Welche Strategie genutzt? / Wie sehr OW-Strategie genutzt?)</li>
                <li>Ergebnisse zeigen (optional im Vergleich zur Testphase / zu Entscheidung Mensch vor KI-Hilfe / zu KI ohne Mensch)</li>
              </ul>
            </ul>
          </div>
          <div>
            <Image src='/user-flows.svg' height={400} width={400} alt='' />
            <p className='imageSourceText text-center'>Inkscape</p>
          </div>
        </div>
      </section>

      {/* Textual explanations for the prototype */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold mb-4'>Textuelle Erklärungen für den Prototypen</h2>
        <div className='h-auto bg-gradient-to-br from-blue-50 to-orange-100 flex items-center justify-center px-6'>
          <div className='w-full max-w-2xl m-8 bg-white shadow-lg rounded-xl p-8 text-gray-800'>
            <h1 className='text-2xl font-bold mb-4 text-center'>{instructionSteps[step].title}</h1>
            {instructionSteps[step].content}
            <div className='flex justify-between mt-6'>
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={isFirstStep}
                className={`px-4 py-2 rounded-lg font-semibold transition ${isFirstStep ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-gray-200 text-white hover:bg-gray-300'}`}>
                Zurück
              </button>
              <button onClick={() => setStep((s) => Math.min(instructionSteps.length - 1, s + 1))} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition'>
                {isLastStep ? 'Fertig' : 'Weiter'}
              </button>
            </div>
            <div className='mt-4 text-center text-sm text-gray-500'>
              Schritt {step + 1} von {instructionSteps.length}
            </div>
          </div>
        </div>
      </section>

      {/* Preliminary considerations for the prototype */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Vorüberlegungen zum Prototyp</h2>
        <h2 className='text-2xl mb-4'>Welchen Umfang soll der Prototyp haben?</h2>
        <div className='flex lg:flex-row gap-6'>
          <div className='w-3/6'>
            <p className='mt-6 text-lg'>Anzahl der Tests</p>
            <ul className='ml-6 list-disc list-inside mt-2 mb-6 space-y-1'>
              <li>Teilnehmende sollen keine Überforderung, zu hohen Workload oder Langeweile empfinden</li>
              <li>Die OW-Strategie soll bestmöglich unterstützt und umgesetzt werden</li>
              <li className='textColourGreen font-bold'>Testphase: 20 Bilder</li>
              <li className='textColourGreen font-bold'>Hauptphase: 50 Bilder</li>
            </ul>
          </div>
          <div className='w-3/6'>
            <p className='mt-6 text-lg'>Anzahl der Erklärungen</p>
            <ul className='ml-6 list-disc list-inside mt-2 mb-6 space-y-1'>
              <li>Teilnehmende sollen sich keine endlosen Texte durchlesen müssen</li>
              <li>Erklärungen und Hilfestellungen sollen präzise verfasst sein</li>
              <li>Hilfestellungen können eigens bei Bedarf hinzugerufen werden</li>
              <li>Einleitungen zu den einzelnen Phasen</li>
            </ul>
          </div>
        </div>
        <h2 className='text-2xl mb-4'>Welche Komponenten sollen enthalten sein?</h2>
        <div className='flex lg:flex-row gap-6 mt-6'>
          {/* Left box */}
          <div className='flex-1 p-6 rounded-xl shadow-md bgLightGreen'>
            <h2 className='text-lg font-bold text-blue-700 mb-4 textColourGreen'>UI-Komponenten</h2>
            <ul className='list-disc list-inside space-y-1'>
              <li>Header Text mit Anweisung</li>
              <li>Bildanzeige</li>
              <li>Slider für Entscheidung (Blau ⟶ Orange)</li>
              <li>AI-Empfehlung Container (zeigt KI-Entscheidung)</li>
              <li>Finale Entscheidung (2 Buttons: Orange / Blau)</li>
              <li>Text-Container für Erklärung</li>
              <li>Fortschrittsbalken</li>
              <li>
                Feedback-Komponente:
                <ul className='list-disc list-inside ml-4 space-y-1 mt-1'>
                  <li>als neue Seite alle 10 Bilder im Haupt-Test</li>
                  <li>als Pop-up oder Box auf gleicher Seite im Pre-Test</li>
                  <li>
                    <code>Weiter</code>-Button bei Feedbackseite
                  </li>
                </ul>
              </li>
              <li>Info- oder Hilfe-Button (zeigt State + Erklärung)</li>
            </ul>
            <h2 className='text-lg font-bold text-blue-700 mt-6 mb-2 textColourGreen'>Interaktions-Logik</h2>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                <code>Senden</code>-Button bei Slider-Entscheidung
              </li>
              <li>
                Kein <code>Senden</code>-Button bei Button-Auswahl (Orange/Blau)
              </li>
            </ul>
          </div>
          {/* Right box */}
          <div className='flex-1 bgLightGreen p-6 rounded-xl shadow-md'>
            <h2 className='text-lg font-bold textColourGreen mb-4'>State Management</h2>
            <ul className='list-disc list-inside space-y-1'>
              <li>Aktuelle Phase (Pre-Test, Haupttest)</li>
              <li>Was wurde angeklickt</li>
              <li>Sensitivität User</li>
              <li>Sensitivität KI</li>
              <li>Trial-Nummer</li>
              <li>
                <code>showInfo</code> (Info/Hilfe sichtbar)
              </li>
              <li>
                <code>showFeedback</code> (sichtbar alle 10 Trials)
              </li>
            </ul>
            <h2 className='text-lg font-bold textColourGreen mt-6 mb-2'>Entscheidungs-Speicher (Planung)</h2>
            <ul className='list-disc list-inside space-y-1'>
              <li>Bild</li>
              <li>Entscheidung der KI</li>
              <li>Entscheidung des Users</li>
              <li>Finale Entscheidung</li>
            </ul>
          </div>
        </div>
        <h2 className='text-2xl mt-6'>Wie bekommen Nutzende Feedback?</h2>
        <div>
          <p className='mt-2 text-lg textColourGreen'>Feedback nach jedem Block (z.B. 10 Bilder)</p>
          <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
            <li>
              <strong>Ideen:</strong> Nach jedem Trial, <strong>nach jedem Block</strong>, nur am Ende
            </li>
            <li>
              <strong>Vorteil:</strong> verhindert, dass Teilnehmende sich zu stark am Feedback orientieren
            </li>
            <li>
              <strong>Vorteil:</strong> erhält realistischeres Entscheidungsverhalten
            </li>
            <li>
              <strong>Nachteil:</strong> späteres Feedback kann Unsicherheit auslösen
            </li>
          </ul>
        </div>
        <h2 className='text-2xl mt-6'>Wie lassen wir die Reflexion einfließen?</h2>
        <div>
          <p className='mt-2 text-lg textColourGreen'>Ergebnisse</p>
          <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
            <li>Wie gut hat der Nutzende im Hauptteil abgeschnitten?</li>
            <li>Wie gut hat der Nutzende im Vergleich zur Testphase abgeschnitten?</li>
            <li>Wie gut hat der Nutzende im Vergleich zur KI alleine abgeschnitten?</li>
          </ul>
          <p className='mt-6 text-lg textColourGreen'>Selbstreflexion</p>
          <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
            <li>Wie sehr haben Sie versucht beide Quellen zu berücksichtigen?</li>
            <li>Wie denken Sie, haben Sie das Optimal Weighting Modell angewendet?</li>
            <li>Wie sehr haben Sie auf eine konkrete Strategie bei der Beantwortung geachtet?</li>
          </ul>
        </div>
      </section>

      {/* Decision support */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold mb-4'>Gestaltung der Entscheidungshilfe</h2>
        <div className='h-auto bg-gradient-to-br from-blue-50 to-orange-100 flex items-center justify-center px-6'>
          <div className='w-full max-w-2xl m-8 bg-white shadow-lg rounded-xl p-8 text-gray-800'>
            <h1 className='text-2xl font-bold mb-4 text-center'>{decisionHelpSteps[stepD].title}</h1>
            {decisionHelpSteps[stepD].content}
            <div className='flex justify-between mt-6'>
              <button
                onClick={() => setStepD((s) => Math.max(0, s - 1))}
                disabled={isFirstStepD}
                className={`px-4 py-2 rounded-lg font-semibold transition ${isFirstStepD ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-gray-200 text-white hover:bg-gray-300'}`}>
                Zurück
              </button>
              <button onClick={() => setStepD((s) => Math.min(decisionHelpSteps.length - 1, s + 1))} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition'>
                {isLastStepD ? 'Fertig' : 'Weiter'}
              </button>
            </div>
            <div className='mt-4 text-center text-sm text-gray-500'>
              Schritt {stepD + 1} von {decisionHelpSteps.length}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation considerations */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Umsetzungsüberlegungen für die Anwendung</h2>
        <h2 className='text-2xl mb-4'>Wie können die Bilder erstellt werden?</h2>
        <BiColor percentage={0.5} index={1} />
        <h2 className='text-2xl mb-4'>Welche Formeln des OW-Modell sind wo einzusetzen?</h2>
        <div className='space-y-8 mt-6'>
          {/* Human sensitivity */}
          <section className='p-6 bg-[#74b3ce] rounded-xl shadow-md text-white'>
            <h2 className='text-xl font-bold mb-2'>Sensitivität des Menschen</h2>
            <p className='mb-2'>
              Wird während der <strong>Testdurchgänge</strong> berechnet und in der <strong>Hauptphase</strong> weiter fortlaufend angepasst.
            </p>
            <code className='bg-white/10 px-2 py-1 rounded-md'>Formel: d’ = z(Hit rate) - z (False - Alarm Rate)</code>
          </section>
          {/* Sensitivity machine */}
          <section className='p-6 bg-[#508991] rounded-xl shadow-md text-white'>
            <h2 className='text-xl font-bold mb-2'>Sensitivität der KI</h2>
            <p className='mb-2'>Ist anfangs festgelegt und für jedes Bild gilt:</p>
            <code className='bg-white/10 px-2 py-1 rounded-md'>Trefferrate = 0.93 → Falschalarmrate = 1 – 0.93 = 0.07</code>
          </section>
          {/* Decision criterion */}
          <section className='p-6 bg-[#004346] rounded-xl shadow-md text-white'>
            <h2 className='text-xl font-bold mb-4'>Entscheidungskriterium</h2>
            <p className='mb-2'>Gewichtung zwischen menschlicher und künstlicher Einschätzung:</p>
            <div className='bg-white/10 p-4 rounded-lg text-sm font-mono'>
              Entscheidung = α<sub>mensch</sub> · X<sub>mensch</sub> + α<sub>maschine</sub> · X<sub>maschine</sub>
            </div>
            <p className='mt-2 italic text-sm'>→ Liefert Tendenz: Orange oder Blau für jeden Durchgang</p>
          </section>
          {/* Overall sensitivity */}
          <section className='p-6 bg-[#172a3a] rounded-xl shadow-md text-white'>
            <h2 className='text-xl font-bold mb-4'>Gesamtsensitivität (aus Mensch und KI)</h2>
            <p className='mb-2'>Am Ende der Hauptphase berechnet:</p>
            <div className='bg-white/10 p-4 rounded-lg text-sm font-mono'>
              d&apos;<sub>OW</sub> = √(d&apos;<sub>operator²</sub> + d&apos;<sub>aid²</sub>)
            </div>
          </section>
        </div>
      </section>

      {/* Back button */}
      <div className='flex justify-center'>
        <Button text='Zurück' onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default DesignDecisionsPage2;
