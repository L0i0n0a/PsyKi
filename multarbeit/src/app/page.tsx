'use client';

import { useRouter } from 'next/navigation';
import Carousel from '@/components/layout/Carousel';
import SectionLeft from '@/components/layout/SectionLeft';
import SectionRight from '@/components/layout/SectionRight';
import SectionMiddle from '@/components/layout/SectionMiddle';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      {/* Header */}
      <div className='header'>
        <h1 className='text-4xl font-bold m-4 text-center'>Multimediale Ausarbeitung</h1>
        <h2 className='text-3xl m-4 text-center'>Strategie: Optimale Gewichtung</h2>
      </div>

      {/* Theory section */}
      <SectionRight
        imageSource='Benchmarking Aided Decision Making in a Signal Detection Task
Megan L. Bartlett and Jason S. McCarley, Human Factors 2017 59:6, 881-900'
        onClick={() => router.push('/details/theory')}
        imageUrl='/decision-graph.png'
        title='Optimale Gewichtung: Theorie '
        description={
          <>
            Das Optimal Weighting (OW) Modell ist ein <strong>theoretisches Modell</strong>, das beschreibt, wie ein Mensch oder ein System die Hinweise von einem{' '}
            <strong>menschlichen Entscheider</strong> und eines <strong>automatisierten Hilfsmittels</strong> optimal kombiniert, um die <strong>beste mögliche Entscheidung</strong> zu treffen.
          </>
        }
      />

      {/* Presentation One */}
      <SectionMiddle imageSource='' onClick={() => router.push('/details/strategy/')} imageUrl='/vortragStrategie.png' title='Erster Vortrag: Metakognitive Strategie' description={<>
            Hier kann in Kurzfassung nachgelesen werden, was die Optimal Weighting Strategie (OW) ist und wie sie funktioniert.
          </>} />
      

      {/* Design decisions section */}
      <SectionLeft
        imageSource='Med Badr Chemmaoui (Unsplash)'
        onClick={() => router.push('/details/design/1')}
        imageUrl='/design-decisions.jpg'
        title='Erste Designentscheidungen'
        description={
          <>
            Unsere Anwendung richtet sich an <strong>Berufsgruppen mit hoher Verantwortung</strong> in der <strong>visuellen Entscheidungsfindung</strong> (z. B. Radiologie, Qualitätssicherung,
            Meteorologie), bei denen <strong>Genauigkeit</strong> und <strong>Verlässlichkeit</strong> entscheidend sind. Basierend auf dem Optimal Weighting Modell kombinieren wir objektive
            Leistungsdaten (z. B. Sensitivität aus einem Vor-Test) mit subjektiver Sicherheit, um menschliche und KI-basierte Hinweise <strong>optimal zu gewichten</strong>. Ziel ist eine{' '}
            <strong>adaptive Entscheidungsunterstützung</strong>, die Fehler reduziert, Transparenz schafft und dem Nutzer trotz KI-Empfehlung die <strong>Kontrolle</strong> lässt. Die{' '}
            <strong>Nutzerführung</strong> umfasst einen kurzen <strong>Baseline-Test</strong> und einen Hauptdurchgang mit erklärter Entscheidungsunterstützung.
          </>
        }
      />

      {/* Scribbles carousel */}
      <h2 className='text-3xl font-bold m-4 text-center'>Erste Scribbles</h2>
      <Carousel images={['/scribble-1.png', '/scribble-2.png']} imageDescriptions={['Scribble 1: Menschliche Einschätzung', 'Scribble 2: Vergleich Mensch und KI']} />

      {/* Prototype design section */}
      <SectionRight
        imageSource='Anima - Nick Meyer'
        onClick={() => router.push('/details/design/2')}
        imageUrl='/user-flow.jpg'
        title='Prototyp-Entwurf & Userflows'
        description={
          <>
            Der User Flow beginnt mit einem kurzen <strong>Baseline-Test</strong>, gefolgt vom <strong>Hauptdurchgang</strong> mit adaptiver Entscheidungsunterstützung. Ein interaktiver Prototyp
            zeigt, wie Hinweise von Mensch und KI kombiniert und visualisiert werden. Ziel ist eine intuitive, transparente und kontrollierbare Nutzererfahrung zu schaffen, die den Nutzenden bei der
            Anwendung der <strong>Optimal Weighting Strategie</strong> unterstützt.
          </>
        }
      />

      {/* Presentation Two */}
      <SectionMiddle imageSource='' onClick={() => router.push('/details/prototypShow/')} imageUrl='/vortragPrototype.png' title='Zweiter Vortrag: Designidee' description={<>
            Hier kann in Kurzform nachgeschaut werden, wie die Optimal Weighting Strategie innerhalb des Prototypens angewendet wurde und welche theoretischen Konzepte einbezogen wurden.
          </>} />

      {/* Prototype section */}
      <SectionLeft
        imageSource='Kateryna Mayka von Eleken'
        onClick={() => router.push('/prototype')}
        imageUrl='/prototype-example.png'
        title='Prototyp für Optimal Weighting Strategie'
        description={<>Hier kann der aktuelle Prototyp angeschaut und ausprobiert werden.</>}
      />

      {/* Science communication section */}
      <SectionRight
        imageSource='CONEDU/Schnepfleitner, auf erwachsenenbildung.at'
        onClick={() => router.push('/details/design/3')}
        imageUrl='/communication-feedback.webp'
        title='Wissenschaftskommunikation & Feedback'
        description={
          <>
            In diesem Abschnitt werden theoretische Erklärungen für die Kommunikation innerhalb der Anwendung genannt und begründet. Es wird erklärt welche Terminologie verwendet und wie Vertrauen bei
            den Nutzenden geschaffen wird.
          </>
        }
      />

      <SectionLeft
        imageSource='by Storyset'
        onClick={() => router.push('/details/design/4')}
        imageUrl='/result.png'
        title='Finalisierung & Ergebnisbewertung'
        description={<>In diesem Abschnitt wird die finale Version des Prototypen aufgezeigt. Zudem werden die in der Studie gesammelten Ergebnis aufgezeigt und diskutiert.</>}
      />

    </div>
  );
}
