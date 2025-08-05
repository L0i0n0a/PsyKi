import React from 'react';
import { useTranslation } from '@/utils/translation';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the AccuracyComparison component
 *
 * Defines the data structure required for comprehensive accuracy visualization
 * and comparison between human and AI decision-making performance.
 */
type AccuracyComparisonProps = {
  /** Human confidence percentage on the Z-score scale (-3 to +3) */
  humanPercent: number;
  /** AI confidence percentage on the Z-score scale (-3 to +3) */
  aiPercent: number;
  /** Language locale for internationalization (German or English) */
  locale: 'de' | 'en';
  /** Final decision value on the Z-score scale (-3 to +3) */
  decision: number;
  /** Human accuracy percentage (0-100) */
  humanAccuracy: number;
  /** AI accuracy percentage (0-100) */
  aiAccuracy: number;
};

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Converts Z-score value to percentage position on visual scale
 *
 * Transforms values from the range [-3, +3] to [0, 100] for positioning
 * markers and elements along the visual gradient scale.
 *
 * @param val - Z-score value to convert
 * @returns Percentage position (0-100) for visual positioning
 */
function scaleToPercent(val: number) {
  return ((val + 3) / 6) * 100;
}

/**
 * Converts hexadecimal color to RGB components
 *
 * Parses a hex color string and extracts individual red, green, and blue
 * component values for color interpolation calculations.
 *
 * @param hex - Hexadecimal color string (e.g., "#FF5733")
 * @returns Object containing r, g, b values (0-255)
 */
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

/**
 * Converts RGB components to hexadecimal color string
 *
 * Combines individual red, green, and blue values into a standard
 * hexadecimal color format for CSS styling.
 *
 * @param rgb - Object containing r, g, b values (0-255)
 * @returns Hexadecimal color string (e.g., "#FF5733")
 */
function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Interpolates between two colors based on a transition factor
 *
 * Creates smooth color transitions by blending RGB components of two colors
 * according to the specified interpolation factor.
 *
 * @param color1 - Starting color in hex format
 * @param color2 - Ending color in hex format
 * @param t - Interpolation factor (0-1, where 0 = color1, 1 = color2)
 * @returns Interpolated color in hex format
 */
function interpolateColor(color1: string, color2: string, t: number) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);
  return rgbToHex({ r, g, b });
}

/**
 * Determines appropriate color for a given confidence score
 *
 * Maps confidence scores to colors using interpolation between orange
 * (negative confidence) and blue (positive confidence) color schemes.
 *
 * @param score - Confidence score value (-3 to +3)
 * @returns Hex color string representing the confidence level
 */
function getColorForScore(score: number): string {
  const t = Math.min(1, Math.abs(score / 3));
  return score < 0 ? interpolateColor('#FFE0B2', '#FB8C00', t) : interpolateColor('#90CAF9', '#0D47A1', t);
}

/* ========================================
   VARIABLE WIDTH CURVE COMPONENT
   ======================================== */

/**
 * VariableWidthCurve - Dynamic SVG Curve with Variable Thickness
 *
 * Creates smooth curved connections between markers with variable thickness
 * to enhance visual appeal and indicate connection strength or importance.
 *
 * @param props - Curve configuration including coordinates, colors, and thickness
 * @returns SVG line segments forming a variable-width curved path
 */
