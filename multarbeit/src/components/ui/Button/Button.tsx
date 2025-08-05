import React from 'react';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the Button component
 *
 * Defines the properties needed to render a themed button
 * with appropriate styling, behavior, and accessibility.
 */
type ButtonProps = {
  /** Text content displayed within the button */
  text: string;
  /** Optional click handler for button interactions */
  onClick?: () => void;
  /** HTML button type attribute (defaults to 'button') */
  type?: 'button';
  /** Visual variant determining button appearance */
  variant?: 'primary' | 'secondary' | 'outline';
};

/* ========================================
   STYLE DEFINITIONS
   ======================================== */

/**
 * Base styling classes applied to all button variants
 *
 * Provides consistent spacing, typography, and interactive states
 * across all button variations in the research interface.
 */
const baseStyles = 'px-6 py-2 rounded-full font-semibold transition duration-300 hover:cursor-pointer';

/**
 * Variant-specific styling configurations
 *
 * Defines color schemes and visual treatments for different
 * button contexts within the research application interface.
 */
const variants = {
  /** Primary variant: Blue theme for main actions and confirmations */
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  /** Secondary variant: Gray theme for neutral or secondary actions */
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  /** Outline variant: Bordered style for subtle actions and alternatives */
  outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
};

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * Button Component
 *
 * Renders a styled button with configurable appearance and behavior.
 * Combines base styling with variant-specific themes to provide
 * consistent interactive elements throughout the research interface.
 *
 * @param {ButtonProps} props - Component properties
 * @returns {React.FC} Rendered button element with themed styling
 */
const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', variant = 'primary' }) => (
  <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
    {text}
  </button>
);

export default Button;
