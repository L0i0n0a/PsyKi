'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';

const DesignDecisionsPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      {/* Header */}
      <div className='header border10'>
        <h1 className='text-4xl font-bold m-4 text-center'>Erste Designentscheidungen</h1>
      </div>

      {/* Traget audience */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Zielgruppe</h2>
        <h2 className='text-2xl'>Welche Menschen profitieren von unserer Strategie?</h2>
        <p className='text-lg p-4 textColourGreen'>
          Unsere Anwendung richtet sich an Berufsgruppen, die in hochverantwortlichen Entscheidungssituationen arbeiten, in denen <strong>Signal Detection</strong> eine zentrale Rolle spielt. Dazu
          zählen:
        </p>
        <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
          <li>
            <strong>Medizinische Diagnostik</strong> (z. B. Radiologie)
          </li>
          <li>
            <strong>Qualitätsprüfung</strong> (z. B. Schweißerprüfung)
          </li>
          <li>
            <strong>Defekterkennung</strong> (z. B. Produktion)
          </li>
          <li>
            <strong>Capture-Bilder</strong>
          </li>
          <li>
            <strong>Bildauswertung in sicherheitsrelevanten Kontexten</strong> (z. B. Meteorologie)
          </li>
          <li>
            <strong>Überwachung und Sicherheit</strong> (z. B. Videostreamanalyse)
          </li>
        </ul>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8 max-w-6xl mx-auto'>
          <div>
            <p className='mt-6 text-lg'>Zentrale Anforderungen:</p>
            <ul className='ml-6 list-disc list-inside mt-2 space-y-1'>
              <li>Hohe Genauigkeit und Verlässlichkeit</li>
              <li>Minimierung von Fehlern (v. a. False Alarms)</li>
              <li>Berücksichtigung subjektiver Sicherheit</li>
              <li>Entscheidungsunterstützung ohne Überforderung</li>
              <li>Vermeidung voreiliger Urteile</li>
            </ul>
          </div>
          <div>
            <Image src='/target-group.png' height={400} width={400} alt='Zielgruppe' />
            <p className='imageSourceText text-right'>ChatGPT</p>
          </div>
        </div>
      </section>

      {/* Strategic considerations */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Strategische Überlegungen</h2>
        <h2 className='text-2xl mb-4'>Welche Überlegungen wurden zu Beginn gemacht?</h2>
        <ul className='list-disc list-inside space-y-1'>
          <li>Ziel: Wenig False Alarms, aber trotzdem möglichst viele Hits → Balance zwischen Sensitivität und Spezifität</li>
          <li>Direktes Feedback (richtig/falsch) im Vor-Test</li>
          <li>Minimierung von Fehlentscheidungen durch adaptives Gewichtungssystem</li>
          <li>Dynamische Anpassung der menschlichen Zuverlässigkeit</li>
          <li>Transparente Vorschläge der KI im Anschluss an menschliche Entscheidung</li>
        </ul>
      </section>

      {/* User guidance and process */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Nutzerführung & Ablauf (UX)</h2>
        <h2 className='text-2xl'>Wie ist der Ablauf innerhalb der Anwendung geplant?</h2>
        <div className='mt-4'>
          <h3 className='text-xl font-medium'>1. Vorbereitungsphase (Baseline-Test)</h3>
          <p className='p-4 textColourGreen'>
            In der ersten Phase soll es darum gehen, die Zuverlässigkeit des Menschen zu berechnen. Dabei werden 10 bis 20 Bilder verwendet bei denen der Mensch entscheiden muss, ob mehr orange oder
            mehr blau in dem Bild zu sehen ist. Anschließend gibt es Feedback zu der Bewertung und im Hintergrund wird die Sensitivität berechnet.
          </p>
          <h4 className='ml-2 font-bold'>Ablauf</h4>
          <ul className='ml-6 list-decimal list-inside space-y-1 mt-2'>
            <li>Bild wird angezeigt</li>
            <li>Entscheidung treffen und Sicherheit angeben</li>
            <li>Rückmeldung zur Einschätzung (richtig/falsch)</li>
          </ul>
        </div>
        <div className='mt-4'>
          <h3 className='text-xl font-medium'>2. Haupt-Testphase</h3>
          <p className='p-4 textColourGreen'>
            In der zweiten Phase findet dann der richtige Test statt, hier wird die vorherig ausgerechnete Zuverlässigkeit genutzt. Prinzipiell läuft der Test wie in der Vorbereitungsphase ab,
            allerdings wird hier nach der Angabe von Sicherheit und getroffener Entscheidung ein Vorschlag aus der Kombination von Mensch und KI erzeugt. Der Mensch kann dann entscheiden, ob der
            Vorschlag angenommen wird oder nicht. Dieser Vorgang wird insgesamt 50 mal wiederholt.
          </p>
          <h4 className='ml-2 font-bold'>Ablauf</h4>
          <ul className='ml-6 list-decimal list-inside space-y-1 mt-2'>
            <li>Bild wird angezeigt</li>
            <li>Pro Bild: Entscheidung treffen und Sicherheit angeben</li>
            <li>Z-Wert-Berechnung basierend auf Mensch+KI</li>
            <li>Begründeter Vorschlag aus der Kombination Mensch und KI mit Zuverlässigkeitsinformation</li>
            <li>Mensch entscheidet, ob Vorschlag angenommen wird</li>
          </ul>
          <p className='m-4'>
            Die zugrundeliegende Annahme statistischer Unabhängigkeit wird im Ablauf durch eine zeitlich getrennte Abfrage der menschlichen Einschätzung vor dem KI-Vorschlag gestützt. Dadurch lässt
            sich eine Beeinflussung der menschlichen Evidenzverarbeitung minimieren und die Gültigkeit des OW-Ansatzes wahren.
          </p>
        </div>
      </section>

      {/* Scribbles and mock-up ideas */}
      <section className='sectionBorder'>
        <h2 className='text-2xl font-semibold'>Scribbles und MockUp-Ideen</h2>
        <h2 className='text-2xl mb-4'>Wie werden Nutzende durch die Anwendung geführt?</h2>
        <div className='flex gap-8 items-start'>
          {/* First element */}
          <div className='flex flex-col items-start w-2/4'>
            <Image height={200} width={400} src='/scribble-1.png' alt='Scribble 1' className='h-[200px] w-auto' />
            <div className='mt-4'>
              <h3 className='font-bold'>Menschliche Einschätzung:</h3>
              <ul className='ml-6 list-disc list-inside space-y-1 mt-2'>
                <li>menschliche Entscheidung vor KI-Anzeige → vermeidet Bias</li>
                <li>Mindestbetrachtungszeit für genaue Bildanalyse</li>
                <li>Confidence-Slider für schnelle, intuitive Sicherheitseinschätzung</li>
              </ul>
            </div>
          </div>
          {/* Second element */}
          <div className='flex flex-col items-start w-2/4'>
            <Image height={200} width={400} src='/scribble-2.png' alt='Scribble 2' className='h-[200px] w-auto' />
            <div className='mt-4'>
              <h3 className='font-bold'>Finale Entscheidung:</h3>
              <ul className='ml-6 list-disc list-inside space-y-1 mt-2'>
                <li>Parallele Darstellung von Mensch und KI-Entscheidung zur direkten Vergleichbarkeit</li>
                <li>KI-Vorschlag mit Sicherheit visuell hervorgehoben</li>
                <li>Finalauswahl mit Prozenten fördert bewusste/ eigenständige Entscheidung</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Back button */}
      <div className='flex justify-center'>
        <Button text='Zurück' onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default DesignDecisionsPage;
