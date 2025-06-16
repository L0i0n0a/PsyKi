import React from 'react';

const FlagDE = () => (
  <svg width='20' height='14' viewBox='0 0 20 14' className='inline' aria-label='Deutsch'>
    <rect width='20' height='14' fill='#FFCE00' />
    <rect width='20' height='9.33' fill='#DD0000' />
    <rect width='20' height='4.66' fill='#000' />
  </svg>
);

const FlagEN = () => (
  <svg width='20' height='14' viewBox='0 0 60 42' className='inline' aria-label='English'>
    <rect width='60' height='42' fill='#012169' />
    <polygon points='0,0 60,42 60,36 12,0' fill='#FFF' />
    <polygon points='60,0 0,42 0,36 48,0' fill='#FFF' />
    <polygon points='25,0 35,0 35,42 25,42' fill='#FFF' />
    <polygon points='0,18 60,18 60,24 0,24' fill='#FFF' />
    <polygon points='0,0 60,42 54,42 0,6' fill='#C8102E' />
    <polygon points='60,0 0,42 6,42 60,6' fill='#C8102E' />
    <polygon points='27,0 33,0 33,42 27,42' fill='#C8102E' />
    <polygon points='0,20 60,20 60,22 0,22' fill='#C8102E' />
  </svg>
);

type LanguageToggleProps = {
  locale: string;
  onToggle: () => void;
  className?: string;
};

const LanguageToggle: React.FC<LanguageToggleProps> = ({ locale, onToggle, className = '' }) => (
  <button
    onClick={onToggle}
    className={`absolute right-0 mt-0! justify-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-bold text-center rounded-full transition flex items-center ${className}`}
    aria-label='Sprache wechseln / Change language'>
    {locale === 'de' ? (
      <div className='gap-2 flex items-center'>
        <FlagEN />
        <div>EN</div>
      </div>
    ) : (
      <div className='gap-2 flex items-center'>
        <FlagDE />
        <div>DE</div>
      </div>
    )}
  </button>
);

export default LanguageToggle;
