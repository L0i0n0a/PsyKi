import React from 'react';

type FeedbackSliderProps = {
  title: string;
  value: number;
  leftLabel?: string;
  rightLabel?: string;
  skipped?: boolean;
};

const FeedbackSlider: React.FC<FeedbackSliderProps> = ({ title, value, leftLabel = 'Starke Ablehnung', rightLabel = 'Starke Zustimmung', skipped = false }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow border'>
      <div className='font-semibold mb-2'>{title}</div>
      <div className='flex items-center justify-between text-sm text-gray-500 mb-1'>
        <span>{leftLabel}</span>
        {skipped ? <span className='text-center'>1 skipped</span> : <span />}
        <span>{rightLabel}</span>
      </div>
      <div className='relative'>
        <div className='h-2 bg-gray-200 rounded-full'>
          <div className='h-2 munsellColourBG rounded-full' style={{ width: `${(value / 5) * 100}%` }} />
        </div>
        <div className='absolute top-1/2 -translate-y-1/2 transform' style={{ left: `calc(${(value / 5) * 100}% - 12px)` }}>
          <div className='w-6 h-6 rounded-full munsellColourBG text-white text-xs flex items-center justify-center shadow'>{value.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSlider;
