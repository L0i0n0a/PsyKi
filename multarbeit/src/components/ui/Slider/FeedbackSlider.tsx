import React from 'react';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the FeedbackSlider component
 *
 * Defines the properties needed to render a feedback slider
 * with appropriate labeling, value display, and skip indication.
 */
type FeedbackSliderProps = {
  /** Title text displayed above the slider */
  title: string;
  /** Numeric value to display (typically 0-5 scale) */
  value: number;
  /** Optional label for the left endpoint (low values) */
  leftLabel?: string;
  /** Optional label for the right endpoint (high values) */
  rightLabel?: string;
  /** Whether this response was skipped by the participant */
  skipped?: boolean;
};

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * FeedbackSlider Component
 *
 * Renders a read-only slider visualization showing participant feedback
 * responses with clear visual indicators and semantic labeling.
 * Uses a 0-5 scale assumption for percentage calculations and positioning.
 *
 * @param {FeedbackSliderProps} props - Component properties
 * @returns {React.FC} Rendered feedback slider with value visualization
 */
const FeedbackSlider: React.FC<FeedbackSliderProps> = ({ title, value, leftLabel = 'Starke Ablehnung', rightLabel = 'Starke Zustimmung', skipped = false }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow border'>
      {/* Slider title with clear typography hierarchy */}
      <div className='font-semibold mb-2'>{title}</div>

      {/* Scale endpoint labels and skip indicator */}
      <div className='flex items-center justify-between text-sm text-gray-500 mb-1'>
        <span>{leftLabel}</span>
        {/* Conditional skip status display */}
        {skipped ? <span className='text-center'>1 skipped</span> : <span />}
        <span>{rightLabel}</span>
      </div>

      {/* Slider visualization container */}
      <div className='relative'>
        {/* Background track (full scale) */}
        <div className='h-2 bg-gray-200 rounded-full'>
          {/* Filled portion (proportional to value) */}
          <div className='h-2 munsellColourBG rounded-full' style={{ width: `${(value / 5) * 100}%` }} />
        </div>

        {/* Value indicator positioned at exact value location */}
        <div className='absolute top-1/2 -translate-y-1/2 transform' style={{ left: `calc(${(value / 5) * 100}% - 12px)` }}>
          {/* Circular indicator with precise value display */}
          <div className='w-6 h-6 rounded-full munsellColourBG text-white text-xs flex items-center justify-center shadow'>{value.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSlider;
