import React from 'react';
import { useTranslation } from '@/utils/translation';

type AccuracyComparisonProps = {
  humanPercent: number;
  aiPercent: number;
  locale: 'de' | 'en';
  decision: number;
  humanAccuracy: number;
  aiAccuracy: number;
};

// --- Utility Functions ---
function scaleToPercent(val: number) {
  return ((val + 3) / 6) * 100;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function interpolateColor(color1: string, color2: string, t: number) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);
  return rgbToHex({ r, g, b });
}

function getColorForScore(score: number): string {
  const t = Math.min(1, Math.abs(score / 3));
  return score < 0 ? interpolateColor('#FFE0B2', '#FB8C00', t) : interpolateColor('#90CAF9', '#0D47A1', t);
}

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
  x1: number;
  y1: number;
  cx: number;
  cy: number;
  x2: number;
  y2: number;
  color: string;
  min: number;
  max: number;
  steps?: number;
}) {
  const segments = [];
  for (let i = 0; i < steps; i++) {
    const t1 = i / steps;
    const t2 = (i + 1) / steps;
    const getPoint = (t: number) => ({
      x: (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2,
      y: (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2,
    });
    const p1 = getPoint(t1);
    const p2 = getPoint(t2);
    const thickness = min + (max - min) * (2 * (t1 - 0.5) ** 2);
    segments.push(<line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={color} strokeWidth={thickness} strokeLinecap='round' fill='none' />);
  }
  return <>{segments}</>;
}

// --- Component ---
export default function AccuracyComparison({ humanPercent, aiPercent, locale, decision, humanAccuracy, aiAccuracy }: AccuracyComparisonProps) {
  const { t } = useTranslation(locale);

  // --- Derived values ---
  const humanX = scaleToPercent(humanPercent);
  const aiX = scaleToPercent(aiPercent);

  const clampedDecision = Math.max(-3, Math.min(3, decision));
  const decisionX = scaleToPercent(clampedDecision);

  const humanColor = getColorForScore(humanPercent);
  const aiColor = getColorForScore(aiPercent);

  const color = Math.min(1, Math.abs(clampedDecision / 3));
  const decisionColor = clampedDecision >= 0 ? interpolateColor('#90CAF9', '#0D47A1', color) : interpolateColor('#FFE0B2', '#FB8C00', color);

  // --- Render ---
  return (
    <div className='flex w-full flex-col items-center justify-center p-6'>
      <h1 className='text-2xl w-full mb-30 text-center'>{t('zScore')}</h1>
      <div className='flex flex-col w-full min-w-110 md:min-w-96 max-w-3xl'>
        <div className='flex items-center justify-between relative w-full'>
          {/* Z-score visualization */}
          <div className='relative flex-1 mx-4'>
            <div
              className='h-8 w-full rounded-full relative overflow-visible'
              style={{
                background: 'linear-gradient(to right, #FB8C00 , #FFE0B2 50%,  #90CAF9 50%, #0D47A1)',
              }}>
              {/* Vertical divider */}
              <div className='absolute left-[50%] top-0 h-full w-0.5 bg-white opacity-70 z-10' />

              {/* Human marker */}
              <div
                className='absolute top-4 w-6 h-6 rounded-full border-2 border-white shadow z-10 flex items-center justify-center text-white text-xs font-bold'
                style={{
                  left: `${humanX}%`,
                  transform: 'translateX(-50%) translateY(-50%)',
                  backgroundColor: humanColor,
                }}>
                {locale === 'de' ? 'M' : 'H'}
              </div>

              {/* Ai marker */}
              <div
                className='absolute top-4 w-6 h-6 rounded-full border-2 border-white shadow z-10 flex items-center justify-center text-white text-xs font-bold'
                style={{
                  left: `${aiX}%`,
                  transform: 'translateX(-50%) translateY(-50%)',
                  backgroundColor: aiColor,
                }}>
                {locale === 'de' ? 'KI' : 'AI'}
              </div>

              {/* Decision marker */}
              <div>
                <p
                  className='absolute top-[-60] -translate-y-1/2 z-10'
                  style={{
                    left: `${decisionX}%`,
                    transform: 'translateX(-50%) translateY(-50%)',
                    color: decisionColor,
                  }}>
                  {t('result')}
                </p>
              </div>
              <div
                className='absolute top-8 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white shadow z-10'
                style={{
                  left: `${decisionX}%`,
                  transform: 'translateX(-50%) translateY(-50%)',
                  backgroundColor: decisionColor,
                  border: '5px solid #ffffff',
                }}
              />

              {/* SVG curves */}
              <svg className='absolute top-[-130px] left-0 w-full h-[200px] pointer-events-none' xmlns='http://www.w3.org/2000/svg' viewBox='0 -10 100 100' preserveAspectRatio='none'>
                {/* Human variable-width curve */}
                <VariableWidthCurve x1={humanX} y1={64} cx={humanX + 2} cy={0} x2={decisionX} y2={64} color={humanColor} min={4} max={14} />
                {/* Ai variable-width curve */}
                <VariableWidthCurve x1={aiX} y1={64} cx={aiX - 8} cy={0} x2={decisionX} y2={64} color={aiColor} min={4} max={14} />
              </svg>
            </div>

            {/* Labels */}
            <div className='grid grid-cols-5 text-sm text-gray-600 mt-2 px-1 text-center'>
              <span className='justify-self-start'>{t('secStrongOrange')}</span>
              <span>{t('secOrange')}</span>
              <span>{t('secNeutral')}</span>
              <span>{t('secBlue')}</span>
              <span className='justify-self-end'>{t('secStrongBlue')}</span>
            </div>
          </div>

          {/* Percentage values ​​below the markers */}
          <div className='my-14 absolute top-4 w-full flex flex-col justify-center text-center font-semibold px-2'>
            <p className='mt-4'>{t('accuracyValues')}</p>
            <div className='flex flex-row justify-center'>
              <div className='mx-4'>
                <p className='text-base font-semibold'>{t('human')}</p>
                <p className='text-lg font-bold'>{humanAccuracy}%</p>
              </div>
              <div className='mx-4'>
                <p className='text-base font-semibold'>{t('ai')}</p>
                <p className='text-lg font-semibold'>{aiAccuracy}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
