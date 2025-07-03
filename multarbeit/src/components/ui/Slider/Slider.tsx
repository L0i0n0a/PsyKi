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

  if (value < 50) {
    const opacity = value / 50;
    color = `rgba(251, 140, 0, ${1 - opacity})`;
  } else if (value > 50) {
    const opacity = (value - 50) / 50;
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

const getLabelText = (value: number, t: (key: 'sliderOrange' | 'sliderBlue') => string) => {
  if (value === 50) {
    return 'neutral';
  } else if (value < 50) {
    const percent = Math.round(((50 - value) / 50) * 100);
    //return `${percent}% ${t('sliderOrange')}`;
    return ` ${t('sliderOrange')}`;
  } else {
    const percent = Math.round(((value - 50) / 50) * 100);
    //return `${percent}% ${t('sliderBlue')}`;
    return `${t('sliderBlue')}`;
  }
};

const ColorSlider: React.FC<ColorSliderProps> = ({ initial = 50, value, onChange, locale }) => {
  const [internalValue, setInternalValue] = useState<number>(initial);
  const { t } = useTranslation(locale);

  useEffect(() => {
    if (typeof value === 'number') {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value, 10);
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
        min={0}
        max={100}
        value={sliderValue}
        onChange={handleChange}
        className='color-slider w-full appearance-none'
        style={{
          background: `
            linear-gradient(
              to right,
              #FB8C00 0%,
              #FFE0B2 49.5%,
              white 49.5%,
              white 50.5%,
              #90CAF9 50.5%,
              #0D47A1 100%
            )
          `,
        }}
      />
           <div className="grid grid-cols-5 text-sm text-gray-600 w-full px-1 mt-2 text-center">
  <span>{t('labelStrongOrange')}</span>
  <span>{t('labelOrange')}</span>
  <span>{t('labelNeutral')}</span>
  <span>{t('labelBlue')}</span>
  <span>{t('labelStrongBlue')}</span>
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
