import React from 'react';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Interface defining the color scheme structure for hint cards
 *
 * Contains all Tailwind CSS classes needed to create a cohesive
 * visual theme for each color variant of the hint card.
 */
interface ColorScheme {
  /** Background color class for the card */
  bg: string;
  /** Hover background color class for interactive states */
  hoverBg: string;
  /** Border color class for card outline */
  border: string;
  /** Title text color class for headings */
  title: string;
  /** Body text color class for content */
  text: string;
}

/* ========================================
   COLOR SCHEME DEFINITIONS
   ======================================== */

/**
 *  Color mapping for different types of research guidance
 */
const colorMap: Record<string, ColorScheme> = {
  green: {
    bg: 'bg-green-50',
    hoverBg: 'hover:bg-green-100',
    border: 'border-green-300',
    title: 'text-green-800',
    text: 'text-green-900',
  },
  blue: {
    bg: 'bg-blue-50',
    hoverBg: 'hover:bg-blue-100',
    border: 'border-blue-300',
    title: 'text-blue-800',
    text: 'text-blue-900',
  },
  yellow: {
    bg: 'bg-yellow-50',
    hoverBg: 'hover:bg-yellow-100',
    border: 'border-yellow-300',
    title: 'text-yellow-800',
    text: 'text-yellow-900',
  },
  violet: {
    bg: 'bg-violet-50',
    hoverBg: 'hover:bg-violet-100',
    border: 'border-violet-300',
    title: 'text-violet-800',
    text: 'text-violet-900',
  },
  orange: {
    bg: 'bg-orange-50',
    hoverBg: 'hover:bg-orange-100',
    border: 'border-orange-300',
    title: 'text-orange-800',
    text: 'text-orange-900',
  },
  pink: {
    bg: 'bg-pink-50',
    hoverBg: 'hover:bg-pink-100',
    border: 'border-pink-300',
    title: 'text-pink-800',
    text: 'text-pink-900',
  },
  teal: {
    bg: 'bg-teal-50',
    hoverBg: 'hover:bg-teal-100',
    border: 'border-teal-300',
    title: 'text-teal-800',
    text: 'text-teal-900',
  },
  indigo: {
    bg: 'bg-indigo-50',
    hoverBg: 'hover:bg-indigo-100',
    border: 'border-indigo-300',
    title: 'text-indigo-800',
    text: 'text-indigo-900',
  },
  amber: {
    bg: 'bg-amber-50',
    hoverBg: 'hover:bg-amber-100',
    border: 'border-amber-300',
    title: 'text-amber-800',
    text: 'text-amber-900',
  },
};

/**
 * Props interface for the FeedbackHintCard component
 *
 * Defines the properties needed to render a themed hint card
 * with appropriate content and styling.
 */
interface FeedbackHintCardProps {
  /** Title text displayed in the card header */
  title: string;
  /** Content to be rendered inside the card body */
  children: React.ReactNode;
  /** Color scheme identifier (must match colorMap keys) */
  color: string;
}

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * FeedbackHintCard Component
 *
 * Renders a themed hint card with customizable color schemes for different
 * types of research guidance and feedback. Provides consistent styling
 * and semantic color coding for participant interface elements.
 *
 * The component automatically falls back to the green color scheme if an
 * invalid color is provided, ensuring consistent appearance and preventing
 * rendering errors in the research application.
 *
 *
 * @param {FeedbackHintCardProps} props - Component properties
 * @returns {React.FC} Rendered hint card with themed styling
 */
const FeedbackHintCard: React.FC<FeedbackHintCardProps> = ({ title, children, color }) => {
  // Select color scheme with fallback to green for invalid colors
  const selectedColorScheme = colorMap[color] || colorMap['green'];

  return (
    <div
      className={`border rounded-xl p-6 shadow-md transition-colors duration-300 ${selectedColorScheme.bg} ${selectedColorScheme.hoverBg} ${selectedColorScheme.border}`}
      role='complementary'
      aria-labelledby='hint-card-title'>
      {/* Card title with themed styling */}
      <h3 id='hint-card-title' className={`text-lg font-semibold mb-2 ${selectedColorScheme.title}`}>
        {title}
      </h3>

      {/* Card content with enhanced readability */}
      <div className={`text-base leading-relaxed ${selectedColorScheme.text}`}>{children}</div>
    </div>
  );
};

export default FeedbackHintCard;
