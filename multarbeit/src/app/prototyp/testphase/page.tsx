'use client';
import { useState } from 'react';
import BiColorV2 from '@/components/canvas/BiColorV2';
import ColorSlider from '@/components/ui/Slider/Slider';
import data from '@/lib/dataTest.json';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/utils/translation';
import { AnimatePresence, motion } from 'framer-motion';
import LanguageToggle from '@/components/ui/LanguageToggle/LanguageToggle';

const Testphase = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [finished, setFinished] = useState(false);
  const [locale, setLocale] = useState<'de' | 'en'>('de');
  const { t } = useTranslation(locale);

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'de' ? 'en' : 'de'));
  };

  const handleClick = () => {
    if (finished) return;
    if (index < data.length - 1) {
      setIndex(index + 1);
      setSliderValue(50);
    } else {
      setFinished(true);
    }
  };

  const current = data[index];

  if (finished) {
    return (
      <div className='max-w-6xl mx-auto p-6 space-y-8'>
        <div className='header border10'>
          <div className='relative flex justify-center items-center'>
            <h1 className='md:text-4xl text-3xl font-bold m-4 text-center'>{t('title')}</h1>
            <LanguageToggle locale={locale} onToggle={toggleLanguage} />
          </div>
        </div>
        <div className='max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]'>
          <h1 className='text-4xl font-bold mb-6 text-center'>{t('finalPhaseTitle')}</h1>
          <p className='mb-8 text-lg text-center'>{t('finalPhaseDescription')}</p>
          <button
            className='px-6 py-2 text-white hover:bg-[#004346]! rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer'
            onClick={() => router.push('/prototyp/mainphase')}>
            {t('buttonContinue')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8 min-h-screen h-full'>
      <div className='header border10'>
        <div className='relative flex justify-center items-center'>
          <h1 className='md:text-4xl text-3xl font-bold m-4 text-center'>{t('title')}</h1>
          <LanguageToggle locale={locale} onToggle={toggleLanguage} />
        </div>
      </div>
      <div className='md:text-2xl text-md flex justify-center'>{t('instructionTitle')}</div>
      <div className='relative max-w-6xl px-8'>
        <AnimatePresence>
          {index > 0 && (index + 1) % 5 === 0 ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='md:text-2xl text-md p-2 max-w-4xl font-bold w-full mx-auto bg-gradient-to-r from-[#A95556] to-[#552BAA] text-gray-900 rounded-[10px] shadow-lg mt-8 text-center z-10 absolute top-[-120] left-1/2 -translate-x-1/2'>
              <mark style={{ background: 'none', color: '#ffffff', padding: 0 }}>
                <div className='flex items-center justify-center space-x-1'>
                  <div className='font-bold'> {t('feedbackNoteTitle')}</div>
                  <div>{t('feedbackNoteText')}</div>
                </div>
                <div className='text-sm text-gray-300'>{t('feedbackNotePlaceholder')}</div>
              </mark>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className=' max-w-4xl mx-auto h-full flex flex-col items-center justify-center'>
        <h2 className='self-start font-bold md:text-2xl text-md pb-4'>
          {t('testPhaseHeader')} {current.header}/20
        </h2>
        <div className='w-full h-8 bg-gray-100 border-2 drop-shadow-xl border-[#508991] text-center rounded-full! mb-4 overflow-hidden'>
          <div
            className='h-full bg-green-400 transition-all duration-300'
            style={{
              width: `${((index + 1) / data.length) * 100}%`,
            }}></div>
        </div>
        <div className='items-center h-full w-full sectionBorder justify-around flex  md:flex-row flex-col drop-shadow-xl rounded-2xl bg-white p-6'>
          <BiColorV2 percentage={current.color} />
          <div className='flex h-[256px] m-4 flex-col items-center justify-center space-y-4'>
            <div className='text-lg mt-auto text-center mb-4 flex flex-col items-center justify-center w-full'>
              <ColorSlider initial={50} value={sliderValue} onChange={(val) => setSliderValue(val)} />
            </div>
            <div className='flex justify-center mt-auto'>
              <button className='px-6 py-2 text-white hover:bg-[#004346]! rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer' onClick={handleClick}>
                {t('buttonNext')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: 20, left: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => setFinished(true)}
          style={{
            padding: '10px 20px',
            background: '#b7b7b7',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
          Debug Button
        </button>
      </div>
    </div>
  );
};

export default Testphase;
