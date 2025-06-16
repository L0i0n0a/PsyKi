import React, { useState, useEffect } from 'react';

type ColorSliderProps = {
  initial?: number;
  value?: number;
  onChange?: (value: number) => void;
};

const getThumbStyle = (value: number) => {
  // value: 0 (left, orange), 50 (middle, transparent), 100 (right, blue)
  let color = 'rgba(255,255,255,0)';
  const border = '2px solid white';

  if (value < 50) {
    // Orange side
    const opacity = value / 50; // 1 at 0, 0 at 50
    color = `rgba(251, 140, 0, ${1 - opacity})`; // #FB8C00
  } else if (value > 50) {
    // Blue side
    const opacity = (value - 50) / 50; // 0 at 50, 1 at 100
    color = `rgba(13, 71, 161, ${opacity})`; // #0D47A1
  }
  // At 50, color stays transparent

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

const getLabelText = (value: number) => {
  if (value === 50) {
    return '0%';
  } else if (value < 50) {
    const percent = Math.round(((50 - value) / 50) * 100);
    return `${percent}% Orange`;
  } else {
    const percent = Math.round(((value - 50) / 50) * 100);
    return `${percent}% Blau`;
  }
};

const ColorSlider: React.FC<ColorSliderProps> = ({ initial = 50, value, onChange }) => {
  const [internalValue, setInternalValue] = useState<number>(initial);

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
        <div>Entscheidungsskala:</div>
        <div>{getLabelText(sliderValue)}</div>
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
// ...existing code...
