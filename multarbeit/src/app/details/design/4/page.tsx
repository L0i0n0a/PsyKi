'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import Image from 'next/image';
import FeedbackHintCard from '@/components/layout/FeedbackHintCard';
// import FeedbackSlider from '@/components/ui/Slider/FeedbackSlider';
import FinalScreensFlow from '@/components/layout/FinalScreensFlow';
import AnimatedDataChart from '@/components/layout/AnimatedDataChart';
import AllParticipantsChart from '@/components/layout/AllParticipantsChart';

const DesignDecisionsPage3: React.FC = () => {
  const router = useRouter();

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

      <AnimatedDataChart />
      <AllParticipantsChart />

      <FinalScreensFlow />

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
            Mensch und KI nehmen das Bild parallel wahr – visuell bzw. algorithmisch. Nutzer:innen geben ihre Einschätzung direkt mittels Schieberegler ein. Gleichzeitig analysiert die KI das Bild und
            liefert eine eigene Einschätzung. Im Onboarding wird erklärt, welche Bildmerkmale die KI nutzt und wie zuverlässig sie dabei ist.
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

      {/* Back button */}
      <div className='flex justify-center'>
        <Button text='Zurück' onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default DesignDecisionsPage3;
