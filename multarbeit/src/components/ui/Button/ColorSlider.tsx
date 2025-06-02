import React, { useState } from "react";

type ColorSliderProps = {
  initial?: number;
  onChange?: (value: number) => void;
};

const ColorSlider: React.FC<ColorSliderProps> = ({ initial = 50, onChange }) => {
  const [value, setValue] = useState<number>(initial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value, 10);
    setValue(newVal);
    onChange?.(newVal);
  };

  return (
    <div className="flex items-center gap-4 w-full max-w-lg">
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
        className="color-slider w-full appearance-none"
      />
      <div className="w-12 text-sm font-medium text-gray-800 text-right">
        {value}%
      </div>
    </div>
  );
};

export default ColorSlider;