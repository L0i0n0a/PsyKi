'use client';

import React from 'react';
import { useTranslation } from '@/utils/translation';
import AccuracyComparison from '../AccuracyComponent/AccuracyComparison';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the MainText component
 *
 * Defines the properties needed to render the instructional carousel
 * with appropriate navigation behavior and internationalization support.
 */
type MainTextProps = {
  /** Current locale for translation and AccuracyComparison components */
  locale: 'de' | 'en';
  /** Current step index in the instruction sequence */
  step: number;
  /** State setter function for updating the current step */
  setStep: React.Dispatch<React.SetStateAction<number>>;
  /** Total number of instruction steps for navigation bounds */
  instructionStepsLength: number;
};

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * MainText Component
 *
 * Renders a step-by-step instructional carousel that introduces participants
 * to the PsyKi research study methodology and interface elements. Each step
 * contains explanatory content and some include interactive demonstrations
 * of the AccuracyComparison visualization system.
 *
 * @param {MainTextProps} props - Component properties
 * @returns {React.FC} Rendered instructional carousel with navigation
 */
const MainText: React.FC<MainTextProps> = ({ locale, step, setStep, instructionStepsLength }) => {
  /* ========================================
     HOOKS AND STATE
     ======================================== */

  // Translation hook for internationalization
  const { t } = useTranslation(locale);

  // Navigation state calculations
  const isFirstStep = step === 0;
  const isLastStep = step === instructionStepsLength - 1;

  /* ========================================
     INSTRUCTION CONTENT CONFIGURATION
     ======================================== */

  /**
   * Instruction steps configuration array
   *
   * Defines the content for each step in the instructional sequence,
   * including titles, explanatory text, and interactive demonstrations.
   * Steps 3-6 include AccuracyComparison components with consistent
   * demo data to illustrate the visualization system.
   */
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
          {/* Interactive demonstration of AccuracyComparison component */}
          <AccuracyComparison humanPercent={-1} aiPercent={2.6} locale={locale} decision={0.1} humanAccuracy={60} aiAccuracy={93} />
        </div>
      ),
    },
    {
      content: (
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>{t('carouselSlide4Title')}</h1>
          <p className='mb-4 text-lg text-center'>{t('carouselSlide4Text')}</p>
          {/* Repeated demonstration for consistency across instructional steps */}
          <AccuracyComparison humanPercent={-1} aiPercent={2.6} locale={locale} decision={0.1} humanAccuracy={60} aiAccuracy={93} />
        </div>
      ),
    },
    {
      content: (
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>{t('carouselSlide5Title')}</h1>
          <p className='mb-4 text-lg text-center'>{t('carouselSlide5Text')}</p>
          {/* Additional demonstration to reinforce visualization concepts */}
          <AccuracyComparison humanPercent={-1} aiPercent={2.6} locale={locale} decision={0.1} humanAccuracy={60} aiAccuracy={93} />
        </div>
      ),
    },
    {
      content: (
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>{t('carouselSlide6Title')}</h1>
          <p className='mb-4 text-lg text-center'>{t('carouselSlide6Text')}</p>
          {/* Final demonstration before transitioning to actual experiment */}
          <AccuracyComparison humanPercent={-1} aiPercent={2.6} locale={locale} decision={0.1} humanAccuracy={60} aiAccuracy={93} />
        </div>
      ),
    },
  ];

  return (
    <section className='sectionBorder'>
      {/* Main container with gradient background */}
      <div className='h-auto w-full bg-gradient-to-br from-blue-50 to-orange-100 flex items-center justify-center px-6'>
        {/* Content card with shadow and rounded corners */}
        <div className=' m-8 bg-white shadow-lg rounded-xl p-8 text-gray-800'>
          {/* Main content area with minimum height for consistency */}
          <div className='min-h-[47svh]'>{instructionSteps[step].content}</div>

          {/* Navigation controls */}
          <div className='flex justify-between mt-6'>
            {/* Previous/Back button with conditional styling */}
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={isFirstStep}
              className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold z-20 ${
                isFirstStep ? 'bg-gray-300! text-gray-400 cursor-not-allowed' : 'bg-[#004346] text-white hover:bg-[#004346]! cursor-pointer'
              }`}>
              {t('back')}
            </button>

            {/* Next/Start button with conditional behavior */}
            <button
              onClick={isLastStep ? () => window.location.assign('/prototype/mainphase') : () => setStep((s) => Math.min(instructionSteps.length - 1, s + 1))}
              className={`px-6 py-2 rounded-full transition-all duration-200 ease-in-out text-lg font-semibold z-20 ${
                isLastStep ? 'bg-[#004346] text-white hover:bg-[#004346]! cursor-pointer' : 'bg-[#004346] text-white hover:bg-[#004346]! cursor-pointer'
              }`}>
              {isLastStep ? t('start') : t('next')}
            </button>
          </div>

          {/* Progress indicator showing current step position */}
          <div className='mt-4 text-center text-sm text-gray-500'>
            {t('step')} {step + 1} {t('of')} {instructionSteps.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainText;