function VariableWidthCurve({
  x1,
  y1,
  cx,
  cy,
  x2,
  y2,
  color,
  min,
  max,
  steps = 40,
}: {
  /** Starting X coordinate */
  x1: number;
  /** Starting Y coordinate */
  y1: number;
  /** Control point X coordinate for curve shape */
  cx: number;
  /** Control point Y coordinate for curve shape */
  cy: number;
  /** Ending X coordinate */
  x2: number;
  /** Ending Y coordinate */
  y2: number;
  /** Stroke color for the curve */
  color: string;
  /** Minimum line thickness */
  min: number;
  /** Maximum line thickness */
  max: number;
  /** Number of segments for smooth curve approximation */
  steps?: number;
}) {
  // Generate curve segments with variable thickness
  const segments = [];
  for (let i = 0; i < steps; i++) {
    const t1 = i / steps;
    const t2 = (i + 1) / steps;

    // Calculate point positions using quadratic Bézier curve formula
    const getPoint = (t: number) => ({
      x: (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2,
      y: (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2,
    });

    const p1 = getPoint(t1);
    const p2 = getPoint(t2);

    // Calculate variable thickness based on position along curve
    const thickness = min + (max - min) * (2 * (t1 - 0.5) ** 2);

    segments.push(<line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={color} strokeWidth={thickness} strokeLinecap='round' fill='none' />);
  }
  return <>{segments}</>;
}

/* ========================================
   MAIN COMPONENT
   ======================================== */

/**
 * AccuracyComparison - Visual Performance Comparison Component
 *
 * Creates an interactive visualization comparing human and AI decision-making
 * performance using color-coded markers, curved connections, and accuracy metrics.
 * Provides clear visual feedback for participants in the research study.
 *
 * @param {AccuracyComparisonProps} props - Component props containing performance data
 * @returns {React.FC} Interactive accuracy comparison visualization
 */
export default function AccuracyComparison({ humanPercent, aiPercent, locale, decision, humanAccuracy, aiAccuracy }: AccuracyComparisonProps) {
  // Initialize translation system
  const { t } = useTranslation(locale);

  /* ----------------------------------------
     DERIVED VALUES AND CALCULATIONS
     ---------------------------------------- */

  // Convert Z-score values to visual positions
  const humanX = scaleToPercent(humanPercent);
  const aiX = scaleToPercent(aiPercent);
  const decisionX = scaleToPercent(decision);

  // Calculate colors based on confidence scores
  const humanColor = getColorForScore(humanPercent);
  const aiColor = getColorForScore(aiPercent);

  // Process decision color with clamping and interpolation
  const clampedDecision = Math.max(-3, Math.min(3, decision));
  const color = Math.min(1, Math.abs(clampedDecision / 3));
  const decisionColor = clampedDecision >= 0 ? interpolateColor('#90CAF9', '#0D47A1', color) : interpolateColor('#FFE0B2', '#FB8C00', color);

  /* ----------------------------------------
     COMPONENT RENDER
     ---------------------------------------- */

  return (
    <div className='flex w-full flex-col items-center justify-center p-6'>
      {/* ========================================
          ACCURACY VALUES SECTION
          ======================================== */}

      {/* Display human and AI accuracy percentages */}
      <div className='mt-2 mb-4 w-full flex flex-col items-center text-center px-2'>
        <p className='mb-2 text-lg'>{t('accuracyValues')}</p>
        <div className='flex flex-row justify-center gap-8'>
          <div>
            <p className='text-base '>{t('human')}</p>
            <p className='text-lg '>{humanAccuracy}%</p>
          </div>
          <div>
            <p className='text-base '>{t('ai')}</p>
            <p className='text-lg '>{aiAccuracy}%</p>
          </div>
        </div>
      </div>

      {/* ========================================
          Z-SCORE VISUALIZATION SECTION
          ======================================== */}

      {/* Main chart title */}
      <h1 className='text-2xl w-full mb-30 text-center'>{t('zScore')}</h1>

      <div className='flex flex-col w-full min-w-110 md:min-w-96 max-w-3xl'>
        <div className='flex items-center justify-between relative w-full'>
          {/* Z-score gradient visualization container */}
          <div className='relative flex-1 mx-4'>
            {/* Gradient background bar */}
            <div
              className='h-8 w-full rounded-full relative overflow-visible'
              style={{
                background: 'linear-gradient(to right, #FB8C00 , #FFE0B2 50%,  #90CAF9 50%, #0D47A1)',
              }}>
              {/* Central neutral divider line */}
              <div className='absolute left-[50%] top-0 h-full w-0.5 bg-white opacity-70 z-10' />

              {/* Human performance marker */}
              <div
                className='absolute top-4 w-6 h-6 rounded-full border-2 border-white shadow z-10 flex items-center justify-center text-white text-xs font-bold'
                style={{
                  left: `${humanX}%`,
                  transform: 'translateX(-50%) translateY(-50%)',
                  backgroundColor: humanColor,
                }}>
                {locale === 'de' ? 'M' : 'H'}
              </div>

              {/* AI performance marker */}
              <div
                className='absolute top-4 w-6 h-6 rounded-full border-2 border-white shadow z-10 flex items-center justify-center text-white text-xs font-bold'
                style={{
                  left: `${aiX}%`,
                  transform: 'translateX(-50%) translateY(-50%)',
                  backgroundColor: aiColor,
                }}>
                {locale === 'de' ? 'KI' : 'AI'}
              </div>

              {/* Decision marker with overlap detection */}
              {(() => {
                // Calculate overlap with other markers
                const overlapThreshold = 5; // percent range for overlap detection
                const overlaps = Math.abs(decisionX - humanX) < overlapThreshold || Math.abs(decisionX - aiX) < overlapThreshold;
                const bubbleOpacity = overlaps ? 0.6 : 1;
                const textOpacity = overlaps ? 0.4 : 1;

                return (
                  <>
                    {/* Decision result label */}
                    <p
                      className='absolute top-[-60px] -translate-y-1/2 z-10 text-sm font-bold'
                      style={{
                        left: `${decisionX}%`,
                        transform: 'translateX(-50%) translateY(-50%)',
                        color: decisionColor,
                        opacity: textOpacity,
                      }}>
                      {t('result')}
                    </p>

                    {/* Decision marker bubble */}
                    <div
                      className='absolute top-8 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white shadow z-10'
                      style={{
                        left: `${decisionX}%`,
                        transform: 'translateX(-50%) translateY(-50%)',
                        backgroundColor: decisionColor,
                        border: '5px solid #ffffff',
                        opacity: bubbleOpacity,
                      }}
                    />
                  </>
                );
              })()}

              {/* SVG overlay for connection curves */}
              <svg className='absolute top-[-130px] left-0 w-full h-[200px] pointer-events-none' xmlns='http://www.w3.org/2000/svg' viewBox='0 -10 100 100' preserveAspectRatio='none'>
                {/* Human to decision connection curve */}
                <VariableWidthCurve x1={humanX} y1={64} cx={humanX + 2} cy={0} x2={decisionX} y2={64} color={humanColor} min={4} max={14} />

                {/* AI to decision connection curve */}
                <VariableWidthCurve x1={aiX} y1={64} cx={aiX - 8} cy={0} x2={decisionX} y2={64} color={aiColor} min={4} max={14} />
              </svg>
            </div>

            {/* Scale labels for gradient sections */}
            <div className='grid grid-cols-5 text-base text-gray-600 mt-2 px-1 text-center'>
              <span className='justify-self-start'>{t('secStrongOrange')}</span>
              <span>{t('secOrange')}</span>
              <span>{t('secNeutral')}</span>
              <span>{t('secBlue')}</span>
              <span className='justify-self-end'>{t('secStrongBlue')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
