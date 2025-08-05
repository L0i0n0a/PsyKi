import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/utils/translation';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the ColorSlider component
 *
 * Defines the properties needed to render an interactive slider
 * with appropriate behavior, styling, and internationalization.
 */
type ColorSliderProps = {
  /** Initial value when component mounts (defaults to 0) */
  initial?: number;
  /** Controlled value from parent component */
  value?: number;
  /** Callback function triggered when slider value changes */
  onChange?: (value: number) => void;
  /** Current locale for internationalization */
  locale: 'de' | 'en';
};

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Generate dynamic thumb styling based on slider value
 *
 * Creates CSS styles for the slider thumb that visually represent
 * the current decision state through color coding and opacity.
 *
 * @param {number} value - Current slider value (-3 to +3)
 * @returns {string} CSS style string for the slider thumb
 */
const getThumbStyle = (value: number) => {
  let color = 'rgba(255,255,255,0)';
  const border = '2px solid white';
  // Calculate opacity based on absolute value, capped at 1.0
  const opacity = Math.min(1, Math.abs(value / 3));

  if (value < 0) {
    // Orange tint for negative values (orange preference)
    color = `rgba(251, 140, 0, ${opacity})`;
  } else if (value > 0) {
    // Blue tint for positive values (blue preference)
    color = `rgba(13, 71, 161, ${opacity})`;
  }

  return `
    background: ${color};
    border: ${border};
    transition: background 0.3s, border 0.3s;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    cursor: pointer;
  `;
};

/**
 * Get semantic label text based on slider value and locale
 *
 * Translates numeric slider values into meaningful semantic labels
 * that help participants understand their current decision state.
 *
 * @param {number} value - Current slider value
 * @param {Function} t - Translation function for current locale
 * @returns {string} Localized semantic label for the current value
 */
const getLabelText = (value: number, t: (key: 'secOrange' | 'secBlue' | 'secStrongOrange' | 'secStrongBlue' | 'secNeutral') => string) => {
  if (value === 0) return t('secNeutral');
  if (value < -2) return t('secStrongOrange');
  if (value < 0) return t('secOrange');
  if (value > 2) return t('secStrongBlue');
  if (value > 0) return t('secBlue');
  return '';
};

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * ColorSlider Component
 *
 * Renders an interactive color-coded slider for collecting participant
 * decision confidence in the PsyKi research study. Supports both controlled
 * and uncontrolled usage patterns with comprehensive visual feedback.
 *
 * @param {ColorSliderProps} props - Component properties
 * @returns {React.FC} Rendered interactive color slider
 */
const ColorSlider: React.FC<ColorSliderProps> = ({ initial = 0, value, onChange, locale }) => {
  /* ========================================
     STATE MANAGEMENT
     ======================================== */

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<number>(initial);

  // Translation hook for internationalization
  const { t } = useTranslation(locale);

  // Sync internal state with external value prop
  useEffect(() => {
    if (typeof value === 'number') {
      setInternalValue(value);
    }
  }, [value]);

  /* ========================================
     EVENT HANDLERS
     ======================================== */

  /**
   * Handle slider value changes
   *
   * Updates internal state (if uncontrolled) and triggers onChange callback
   * for parent component integration and data collection.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseFloat(e.target.value);

    // Update internal state only if not controlled by parent
    if (typeof value !== 'number') {
      setInternalValue(newVal);
    }

    // Notify parent component of value change
    onChange?.(newVal);
  };

  // Determine active value (controlled vs uncontrolled)
  const sliderValue = typeof value === 'number' ? value : internalValue;

  return (
    <div className='relative flex-col items-center gap-4 w-full max-w-lg md:max-w-xl lg:max-w-2xl '>
      {/* Current value display with semantic label */}
      <div className='flex gap-2 justify-center mt-8 items-center w-full mb-2'>
        <div>{t('decisionScale')}:</div>
        <div>{getLabelText(sliderValue, t)}</div>
      </div>

      {/* Main slider input with gradient background */}
      <input
        type='range'
        min={-3}
        max={3}
        step={0.01}
        value={sliderValue}
        onChange={handleChange}
        className='color-slider w-full appearance-none'
        style={{
          background: `
            linear-gradient(
              to right,
              #FB8C00 0%,
              #FFE0B2 49%,
              white 50%,
              #90CAF9 51%,
              #0D47A1 100%
            )
          `,
        }}
      />

      {/* Scale labels positioned at key points */}
      <div className='grid grid-cols-5 text-base text-gray-600 w-full px-1 mt-2 text-center'>
        <span className='justify-self-start break-words whitespace-normal'>{t('secStrongOrange')}</span>
        <span>{t('secOrange')}</span>
        <span>{t('secNeutral')}</span>
        <span>{t('secBlue')}</span>
        <span className='justify-self-end break-words whitespace-normal'>{t('secStrongBlue')}</span>
      </div>

      {/* Custom styling for cross-browser slider thumb appearance */}
      <style>{`
        .color-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          ${getThumbStyle(sliderValue)}
        }
        .color-slider::-moz-range-thumb {
          ${getThumbStyle(sliderValue)}
        }
        .color-slider::-ms-thumb {
          ${getThumbStyle(sliderValue)}
        }
        .color-slider:focus {
          outline: none;
        }
        .color-slider {
          height: 20px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ColorSlider;
