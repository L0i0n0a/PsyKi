import React, { useState, useEffect } from 'react';

type ColorSliderProps = {
  initial?: number;
  value?: number; // Add value prop
  onChange?: (value: number) => void;
};

const ColorSlider: React.FC<ColorSliderProps> = ({ initial = 50, value, onChange }) => {
  const [internalValue, setInternalValue] = useState<number>(initial);

  // Sync internal state with value prop if provided
  useEffect(() => {
    if (typeof value === 'number') {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value, 10);
    if (typeof value !== 'number') {
      setInternalValue(newVal); // Only update internal state if uncontrolled
    }
    onChange?.(newVal);
  };

  return (
    <div className='flex-col items-center gap-4 w-full max-w-lg'>
      <div className='flex justify-between items-center w-full mb-2'>
        <div>Entscheidungsskala:</div>
        <div className='w-12 text-gray-800  text-right'>{typeof value === 'number' ? value : internalValue}%</div>
      </div>
      <input type='range' min={0} max={100} value={typeof value === 'number' ? value : internalValue} onChange={handleChange} className='color-slider w-full appearance-none' />
    </div>
  );
};

export default ColorSlider;
