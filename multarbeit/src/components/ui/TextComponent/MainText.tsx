'use client';

import React from 'react';
import { useTranslation } from '@/utils/translation';
import AccuracyComparison from '../AccuracyComponent/AccuracyComparison';

type MainTextProps = {
  locale: 'de' | 'en';
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  instructionStepsLength: number;
};

const MainText: React.FC<MainTextProps> = ({ locale, step, setStep, instructionStepsLength }) => {
  const { t } = useTranslation(locale);
  const isFirstStep = step === 0;
  const isLastStep = step === instructionStepsLength - 1;

  const instructionSteps = [
    {
      content: (
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>{t('carouselSlide1Title')}</h1>
          <p className='mb-4 text-lg text-center'>{t('carouselSlide1Text')}</p>
        </div>
      ),
    },
    {
      content: (
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>{t('carouselSlide2Title')}</h1>
          <p className='mb-4 text-lg text-center'>{t('carouselSlide2Text')}</p>
        </div>
      ),
    },
    {
      content: (
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>{t('carouselSlide3Title')}</h1>
          <p className='mb-4 text-lg text-center'>{t('carouselSlide3Text')}</p>
          <AccuracyComparison humanPercent={-1} aiPercent={2.6} locale={locale} decision={0.1} humanAccuracy={60} aiAccuracy={93} />
        </div>
      ),
    },
    {
      content: (
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>{t('carouselSlide4Title')}</h1>
          <p className='mb-4 text-lg text-center'>{t('carouselSlide4Text')}</p>
          <AccuracyComparison humanPercent={-1} aiPercent={2.6} locale={locale} decision={0.1} humanAccuracy={60} aiAccuracy={93} />
        </div>
      ),
    },
    {
      content: (
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>{t('carouselSlide5Title')}</h1>
          <p className='mb-4 text-lg text-center'>{t('carouselSlide5Text')}</p>
          <AccuracyComparison humanPercent={-1} aiPercent={2.6} locale={locale} decision={0.1} humanAccuracy={60} aiAccuracy={93} />
        </div>
      ),
    },
    {
      content: (
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>{t('carouselSlide6Title')}</h1>
          <p className='mb-4 text-lg text-center'>{t('carouselSlide6Text')}</p>
          <AccuracyComparison humanPercent={-1} aiPercent={2.6} locale={locale} decision={0.1} humanAccuracy={60} aiAccuracy={93} />
        </div>
      ),
    },
  ];

  return (
    <section className='sectionBorder'>
      <div className='h-auto w-full bg-gradient-to-br from-blue-50 to-orange-100 flex items-center justify-center px-6'>
        <div className=' m-8 bg-white shadow-lg rounded-xl p-8 text-gray-800'>
          <div className='min-h-[47svh]'>{instructionSteps[step].content}</div>
          <div className='flex justify-between mt-6'>
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={isFirstStep}
              className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold z-20 ${
                isFirstStep ? 'bg-gray-300! text-gray-400 cursor-not-allowed' : 'bg-[#004346] text-white hover:bg-[#004346]! cursor-pointer'
              }`}>
              {t('back')}
            </button>
            <button
              onClick={isLastStep ? () => window.location.assign('/prototype/mainphase') : () => setStep((s) => Math.min(instructionSteps.length - 1, s + 1))}
              className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold z-20 ${
                isLastStep ? 'bg-[#004346] text-white hover:bg-[#004346]! cursor-pointer' : 'bg-[#004346] text-white hover:bg-[#004346]! cursor-pointer'
              }`}>
              {isLastStep ? t('start') : t('next')}
            </button>
          </div>
          <div className='mt-4 text-center text-sm text-gray-500'>
            {t('step')} {step + 1} {t('of')} {instructionSteps.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainText;
