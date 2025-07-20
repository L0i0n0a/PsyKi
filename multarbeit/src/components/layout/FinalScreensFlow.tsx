'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const screens = [
  {
    title: '1. Einwilligung & Code',
    text: 'Am Anfang geben die Teilnehmenden ihren Code ein und bestätigen die Informationen zur Teilnahme.',
    image: '/start.png',
  },
  {
    title: '2. Einführung zur Studie und Testphase',
    text: 'In diesem Screen wird den Teilnehmenden die Studie grundlegend erklärt.',
    image: '/begin.png',
  },
  {
    title: '3. Entscheidung ohne KI',
    text: 'In der ersten Stufe trifft der Mensch eine Entscheidung, ohne Einblick in die Einschätzung der KI zu erhalten. Die Farbgebung, Begriffe wie "Entscheidungsskala" und ein selbsterklärender Slider erleichtern den Zugang ohne statistisches Vorwissen. Und ermöglichen so die Aufgabe mit geringerem Workload zu bearbeiten.',
    image: '/test.png',
  },
  {
    title: '4. Hinweise werden angezeigt',
    text: 'Nach einigen Trials werden dem Teilnhemenden Hinweise zur aktuellen Genauigkeit eingeblendet. So kann die eigene Entscheidung analysiert werden und die Teilnhemenden bekommen Feedback, wie oft sie bisher richitg lagen.',
    image: '/hinweis1.png',
  },
  {
    title: '4. Hinweise werden angezeigt',
    text: 'Die Hinweise werden auf zwei verschiedene Arten angezeigt. Einmal als Prozentzahl mit errechneter Genauigkeit und einmal als Absolutwerte mit richtigen Fällen von Gesamtfällen.',
    image: '/hinweis2.png',
  },
  {
    title: '5. Einführung in die Hauptphase',
    text: 'Nach den 20 Testtrials gibt es eine erneute Erklärung für die hauptphase, hier wird zusätzlich zum vorherigen task auch die KI erklärt. Dazu wird die Einschätzung der KI erklärt und wie eine gemeinsame Entscheidung stattfindet.',
    image: '/explain.png',
  },
  {
    title: '5. Einführung in die Hauptphase',
    text: 'Ebenfalls beinhaltet die Einführung die Erklärung der Entscheidungshilfe. Diese visualisiert den Teilnhemenden wie ihre eigene Einschätzung genüber der KI liegt und gibt entsprechend eine Empfehlung an die Teilnhemenden, bei der der optimale Wert ermittelt wird. Im Hintergrund passiert hier der Kern der OW-Strategie.',
    image: '/explain2.png',
  },
  {
    title: '6. Menschliche Entscheidung',
    text: 'Im ersten Schritt treffen die Teilnehmenden ihre eigene Entscheidung, um die Einschätzung unverfälscht geschehen zu lassen. Zusätzlich wird hier in der Hauptphase ein Fortschrittsbalken mit Zahlen angezeigt, der die Teilnehmenden über ihren aktuellen Stand aufklärt.',
    image: '/main.png',
  },
  {
    title: '7. KI-Vorschlag & gemeinsame Empfehlung',
    text: 'Nach der menschlichen Einschätzung zeigt die KI ihren Vorschlag. Die Nutzer:innen erkennen sofort, wie stark die Einschätzungen übereinstimmen. Die farbliche Darstellung stärkt das intuitive Verständnis. Im Optimalfall nutzen die Teilnehmenden dann die empfohlene Farbe und folgen so der Strategie.',
    image: '/main2.png',
  },
  {
    title: '8. Aufmerksamkeitscheck',
    text: 'Alle 50 Trials ist ein Aufmerksamkeitscheck eingebaut, der überprüfem soll ob die Teilnehmenden die Aufgabe fokussiert ausüben oder einfach wild klicken.',
    image: '/attention.png',
  },
  {
    title: '9. Debriefing',
    text: 'Am Ende derstudie bekommen die Teilnehmenden noch einmal eine kurze Erkärung zur Studie und ihnen wird gesamtheitliches Feedback zu ihrer Performance gegeben.',
    image: '/end.png',
  },
];

const FinalScreensFlow: React.FC = () => {

  return (
    <section className='relative py-16 px-4 md:px-10 overflow-hidden sectionBorder'>
      {/* Timeline vertical line */}
      <div className='absolute left-1/2 top-0 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-300 via-violet-300 to-blue-300 z-0'></div>

      {/* Multiple Blobs for decoration */}
      {/* Stronger, more visible background blobs */}
      <div className='absolute -top-48 -left-48 w-[400px] h-[400px] bg-pink-400 opacity-60 rounded-full blur-[120px] -z-10'></div>
      <div className='absolute top-[20%] -right-52 w-[380px] h-[380px] bg-violet-400 opacity-50 rounded-full blur-[100px] -z-10'></div>
      <div className='absolute top-1/2 left-[-100px] w-[300px] h-[300px] bg-blue-400 opacity-40 rounded-full blur-[100px] -z-10'></div>
      <div className='absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-400 opacity-60 rounded-full blur-[130px] -z-10'></div>
      <div className='absolute bottom-[30%] left-[25%] w-[350px] h-[350px] bg-orange-400 opacity-50 rounded-full blur-[100px] -z-10'></div>

      <h2 className='text-2xl  font-semibold mb-16 text-center relative z-10'>
        <span className='bg-white'>Finale UI-Screens – Erläuterung</span>
      </h2>

      <div className='relative z-10 space-y-24'>
        {screens.map((screen, index) => {
          const isReversed = index % 2 === 1;

          return (
            <motion.div
              key={index}
              className={`relative flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''} items-center gap-6`}
              initial={{ opacity: 0, x: isReversed ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}>
              {/* Gradient dot */}
              <div
                className='absolute left-1/2 transform  -translate-x-1/2 w-5 h-5 bg-white rounded-full z-20 border-[3px] border-transparent animate-pulse'
                style={{
                  borderImage: 'linear-gradient(to bottom, #f97316, #a78bfa, #3b82f6) 1',
                  borderImageSlice: 1,
                }}
              />

              {/* Image with localized blob */}
              <div className='relative md:w-1/2'>
                <div className='absolute -top-10 -left-10 w-60 h-60 bg-purple-200 opacity-25 blur-2xl rounded-full -z-10'></div>
                <motion.div initial={{ scale: 0.95 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }}>
                  <Image src={screen.image} width={500} height={300} alt={screen.title} className='rounded-xl shadow-md' />
                </motion.div>
              </div>

              {/* Text */}
              <div className='text-lg md:w-1/2'>
                <h3 className='text-xl font-semibold mb-2'>{screen.title}</h3>
                <p>{screen.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FinalScreensFlow;
