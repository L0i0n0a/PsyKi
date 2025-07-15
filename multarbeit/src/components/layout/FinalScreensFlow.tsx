'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
// import { useScroll, useSpring } from 'framer-motion';

const screens = [
  {
    title: '1. Entscheidung ohne KI',
    text: 'In der ersten Stufe trifft der Mensch eine Entscheidung, ohne Einblick in die Einschätzung der KI. Die Farbgebung, Begriffe wie "Tendenzwert" und ein selbsterklärender Slider erleichtern den Zugang ohne statistisches Vorwissen.',
    image: '/start.png',
  },
  {
    title: '2. KI-Vorschlag wird eingeblendet',
    text: 'Nach der menschlichen Einschätzung zeigt die KI ihren Vorschlag. Die Nutzer:innen erkennen sofort, wie stark die Einschätzungen übereinstimmen. Die farbliche Darstellung stärkt das intuitive Verständnis.',
    image: '/begin.png',
  },
  {
    title: '3. Gemeinsame Empfehlung (Teamwert)',
    text: 'Der kombinierte Assistenzpunkt (Teamwert) wird visualisiert. Die Entscheidung bleibt bei den Nutzer:innen, doch sie erhalten ein transparentes, nachvollziehbares Feedback. Dieses Interface stärkt das Vertrauen in die Zusammenarbeit zwischen Mensch und KI.',
    image: '/test.png',
  },
  {
    title: 'KI-Vorschlag wird eingeblendet',
    text: 'Nach der menschlichen Einschätzung zeigt die KI ihren Vorschlag. Die Nutzer:innen erkennen sofort, wie stark die Einschätzungen übereinstimmen. Die farbliche Darstellung stärkt das intuitive Verständnis.',
    image: '/hinweis1.png',
  },
  {
    title: 'KI-Vorschlag wird eingeblendet',
    text: 'Nach der menschlichen Einschätzung zeigt die KI ihren Vorschlag. Die Nutzer:innen erkennen sofort, wie stark die Einschätzungen übereinstimmen. Die farbliche Darstellung stärkt das intuitive Verständnis.',
    image: '/hinweis2.png',
  },
  {
    title: 'Gemeinsame Empfehlung (Teamwert)',
    text: 'Der kombinierte Assistenzpunkt (Teamwert) wird visualisiert. Die Entscheidung bleibt bei den Nutzer:innen, doch sie erhalten ein transparentes, nachvollziehbares Feedback.',
    image: '/explain.png',
  },
  {
    title: 'KI-Vorschlag wird eingeblendet',
    text: 'Nach der menschlichen Einschätzung zeigt die KI ihren Vorschlag. Die Nutzer:innen erkennen sofort, wie stark die Einschätzungen übereinstimmen. Die farbliche Darstellung stärkt das intuitive Verständnis.',
    image: '/explain2.png',
  },
  {
    title: 'Gemeinsame Empfehlung (Teamwert)',
    text: 'Der kombinierte Assistenzpunkt (Teamwert) wird visualisiert. Die Entscheidung bleibt bei den Nutzer:innen, doch sie erhalten ein transparentes, nachvollziehbares Feedback.',
    image: '/main.png',
  },
  {
    title: 'KI-Vorschlag wird eingeblendet',
    text: 'Nach der menschlichen Einschätzung zeigt die KI ihren Vorschlag. Die Nutzer:innen erkennen sofort, wie stark die Einschätzungen übereinstimmen. Die farbliche Darstellung stärkt das intuitive Verständnis.',
    image: '/main2.png',
  },
  {
    title: 'Aufmerksamkeitscheck',
    text: 'Nach der menschlichen Einschätzung zeigt die KI ihren Vorschlag. Die Nutzer:innen erkennen sofort, wie stark die Einschätzungen übereinstimmen. Die farbliche Darstellung stärkt das intuitive Verständnis.',
    image: '/attention.png',
  },
  {
    title: 'Gemeinsame Empfehlung (Teamwert)',
    text: 'Der kombinierte Assistenzpunkt (Teamwert) wird visualisiert. Die Entscheidung bleibt bei den Nutzer:innen, doch sie erhalten ein transparentes, nachvollziehbares Feedback.',
    image: '/end.png',
  },
];

const FinalScreensFlow: React.FC = () => {
  // const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001,
  // });

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
        <span className='bg-white'>Finale UI-Screens – Vergleich & Erläuterung</span>
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
                className='absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white rounded-full z-20 border-[3px] border-transparent animate-pulse'
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
