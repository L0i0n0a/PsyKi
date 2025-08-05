import React from 'react';

/* ========================================
   FLAG ICON COMPONENTS
   ======================================== */

/**
 * German Flag SVG Component
 *
 * Renders the German flag (black, red, gold horizontal stripes)
 * as an inline SVG with proper accessibility attributes.
 * Used to indicate German language option in the toggle interface.
 *
 * @returns {React.FC} German flag SVG element
 */
const FlagDE = () => (
  <svg width='20' height='14' viewBox='0 0 20 14' className='inline' aria-label='Deutsch'>
    {/* Gold stripe (bottom) */}
    <rect width='20' height='14' fill='#FFCE00' />
    {/* Red stripe (middle) */}
    <rect width='20' height='9.33' fill='#DD0000' />
    {/* Black stripe (top) */}
    <rect width='20' height='4.66' fill='#000' />
  </svg>
);

/**
 * British Flag SVG Component
 *
 * Renders the Union Jack flag with accurate colors and proportions
 * as an inline SVG with proper accessibility attributes.
 * Used to indicate English language option in the toggle interface.
 *
 * @returns {React.FC} British flag SVG element
 */
const FlagEN = () => (
  <svg width='20' height='14' viewBox='0 0 60 42' className='inline' aria-label='English'>
    {/* Blue background */}
    <rect width='60' height='42' fill='#012169' />
    {/* White diagonal crosses */}
    <polygon points='0,0 60,42 60,36 12,0' fill='#FFF' />
    <polygon points='60,0 0,42 0,36 48,0' fill='#FFF' />
    {/* White vertical and horizontal crosses */}
    <polygon points='25,0 35,0 35,42 25,42' fill='#FFF' />
    <polygon points='0,18 60,18 60,24 0,24' fill='#FFF' />
    {/* Red diagonal crosses */}
    <polygon points='0,0 60,42 54,42 0,6' fill='#C8102E' />
    <polygon points='60,0 0,42 6,42 60,6' fill='#C8102E' />
    {/* Red vertical and horizontal crosses */}
    <polygon points='27,0 33,0 33,42 27,42' fill='#C8102E' />
    <polygon points='0,20 60,20 60,22 0,22' fill='#C8102E' />
  </svg>
);

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the LanguageToggle component
 *
 * Defines the properties needed to render a functional language
 * toggle with appropriate styling and behavior controls.
 */
type LanguageToggleProps = {
  /** Current active locale ('de' or 'en') */
  locale: string;
  /** Callback function triggered when language toggle is clicked */
  onToggle: () => void;
  /** Optional additional CSS classes for custom styling */
  className?: string;
};

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * LanguageToggle Component
 *
 * Renders a bilingual language toggle button that displays the target
 * language (opposite of current locale) with appropriate flag icon.
 * Provides intuitive language switching for international research
 * participants in the PsyKi application.
 *
 * @param {LanguageToggleProps} props - Component properties
 * @returns {React.FC} Rendered language toggle button
 */
const LanguageToggle: React.FC<LanguageToggleProps> = ({ locale, onToggle, className = '' }) => (
  <button
    onClick={onToggle}
    className={`absolute right-0 mt-0! justify-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-bold text-center rounded-full transition flex items-center ${className}`}
    aria-label='Sprache wechseln / Change language'>
    {/* Conditional rendering based on current locale */}
    {locale === 'de' ? (
      // Current: German → Show: English option
      <div className='gap-2 flex items-center'>
        <FlagEN />
        <div>EN</div>
      </div>
    ) : (
      // Current: English → Show: German option
      <div className='gap-2 flex items-center'>
        <FlagDE />
        <div>DE</div>
      </div>
    )}
  </button>
);

export default LanguageToggle;
