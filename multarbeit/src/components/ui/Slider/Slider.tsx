import { useTranslation } from '@/utils/translation';
import React, { useState, useEffect } from 'react';

type ColorSliderProps = {
  initial?: number;
  value?: number;
  onChange?: (value: number) => void;
  locale: 'de' | 'en';
};

const getThumbStyle = (value: number) => {
  let color = 'rgba(255,255,255,0)';
  const border = '2px solid white';

  if (value < 0) {
    // Left side: orange, opacity increases as value approaches -1
    const opacity = Math.abs(value);
    color = `rgba(251, 140, 0, ${opacity})`;
  } else if (value > 0) {
    // Right side: blue, opacity increases as value approaches 1
    const opacity = value;
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

const getLabelText = (value: number, t: (key: 'secOrange' | 'secBlue' | 'secStrongOrange' | 'secStrongBlue' | 'secNeutral') => string) => {
  if (value === 0) {
    return t('secNeutral');
  }
  if (value < -0.5) {
    return t('secStrongOrange');
  }
  if (value < 0) {
    return t('secOrange');
  }
  if (value > 0.5) {
    return t('secStrongBlue');
  }
  if (value > 0) {
    return t('secBlue');
  }
  return '';
};

const ColorSlider: React.FC<ColorSliderProps> = ({ initial = 0, value, onChange, locale }) => {
  const [internalValue, setInternalValue] = useState<number>(initial);
  const { t } = useTranslation(locale);

  useEffect(() => {
    if (typeof value === 'number') {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseFloat(e.target.value);
    if (typeof value !== 'number') {
      setInternalValue(newVal);
    }
    onChange?.(newVal);
  };

  const sliderValue = typeof value === 'number' ? value : internalValue;

  return (
    <div className='relative flex-col items-center gap-4 w-full max-w-lg'>
      <div className='flex gap-2 justify-center mt-8 items-center w-full mb-2'>
        <div>{t('decisionScale')}:</div>
        <div>{getLabelText(sliderValue, t)}</div>
        {/* <div className='w-12 text-gray-800 text-right'>{sliderValue}%</div> */}
      </div>
      <input
        type='range'
        min={-1}
        max={1}
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
      <div className='grid grid-cols-5 text-sm text-gray-600 w-full px-1 mt-2 text-center'>
        <span className='justify-self-start break-words whitespace-normal'>{t('secStrongOrange')}</span>
        <span>{t('secOrange')}</span>
        <span>{t('secNeutral')}</span>
        <span>{t('secBlue')}</span>
        <span className='justify-self-end break-words whitespace-normal'>{t('secStrongBlue')}</span>
      </div>

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
