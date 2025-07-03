"use client"
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import BiColor from "@/components/canvas/BiColor";
import Image from "next/image";
import FeedbackHintCard from "@/components/layout/FeedbackHintCard";


const DesignDecisionsPage3 = () => {
  const router = useRouter();

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      <div className='header border10'>
        <h1 className='text-4xl font-bold m-4 text-center'>Wissenschaftskommunikation & Feedback</h1>
      </div>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Rückblick OW-Modell</h2>
                <h2 className="text-2xl mb-4">Wie funktioniert das Modell?</h2>
                <div>
                    <p className="mt-6 text-lg">Es beschreibt, wie ein Mensch oder ein System die Hinweise eines menschlichen Entscheiders und eines automatisierten Hilfsmittels optimal kombiniert, um die bestmögliche Entscheidung zu treffen.</p>
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <Image src="/ow1.png" alt="" width={500} height={300} />
                            <p className="imageSourcetext text-center"> Erklärung der Entscheidungsfindung</p>
                        </div>
                        
                        <div>
                            <Image src="/ow3.png" alt="" width={500} height={300} />
                            <p className="imageSourcetext text-center">Beispiel der Referenzwert-Darstellung</p>
                        </div>
                        
                    </div>
                    
                </div>
            </section>

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Ablauf in der Anwendung</h2>
        <h2 className='text-2xl mb-4'>Wie durchlaufen Nutzende die Anwendung?</h2>
        {/* Einführung */}
        <div className='mb-6'>
          <h4 className='text-lg font-semibold mt-4'>1. Einführung</h4>
          <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
            <li>Erklärung des Ablaufs und der Aufgabe</li>
            <li>Ziel: Grundlage &amp; Verständnis schaffen</li>
          </ul>
        </div>

        {/* Testphase */}
        <div className='mb-6'>
          <h4 className='text-lg font-semibold mt-4'>2. Testphase</h4>
          <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
            <li>Ermittlung der Sensitivität des Menschen und Feedback nach jeder Entscheidung</li>
            <li>
              Mensch soll sich verbessern:
              <ul className='list-disc list-inside ml-4 mt-1'>
                <li>an den Entscheidungsprozess gewöhnen</li>
                <li>Sensitivität erhalten</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Hauptphase */}
        <div className='mb-6'>
          <h4 className='text-lg font-semibold mt-4'>3. Hauptphase</h4>
          <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
            <li>Einführung inkl. Erklärung der Strategie</li>
            <li>
              Struktur:
              <ul className='list-disc list-inside ml-4 mt-1'>
                <li>Entscheidungsblöcke</li>
                <li>Feedback zwischendurch</li>
              </ul>
            </li>
            <li>
              Ziele:
              <ul className='list-disc list-inside ml-4 mt-1'>
                <li>Compliance verstärken</li>
                <li>Motivation hochhalten</li>
                <li>Monotonie verhindern</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Abschluss */}
        <div className='mb-6'>
          <h4 className='text-lg font-semibold mt-4'>4. Abschluss</h4>
          <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
            <li>
              Ergebnisse:
              <ul className='list-disc list-inside ml-4 mt-1'>
                <li>Genauigkeit mit KI</li>
                <li>Vergleich zur Testphase</li>
                <li>Häufigkeit der übernommenen Empfehlungen</li>
              </ul>
            </li>
            <li>Ziel: Feedback geben</li>
          </ul>
        </div>
      </section>

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Gestaltung der Anwendung</h2>
        <h2 className='text-2xl mb-4'>Wie ist die Anwendung gestaltet, um die Strategie zu fördern?</h2>
        <div>
          <p className='mt-6 text-lg'>Zentrale Anforderungen:</p>
          <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
            <li>
              <strong>Schlicht:</strong> Farbliche Gestaltung minimal gehalten, um Biases vorzubeugen
            </li>
            <li>
              <strong>Übersichtlich:</strong> Cognitive Load gering halten{' '}
            </li>
            <li>
              <strong>Gebrauchtstauglich:</strong> einfaches und verständliches Layout
            </li>
            <li>
              <strong>Progress:</strong> Eine Fortschrittsanzeige hilft den Nutzenden den aktuellen Zustand der Anwendung zu verstehen
            </li>
          </ul>
        </div>
      </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Integrated Information Processing Modell</h2>
                <h2 className="text-2xl mb-4">Welche theoretische Grundlage beinhaltet die Anwendung, um die Strategie verständlich zu machen?</h2>
                <div>
                    <Image className="imageCenter" src="/iip.png" alt="IIP-Modell" width={500} height={400} ></Image>
                    <p className="imageSourcetext text-center">Schrills, 2025</p>
                    <p className="text-xl p-4 ">
                        Das Integrated Information Processing (IIP) Modell beschreibt, wie Mensch und KI sinnvoll zusammenwirken können, indem es drei zentrale Schnittstellen identifiziert, die wir systematisch berücksichtigen:
                    </p>
                    <div className="grid grid-rows-3 md:grid-rows-2 gap-4">
                       
                            <FeedbackHintCard title={"1. Input Function:"} color={"orange"}> Mensch und KI nehmen das Bild parallel wahr – visuell bzw. algorithmisch.
                                Nutzer:innen geben ihre Einschätzung direkt mittels Schieberegler ein. Gleichzeitig analysiert die KI das Bild und liefert
                                eine eigene Einschätzung. Im Onboarding wird erklärt, welche Bildmerkmale die KI nutzt und wie zuverlässig sie dabei ist.
                                <p className="font-bold">→ Ziel: Erklärbarkeit des Systems schaffen.</p>
                            </FeedbackHintCard>
                      
                            <FeedbackHintCard title={"2. Goal / Reference:"} color={"yellow"}> Beide Einschätzungen werden an einem Ziel- oder Referenzwert gespiegelt. Die Nutzer:innen erfahren,
                                was das Ziel der Entscheidungshilfe ist und wie die KI zu ihrem Vorschlag kommt. Zusätzlich werden Genauigkeit und Sicherheit
                                der KI sowie Sensitivität und Sicherheit des Menschen pro Trial dargestellt.
                                <p className="font-bold">→ Ziel: Aufbau eines mentalen Modells zur Verlässlichkeit beider Quellen und Verständnis gegenüber verschiedenen Einschätzungen.</p>
                            </FeedbackHintCard>
                        
                            <FeedbackHintCard title={"3. Output Function:"} color={"violet"}> Basierend auf beiden Einschätzungen wird eine kombinierte Empfehlung visualisiert
                                (mittels gewichteter Kombination). Die finale Entscheidung liegt jedoch bei den Nutzer:innen. Die Visualisierung des kombinierten Entscheidungspunkt (kumulierte Empfehlung) wird klar auf der Skala als Ergebnis der OW-Rechnung angegeben, das hilft den Workload möglichst gering halten. Feedback zu ihrer Entscheidung
                                unterstützen die Nutzer:innen eine realistische Vertrauenskalibrierung zu erfahren und stärkt zudem die Motivation.
                                <p className="font-bold">→ Ziel: Transparente Unterstützung statt Vorgabe – Overtrust und Undertrust vermeiden.</p>
                            </FeedbackHintCard>
                       </div>
                </div>
            </section>

      {/* Hinweise zur Skala */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Skalengestaltung & Einordnung</h2>
        <p className='text-lg mt-4'>
          Die Skala zur Entscheidungserfassung wurde so gestaltet, dass sie keine exakten Prozentzahlen oder mathematischen Begriffe wie Z-Wert erfordert. Stattdessen wird sie durch Begriffe wie{' '}
          <strong>&quot;Tendenzwert&quot;</strong>, <strong>&quot;Entscheidungspunkt&quot;</strong> oder <strong>&quot;Assistenzpunkt&quot;</strong> ersetzt. Durch die klare farbliche Orientierung
          (z. B. blau/orange) und dynamische Anzeige (z. B. Text-Feedback: &quot;unsicher&quot; bis &quot;sehr sicher&quot;) wird ein kontinuierliches, aber verständliches Feedback ermöglicht. Ränder
          und harte Schwellenwerte wurden bewusst vermieden, um Nutzer*innen nicht unter Druck zu setzen.
        </p>
        <p className='text-lg mt-4'>
          Die Konfidenz ergibt sich nicht aus einem Zahlenwert, sondern aus der wahrgenommenen Tendenz. Die Nutzer*innen müssen sich also festlegen, aber nicht mathematisch begründen – das stärkt
          sowohl das mentale Modell als auch die Akzeptanz.
        </p>
      </section>

      {/* Hinweis zur Analyse-Logik */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Mentales Modell & Systemverhalten</h2>
        <p className='text-lg mt-4'>
          Die Anwendung unterscheidet klar zwischen dem, was analysiert wird (z. B. einzelne Entscheidungen), wie die Vorschläge entstehen (z. B. aus gewichteter Kombination) und wie diese dargestellt
          werden (z. B. durch farbige Tendenzen). Die Formulierung &quot;Das Assistenzsystem empfiehlt...&quot; wird vermieden, um keinen Eindruck einer verpflichtenden Vorgabe zu erzeugen.
          Stattdessen wird lediglich ein <strong>Vorschlagspunkt</strong> visualisiert, der durch Mensch & KI gemeinsam entstanden ist.
        </p>
        <p className='text-lg mt-4'>
          Durch die Einführung klar getrennter Knotenpunkte (z. B. Feedback zur Nutzung, zur Entscheidung, zur Analyse) wird ein kohärentes mentales Modell aufgebaut. So wissen Nutzende stets, auf
          welche Ebene sich die aktuelle Rückmeldung bezieht.
        </p>
      </section>

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Entscheidungskala</h2>
        <h3 className='text-xl mb-4'>Wie können Nutzende Entscheidungen innerhalb der Anwendung treffen?</h3>
        <div>
          <Image className="imageCenter" src='/decisionskala.png' alt='Entscheidungskala' width={400} height={400} />
          <p className='mt-6 text-lg'>
            <strong>Z-Skala als Schieberegler: </strong>
            Die Antwortskala basiert auf der Z-Skala und ist als intuitiver Schieberegler umgesetzt. Nutzende müssen eine klare Antwort geben, die zumindest eher orange oder blau ist. So werden
            &quot;keine Ahnung&quot;-Entscheidungen vermieden. Dadurch wird die subjektive Sicherheit der Nutzer*innen in ihre Entscheidung einbezogen (Typ-2-Entscheidung).
            <br />
            <em>Ziel:</em> Kognitive Belastung reduzieren.
          </p>
          <p className='mt-4 text-lg'>
            Der Z-Wert wird in der Anwendung durch verständliche Begriffe wie <strong>Tendenzwert</strong> oder <strong>Entscheidungspunkt</strong> ersetzt, um keine statistischen Kenntnisse
            vorauszusetzen und Verständnisprobleme zu vermeiden.
          </p>
        </div>
      </section>

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Entscheidungshilfe</h2>
        <h3 className='text-xl mb-4'>Wie können Nutzende bei Entscheidungen innerhalb der Anwendung unterstützt werden?</h3>
        <div>
            <Image className="imageCenter" src='/zscore.png' alt='Entscheidungshilfe Visualisierung' width={300} height={300} />
          <p className='mt-6 text-lg'>
            <strong>Zielgerichtete Visualisierung:</strong>
            Durch grafische Darstellung wird nachvollziehbar, wie die Entscheidungen von Mensch und KI gemeinsam zum finalen Z-Wert führen. Diese Darstellung verbessert die Verständlichkeit und
            reduziert die kognitive Belastung.
          </p>
          <p className='mt-4 text-lg'>
            <strong>Ergebnis:</strong>
            Unterstützte Entscheidungsfindung (Aided Decision Making) – transparent, effizient und nutzerzentriert.
          </p>
          <p className='mt-4 text-lg'>
            Der kumulierte Score wird durch einen verständlichen Namen ersetzt, z. B. <em>kombinierte Entscheidung aus Mensch und KI</em> oder <em>Gesamtwert aus Mensch und KI</em>. Dies erleichtert
            die Zuordnung und erklärt, dass die bestmögliche Entscheidung durch die Kombination von Mensch und KI entsteht.
          </p>
        </div>
      </section>

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Erklärungstexte</h2>
        <h3 className='text-xl mb-4'>Wie können Nutzende dazu animiert werden, die OW-Strategie zu verfolgen?</h3>
        <div>
          <p className='mt-6 text-lg'>
            <strong>Systemerklärung zur Nutzerunterstützung:</strong>
            Eine verständliche Einführung erklärt die Strategie des Systems und die Optimal Weighting (OW) Strategie. Weiterführende Erklärungen schaffen Verständnis und Transparenz für die
            Entscheidungshilfe. Das Ziel des Systems – die bestmögliche Entscheidung – wird klar kommuniziert. Zusätzlich gibt ein Einblick in den Algorithmus den Nutzenden Orientierung, worauf es bei
            ihren Entscheidungen ankommt und welche Auswirkungen einzelne Wertungen haben.
          </p>
          <p className='mt-6 text-lg'>
            <strong>Zentrale Fragen, die beantwortet werden:</strong>
          </p>
          <ul className='list-disc list-inside ml-6 text-lg space-y-1'>
            <li>Welche Informationen verarbeitet die Entscheidungshilfe?</li>
            <li>Was ist das Ziel? (→ bestmögliche Entscheidung)</li>
            <li>Wie funktioniert der zugrunde liegende Algorithmus?</li>
          </ul>
          <p className='mt-4 text-lg'>
            Diese Punkte helfen den Nutzenden, ein mentales Modell über das System aufzubauen. Zudem stärken klare Erklärungen die Nachvollziehbarkeit des Systems, fördern die Motivation, sich an die
            Strategie zu halten und z. B. die Entscheidungshilfe aktiv zu nutzen.
          </p>
        </div>
      </section>

      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Feedback</h2>
        <h2 className='text-2xl mb-4'>Wie können Nutzende ihre Entscheidungen einordnen und die bestmögliche Wahl treffen?</h2>
        <div>
          <p className='mt-6 mb-6 text-lg'>
            Das Feedback in der Anwendung dient dazu, Nutzenden eine klare Rückmeldung zu ihrer gesamten Entscheidungsperformance zu geben – nicht nur in Bezug auf die Entscheidungshilfe, sondern auch
            hinsichtlich der eigenen Einschätzungen. Es wird gezeigt, wie oft Entscheidungen richtig getroffen wurden und wie sich die Performance im Vergleich zu Szenarien ohne Nutzung der
            Unterstützung darstellt (Counterfactual). Eine Vertrauenskalibrierung hilft dabei, das eigene Vertrauen in die Entscheidungshilfe und die eigenen Urteile realistisch einzuschätzen und
            anzupassen. Transparente Erklärungen zu möglichen Fehlern des Systems fördern das Verständnis für die Grenzen der Unterstützung. Diese ganzheitliche Rückmeldung soll die Motivation zur
            Nutzung der Entscheidungshilfe stärken und zugleich das Bewusstsein für die eigene Entscheidungsqualität schärfen, um so insgesamt fundiertere und sicherere Entscheidungen zu ermöglichen.
          </p>

                    <h3 className="text-xl font-semibold mb-4">Feedback-Beispiele</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FeedbackHintCard title="Letzte 10 Entscheidungen" color={"green"}>
                            Du hast der Entscheidungshilfe in <strong>7</strong> Fällen vertraut – <strong>6</strong> davon waren korrekt.
                        </FeedbackHintCard>
                        <FeedbackHintCard title="Genauigkeit" color={"green"}>
                            Die Entscheidungshilfe lag bisher in <strong>… %</strong> der Fälle richtig.<br />
                            Deine eigene Genauigkeit liegt derzeit bei <strong>72 %</strong>.
                        </FeedbackHintCard>
                        <FeedbackHintCard title="Hinweis" color={"green"}>
                            Auch die KI kann Fehler machen. Sie basiert auf einer festen Genauigkeit von <strong>93 %</strong>.
                            Dein Urteil kann in manchen Fällen mehr Gewicht haben – <em>vor allem, wenn du sehr sicher bist</em>.
                        </FeedbackHintCard>
                        <FeedbackHintCard title="Abschluss-Feedback" color={"green"}>
                            In der Testphase <em>(ohne Entscheidungshilfe)</em> lagst du bei <strong>70 %</strong>. Mit Hilfe waren es <strong>82 %</strong>.
                        </FeedbackHintCard>
                        <FeedbackHintCard title="Nutzungsverhalten" color={"green"}>
                            Du hast die Empfehlung in <strong>35 von 50</strong> Fällen übernommen – <strong>30</strong> davon waren korrekt.
                        </FeedbackHintCard>
                    </div>

                </div>
            </section>

      <div className='flex justify-center'>
        <Button text='Zurück' onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default DesignDecisionsPage3;
